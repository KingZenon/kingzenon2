"""Merge the yearly MOT accident CSVs into one harmonised table and profile the target.

Usage:  python -I -X utf8 harmonize_accidents.py <raw_dir> <out_csv>

Steps (CRISP-DM: data understanding / preparation):
  1. read each yearly file, strip spaces from column names
  2. rename the year-specific Thai names to one canonical English schema
  3. drop rows that are completely empty or have no accident date
  4. parse dates (day/month/year), flag impossible values
  5. derive casualty counts and a 3-level severity label
  6. print per-year row counts and class balance, write the combined CSV
"""
import sys
from pathlib import Path

import pandas as pd

# canonical name -> every Thai header it appears under (after removing spaces)
SCHEMA = {
    "year_raw": ["ปีที่เกิดเหตุ"],
    "date": ["วันที่เกิดเหตุ"],
    "time": ["เวลา"],
    "report_date": ["วันที่รายงาน"],
    "report_time": ["เวลาที่รายงาน"],
    "acc_code": ["ACC_CODE"],
    "agency": ["หน่วยงาน"],
    "route": ["สายทาง"],
    "km": ["KM", "ก.ม."],
    "province": ["จังหวัด"],
    "vehicle1": ["รถคันที่1"],
    "location": ["บริเวณที่เกิดเหตุ", "บริเวณที่เกิดเหตุ/ลักษณะทาง"],
    "cause": ["มูลเหตุสันนิษฐาน"],
    "acc_type": ["ลักษณะการเกิดเหตุ", "ลักษณะการเกิดอุบัติเหตุ"],
    "weather": ["สภาพอากาศ"],
    "lat": ["LATITUDE"],
    "lon": ["LONGITUDE"],
    "n_vehicles": ["จำนวนรถที่เกิดเหตุ(รวมคันที่1)", "รถที่เกิดเหตุ"],
    "n_involved": ["รถและคนที่เกิดเหตุ", "จำนวนที่เกิดเหตุทั้งหมด(รวมคนเดินเท้า)"],
    "deaths": ["จำนวนผู้เสียชีวิต", "ผู้เสียชีวิต"],
    "serious": ["ผู้บาดเจ็บสาหัส", "จำนวนผู้บาดเจ็บสาหัส"],
    "minor": ["ผู้บาดเจ็บเล็กน้อย", "จำนวนผู้บาดเจ็บเล็กน้อย"],
    "injured_total": ["รวมจำนวนผู้บาดเจ็บ"],
}
LOOKUP = {thai: eng for eng, names in SCHEMA.items() for thai in names}


def load_year(path):
    df = pd.read_csv(path, encoding="utf-8-sig", low_memory=False)
    df.columns = [str(c).replace(" ", "").strip() for c in df.columns]
    df = df.rename(columns={c: LOOKUP[c] for c in df.columns if c in LOOKUP})
    df = df[[c for c in SCHEMA if c in df.columns]].copy()
    df["source_file"] = path.stem
    return df


def parse_date(series, stem):
    """Each yearly file uses a different date convention (found by inspection):
    2019 and 2026 -> day/month/year text, 2020-2023 -> month/day/year text,
    2024 and 2025 -> Excel serial day numbers."""
    year = stem[-4:]
    if year in ("2024", "2025"):
        serial = pd.to_numeric(series, errors="coerce")
        return pd.to_datetime(serial, unit="D", origin="1899-12-30", errors="coerce")
    fmt = "%d/%m/%Y" if year in ("2019", "2026") else "%m/%d/%Y"
    return pd.to_datetime(series.astype(str).str.strip(), format=fmt, errors="coerce")


def severity(row):
    if row["deaths"] > 0:
        return "fatal"
    if row["injured_total"] > 0 or row["serious"] > 0 or row["minor"] > 0:
        return "injury"
    return "property_only"


def main(raw_dir, out_csv):
    frames = []
    for path in sorted(Path(raw_dir).glob("accident20*.csv")):
        df = load_year(path)
        n_raw = len(df)
        df = df.dropna(how="all", subset=[c for c in df.columns if c != "source_file"])
        df = df[df["date"].notna()].copy()
        df["date_parsed"] = parse_date(df["date"], path.stem)
        print(f"{path.stem}: raw={n_raw:,} kept={len(df):,} "
              f"bad_dates={int(df['date_parsed'].isna().sum())} "
              f"date_range={df['date_parsed'].min().date()}..{df['date_parsed'].max().date()}")
        frames.append(df)

    data = pd.concat(frames, ignore_index=True)
    for col in ("deaths", "serious", "minor", "injured_total"):
        data[col] = pd.to_numeric(data[col], errors="coerce")
    data["serious_available"] = data["serious"].notna()
    for col in ("serious", "minor"):
        data[col] = data[col].fillna(0)
    data["injured_total"] = data["injured_total"].fillna(data["serious"] + data["minor"])
    data["deaths"] = data["deaths"].fillna(0)
    data["severity"] = data.apply(severity, axis=1)
    data["acc_year"] = data["date_parsed"].dt.year

    print("\nrows kept:", f"{len(data):,}")
    print("\nseverity by accident year (rows):")
    print(pd.crosstab(data["acc_year"], data["severity"], margins=True))
    print("\nseverity share by accident year:")
    print(pd.crosstab(data["acc_year"], data["severity"], normalize="index").round(3))
    print("\nserious-injury column available by source file:")
    print(data.groupby("source_file")["serious_available"].mean().round(3))
    dup = data["acc_code"].dropna()
    print("\nACC_CODE present:", f"{len(dup):,}", "duplicates:", int(dup.duplicated().sum()))
    print("exact duplicate rows:", int(data.drop(columns=["source_file"]).duplicated().sum()))
    dups = data[data["acc_code"].notna() & data["acc_code"].duplicated(keep=False)]
    print("rows sharing an ACC_CODE:", len(dups), "by file:", dups["source_file"].value_counts().to_dict())
    if len(dups):
        grp = dups.groupby("acc_code")
        same = grp[["deaths", "injured_total", "date_parsed", "province"]].nunique(dropna=False).max(axis=1) == 1
        print("ACC_CODE groups:", grp.ngroups, "| identical on deaths/injured/date/province:", int(same.sum()),
              "| differ:", int((~same).sum()))
    print("\nmissing share of key features:")
    keys = ["province", "route", "cause", "acc_type", "weather", "location", "lat", "lon", "time"]
    print(data[keys].isna().mean().round(3).to_string())

    Path(out_csv).parent.mkdir(parents=True, exist_ok=True)
    data.to_csv(out_csv, index=False, encoding="utf-8-sig")
    print("\nwrote", out_csv)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])

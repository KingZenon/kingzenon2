"""Inspect the yearly MOT road-accident CSV files (schema, size, encoding, nulls).

Usage:  python -I explore_accidents.py <raw_dir>
Reads accident2019.csv ... accident2026.csv and prints one summary per year,
then a cross-year schema comparison.
"""
import sys
from pathlib import Path

import pandas as pd

ENCODINGS = ("utf-8-sig", "cp874", "tis-620")


def read_csv(path):
    last = None
    for enc in ENCODINGS:
        try:
            return pd.read_csv(path, encoding=enc, low_memory=False), enc
        except Exception as exc:  # wrong encoding or malformed file
            last = exc
    raise RuntimeError(f"{path.name}: could not read ({last})")


def main(raw_dir):
    raw = Path(raw_dir)
    schemas = {}
    for path in sorted(raw.glob("accident20*.csv")):
        df, enc = read_csv(path)
        schemas[path.stem] = list(df.columns)
        print("=" * 80)
        print(f"{path.name}: rows={len(df):,} cols={df.shape[1]} encoding={enc}")
        print("columns:", list(df.columns))
        nulls = df.isna().mean().round(3)
        print("null share > 0:", {c: v for c, v in nulls.items() if v > 0})
        if path.stem == "accident2019":
            print(df.head(3).T.to_string())
    print("=" * 80)
    base = schemas.get("accident2019", [])
    for name, cols in schemas.items():
        added = [c for c in cols if c not in base]
        missing = [c for c in base if c not in cols]
        print(f"{name}: added vs 2019={added} missing vs 2019={missing}")


if __name__ == "__main__":
    main(sys.argv[1])

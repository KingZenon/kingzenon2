# Analysis code and reproduction guide

Data preparation code for the ICT324 road accident severity project. It audits the Thai Ministry of Transport (TRAMS) accident files and builds a harmonised table with a three-class severity target (fatal, injury, property damage only). Modelling code and results will be added at a later milestone.

Data access and the audit are described in [DATA.md](DATA.md). The raw CSV files are **not** stored in this repository; download them from the publisher (see DATA.md).

## Requirements

Developed and tested with Python 3.14, plus the packages in `code/requirements.txt`:

```
pip install -r code/requirements.txt
```

## Steps

Put the eight downloaded files `accident2019.csv` … `accident2026.csv` in a folder, for example `data/raw/`. Run the scripts from `analysis/code/`. The `-X utf8` flag is needed on Windows because the column names are Thai.

| Step | Command | Output |
| --- | --- | --- |
| 1. Inspect schema, sizes, encodings | `python -X utf8 explore_accidents.py ../../data/raw` | printed summary |
| 2. Harmonise and profile the target | `python -X utf8 harmonize_accidents.py ../../data/raw ../../data/processed/accidents_combined.csv` | merged CSV and printed audit |


## Design notes

- Planned temporal split: train 2019–2024, validate 2025, test 2026 (partial year, to 12 October 2026).
- Casualty columns (deaths, serious and minor injuries, total injured) define the target and will be excluded from the model features to avoid leakage.
- The raw files are locked; see `data-manifest.csv` for sizes and SHA-256 hashes.

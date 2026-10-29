# Data access and audit

## Source

**Road accidents on the Ministry of Transport road network** (national highways, rural highways and expressways), produced from the TRAMS system by the ICT Center of the Ministry of Transport.

- Open Government Data of Thailand: <https://data.go.th/en/dataset/gdpublish-roadaccident>
- Ministry of Transport data catalogue (same files): <https://datagov.mot.go.th/dataset/roadaccident>
- Licence listed by the publisher: Open Data Commons. No access restrictions. Updated yearly. Records are incident level and Thai language.

## Files used

Eight yearly CSV files, 2019 to 2026. Direct download links (MOT catalogue):

| Year | File | Link |
| --- | --- | --- |
| 2019 | accident2019.csv | <https://datagov.mot.go.th/dataset/7e077ffd-dc4f-4dc6-a71c-0813726f3c12/resource/4d919e5b-aa06-4fe4-8a13-5571747a1254/download/accident2019.csv> |
| 2020 | accident2020.csv | <https://datagov.mot.go.th/dataset/7e077ffd-dc4f-4dc6-a71c-0813726f3c12/resource/40476c7b-4194-4dc2-aba5-7326819ed071/download/accident2020.csv> |
| 2021 | accident2021.csv | <https://datagov.mot.go.th/dataset/7e077ffd-dc4f-4dc6-a71c-0813726f3c12/resource/d0a8601a-3ee5-4ce8-8e9d-3dae3915dc30/download/accident2021.csv> |
| 2022 | accident2022.csv | <https://datagov.mot.go.th/dataset/7e077ffd-dc4f-4dc6-a71c-0813726f3c12/resource/733b7874-bd5f-44b9-b271-650890b061f2/download/accident2022.csv> |
| 2023 | accident2023.csv | <https://datagov.mot.go.th/dataset/7e077ffd-dc4f-4dc6-a71c-0813726f3c12/resource/661f2ead-1f28-4cd9-8a67-1bef76b33ef6/download/accident2023.csv> |
| 2024 | accident2024.csv | <https://datagov.mot.go.th/dataset/7e077ffd-dc4f-4dc6-a71c-0813726f3c12/resource/83e9fae0-5f33-45e7-9a6d-6d5ad2060a08/download/accident2024.csv> |
| 2025 | accident2025.csv | <https://datagov.mot.go.th/dataset/7e077ffd-dc4f-4dc6-a71c-0813726f3c12/resource/e1db5e93-2b70-4ee4-b6d7-7ead76d14a09/download/accident2025.csv> |
| 2026 | accident2026.csv | <https://datagov.mot.go.th/dataset/7e077ffd-dc4f-4dc6-a71c-0813726f3c12/resource/4625b7aa-99a4-4dfb-9a0f-6402814d0f2c/download/accident2026.csv> |

The files were downloaded and audited on 22 October 2026. The 2026 file is a partial year and is updated by the publisher during the year, so row counts will change.

## Dataset lock (29 October 2026)

The dataset is locked for this project. All analysis uses the eight files exactly as downloaded on 22 October 2026. Each file's size and SHA-256 hash are recorded in [data-manifest.csv](data-manifest.csv), so anyone can check that they hold the same files. On 29 October 2026 the publisher's current file sizes were compared with the locked files: 2019 to 2023, 2025 and 2026 match; 2024 could not be checked (temporary server error). The 2026 file ends on 12 October 2026 and is not updated for this project. Any change to the data would be recorded here with a new date.

## Audit results

| Year | Rows in file | Usable incidents (with accident date) | Date range |
| --- | ---: | ---: | --- |
| 2019 | 40,246 | 19,194 | 2019-01-01 to 2019-12-31 |
| 2020 | 21,239 | 21,238 | 2020-01-01 to 2020-12-31 |
| 2021 | 20,062 | 20,062 | 2021-01-01 to 2021-12-31 |
| 2022 | 20,566 | 20,566 | 2022-01-01 to 2022-12-31 |
| 2023 | 23,841 | 23,841 | 2023-01-01 to 2023-12-31 |
| 2024 | 23,952 | 23,952 | 2024-01-01 to 2024-12-31 |
| 2025 | 23,715 | 23,715 | 2025-01-01 to 2025-12-31 |
| 2026 | 21,433 | 17,454 | 2026-01-01 to 2026-10-12 |
| **Total** | **195,054** | **170,022** | 2019-01-01 to 2026-10-12 |

## Issues found and how they are handled

- **Empty rows:** 21,052 rows in 2019 and 3,979 in 2026 are empty in every column. One 2020 row has no valid date. All are dropped.
- **Different date formats by file:** 2019 and 2026 use day/month/year text, 2020 to 2023 use month/day/year text, and 2024 and 2025 use Excel serial numbers. Each file is parsed with its own rule; a single rule scrambles dates.
- **Time of day:** text such as `0:05` in most files and a fraction of a day in 2024; both are converted to the hour.
- **Schema drift:** 19 columns in 2019 and 38 from 2020, with small spelling and spacing differences in names and categories. A mapping table in `code/harmonize_accidents.py` gives every column one canonical name.
- **No serious/minor injury split in 2019**, only total injured and deaths. The three-class target therefore uses deaths and total injured.
- **Repeated accident codes in 2023:** 1,641 codes appear more than once; 1,254 exact repeats are dropped for modelling, leaving 168,768 incidents.
- **Missing values:** the route name is about 13% missing overall (77% in 2024) and is not used. Road location is about 8% missing and accident type about 5%.
- **Coordinates** outside Thailand are set to missing.

## Severity target

Derived from casualty counts (the files have no ready-made severity field):

| Class | Rule | Incidents | Share |
| --- | --- | ---: | ---: |
| Fatal | at least one death | 19,437 | 11.4% |
| Injury | no death, at least one injured | 76,431 | 45.0% |
| Property damage only | no casualties | 74,154 | 43.6% |

The fatal share falls from 13.8% in 2019 to 9.9% in 2026.

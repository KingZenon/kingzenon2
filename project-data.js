/*
 * Edit this file when the team supplies data, results, and final materials.
 * Keep unknown values as null. Do not enter estimated record counts or scores.
 * See README.md for the exact update steps and file locations.
 */
window.PROJECT_DATA = {
  lastUpdated: "29 October 2026",

  // Edit team names and GitHub profiles here. Emails are not published (course rule: no personal data).
  team: [
  {
    "name": "Aung Ko Ko Minn",
    "github": "https://github.com/akkminn"
  },
  {
    "name": "Htoo Myat Htin Lynn",
    "github": "https://github.com/KingZenon"
  },
  {
    "name": "Thant Mg Mg Lwin",
    "github": "https://github.com/iYoon-Maiden"
  }
],

  data: {
  "status": "Locked on 29 October 2026 (audited 22 October)",
  "totalRecords": "170,022 dated incidents (195,054 rows in the files)",
  "dateRange": "1 January 2019 to 12 October 2026 (2026 is a partial year)",
  "targetDefinition": "Three classes from casualty counts: fatal (at least one death, 11.4%), injury (no death, at least one injured, 45.0%), property damage only (no casualties, 43.6%).",
  "cleaningSummary": "Merged eight yearly files. Removed 25,031 empty rows (21,052 in 2019, 3,979 in 2026) and one row with an invalid date. Parsed three different date formats per file, harmonised column names and category spacing, set coordinates outside Thailand to missing, and left out casualty columns from the features. For modelling, 1,254 repeated accident codes (2023) were dropped, leaving 168,768 incidents.",
  "years": [
    {
      "year": 2019,
      "records": "19,194",
      "dateRange": "2019-01-01 to 2019-12-31",
      "file": "accident2019.csv",
      "fileUrl": "https://datagov.mot.go.th/dataset/7e077ffd-dc4f-4dc6-a71c-0813726f3c12/resource/4d919e5b-aa06-4fe4-8a13-5571747a1254/download/accident2019.csv"
    },
    {
      "year": 2020,
      "records": "21,238",
      "dateRange": "2020-01-01 to 2020-12-31",
      "file": "accident2020.csv",
      "fileUrl": "https://datagov.mot.go.th/dataset/7e077ffd-dc4f-4dc6-a71c-0813726f3c12/resource/40476c7b-4194-4dc2-aba5-7326819ed071/download/accident2020.csv"
    },
    {
      "year": 2021,
      "records": "20,062",
      "dateRange": "2021-01-01 to 2021-12-31",
      "file": "accident2021.csv",
      "fileUrl": "https://datagov.mot.go.th/dataset/7e077ffd-dc4f-4dc6-a71c-0813726f3c12/resource/d0a8601a-3ee5-4ce8-8e9d-3dae3915dc30/download/accident2021.csv"
    },
    {
      "year": 2022,
      "records": "20,566",
      "dateRange": "2022-01-01 to 2022-12-31",
      "file": "accident2022.csv",
      "fileUrl": "https://datagov.mot.go.th/dataset/7e077ffd-dc4f-4dc6-a71c-0813726f3c12/resource/733b7874-bd5f-44b9-b271-650890b061f2/download/accident2022.csv"
    },
    {
      "year": 2023,
      "records": "23,841",
      "dateRange": "2023-01-01 to 2023-12-31",
      "file": "accident2023.csv",
      "fileUrl": "https://datagov.mot.go.th/dataset/7e077ffd-dc4f-4dc6-a71c-0813726f3c12/resource/661f2ead-1f28-4cd9-8a67-1bef76b33ef6/download/accident2023.csv"
    },
    {
      "year": 2024,
      "records": "23,952",
      "dateRange": "2024-01-01 to 2024-12-31",
      "file": "accident2024.csv",
      "fileUrl": "https://datagov.mot.go.th/dataset/7e077ffd-dc4f-4dc6-a71c-0813726f3c12/resource/83e9fae0-5f33-45e7-9a6d-6d5ad2060a08/download/accident2024.csv"
    },
    {
      "year": 2025,
      "records": "23,715",
      "dateRange": "2025-01-01 to 2025-12-31",
      "file": "accident2025.csv",
      "fileUrl": "https://datagov.mot.go.th/dataset/7e077ffd-dc4f-4dc6-a71c-0813726f3c12/resource/e1db5e93-2b70-4ee4-b6d7-7ead76d14a09/download/accident2025.csv"
    },
    {
      "year": 2026,
      "records": "17,454",
      "dateRange": "2026-01-01 to 2026-10-12 (partial year)",
      "file": "accident2026.csv",
      "fileUrl": "https://datagov.mot.go.th/dataset/7e077ffd-dc4f-4dc6-a71c-0813726f3c12/resource/4625b7aa-99a4-4dfb-9a0f-6402814d0f2c/download/accident2026.csv"
    }
  ],
  "columns": [
    {
      "original": "ปีที่เกิดเหตุ",
      "english": "Accident year",
      "note": "The accident date is used instead; year is not a model feature"
    },
    {
      "original": "วันที่เกิดเหตุ",
      "english": "Accident date",
      "note": "Three formats: day/month/year (2019, 2026), month/day/year (2020–2023), Excel serial number (2024–2025); parsed per file"
    },
    {
      "original": "เวลา",
      "english": "Accident time",
      "note": "Text such as 0:05, or a day fraction in 2024; converted to hour of day, with night flag"
    },
    {
      "original": "วันที่รายงาน / เวลาที่รายงาน",
      "english": "Report date and time",
      "note": "Not used as features"
    },
    {
      "original": "ACC_CODE",
      "english": "Accident code",
      "note": "2020–2025 only; 1,254 exact repeats in 2023 removed"
    },
    {
      "original": "หน่วยงาน",
      "english": "Responsible agency",
      "note": "Categorical feature"
    },
    {
      "original": "สายทาง",
      "english": "Route name",
      "note": "Not used: about 13% missing overall and 77% missing in 2024"
    },
    {
      "original": "KM / ก.ม.",
      "english": "Kilometre marker",
      "note": "Numeric feature"
    },
    {
      "original": "จังหวัด",
      "english": "Province",
      "note": "Categorical feature (about 1% missing)"
    },
    {
      "original": "รถคันที่ 1 / รถคันที่1",
      "english": "First vehicle type",
      "note": "Categorical feature; also defines the motorcycle subset"
    },
    {
      "original": "บริเวณที่เกิดเหตุ",
      "english": "Road location and geometry",
      "note": "Categorical feature (about 8% missing)"
    },
    {
      "original": "มูลเหตุสันนิษฐาน",
      "english": "Presumed cause",
      "note": "Categorical feature"
    },
    {
      "original": "ลักษณะการเกิดเหตุ / ลักษณะการเกิดอุบัติเหตุ",
      "english": "Accident type",
      "note": "Categorical feature (about 5% missing)"
    },
    {
      "original": "สภาพอากาศ",
      "english": "Weather",
      "note": "Categorical feature"
    },
    {
      "original": "LATITUDE / LONGITUDE",
      "english": "GPS coordinates",
      "note": "Values outside Thailand set to missing"
    },
    {
      "original": "รถที่เกิดเหตุ",
      "english": "Number of vehicles involved",
      "note": "Numeric feature"
    },
    {
      "original": "รถและคนที่เกิดเหตุ",
      "english": "Vehicles and persons involved",
      "note": "Numeric feature; absent in 2019"
    },
    {
      "original": "ผู้เสียชีวิต / จำนวนผู้เสียชีวิต",
      "english": "Deaths",
      "note": "Defines the fatal class; excluded from features"
    },
    {
      "original": "ผู้บาดเจ็บสาหัส / ผู้บาดเจ็บเล็กน้อย",
      "english": "Serious and minor injuries",
      "note": "Absent in 2019; excluded from features"
    },
    {
      "original": "รวมจำนวนผู้บาดเจ็บ",
      "english": "Total injured",
      "note": "Defines the injury class; excluded from features"
    }
  ]
},

  progress: [
  {
    "date": "29 October 2026",
    "title": "Public report updated with the locked dataset and data audit",
    "done": "Locked the dataset (eight files with sizes and SHA-256 hashes in a manifest) and added the data audit, severity target, the data preparation code with a reproduction guide, data access notes, related work, and a public copy of the proposal with student ID numbers removed.",
    "issue": "Model results are not published yet; they will be added at a later milestone.",
    "next": "Add imbalance handling (class weights, SMOTE, threshold tuning), temporal cross-validation to report mean ± standard deviation, the motorcycle-only comparison, then cross-country validation."
  },
  {
    "date": "26 October 2026",
    "title": "Public website published",
    "done": "Published the project website through GitHub Pages at https://kingzenon.github.io/research/ and checked that the page opens publicly.",
    "issue": "The research dataset, model results, and final deliverables are still awaiting team files.",
    "next": "Add the real data audit and measured findings when the team supplies the dataset."
  },
  {
    "date": "26 October 2026",
    "title": "Website structure prepared",
    "done": "Created the project page and update slots for the data audit, model results, figures, files, and references.",
    "issue": "The research dataset has not been supplied to this workspace.",
    "next": "Add the real files and verify counts, columns, dates, and the severity target."
  },
  {
    "date": "22 October 2026",
    "title": "First models trained (internal check)",
    "done": "Trained a first set of baseline models for three-class severity on 2019–2024 and checked them on 2025. Results are for internal use and are not published yet.",
    "issue": "Baselines use default settings, so they are only a starting point.",
    "next": "Add imbalance handling and tuning, then the motorcycle-only comparison."
  },
  {
    "date": "22 October 2026",
    "title": "Dataset downloaded and audited",
    "done": "Downloaded the eight yearly files (195,054 rows), removed empty rows, found three date formats and a schema change between 2019 and 2020, harmonised names and categories, and derived the three-class severity target (170,022 dated incidents).",
    "issue": "2019 has no serious/minor injury split, 2023 repeats 1,641 accident codes, and the route name is mostly missing in 2024.",
    "next": "Run baseline models on a temporal split."
  },
  {
    "date": "22 October 2026",
    "title": "Benchmark paper read",
    "done": "Read the full text of a 2025 Thai severity study (Mohamad et al.). It covers motorcycle accidents only (2015–2020, non-public data, about 24% fatal). Its best model, random forest, had accuracy 0.777 but fatal recall of only 0.198.",
    "issue": "Its data differ from ours, so results cannot be compared directly. Always predicting non-fatal would already score about 76% on its data, so accuracy alone says little.",
    "next": "Compare on a motorcycle-only subset of our data and report fatal-class recall, not accuracy alone."
  }
],

  results: {
  "status": "Not published yet",
  "summary": "Model results are not published yet. They will appear here at a later milestone.",
  "interpretation": "No experimental conclusions are reported yet.",
  "models": [],
  "figures": []
},

  files: [
  {
    "label": "Project proposal (public copy)",
    "path": "assets/Project-Proposal-Public.pdf",
    "type": "PDF"
  },
  {
    "label": "Kickoff slides",
    "path": "assets/Predicting Road Accident Severity.pdf",
    "type": "PDF"
  },
  {
    "label": "ICT324 course brief",
    "path": "assets/ICT324-ProjectInfo.pdf",
    "type": "PDF"
  },
  {
    "label": "Dataset source",
    "path": "https://data.go.th/en/dataset/gdpublish-roadaccident",
    "type": "LINK"
  },
  {
    "label": "Verified dataset or data access instructions",
    "path": "https://github.com/KingZenon/research/blob/main/analysis/DATA.md",
    "type": "DATA"
  },
  {
    "label": "Dataset lock manifest (file sizes and SHA-256 hashes)",
    "path": "analysis/data-manifest.csv",
    "type": "DATA"
  },
  {
    "label": "Analysis code and reproduction guide",
    "path": "https://github.com/KingZenon/research/tree/main/analysis",
    "type": "CODE"
  },
  {
    "label": "Final paper",
    "path": null,
    "type": "PDF"
  },
  {
    "label": "Final presentation",
    "path": null,
    "type": "SLIDES"
  }
],

  references: [
  {
    "citation": "Ministry of Transport. Road accidents on the Ministry of Transport road network (TRAMS). Open Government Data of Thailand.",
    "url": "https://data.go.th/en/dataset/gdpublish-roadaccident"
  },
  {
    "citation": "Mohamad, I., JomnonKwao, S., & Ratanavaraha, V. (2025). Machine learning predictive performance in road accident severity: A case study from Thailand. Results in Engineering, 26, 104833.",
    "url": "https://doi.org/10.1016/j.rineng.2025.104833"
  },
  {
    "citation": "Champahom, T., Se, C., Watcharamaisakul, F., Jomnonkwao, S., Karoonsoontawong, A., & Ratanavaraha, V. (2024). Tree-based approaches to understanding factors influencing crash severity across roadway classes: A Thailand case study. IATSS Research, 48.",
    "url": "https://doi.org/10.1016/j.iatssr.2024.09.001"
  },
  {
    "citation": "Uttra, S., Champahom, T., Jomnonkwao, S., Se, C., Wisutwattanasak, P., & Ratanavaraha, V. (2026). Exploring risk factors for crash severity during Thailand's holiday travel: Machine learning exploration compared to heterogeneity modeling. Future Transportation, 6(1), 39.",
    "url": "https://doi.org/10.3390/futuretransp6010039"
  },
  {
    "citation": "Phojaem, T., Se, C., Wisutwattanasak, P., Champahom, T., Jomnonkwao, S., & Ratanavaraha, V. (2026). Comparative injury-severity modeling on highway-speed motorways: Performance, interpretability, and policy implications. Case Studies on Transport Policy, 24.",
    "url": "https://doi.org/10.1016/j.cstp.2026.101826"
  }
]
    // Add at least 10 checked research references with complete citation and URL.
};

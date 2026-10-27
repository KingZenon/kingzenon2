/*
 * Edit this file when the team supplies data, results, and final materials.
 * Keep unknown values as null. Do not enter estimated record counts or scores.
 * See README.md for the exact update steps and file locations.
 */
window.PROJECT_DATA = {
  lastUpdated: "27 October 2026",

  // Edit team names, email addresses, and GitHub profiles here.
  team: [
    { name: "Aung Ko Ko Minn", email: "maungkokominn@gmail.com", github: "https://github.com/akkminn" },
    { name: "Htoo Myat Htin Lynn", email: "htoomyathtinlynn2001@gmail.com", github: "https://github.com/KingZenon" },
    { name: "Thant Mg Mg Lwin", email: "hehedd51@gmail.com", github: "https://github.com/iYoon-Maiden" }
  ],

  data: {
    status: "Awaiting team dataset",
    totalRecords: null,
    dateRange: null,
    targetDefinition: null,
    cleaningSummary: null,
    years: [
      { year: 2019, records: null, dateRange: null, file: null },
      { year: 2020, records: null, dateRange: null, file: null },
      { year: 2021, records: null, dateRange: null, file: null },
      { year: 2022, records: null, dateRange: null, file: null },
      { year: 2023, records: null, dateRange: null, file: null },
      { year: 2024, records: null, dateRange: null, file: null },
      { year: 2025, records: null, dateRange: null, file: null },
      { year: 2026, records: null, dateRange: null, file: null }
    ],
    columns: [
      // { original: "Thai column name", english: "Accident date", note: "Parsed as a date" }
    ]
  },

  progress: [
    {
      date: "26 October 2026",
      title: "Public website published",
      done: "Published the project website through GitHub Pages at https://kingzenon.github.io/research/ and checked that the page opens publicly.",
      issue: "The research dataset, model results, and final deliverables are still awaiting team files.",
      next: "Add the real data audit and measured findings when the team supplies the dataset."
    },
    {
      date: "26 October 2026",
      title: "Website structure prepared",
      done: "Created the project page and update slots for the data audit, model results, figures, files, and references.",
      issue: "The research dataset has not been supplied to this workspace.",
      next: "Add the real files and verify counts, columns, dates, and the severity target."
    }
  ],

  results: {
    status: "Awaiting measured results",
    summary: "Model scores will appear here after the supplied data is audited and experiments are run.",
    interpretation: "No experimental conclusions are reported yet.",
    models: [
      // { model: "Logistic regression", period: "2025–2026", recall: 0.0,
      //   precision: 0.0, f1: 0.0, prAuc: 0.0, macroF1: 0.0 }
    ],
    figures: [
      // { title: "Precision–recall curve", path: "assets/results/pr-curve.svg",
      //   alt: "Precision–recall curves for the evaluated models.", caption: "Temporal holdout" }
    ]
  },

  files: [
    { label: "Project proposal (public copy)", path: null, type: "PDF" },
    { label: "Kickoff slides", path: "assets/Predicting Road Accident Severity.pdf", type: "PDF" },
    { label: "ICT324 course brief", path: "assets/ICT324-ProjectInfo.pdf", type: "PDF" },
    { label: "Dataset source", path: "https://data.go.th/en/dataset/gdpublish-roadaccident", type: "LINK" },
    { label: "Verified dataset or data access instructions", path: null, type: "DATA" },
    { label: "Analysis code and reproduction guide", path: null, type: "CODE" },
    { label: "Final paper", path: null, type: "PDF" },
    { label: "Final presentation", path: null, type: "SLIDES" }
  ],

  references: [
    {
      citation: "Ministry of Transport. Road accidents on the Ministry of Transport road network (TRAMS). Open Government Data of Thailand.",
      url: "https://data.go.th/en/dataset/gdpublish-roadaccident"
    }
    // Add at least 10 checked research references with complete citation and URL.
  ]
};

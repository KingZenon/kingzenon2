# ICT324 road accident severity website

This is a static project website. Open `index.html` directly, or run `python -m http.server 8000` in this folder and visit `http://localhost:8000/`. No build step or online CSS library is required.

The page is ready for the team's real research files. Unknown counts and scores remain visibly pending. **Do not enter estimated values.**

## Where to put new materials

| Material | Location | Page update |
| --- | --- | --- |
| Real TRAMS CSV/XLSX files for analysis | `incoming-data/` | Record audited values in `project-data.js`. Do not publish the raw folder unless redistribution is allowed and privacy has been checked. |
| Charts and figures | `assets/results/` | Add an entry to `results.figures` with title, path, alt text, and caption. |
| Final paper PDF | `assets/deliverables/` | Set the **Final paper** path in `files`. |
| Final slides PDF or PPTX | `assets/deliverables/` | Set the **Final presentation** path in `files`. |
| Analysis code and reproduction guide | `analysis/` | Set the **Analysis code and reproduction guide** path in `files`; link to a README or archive. |
| Public dataset or access instructions | Publisher URL or an approved public file | Set the **Verified dataset or data access instructions** path in `files`. |

The kickoff slides and course brief are linked already. The original proposal PDF contains student ID numbers, so it is excluded from the public site until a public copy is prepared. Add files first, then update their paths in `project-data.js`. Paths are relative to `index.html`.

## Update the research content

All changeable project content lives in `project-data.js`:

1. Set `data.totalRecords`, `dateRange`, `targetDefinition`, `cleaningSummary`, and each audited year. Add the real Thai column names, English labels, and cleaning notes to `data.columns`.
2. Add a dated `progress` entry describing work completed, issues, and next action. Set `lastUpdated` to the newest actual update date.
3. Enter measured model scores in `results.models`. Each row needs the model name, test period, fatal recall, fatal precision, fatal F1, PR-AUC, and macro F1. Keep cross-validation mean ± standard deviation and held-out results clearly distinguished in the summary or separate rows.
4. Add figures and a plain-language interpretation, including limitations. Set `results.status` only when results are actually measured.
5. Add verified references with full citation details and URLs. The course requires at least 10 recent research references in the final paper. The dataset source is already listed.
6. Set each pending `files[].path` after placing the file. A `null` path stays visibly marked **Awaiting file**.

## Before publishing each milestone

- Run `node --check script.js` and `node --check project-data.js`.
- Run `node check-site.js` to check page targets and configured local file paths.
- Preview on desktop and phone sizes.
- Open the public URL in a signed-out browser to confirm it works without login.
- Submit the public URL on Google Classroom when ready. Hosting and submission require the team's chosen account and are not configured in this folder.

The website code is split by purpose: `index.html` contains page structure, `styles.css` contains layout and responsive rules, `project-data.js` contains research content, and `script.js` renders the content and controls the mobile menu.


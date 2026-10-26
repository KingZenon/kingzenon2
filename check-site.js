const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = __dirname;
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "project-data.js"), "utf8"), context);

const project = context.window.PROJECT_DATA;
const problems = [];
const localPaths = [
  "styles.css",
  "script.js",
  "project-data.js",
  ...project.files.map(item => item.path).filter(Boolean),
  ...project.results.figures.map(item => item.path)
];

for (const item of localPaths) {
  if (/^https?:\/\//.test(item)) continue;
  if (path.isAbsolute(item) || item.includes("..")) {
    problems.push(`Unsafe local path: ${item}`);
  } else if (!fs.existsSync(path.join(root, item))) {
    problems.push(`Missing local file: ${item}`);
  }
}

const requiredIds = [
  "last-updated", "data-status", "data-facts", "data-note",
  "year-rows", "column-rows", "progress-entries", "results-status",
  "results-summary", "model-rows", "result-figures",
  "results-interpretation", "file-list", "reference-list"
];
for (const id of requiredIds) {
  if (!html.includes(`id="${id}"`)) problems.push(`Missing page target: ${id}`);
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Site structure and configured local file paths are valid.");
}

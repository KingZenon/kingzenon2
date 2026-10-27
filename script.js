const project = window.PROJECT_DATA;
const byId = id => document.getElementById(id);

function addText(parent, tagName, value, className = "") {
  const element = document.createElement(tagName);
  element.textContent = value;
  if (className) element.className = className;
  parent.appendChild(element);
  return element;
}

function showValue(value) {
  return value === null || value === undefined || value === "" ? "Awaiting data" : String(value);
}

function addCells(row, values) {
  values.forEach(value => addText(row, "td", showValue(value)));
}

function renderData() {
  const data = project.data;
  byId("last-updated").textContent = project.lastUpdated;
  byId("data-status").textContent = data.status;
  byId("data-note").textContent = data.cleaningSummary || "Cleaning decisions will be recorded after the real files are inspected.";

  const facts = [
    ["Total records", data.totalRecords],
    ["Date coverage", data.dateRange],
    ["Severity target", data.targetDefinition]
  ];
  facts.forEach(([label, value]) => {
    addText(byId("data-facts"), "dt", label);
    addText(byId("data-facts"), "dd", showValue(value));
  });

  data.years.forEach(item => {
    const row = document.createElement("tr");
    addCells(row, [item.year, item.records, item.dateRange, item.file]);
    byId("year-rows").appendChild(row);
  });

  if (data.columns.length === 0) {
    const row = document.createElement("tr");
    const cell = addText(row, "td", "Column names will be added after the dataset is inspected.");
    cell.colSpan = 3;
    byId("column-rows").appendChild(row);
  } else {
    data.columns.forEach(item => {
      const row = document.createElement("tr");
      addCells(row, [item.original, item.english, item.note]);
      byId("column-rows").appendChild(row);
    });
  }
}

function renderProgress() {
  project.progress.forEach(item => {
    const entry = document.createElement("article");
    entry.className = "timeline-entry";
    addText(entry, "time", item.date, "timeline-date");
    addText(entry, "h3", item.title);
    [["Done", item.done], ["Issue", item.issue], ["Next", item.next]].forEach(([label, value]) => {
      if (!value) return;
      const line = document.createElement("p");
      addText(line, "strong", label + ": ");
      line.append(document.createTextNode(value));
      entry.appendChild(line);
    });
    byId("progress-entries").appendChild(entry);
  });
}

function formatScore(value) {
  return typeof value === "number" ? value.toFixed(3) : showValue(value);
}

function renderResults() {
  const results = project.results;
  byId("results-status").textContent = results.status;
  byId("results-summary").textContent = results.summary;
  byId("results-interpretation").textContent = results.interpretation;

  if (results.models.length === 0) {
    const row = document.createElement("tr");
    const cell = addText(row, "td", "No measured model results have been supplied.");
    cell.colSpan = 7;
    byId("model-rows").appendChild(row);
  } else {
    results.models.forEach(item => {
      const row = document.createElement("tr");
      addCells(row, [
        item.model, item.period, formatScore(item.recall),
        formatScore(item.precision), formatScore(item.f1),
        formatScore(item.prAuc), formatScore(item.macroF1)
      ]);
      byId("model-rows").appendChild(row);
    });
  }

  if (results.figures.length === 0) {
    addText(byId("result-figures"), "p", "Figures will appear here when measured outputs are added.", "empty-note");
  } else {
    results.figures.forEach(item => {
      const figure = document.createElement("figure");
      figure.className = "card figure-card";
      addText(figure, "h3", item.title);
      const image = document.createElement("img");
      image.src = item.path;
      image.alt = item.alt;
      image.loading = "lazy";
      figure.appendChild(image);
      addText(figure, "figcaption", item.caption || "");
      byId("result-figures").appendChild(figure);
    });
  }
}

function renderFiles() {
  project.files.forEach(item => {
    const row = document.createElement(item.path ? "a" : "div");
    row.className = "file-row" + (item.path ? "" : " pending");
    if (item.path) {
      row.href = item.path;
      if (/^https?:\/\//.test(item.path)) {
        row.target = "_blank";
        row.rel = "noopener noreferrer";
      }
    }
    addText(row, "span", item.type, "file-type");
    addText(row, "span", item.label);
    addText(row, "span", item.path ? "↗" : "Awaiting file", "file-state");
    byId("file-list").appendChild(row);
  });

  project.references.forEach(item => {
    const entry = document.createElement("li");
    if (item.url) {
      const link = document.createElement("a");
      link.href = item.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = item.citation;
      entry.appendChild(link);
    } else {
      entry.textContent = item.citation;
    }
    byId("reference-list").appendChild(entry);
  });
}

function renderTeam() {
  byId("team-names").textContent = project.team.map(member => member.name).join(" · ");
  project.team.forEach(member => {
    const card = document.createElement("article");
    card.className = "card team-card";
    addText(card, "h3", member.name);
    if (member.github && /^https:\/\/github\.com\/[A-Za-z0-9-]+\/?$/.test(member.github)) {
      const link = addText(card, "a", "GitHub profile ↗");
      link.href = member.github;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", `${member.name} on GitHub`);
    } else {
      addText(card, "p", "Demo profile · add GitHub link later", "team-pending");
    }
    byId("team-members").appendChild(card);
  });
}

function setupNavigation() {
  const button = document.querySelector(".menu-toggle");
  const links = byId("nav-links");

  function closeMenu() {
    links.classList.remove("open");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Open navigation");
  }

  button.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  links.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });
}

renderData();
renderProgress();
renderResults();
renderFiles();
renderTeam();
setupNavigation();

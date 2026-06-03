const langButtons = document.querySelectorAll("[data-lang]");

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const mode = button.dataset.lang;
    document.body.classList.toggle("lang-zh", mode === "zh");
    document.body.classList.toggle("lang-en", mode === "en");
    langButtons.forEach((item) => item.classList.toggle("active", item === button));
  });
});

const checklistRoot = document.querySelector("#checklistRoot");
const checklistKey = "dive-refresh-checklist";

function readChecklistState() {
  try {
    return JSON.parse(localStorage.getItem(checklistKey)) || {};
  } catch {
    return {};
  }
}

function writeChecklistState(state) {
  localStorage.setItem(checklistKey, JSON.stringify(state));
}

function inputId(input) {
  const panel = input.closest("[data-list]");
  const labels = Array.from(panel.querySelectorAll("input"));
  return `${panel.dataset.list}-${labels.indexOf(input)}`;
}

if (checklistRoot) {
  const state = readChecklistState();
  checklistRoot.querySelectorAll("input[type='checkbox']").forEach((input) => {
    input.checked = Boolean(state[inputId(input)]);
    input.addEventListener("change", () => {
      const nextState = readChecklistState();
      nextState[inputId(input)] = input.checked;
      writeChecklistState(nextState);
    });
  });
}

document.querySelector("#resetChecklist")?.addEventListener("click", () => {
  localStorage.removeItem(checklistKey);
  checklistRoot?.querySelectorAll("input[type='checkbox']").forEach((input) => {
    input.checked = false;
  });
});

document.querySelectorAll("a[href^='http']").forEach((link) => {
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

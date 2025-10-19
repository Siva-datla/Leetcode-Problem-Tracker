const topicInput = document.getElementById("topic");
const problemInput = document.getElementById("problem");
const difficultyInput = document.getElementById("difficulty");
const statusInput = document.getElementById("status");
const linkInput = document.getElementById("link");
const addBtn = document.getElementById("addBtn");
const tableBody = document.querySelector("#problemTable tbody");
const themeToggle = document.getElementById("themeToggle");

let problems = JSON.parse(localStorage.getItem("problems")) || [];
let darkMode = JSON.parse(localStorage.getItem("darkMode")) ?? true;

function saveProblems() {
  localStorage.setItem("problems", JSON.stringify(problems));
}

function renderTable() {
  tableBody.innerHTML = "";
  problems.forEach((p, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${p.topic}</td>
      <td>${p.problem}</td>
      <td>${p.difficulty}</td>
      <td data-status="${p.status}">${p.status}</td>
      <td><a href="${p.link}" target="_blank">View</a></td>
      <td>
        <button class="edit" onclick="editProblem(${index})">Edit</button>
        <button class="delete" onclick="deleteProblem(${index})">Delete</button>
      </td>`;
    tableBody.appendChild(row);
  });
}

function addProblem() {
  const topic = topicInput.value.trim();
  const problem = problemInput.value.trim();
  const difficulty = difficultyInput.value;
  const status = statusInput.value;
  const link = linkInput.value.trim();

  if (!topic || !problem) {
    alert("Topic and Problem name are required!");
    return;
  }

  problems.push({ topic, problem, difficulty, status, link });
  saveProblems();
  renderTable();
  clearInputs();
}

function deleteProblem(index) {
  if (confirm("Delete this problem?")) {
    problems.splice(index, 1);
    saveProblems();
    renderTable();
  }
}

function editProblem(index) {
  const p = problems[index];
  topicInput.value = p.topic;
  problemInput.value = p.problem;
  difficultyInput.value = p.difficulty;
  statusInput.value = p.status;
  linkInput.value = p.link;

  addBtn.textContent = "Update Problem";
  addBtn.onclick = () => {
    problems[index] = {
      topic: topicInput.value.trim(),
      problem: problemInput.value.trim(),
      difficulty: difficultyInput.value,
      status: statusInput.value,
      link: linkInput.value.trim(),
    };
    saveProblems();
    renderTable();
    resetButton();
  };
}

function resetButton() {
  addBtn.textContent = "Add Problem";
  addBtn.onclick = addProblem;
  clearInputs();
}

function clearInputs() {
  topicInput.value = "";
  problemInput.value = "";
  linkInput.value = "";
}


function setTheme(dark) {
  document.body.classList.toggle("light", !dark);
  themeToggle.textContent = dark ? "🌙" : "☀️";
  localStorage.setItem("darkMode", JSON.stringify(dark));
  darkMode = dark;
}

themeToggle.addEventListener("click", () => setTheme(!darkMode));


addBtn.onclick = addProblem;
setTheme(darkMode);
renderTable();

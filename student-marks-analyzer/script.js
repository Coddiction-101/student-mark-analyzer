// ------------------- ARRAY STORAGE -------------------
const marks = [];

// ------------------- DOM REFERENCES -------------------
const marksInput = document.getElementById("marksInput");
const addBtn = document.getElementById("addBtn");
const marksList = document.getElementById("marksList");
const msg = document.getElementById("msg");
const clearAllBtn = document.getElementById("clearAllBtn");

// ------------------- UTILITIES -------------------
function showMessage(text, isError = true) {
    msg.textContent = text;
    msg.style.color = isError ? "#b43b3b" : "#207a3a";

    if (text) {
        setTimeout(() => {
            msg.textContent = "";
        }, 2500);
    }
}

function isValidMark(value) {
    if (value === "" || value === null || Number.isNaN(Number(value))) return false;
    const n = Number(value);
    return n >= 0 && n <= 100;
}

// ------------------- CORE LOGIC -------------------
function addMarksFromInput() {
    const raw = marksInput.value.trim();

    if (!isValidMark(raw)) {
        showMessage("Enter valid marks between 0 and 100.");
        return;
    }

    const num = Number(raw);
    marks.push(num);
    marksInput.value = "";
    renderMarks();
    showMessage("Added Successfully!", false);
}

// ------------------- RENDER MARKS LIST -------------------
function renderMarks() {
    if (marks.length === 0) {
        marksList.innerHTML = `<p class="empty">No marks added yet. Add one to begin!</p>`;
        return;
    }

    marksList.innerHTML = "";

    marks.forEach((m, idx) => {
        const div = document.createElement("div");
        div.className = "mark-item";

        const left = document.createElement("div");
        left.textContent = `${idx + 1}. ${m}`;

        const right = document.createElement("div");
        right.className = "actions";

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.title = "Delete this mark";
        delBtn.addEventListener("click", () => deleteMarkAt(idx));

        right.appendChild(delBtn);
        div.appendChild(left);
        div.appendChild(right);

        marksList.appendChild(div);
    });
}

// ------------------- DELETE ONE MARK -------------------
function deleteMarkAt(index) {
    if (index < 0 || index >= marks.length) return;

    marks.splice(index, 1);
    renderMarks();
    showMessage("Deleted Successfully!", false);
}

// ------------------- CLEAR ALL MARKS -------------------
function clearAllMarks() {
    if (marks.length === 0) {
        showMessage("Nothing to clear.");
        return;
    }

    const ok = confirm("Clear all marks? This cannot be undone.");
    if (!ok) return;

    marks.length = 0;
    renderMarks();
    showMessage("All Cleared!", false);
}

// ------------------- EVENT LISTENERS -------------------
addBtn.addEventListener("click", addMarksFromInput);

marksInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addMarksFromInput();
});

clearAllBtn.addEventListener("click", clearAllMarks);

// initial load
renderMarks();

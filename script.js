document.getElementById("currentDate").textContent = new Date().toLocaleDateString();

let tasks = [];
let currentId = 1;

document.getElementById("todoForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const description = document.getElementById("description").value.trim();
  const targetDateInput = document.getElementById("targetDate");
  const status = document.getElementById("status").value;

  const targetDate = new Date(targetDateInput.value);
  const now = new Date();

  // Trimming seconds & milliseconds for more accurate validation
  now.setSeconds(0, 0);

  if (!description) {
    alert("Please enter a task description.");
    return;
  }

  if (isNaN(targetDate.getTime())) {
    alert("Please enter a valid target date and time.");
    return;
  }

  if (targetDate <= now) {
    alert("Please choose a future date and time.");
    return;
  }

  if (currentId > 100) {
    alert("Maximum of 100 tasks reached.");
    return;
  }

  const task = {
    id: currentId++,
    description,
    targetDate: targetDate.toLocaleString(),
    status
  };

  tasks.push(task);
  updateTable();
  this.reset();
});

function updateTable() {
  const tbody = document.querySelector("#todoTable tbody");
  tbody.innerHTML = "";

  tasks.forEach((task, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
  <td>${task.id}</td>
  <td>${task.description}</td>
  <td>${task.targetDate}</td>
  <td>
    <select onchange="updateStatus(${index}, this.value)" ${task.status === "Completed" ? "disabled" : ""}>
      <option ${task.status === "Pending" ? "selected" : ""}>Pending</option>
      <option ${task.status === "In Progress" ? "selected" : ""}>In Progress</option>
      <option ${task.status === "Completed" ? "selected" : ""}>Completed</option>
    </select>
  </td>
  <td>
    <button onclick="deleteTask(${index})">Delete</button>
  </td>

    `;

    tbody.appendChild(row);
  });
}

function updateStatus(index, newStatus) {
  tasks[index].status = newStatus;
  updateTable();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  updateTable();
}

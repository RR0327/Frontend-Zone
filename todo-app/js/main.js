function addTask() {
    const input = document.getElementById("taskInput");
    const task = input.value.trim();
    if (!task) return;

    // Add to task list (optional visual section)
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between align-items-center";
    listItem.textContent = task;
    document.getElementById("taskList").appendChild(listItem);

    // Add to task summary table
    const table = document.getElementById("taskTableBody");
    const row = table.insertRow();
    row.insertCell(0).textContent = table.rows.length;
    row.insertCell(1).textContent = task;

    // Create status selector
    const statusCell = row.insertCell(2);
    const select = document.createElement("select");
    select.className = "status-select pending";

    const options = [
        { text: "Not Started", value: "not-started" },
        { text: "Pending", value: "pending" },
        { text: "In Progress", value: "in-progress" },
        { text: "On Hold", value: "on-hold" },
        { text: "Completed", value: "completed" }
    ];

    options.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt.value;
        option.textContent = opt.text;
        select.appendChild(option);
    });

    select.value = "pending";

    // Create delete button (hidden by default)
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "btn btn-sm btn-danger ms-2 d-none";
    deleteBtn.onclick = function () {
        table.deleteRow(row.rowIndex - 1);
    };

    // Show delete button only if status is "completed"
    select.onchange = function () {
        select.className = "status-select " + select.value;
        deleteBtn.classList.toggle("d-none", select.value !== "completed");
    };

    // Wrap both dropdown and button together
    const wrapper = document.createElement("div");
    wrapper.className = "d-flex align-items-center";
    wrapper.appendChild(select);
    wrapper.appendChild(deleteBtn);

    statusCell.appendChild(wrapper);

    input.value = "";
}

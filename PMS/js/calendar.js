// DASHBOARD CALENDAR
function initDashboardCalendar() {
    const monthYear = document.getElementById('monthYear');
    const calendarDays = document.getElementById('calendarDays');
    const prevMonth = document.getElementById('prevMonth');
    const nextMonth = document.getElementById('nextMonth');
    let currentDate = new Date();

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        // Set the month and year header
        monthYear.innerText = currentDate.toLocaleString('default', { month: 'long' }) + ' ' + year;
        
        // Clear previous days
        calendarDays.innerHTML = '';
        
        // Get the first day and total days in the month
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const totalDays = lastDayOfMonth.getDate();
        
        // Get the starting day of the week
        const startingDay = firstDayOfMonth.getDay();
        
        // Fill in empty days
        for (let i = 0; i < startingDay; i++) {
            calendarDays.innerHTML += '<li></li>';
        }
        
        // Fill in the days of the month
        for (let day = 1; day <= totalDays; day++) {
            const isToday = (day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear());
            calendarDays.innerHTML += `<li class="${isToday ? 'today' : ''}">${day}</li>`;
        }
    }

    // Event listeners for navigation
    prevMonth.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonth.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar(); // Initial render
}

// Call the function to initialize the dashboard calendar
initDashboardCalendar();



// SECTION CALENDAR
let selectedDates = [];
let selectedDate;
let tasks = {}; // Store tasks persistently

function initSectionCalendar() {
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];

    function loadCalendar(month, year) {
        document.getElementById("month-year").innerText = `${monthNames[month]} ${year}`;
        document.getElementById("big-month-year").innerText = `${monthNames[month]} ${year}`;
        
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = 32 - new Date(year, month, 32).getDate();

        const miniCalendar = document.getElementById("mini-calendar");
        miniCalendar.innerHTML = "";

        for (let i = 0; i < firstDay; i++) {
            miniCalendar.innerHTML += `<div></div>`;
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(Date.UTC(year, month, day)); // Use UTC to prevent timezone shifts
            const isoDate = date.toISOString().slice(0, 10); // Format as YYYY-MM-DD
            const isPastDate = date < getCurrentDateInPhilippines() && !isSameDate(date, getCurrentDateInPhilippines());

            miniCalendar.innerHTML += `<div class="${isPastDate ? 'disabled' : ''}" onclick="selectDate('${isoDate}', this, ${isPastDate})">${day}</div>`;
        }

        const largeCalendar = document.getElementById("large-calendar");
        largeCalendar.innerHTML = miniCalendar.innerHTML;

        // Highlight tasks in the large calendar
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(Date.UTC(year, month, day)).toISOString().slice(0, 10);
            if (tasks[date]) {
                tasks[date].forEach(task => highlightDateInCalendar(date, task.category, task.title, task.category));
            }
        }

        // Highlight the current date in the mini calendar
        highlightCurrentDate(month, year);
    }

    // Select a date (used for task management in the big calendar)
    window.selectDate = function(date, element, isPastDate) {
        if (isPastDate) return; // Prevent selecting past dates

        selectedDate = date;
        selectedDates.push(date);
        element.classList.toggle('selected');
        openTaskModal();
        document.getElementById('task-date').value = date;
    }

    // Open the task modal
    function openTaskModal() {
        document.getElementById('task-modal').style.display = 'flex';
        document.querySelector('.bx-x').onclick = closeTaskModal;
    }

    // Close the task modal
    function closeTaskModal() {
        document.getElementById('task-modal').style.display = 'none';
        resetTaskForm();
    }

    // Add task to selected date
    document.getElementById('add-task-btn').onclick = function() {
        const title = document.getElementById('task-title').value.trim();
        const desc = document.getElementById('task-desc').value.trim();
        const time = document.getElementById('task-time').value;
        const category = document.getElementById('task-category').value;

        if (!title || !category || !selectedDate) {
            closeTaskModal();
            return;
        }

        if (!tasks[selectedDate]) {
            tasks[selectedDate] = [];
        }
        tasks[selectedDate].push({ title, desc, time, category });
        highlightDateInCalendar(selectedDate, category, title, category); // Added color

        addTaskToList(title, formatTime(time), selectedDate, category);

        closeTaskModal();
    };

    // Highlight dates in the calendar and add task titles for large calendar
    function highlightDateInCalendar(date, category, title, color) {
        const dateElements = document.querySelectorAll('#large-calendar div');
        const selectedDay = new Date(date).getUTCDate(); // Get day in UTC format

        dateElements.forEach(element => {
            const dayText = element.innerText;
            if (parseInt(dayText) === selectedDay) {
                element.classList.add(category);
                
                // Apply the background color to the selected date cell
                element.style.backgroundColor = color;
                element.style.color = "#fff"; // Ensure text is readable when background is applied

                // Add title to large calendar
                if (element.parentElement.id === "large-calendar") {
                    element.style.borderRadius = "10%";
                    element.innerHTML = `<span>${dayText}</span><br><span class="task-title">${title}</span>`;
                }
            }
        });
    }

    // Add task to the task list (task modal)
    function addTaskToList(title, time, date, category) {
        const taskList = document.querySelector('.taskss ul');
        const li = document.createElement('li');
        
        const colorClass = category === 'personal' ? 'green' : category === 'work' ? 'blue' : 'red';
        
        li.innerHTML = `
            <span class="task-color" style="display:inline-block; width:10px; height:10px; border-radius:50%; background-color:${colorClass}; margin-right:5px;"></span>
            ${title} - ${time} on ${date} 
        `;
        taskList.appendChild(li);
    }

    // Format time to AM/PM
    function formatTime(timeString) {
        const date = new Date(`1970-01-01T${timeString}`);
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return date.toLocaleString('en-US', options);
    }

    // Reset the task form
    function resetTaskForm() {
        document.getElementById('task-title').value = '';
        document.getElementById('task-desc').value = '';
        document.getElementById('task-time').value = '';
        document.getElementById('task-category').value = 'personal';
        selectedDates = [];
        selectedDate = null;
    }

    // Utility function to get current date in Philippines timezone
    function getCurrentDateInPhilippines() {
        return new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" }));
    }

    // Check if two dates are the same day (ignoring time)
    function isSameDate(date1, date2) {
        return date1.getUTCFullYear() === date2.getUTCFullYear() &&
               date1.getUTCMonth() === date2.getUTCMonth() &&
               date1.getUTCDate() === date2.getUTCDate();
    }

    // Highlight current date in the mini calendar
    function highlightCurrentDate(month, year) {
        const miniCalendarElements = document.querySelectorAll("#mini-calendar div");
        const currentDate = getCurrentDateInPhilippines();
        const currentDay = currentDate.getUTCDate();
        const currentMonth = currentDate.getUTCMonth();
        const currentYear = currentDate.getUTCFullYear();

        // Highlight the current day only if it matches the current month and year
        if (month === currentMonth && year === currentYear) {
            miniCalendarElements.forEach(element => {
                if (parseInt(element.innerText) === currentDay) {
                    // Highlight current date
                    element.style.backgroundColor = 'lightblue';
                    element.style.fontWeight = 'bold';
                }
            });
        }
    }

    function prevMonth() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        loadCalendar(currentMonth, currentYear);
    }

    function nextMonth() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        loadCalendar(currentMonth, currentYear);
    }

    document.querySelector(".small-calendar button:nth-child(1)").addEventListener("click", prevMonth);
    document.querySelector(".small-calendar button:nth-child(3)").addEventListener("click", nextMonth);

    loadCalendar(currentMonth, currentYear);
}

initSectionCalendar();




// PROJ-TASK MODAL
document.addEventListener("DOMContentLoaded", function () {
    const taskModal = document.getElementById("p-task-modal");
    const newTaskBtn = document.querySelector(".new-task-btn");
    const saveTaskBtn = document.querySelector(".p-save-task-btn");
    const tasksSection = document.getElementById("tasks-section");
    const colorOptions = document.querySelectorAll(".p-color-option");
    let selectedTaskColor = "#ffffff"; // Default color

    // Open the task modal
    newTaskBtn.addEventListener("click", function () {
        taskModal.style.display = "flex";
    });

    // Select color option
    colorOptions.forEach(function (colorOption) {
        colorOption.addEventListener("click", function () {
            colorOptions.forEach(function (opt) {
                opt.classList.remove("selected");
            });
            colorOption.classList.add("selected");
            selectedTaskColor = colorOption.getAttribute("data-color");
        });
    });

    // Save task
    saveTaskBtn.addEventListener("click", (event) => {
        event.preventDefault();

        const taskTitle = document.getElementById("p-task-title").value;
        const assignedTo = document.getElementById("assigned-to").value;
        const dueDate = document.getElementById("due-date").value;
        const category = selectedTaskColor || "#e6e6e6";

        if (!taskTitle) {
            alert("Please provide a task title.");
            return;
        }

        // Create task card
        const newTask = document.createElement("div");
        newTask.classList.add("proj-task");
        newTask.style.backgroundColor = category;

        const checkCircle = document.createElement("span");
        checkCircle.classList.add("check-circle");
        checkCircle.onclick = function () { toggleCheck(this); };

        const taskInfo = document.createElement("div");
        taskInfo.classList.add("proj-task-info");

        const titleSpan = document.createElement("span");
        titleSpan.classList.add("proj-task-title");
        titleSpan.textContent = taskTitle || "Untitled Task";

        const assignedSpan = document.createElement("span");
        assignedSpan.classList.add("proj-task-subtitle");
        assignedSpan.textContent = assignedTo ? `Assigned to: ${assignedTo}` : "Unassigned";

        const iconContainer = document.createElement("div");
        iconContainer.classList.add("proj-icon");

        const dot1 = document.createElement("span");
        dot1.classList.add("dott");
        const dot2 = document.createElement("span");
        dot2.classList.add("dott");

        // Append elements
        taskInfo.appendChild(titleSpan);
        taskInfo.appendChild(assignedSpan);
        iconContainer.appendChild(dot1);
        iconContainer.appendChild(dot2);

        newTask.appendChild(checkCircle);
        newTask.appendChild(taskInfo);
        newTask.appendChild(iconContainer);

        tasksSection.appendChild(newTask);

        // Reset form and close modal
        document.getElementById("p-task-form").reset();
        colorOptions.forEach(opt => opt.classList.remove("selected"));
        taskModal.style.display = "none";

        // If a due date is provided, associate the task with the due date
        if (dueDate) {
            if (!tasks[dueDate]) {
                tasks[dueDate] = [];
            }
            tasks[dueDate].push({
                title: taskTitle,
                assignedTo,
                category
            });

            addTaskToList(taskTitle, assignedTo ? assignedTo : "No time specified", dueDate, category);

            highlightDateInCalendar(dueDate, category, taskTitle, category);
        }
    });
});





// SELECT FILE IN MESSAGES
const fileDisplay = document.getElementById('fileDisplay');
const fileInput = document.getElementById('fileInput');
const messageInput = document.getElementById('messageInput');

// Arrays to store selected images and other files
let selectedImages = [];
let selectedFiles = [];

// Function to handle file selection
function handleFileSelect(event) {
    const files = Array.from(event.target.files);
    
    // Loop through selected files
    files.forEach(file => {
        const isImage = file.type.startsWith("image/");
        const isDocument = file.type === "application/pdf" || file.type.includes("word") || file.type.includes("excel");

        // Handle image files
        if (isImage && selectedImages.length < 10) {
            selectedImages.push(file);
        } 
        // Handle document files
        else if (isDocument && selectedFiles.length < 5) {
            selectedFiles.push(file);
        }
    });

    updateFileDisplay();
}

// Function to update the file display
function updateFileDisplay() {
    fileDisplay.innerHTML = ''; // Clear previous display

    // Show images
    const totalFiles = [...selectedImages, ...selectedFiles];
    const displayedFiles = totalFiles.length;

    // Show up to 2 files initially
    const maxDisplay = 2;

    selectedImages.slice(0, maxDisplay).forEach((file, index) => {
        const fileURL = URL.createObjectURL(file);
        fileDisplay.innerHTML += `
            <div class="file-item">
                <a href="${fileURL}" target="_blank" class="file-link">
                    <i class="bx bx-image file-icon"></i>
                    <span class="file-name">${file.name}</span>
                </a>
                <i class="bx bx-x clear-file" onclick="removeFile(${index}, 'image')"></i>
            </div>
        `;
    });

    selectedFiles.slice(0, maxDisplay).forEach((file, index) => {
        const fileURL = URL.createObjectURL(file);
        let iconClass = "bx bx-file"; // Default icon

        // Determine the icon based on file type
        if (file.type === "application/pdf") {
            iconClass = "bx bx-file-pdf";
        } else if (file.type.includes("word")) {
            iconClass = "bx bx-file-doc";
        } else if (file.type.includes("excel")) {
            iconClass = "bx bx-file-excel";
        }

        fileDisplay.innerHTML += `
            <div class="file-item">
                <a href="${fileURL}" target="_blank" class="file-link">
                    <i class="${iconClass} file-icon"></i>
                    <span class="file-name">${file.name}</span>
                </a>
                <i class="bx bx-x clear-file" onclick="removeFile(${index}, 'file')"></i>
            </div>
        `;
    });

    // Add "See More" button if there are more than 2 files
    if (displayedFiles > maxDisplay) {
        fileDisplay.innerHTML += `<button class="see-more-btn" onclick="toggleSeeMore()">See More</button>`;
    }

    // Show the fileDisplay container if there are any files selected
    fileDisplay.style.display = (selectedImages.length || selectedFiles.length) ? 'flex' : 'none';
}

// Function to toggle the visibility of all selected files
function toggleSeeMore() {
    const totalFiles = [...selectedImages, ...selectedFiles];
    fileDisplay.innerHTML = ''; // Clear previous display

    // Show all files
    totalFiles.forEach((file, index) => {
        const fileURL = URL.createObjectURL(file);
        let iconClass = "bx bx-file"; // Default icon

        // Determine the icon based on file type
        if (file.type.startsWith("image/")) {
            iconClass = "bx bx-image";
            fileDisplay.innerHTML += `
                <div class="file-item">
                    <a href="${fileURL}" target="_blank" class="file-link">
                        <i class="${iconClass} file-icon"></i>
                        <span class="file-name">${file.name}</span>
                    </a>
                    <i class="bx bx-x clear-file" onclick="removeFile(${index}, 'image')"></i>
                </div>
            `;
        } else {
            if (file.type === "application/pdf") {
                iconClass = "bx bx-file-pdf";
            } else if (file.type.includes("word")) {
                iconClass = "bx bx-file-doc";
            } else if (file.type.includes("excel")) {
                iconClass = "bx bx-file-excel";
            }

            fileDisplay.innerHTML += `
                <div class="file-item">
                    <a href="${fileURL}" target="_blank" class="file-link">
                        <i class="${iconClass} file-icon"></i>
                        <span class="file-name">${file.name}</span>
                    </a>
                    <i class="bx bx-x clear-file" onclick="removeFile(${index}, 'file')"></i>
                </div>
            `;
        }
    });

    // Hide the "See More" button
    fileDisplay.style.display = (selectedImages.length || selectedFiles.length) ? 'flex' : 'none';
}

// Function to remove a file from the display
function removeFile(index, type) {
    if (type === 'image') {
        selectedImages.splice(index, 1); // Remove the image from the array
    } else {
        selectedFiles.splice(index, 1); // Remove the document from the array
    }

    updateFileDisplay(); // Refresh the display
}

// Function to handle sending messages
function sendMessage() {
    const message = messageInput.value;

    // Logic to send the message (e.g., display it in messages-container)
    if (message) {
        const messagesContainer = document.querySelector('.messages-container');
        const newMessage = document.createElement('div');
        newMessage.className = 'messagee rightt';
        newMessage.textContent = message;
        messagesContainer.appendChild(newMessage);

        // Clear input after sending
        messageInput.value = ''; // Clear the message input
        clearFile(); // Clear any attached files
    }
}


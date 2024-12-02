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
let tasks = {}; 

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
            const date = new Date(Date.UTC(year, month, day)); 
            const isoDate = date.toISOString().slice(0, 10); 
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
        if (isPastDate) return;

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
        const dueDate = document.getElementById('due-date').value;

        if (!title || !category || !selectedDate || !dueDate) {
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
        const selectedDay = new Date(date).getUTCDate(); 

        dateElements.forEach(element => {
            const dayText = element.innerText;
            if (parseInt(dayText) === selectedDay) {
                element.classList.add(category);
                
                // Apply the background color to the selected date cell
                element.style.backgroundColor = color;
                element.style.color = "#fff"; 

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
// PROJ-TASK MODAL
document.addEventListener("DOMContentLoaded", function () {
    const taskModal = document.getElementById("p-task-modal");
    const newTaskBtn = document.querySelector(".new-task-btn");
    const saveTaskBtn = document.querySelector(".p-save-task-btn");
    const tasksSection = document.getElementById("tasks-section");
    const tTaskCard = document.getElementById("t-task-card");
    const tCloseBtn = document.querySelector(".t-close-btn");
    const colorOptions = document.querySelectorAll(".p-color-option");
    const tTaskName = document.querySelector(".t-task-name");
    const tDescription = document.querySelector(".t-des");
    const tAssigned = document.querySelector(".t-assigned");
    const tDueDate = document.querySelector(".t-due");
    let selectedTaskColor = "#ffffff";

    let tasks = {};

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

    // Save task (modified)
    saveTaskBtn.addEventListener("click", (event) => {
        event.preventDefault();

        const taskTitle = document.getElementById("p-task-title").value;
        const description = document.getElementById("description").value;
        const assignedTo = document.getElementById("assigned-to").value;
        const dueDate = document.getElementById("due-date").value;
        const category = selectedTaskColor || "#e6e6e6";

        if (!taskTitle) {
            alert("Please provide a task title.");
            return;
        }

        // Clone the template
        const taskTemplate = document.querySelector(".proj-task"); // Select the hidden template
        const newTask = taskTemplate.cloneNode(true); // Deep clone the template

        // Unhide and customize the new task
        newTask.style.display = "block";
        newTask.style.backgroundColor = category;

        // Populate the task details
        newTask.querySelector(".proj-task-title").textContent = taskTitle;
        newTask.querySelector(".proj-task-subtitle").textContent = assignedTo ? `Assigned to: ${assignedTo}` : "unassigned";

        // Store task details in custom attributes
        newTask.setAttribute("data-title", taskTitle);
        newTask.setAttribute("data-description", description);
        newTask.setAttribute("data-assigned", assignedTo || "unassigned");
        newTask.setAttribute("data-due-date", dueDate || "no due date");

        // Add click event listener for opening the task card
        newTask.addEventListener("click", function (event) {
            if (!event.target.closest(".check-circle") && !event.target.closest(".proj-icon")) {
                openTaskCard(newTask);
            }
        });

        // Append the new task to the tasks container
        const tasksContainer = document.getElementById("tasks-container");
        tasksContainer.appendChild(newTask);

        // Reset the form and close the modal
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

            addTaskToList(taskTitle, assignedTo || "No time specified", dueDate, category);
            highlightDateInCalendar(dueDate, category, taskTitle, category);
        }
    });

    // Function to open the task card and populate it with task details
    function openTaskCard(taskElement) {
        const taskTitle = taskElement.getAttribute("data-title");
        const taskDescription = taskElement.getAttribute("data-description");
        const assignedTo = taskElement.getAttribute("data-assigned");
        const dueDate = taskElement.getAttribute("data-due-date");

        // Populate the task card details
        tTaskName.textContent = taskTitle;
        tDescription.textContent = taskDescription;
        tAssigned.textContent = assignedTo;
        tDueDate.textContent = dueDate;

        // Show the task card
        tTaskCard.style.display = "block";
    }

    // Close the task card
    tCloseBtn.addEventListener("click", function () {
        tTaskCard.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === taskModal) {
            taskModal.style.display = "none";
        }
    });
});




//MARK-COMPLETE IN TASK
document.getElementById('mark-complete').addEventListener('click', function() {
    // Toggle the 'completed' class
    this.classList.toggle('completed');
    
    // Toggle the button text
    if (this.classList.contains('completed')) {
        this.innerHTML = "<i class='bx bx-check'></i>Completed"; 
    } else {
        this.innerHTML = "<i class='bx bx-check'></i>Mark Complete"; 
    }
});



//CHECK-CIRCLE
function toggleCheck(element) {
    const currentColor = window.getComputedStyle(element).backgroundColor;

    // Toggle the background color for check-circle
    if (currentColor === "rgb(40, 42, 82)") {
        element.style.backgroundColor = ""; 
        moveTaskToRemaining(element);
    } else {
        element.style.backgroundColor = "#282a52"; 
        moveTaskToDone(element);
    }
}

// Move task to the "Done" container
function moveTaskToDone(element) {
    const task = element.closest('.proj-task'); 
    const doneContainer = document.getElementById('done-tasks-container');
    doneContainer.style.display = 'block'; // Make the Done container visible

    // Update Done task count
    const doneCount = document.getElementById('done-count');
    doneCount.textContent = parseInt(doneCount.textContent) + 1;

    task.style.display = 'none'; // Hide the task from the original container
    doneContainer.appendChild(task); // Append the task to Done container

    // Ensure the Done container is visible if there are tasks
    doneContainer.style.display = doneContainer.children.length > 0 ? 'block' : 'none';
}

// Move task to the "Remaining Tasks" container
function moveTaskToRemaining(element) {
    const task = element.closest('.proj-task'); 
    const remainingContainer = document.getElementById('remaining-tasks-container');
    remainingContainer.style.display = 'block'; // Make the Remaining container visible

    // Update Remaining task count
    const remainingCount = document.getElementById('remaining-count');
    remainingCount.textContent = parseInt(remainingCount.textContent) + 1;

    task.style.display = 'block'; // Ensure the task is visible in the Remaining container
    remainingContainer.appendChild(task); // Append the task to Remaining container

    // Ensure the Remaining container is visible if there are tasks
    remainingContainer.style.display = remainingContainer.children.length > 0 ? 'block' : 'none';
}

// Toggle visibility of Done tasks
document.getElementById('done-count').addEventListener('click', function () {
    const doneContainer = document.getElementById('done-tasks-container');
    doneContainer.style.display = doneContainer.style.display === 'none' || doneContainer.children.length === 0 ? 'block' : 'none';
});

// Toggle visibility of Remaining tasks
document.getElementById('remaining-count').addEventListener('click', function () {
    const remainingContainer = document.getElementById('remaining-tasks-container');
    remainingContainer.style.display = remainingContainer.style.display === 'none' || remainingContainer.children.length === 0 ? 'block' : 'none';
});




//TASK-DROPDOWN
document.querySelectorAll('.proj-icon').forEach(icon => {
    icon.addEventListener('click', function(e) {
        e.stopPropagation();
        
        const dropdown = this.querySelector('.p-dropdown-icon');

        dropdown.style.display = (dropdown.style.display === 'none' || dropdown.style.display === '') ? 'block' : 'none';
    });
});

// Delete the proj-task when the delete option is clicked
document.querySelectorAll('.p-dropdown-icon .del').forEach(deleteBtn => {
    deleteBtn.addEventListener('click', function() {
        const task = this.closest('.proj-task');
        task.remove();  
    });
});

// Close the dropdown if user clicks anywhere outside the dropdown menu
document.addEventListener('click', function(e) {
    if (!e.target.closest('.proj-icon')) {
        document.querySelectorAll('.p-dropdown-icon').forEach(dropdown => {
            dropdown.style.display = 'none';
        });
    }
});



//TASK-CARD PENCIL AND ATTACHING FILES
document.addEventListener("DOMContentLoaded", function () {
    const tTaskCard = document.getElementById("t-task-card");
    const pencilIcon = tTaskCard.querySelector(".bx-pencil");
    const tDesElement = tTaskCard.querySelector(".t-des");
    const tAddAttachmentBtn = tTaskCard.querySelector(".t-add-attachment-btn");
    const filesContainer = tTaskCard.querySelector(".files-container");

    // Functionality to edit and save the description
    pencilIcon.addEventListener("click", function () {
        if (!tDesElement.isContentEditable) {
            // Enable editing
            tDesElement.contentEditable = "true";
            tDesElement.focus();
            pencilIcon.classList.remove("bx-pencil");
            pencilIcon.classList.add("bx-save");
        } else {
            // Save the description
            tDesElement.contentEditable = "false";
            pencilIcon.classList.remove("bx-save");
            pencilIcon.classList.add("bx-pencil");
            console.log("Updated description:", tDesElement.textContent);
        }
    });

    // Functionality to attach files
    tAddAttachmentBtn.addEventListener("click", function () {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.style.display = "none"; 
        document.body.appendChild(fileInput);

        // Trigger file input click
        fileInput.click();

        // Handle file selection
        fileInput.addEventListener("change", function () {
            const file = fileInput.files[0]; 
            if (file) {
                // Create a file link
                const fileLink = document.createElement("a");
                fileLink.textContent = file.name;
                fileLink.href = URL.createObjectURL(file); 
                fileLink.target = "_blank";
                fileLink.classList.add("file-link");

                // Append the file link to the files container
                const fileWrapper = document.createElement("div");
                fileWrapper.classList.add("file-wrapper");
                fileWrapper.appendChild(fileLink);

                // Add a trash icon for file removal
                const trashIcon = document.createElement("i");
                trashIcon.classList.add("bx", "bx-trash", "remove-file-icon");
                fileWrapper.appendChild(trashIcon);

                // Append to the container
                filesContainer.appendChild(fileWrapper);

                // Log file details for debugging
                console.log("Attached file:", file.name);
            }

            // Remove the file input from the DOM
            document.body.removeChild(fileInput);
        });
    });

    // Event delegation to handle file removal
    filesContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-file-icon")) {
            const fileWrapper = event.target.closest(".file-wrapper");
            filesContainer.removeChild(fileWrapper);
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


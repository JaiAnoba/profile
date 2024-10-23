// CALENDAR
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
let tasks = {}; // Moved tasks outside the initSectionCalendar to make it accessible globally

function initSectionCalendar() {
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];

    function loadCalendar(month, year) {
        document.getElementById("month-year").innerText = `${monthNames[month]} ${year}`;
        document.getElementById("big-month-year").innerText = `${monthNames[month]} ${year}`;
        
        const firstDay = (new Date(year, month)).getDay();
        const daysInMonth = 32 - new Date(year, month, 32).getDate();

        const miniCalendar = document.getElementById("mini-calendar");
        miniCalendar.innerHTML = "";

        for (let i = 0; i < firstDay; i++) {
            miniCalendar.innerHTML += `<div></div>`;
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const taskClass = tasks[date] ? tasks[date].map(task => task.category).join(' ') : "";
            miniCalendar.innerHTML += `<div class="${taskClass}" onclick="selectDate('${date}', this)">${day}</div>`;
        }

        const largeCalendar = document.getElementById("large-calendar");
        largeCalendar.innerHTML = miniCalendar.innerHTML;

        // Load tasks for the current month
        loadTasksForCurrentMonth(month, year);
    }

    // Handle date selection
    window.selectDate = function(date, element) {
        if (selectedDates.includes(date)) {
            selectedDates = selectedDates.filter(d => d !== date);
            element.classList.remove('selected'); // Remove highlight
        } else {
            selectedDates.push(date);
            element.classList.add('selected'); // Add highlight
        }
        openTaskModal(); // Open modal to add task
    }

    // Open the task modal
    function openTaskModal() {
        document.getElementById('task-modal').style.display = 'flex';
        // Re-attach close button listener each time the modal opens
        const closeButton = document.querySelector('.bx-x');
        closeButton.onclick = closeTaskModal; // Attach close function
    }

    // Close the task modal
    function closeTaskModal() {
        document.getElementById('task-modal').style.display = 'none';
        resetTaskForm(); // Reset form when closing
    }

    // Add task to the selected dates
    document.getElementById('add-task-btn').onclick = function() {
        const title = document.getElementById('task-title').value.trim();
        const desc = document.getElementById('task-desc').value.trim();
        const time = document.getElementById('task-time').value; // Get time input
        const category = document.getElementById('task-category').value;

        // Check if title is filled; if not, do not add to tasks
        if (!title || !category) {
            // Close modal if important details are missing
            closeTaskModal();
            return; // Do not proceed to add task
        }

        selectedDates.forEach(date => {
            if (!tasks[date]) {
                tasks[date] = [];
            }
            tasks[date].push({ title, desc, time, category });
            highlightDateInCalendar(date, category);
            addTaskToList(title, formatTime(time), category); // Format time before adding to list
        });

        closeTaskModal(); // Close the modal after adding tasks
    };

    // Load tasks for the current month
    function loadTasksForCurrentMonth(month, year) {
        // Clear existing tasks displayed
        const taskList = document.querySelector('.taskss ul');
        taskList.innerHTML = '';

        // Calculate the start and end dates of the current month
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 0); // Last date of the month

        // Loop through each date in the current month
        for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
            const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
            if (tasks[formattedDate]) {
                tasks[formattedDate].forEach(task => {
                    addTaskToList(task.title, formatTime(task.time), task.category);
                });
            }
        }
    }

    // Highlight dates in the calendar
    function highlightDateInCalendar(date, category) {
        const dateElements = document.querySelectorAll('#mini-calendar div, #large-calendar div');
        dateElements.forEach(element => {
            const dayText = element.innerText;
            const currentDate = new Date(date);
            if (dayText === currentDate.getDate().toString()) {
                element.classList.add(category); // Add class for coloring
            }
        });
    }

    // Add task to the task list
    function addTaskToList(title, time, category) {
        const taskList = document.querySelector('.taskss ul');
        const li = document.createElement('li');
        
        // Define the color based on the category
        const colorClass = category === 'personal' ? 'green' : category === 'work' ? 'blue' : 'red';
        
        // Create a color circle using CSS styles
        li.innerHTML = `
            <span class="task-color" style="display:inline-block; width:10px; height:10px; border-radius:50%; background-color:${colorClass}; margin-right:5px;"></span>
            ${title} - ${time}
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
        document.getElementById('task-time').value = ''; // Reset time input
        document.getElementById('task-category').value = 'personal';
        selectedDates = []; // Clear selected dates
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

    loadCalendar(currentMonth, currentYear); // Initial load
}

// Call the function to initialize the section calendar
initSectionCalendar();



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


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
function initSectionCalendar() {
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];

    const tasks = {
        "2022-03-09": "user-interview",
        "2022-03-05": "web-design-review",
        "2022-03-25": "meeting-with-client",
        "2022-03-28": "mobile-app",
        "2022-03-30": "ui-ux"
    };

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
            const taskClass = tasks[date] ? tasks[date] : "";
            miniCalendar.innerHTML += `<div class="${taskClass}">${day}</div>`;
        }

        const largeCalendar = document.getElementById("large-calendar");
        largeCalendar.innerHTML = miniCalendar.innerHTML;
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


// PROJECT-DATE
document.addEventListener('DOMContentLoaded', function() {
    const dateElement = document.getElementById('current-date');
    
    const today = new Date();
    
    const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];

    const formattedDate = `${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
    
    dateElement.textContent = formattedDate;
});

// LIST-VIEW & GRID PROJECT-CARDS
document.addEventListener("DOMContentLoaded", function () {
    const listViewIcon = document.querySelector(".bx-list-ul");
    const gridViewIcon = document.querySelector(".bx-grid-alt");
    const projectsGrids = document.querySelector(".projects-grids");
    const projectCards = document.querySelectorAll(".project-cards");

    // list view
    listViewIcon.addEventListener("click", function () {
        projectsGrids.classList.add("list-view");
        projectCards.forEach(card => {
            card.classList.add("list");
        });
    });

    // grid view
    gridViewIcon.addEventListener("click", function () {
        projectsGrids.classList.remove("list-view");
        projectCards.forEach(card => {
            card.classList.remove("list");
        });
    });
});

// SELECT FILE
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

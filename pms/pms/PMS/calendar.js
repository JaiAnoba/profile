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


// CALENDAR
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
    // Get the first day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const totalDays = lastDayOfMonth.getDate();
    // Get the starting day of the week
    const startingDay = firstDayOfMonth.getDay();
    // Fill the calendar days
    for (let i = 0; i < startingDay; i++) {
        calendarDays.innerHTML += '<li></li>'; 
    }
    for (let day = 1; day <= totalDays; day++) {
        const isToday = (day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear());
        calendarDays.innerHTML += `<li class="${isToday ? 'today' : ''}">${day}</li>`;
    }
}

prevMonth.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonth.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Initial render
renderCalendar();

// PROJECT-DATE
document.addEventListener('DOMContentLoaded', function() {
    const dateElement = document.getElementById('current-date');
    
    const today = new Date();
    
    const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];

    const formattedDate = `${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
    
    dateElement.textContent = formattedDate;
});

// Populate the notification list
const notificationList = document.getElementById('notification-list');
notifications.forEach(notification => {
    const li = document.createElement('li');
    li.innerHTML = `${notification.message} <span class="notif-time">${notification.time}</span>`;
    notificationList.appendChild(li);
});

// Initialize charts using Chart.js
const ctxPostStats = document.getElementById('postStatsChart').getContext('2d');
const postStatsChart = new Chart(ctxPostStats, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
            label: 'Likes',
            data: [12, 19, 3, 5, 2],
            backgroundColor: 'rgba(178, 15, 41, 0.5)',
            borderColor: 'rgba(178, 15, 41, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const ctxActivity = document.getElementById('activityChart').getContext('2d');
const activityChart = new Chart(ctxActivity, {
    type: 'line',
    data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
            label: 'Activity',
            data: [65, 59, 80, 81],
            fill: false,
            borderColor: 'rgba(178, 15, 41, 1)',
            tension: 0.1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

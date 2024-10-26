document.addEventListener('DOMContentLoaded', function() {
    // Sidebar links
    const dashboardLink = document.getElementById('dashboard-link');
    const projectsLink = document.getElementById('projects-link');
    const calendarLink = document.getElementById('calendar-link');
    const chatsLink = document.getElementById('chats-link');
    const settingsLink = document.getElementById('settings-link');
  
    // Section containers
    const rightSection = document.querySelector('.right');
    const projSection = document.querySelector('.proj');
    const calendarSection = document.querySelector('.calendars');
    const messageSection = document.querySelector('.message');
    const settingsSection = document.querySelector('.settings');
    const topSection = document.querySelector('.top');
  
    // Hide all sections initially except for the dashboard (.right)
    projSection.style.display = 'none';
    calendarSection.style.display = 'none';
    messageSection.style.display = 'none';
    settingsSection.style.display = 'none';
  
    // Dashboard section
    dashboardLink.addEventListener('click', function(e) {
      e.preventDefault();
      rightSection.style.display = 'block';
      projSection.style.display = 'none';
      calendarSection.style.display = 'none';
      messageSection.style.display = 'none';
      settingsSection.style.display = 'none';
      topSection.style.display = 'flex';
    });

    // Projects section
    projectsLink.addEventListener('click', function(e) {
      e.preventDefault();
      rightSection.style.display = 'none';
      projSection.style.display = 'block';
      calendarSection.style.display = 'none';
      messageSection.style.display = 'none';
      settingsSection.style.display = 'none';
      topSection.style.display = 'flex';
    });
  
    // Calendar section
    calendarLink.addEventListener('click', function(e) {
      e.preventDefault();
      rightSection.style.display = 'none';
      projSection.style.display = 'none';
      calendarSection.style.display = 'block';
      messageSection.style.display = 'none';
      settingsSection.style.display = 'none';
      topSection.style.display = 'flex';
    });
  
    // Message section
    chatsLink.addEventListener('click', function(e) {
      e.preventDefault();
      rightSection.style.display = 'none';
      projSection.style.display = 'none';
      calendarSection.style.display = 'none';
      messageSection.style.display = 'block';
      settingsSection.style.display = 'none';
      topSection.style.display = 'flex';
    });
  
    // Settings section
    settingsLink.addEventListener('click', function(e) {
      e.preventDefault();
      rightSection.style.display = 'none';
      projSection.style.display = 'none';
      calendarSection.style.display = 'none';
      messageSection.style.display = 'none';
      settingsSection.style.display = 'block';
      topSection.style.display = 'none'; 
    });
  });


// CHECK CIRCLE
function toggleCheck(element) {
  element.classList.toggle("checked");
}


// SETTINGS
document.getElementById("profile-link").addEventListener("click", function() {
  showSection('s-profile-section');
});

document.getElementById("account-link").addEventListener("click", function() {
  showSection('account-section');
});

document.getElementById("notifications-link").addEventListener("click", function() {
  showSection('notifications-section');
});

function showSection(sectionId) {
  let sections = document.querySelectorAll('.ss_section');
  sections.forEach(section => {
      section.classList.add('hidden');
  });
  
  document.getElementById(sectionId).classList.remove('hidden');
  document.getElementById(sectionId).classList.add('active');
}



// USER DROPDOWN 
document.querySelector('.userImg').addEventListener('click', function() {
  const dropdown = document.querySelector('.dropdown');
  dropdown.style.zIndex = 10000;
  dropdown.classList.toggle('show-dropdown');
});
  


// CHANGE & HIDE PASSWORD
document.getElementById('change-link').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('password-view').style.display = 'none';  // Hides the "Change" view
  document.getElementById('password-edit').style.display = 'block'; // Shows the "Edit" view
});

document.getElementById('hide-link').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('password-view').style.display = 'flex'; // Shows the "Change" view
  document.getElementById('password-edit').style.display = 'none'; // Hides the "Edit" view
});

document.getElementById('save-password-btn').addEventListener('click', function() {
  var newPassword = document.getElementById('new-password').value;
  var currentPassword = document.getElementById('current-password').value;

  // Check if both fields are filled
  if (!newPassword || !currentPassword) {
      alert('Please fill in both fields.');
      return;
  }

  // Validate the new password length (at least 8 characters)
  if (newPassword.length < 8) {
      alert('New password must be at least 8 characters long.');
      return;
  }

  // Validate if the password contains at least one uppercase letter
  if (!/[A-Z]/.test(newPassword)) {
      alert('New password must contain at least one uppercase letter.');
      return;
  }

  // Validate if the password contains at least one lowercase letter
  if (!/[a-z]/.test(newPassword)) {
      alert('New password must contain at least one lowercase letter.');
      return;
  }

  // Validate if the password contains at least one number
  if (!/[0-9]/.test(newPassword)) {
      alert('New password must contain at least one number.');
      return;
  }

  // Validate if the password contains at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
      alert('New password must contain at least one special character.');
      return;
  }

  // Logic to handle password change 
  alert('Password successfully changed!');

  // After success, return to the original view
  document.getElementById('password-view').style.display = 'flex';  // Shows the "Change" view
  document.getElementById('password-edit').style.display = 'none';  // Hides the "Edit" view
});

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

//SIDEBAR COLLAPSED
document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.querySelector(".left");
  const toggleButton = document.querySelector(".logo");

  toggleButton.addEventListener("click", function () {
      sidebar.classList.toggle("collapsed");
  });
});


//PROJECT MODAL
const newProjectBtn = document.querySelector('.new-project-btn');
const modalOverlay = document.getElementById('modal-overlay');
// const closeModalBtn = document.getElementById('bx-x');

// Show Modal
newProjectBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'flex';
});

// Hide Modal
closeModalBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
});

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
        modalOverlay.style.display = 'none';
    }
});


//CARD-PROJECT TEMPLATE
function addProject(projectData) {
  const template = document.getElementById('project-card-template');
  const newProject = template.cloneNode(true);
  newProject.style.display = 'block';
  
  // Populate the data (replace text and styles as necessary)
  newProject.querySelector('.project-date').textContent = projectData.date;
  newProject.querySelector('.p-title h3').textContent = projectData.title;
  newProject.querySelector('.p-title p').textContent = projectData.category;
  newProject.querySelector('.progress-bars').style.width = projectData.progress + '%';
  newProject.querySelector('.progress-percentage').textContent = projectData.progress + '%';
  newProject.querySelector('.due').textContent = projectData.daysLeft + ' Days Left';
  
  // Add new project to the container
  document.getElementById('project-container').appendChild(newProject);
}

//PROJECT COLOR THEME
const colorOptions = document.querySelectorAll('.color-option');

colorOptions.forEach(option => {
    option.addEventListener('click', function () {
        colorOptions.forEach(opt => opt.classList.remove('select'));
        this.classList.add('select');
    });
});

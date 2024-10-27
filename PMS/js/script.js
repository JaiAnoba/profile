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

  // Toggle list view
  listViewIcon.addEventListener("click", function () {
      projectsGrids.classList.add("list-view");
      document.querySelectorAll(".project-cards").forEach(card => {
          card.classList.add("list");
          card.classList.remove("grid");
      });
  });

  // Toggle grid view
  gridViewIcon.addEventListener("click", function () {
      projectsGrids.classList.remove("list-view");
      document.querySelectorAll(".project-cards").forEach(card => {
          card.classList.remove("list");
          card.classList.add("grid");
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


// PROJECT MODAL
document.addEventListener("DOMContentLoaded", function () {
  const modalOverlay = document.getElementById("modal-overlay");
  const newProjectBtn = document.querySelector(".new-project-btn");
  const saveProjectBtn = document.querySelector(".save-project-btn");
  const projectContainer = document.getElementById("project-container");
  const colorOptions = document.querySelectorAll(".color-option");
  let selectedColor = "#ffffff"; // Default color

  // Open the modal
  newProjectBtn.addEventListener("click", () => {
      modalOverlay.style.display = "flex";
  });

  // Close the modal when clicking outside
  modalOverlay.addEventListener("click", (event) => {
      if (event.target === modalOverlay) {
          modalOverlay.style.display = "none";
      }
  });

  // Function to calculate days left
  function calculateDaysLeft(finishDate) {
      const currentDate = new Date();
      const endDate = new Date(finishDate);
      const timeDiff = endDate - currentDate;
      return Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));
  }

  // Function to darken a color
  function darkenColor(color, percentage) {
      const colorValue = parseInt(color.slice(1), 16);
      const r = Math.max(0, ((colorValue >> 16) & 0xff) * (1 - percentage));
      const g = Math.max(0, ((colorValue >> 8) & 0xff) * (1 - percentage));
      const b = Math.max(0, (colorValue & 0xff) * (1 - percentage));
      return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
  }

  // Event listener for selecting a color theme
  colorOptions.forEach(option => {
      option.addEventListener("click", () => {
          // Remove 'select' class from all options and add to the clicked one
          colorOptions.forEach(opt => opt.classList.remove("select"));
          option.classList.add("select");
          
          // Get the selected color
          selectedColor = option.getAttribute("data-color");
      });
  });

  // Function to create a new project card
  function createProjectCard(name, category, date, daysLeft) {
      const card = document.createElement("div");
      card.classList.add("project-cards");
      card.style.backgroundColor = selectedColor;

      // Set text color to black
      const textColor = "#000000";
      const darkerColor = darkenColor(selectedColor, 0.2); // 20% darker

      card.innerHTML = `
          <div class="card-headers">
              <p class="project-date" style="color: ${textColor};">${new Date(date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
              })}</p>
              <div class="menu-icon">
                  <span class="dot"></span>
                  <span class="dot"></span>
              </div>
          </div>
          <div class="p-title" style="color: ${textColor};">
              <h3>${name}</h3>
              <p>${category}</p>
          </div>
          <div class="progresss">
              <div class="progress-bars" style="width: 0%; background-color: ${darkerColor};"></div>
          </div>
          <div class="progress-percentage">
              <span style="color: ${textColor};">0%</span>
          </div>
          <div class="project-footers">
              <div class="avatars">
                  <img src="pics/mona.jpg" alt="Team Member">
                  <img src="pics/SHREK.jpg" alt="Team Member">
                  <span class="add-team-member" style="background-color: ${darkerColor};">+</span>
              </div>
              <p class="due" style="background-color: ${darkerColor}; color: ${textColor};">${daysLeft} Days Left</p>
          </div>
      `;

      projectContainer.appendChild(card);
  }

  // Save project and create card
  saveProjectBtn.addEventListener("click", (event) => {
      event.preventDefault();

      // Get form values
      const projectName = document.getElementById("project-name").value;
      const projectCategory = document.getElementById("project-category").value;
      const startDate = new Date();  // Capture current date when project is added
      const finishDate = document.getElementById("finish-date").value;

      // Calculate days left
      const daysLeft = calculateDaysLeft(finishDate);

      // Create project card
      createProjectCard(projectName, projectCategory, startDate, daysLeft);

      // Clear and close the modal
      document.querySelector(".project-form").reset();
      modalOverlay.style.display = "none";
  });
});

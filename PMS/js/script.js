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
    const projDetails = document.querySelector('.proj-details');
  
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
      projDetails.style.display = 'none';
    });

    // Projects section
    projectsLink.addEventListener('click', function(e) {
      e.preventDefault();
      rightSection.style.display = 'none';
      projSection.style.display = 'block';
      projSection.style.visibility = 'visible'; 
      projSection.style.position = 'relative';  
      projDetails.style.display = 'none'; 
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
      projDetails.style.display = 'none';
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
      projDetails.style.display = 'none';
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
      projDetails.style.display = 'none';
    });
  });


// CHECK CIRCLE
function toggleCheck(element) {
    const currentColor = window.getComputedStyle(element).backgroundColor;
    
    if (currentColor === "rgb(40, 42, 82)") {  
        element.style.backgroundColor = ""; // Reset color
    } else {
        element.style.backgroundColor = "#282a52"; 
    }
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



//SIDEBAR COLLAPSED
document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.querySelector(".left");
  const toggleButton = document.querySelector(".logo");

  toggleButton.addEventListener("click", function () {
      sidebar.classList.toggle("collapsed");
  });
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


// PROJECT MODAL
document.addEventListener("DOMContentLoaded", function () {
    const modalOverlay = document.getElementById("modal-overlay");
    const newProjectBtn = document.querySelector(".new-project-btn");
    const saveProjectBtn = document.querySelector(".save-project-btn");
    const projectContainer = document.getElementById("project-container");
    const projectTemplate = document.getElementById("project-card-template");
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

    // Event listener for selecting a color theme
    colorOptions.forEach(option => {
        option.addEventListener("click", () => {
            colorOptions.forEach(opt => opt.classList.remove("select"));
            option.classList.add("select");
            selectedColor = option.getAttribute("data-color");
        });
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

    // Function to apply darkened colors to specific elements
    function applyDarkenedColors(card, color) {
        const darkenedColor = darkenColor(color, 0.2);
        const addTeamMemberElement = card.querySelector(".add-team-member");
        const dueElement = card.querySelector(".due");
        const progBars = card.querySelector(".progress-bars");
        
        if (addTeamMemberElement) {
            addTeamMemberElement.style.backgroundColor = darkenedColor;
        }
        if (dueElement) {
            dueElement.style.backgroundColor = darkenedColor;
        }
        if (progBars) {
            progBars.style.backgroundColor = darkenedColor;
        }
    }

    // Function to get the current date
    function getCurrentDate() {
        const currentDate = new Date();
        return currentDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    }

    // Save project and create card
    saveProjectBtn.addEventListener("click", (event) => {
        event.preventDefault();

        // Get form values
        const projectName = document.getElementById("project-name").value;
        const projectCategory = document.getElementById("project-category").value;
        const finishDate = document.getElementById("finish-date").value;

        // if (!projectName || !projectCategory || !finishDate) {
            // alert("Please fill in all fields.");
            // return;
        // }

        const daysLeft = calculateDaysLeft(finishDate);

        // Clone the template
        const newCard = projectTemplate.cloneNode(true);
        newCard.style.display = "block";  // Show the new card
        newCard.removeAttribute("id");    // Remove id to avoid duplicates
        newCard.classList.add("project-cards");
        newCard.style.backgroundColor = selectedColor;

        // Populate card details
        newCard.querySelector(".project-date").textContent = new Date(finishDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
        newCard.querySelector(".project-date").textContent = getCurrentDate();
        newCard.querySelector(".p-title h3").textContent = projectName;
        newCard.querySelector(".p-title p").textContent = projectCategory;
        newCard.querySelector(".due").textContent = `${daysLeft} Days Left`;

        // Apply darkened colors to .add-team-member and .due
        applyDarkenedColors(newCard, selectedColor);
        projectContainer.appendChild(newCard); 
        projectContainer.style.display = "grid"; 

        // Clear and close the modal
        document.querySelector(".project-form").reset();
        modalOverlay.style.display = "none";
    });
});


//PROJECT-DETAILS
document.addEventListener("DOMContentLoaded", function () {
    const projectContainer = document.getElementById("project-container");
    const projSection = document.querySelector(".proj");
    const projDetails = document.querySelector(".proj-details");
    const backButton = projDetails.querySelector(".bx-chevron-left");

    // Function to show project details
    function showProjectDetails() {
        projSection.style.display = "none";
        projDetails.style.display = "block";
        projDetails.style.visibility = "visible";
        projDetails.style.position = "relative";
    }

    // Function to go back to project list
    function hideProjectDetails() {
        projSection.style.display = "block"; 
        projSection.style.visibility = "visible"; // Show proj section without affecting layout
        projSection.style.position = "fixed";   // Ensure it stays in normal layout flow

        projDetails.style.visibility = "hidden";   // Hide proj-details without affecting layout
        projDetails.style.position = "absolute";  
    }

    // Add click event to each project card
    projectContainer.addEventListener("click", (event) => {
        const clickedElement = event.target.closest(".project-cards");
        if (clickedElement) {
            showProjectDetails();
        }
    });

    // Add click event to the back button in proj-details
    backButton.addEventListener("click", hideProjectDetails);
});


//TASKS-DROPDOWN
document.addEventListener("DOMContentLoaded", function () {
    // Select the container that holds all tasks
    const tasksContainer = document.getElementById("tasks-container");

    // Event delegation to handle clicks on the dots within each task
    tasksContainer.addEventListener("click", function (event) {
        // Check if the clicked element is one of the dots
        if (event.target.classList.contains("dott")) {
            // Find the closest .proj-task element and toggle its dropdown
            const task = event.target.closest(".proj-task");
            const dropdown = task.querySelector(".p-dropdown-icon");

            // Toggle dropdown display
            dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
            event.stopPropagation(); // Prevent further propagation
        }
    });

    // Hide dropdown if clicking outside of any task dropdown
    document.addEventListener("click", function (event) {
        // Check if the click is outside any .proj-task
        const isClickInsideTask = event.target.closest(".proj-task");

        // If clicked outside, hide all dropdowns
        if (!isClickInsideTask) {
            document.querySelectorAll(".p-dropdown-icon").forEach(dropdown => {
                dropdown.style.display = "none";
            });
        }
    });

    // Add functionality for the Edit and Delete options within each dropdown
    tasksContainer.querySelectorAll(".proj-task").forEach(task => {
        const dropdown = task.querySelector(".p-dropdown-icon");
        const editOption = dropdown.querySelector(".edit");
        const deleteOption = dropdown.querySelector(".del");

        // Edit functionality
        editOption.addEventListener("click", function () {
            const taskTitle = task.querySelector(".proj-task-title").textContent;
            alert(`Edit task: ${taskTitle}`);
            dropdown.style.display = "none"; // Hide dropdown after selecting
        });

        // Delete functionality
        deleteOption.addEventListener("click", function () {
            task.remove(); // Remove the task from the DOM
            alert("Task deleted");
        });
    });
});



//TASKS & DOCS TOGGLE
document.addEventListener("DOMContentLoaded", function () {
    const tasksTab = document.getElementById("tasks-tab");
    const documentsTab = document.getElementById("documents-tab");
    const tasksSection = document.getElementById("tasks-section");
    const documentsSection = document.getElementById("documents-section");
    const addUserButton = document.querySelector(".proj-add-user");
    const uploadButton = document.querySelector(".proj-upload-btn");

    // Function to show the Tasks section, show addUser button, and hide the Upload button
    function showTasks() {
        tasksSection.style.display = "block";
        documentsSection.style.display = "none";
        tasksTab.classList.add("active-tab");
        documentsTab.classList.remove("active-tab");
        addUserButton.style.display = "inline-flex"; // Show add user button
        uploadButton.style.display = "none"; // Hide upload button in Tasks section
    }

    // Function to show the Documents section, show Upload button, and hide the addUser button
    function showDocuments() {
        documentsSection.style.display = "block";
        tasksSection.style.display = "none";
        documentsTab.classList.add("active-tab");
        tasksTab.classList.remove("active-tab");
        uploadButton.style.display = "inline-flex";  // Show upload button
        addUserButton.style.display = "none";  // Hide add user button
    }

    // Event listeners for the tabs
    tasksTab.addEventListener("click", showTasks);
    documentsTab.addEventListener("click", showDocuments);

    // Initial setup: show the Tasks section and addUser button by default, hide upload button
    showTasks();
});


//UPLOAD-FILE IN DOCUMENTS
document.addEventListener("DOMContentLoaded", function () {
    const uploadButton = document.querySelector(".proj-upload-btn");
    const documentGrid = document.querySelector(".document-grid");

    // Function to handle file upload
    function handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            // Create a new document card to display the uploaded file
            const documentCard = document.createElement("div");
            documentCard.classList.add("document-card");

            // Create the content for the document card
            const docContent = document.createElement("div");
            docContent.classList.add("pp-docs");

            // Set the title and date (using the file name and current date)
            const fileName = file.name;
            const fileDate = new Date().toLocaleDateString();
            const titleSpan = document.createElement("span");
            titleSpan.classList.add("document-title");
            titleSpan.textContent = fileName;

            const dateSpan = document.createElement("span");
            dateSpan.classList.add("document-date");
            dateSpan.textContent = fileDate;

            // Append the title and date to the document content
            docContent.appendChild(titleSpan);
            docContent.appendChild(dateSpan);

            // Add the icons and dropdown menu (if needed)
            const icons = document.createElement("div");
            icons.classList.add("projj-icon");
            const dot1 = document.createElement("span");
            dot1.classList.add("dottt");
            const dot2 = document.createElement("span");
            dot2.classList.add("dottt");

            const dropdownMenu = document.createElement("div");
            dropdownMenu.classList.add("p-dropdown-iconn");
            dropdownMenu.style.display = "none";
            const editItem = document.createElement("div");
            editItem.classList.add("p-drop-itemm", "editt");
            editItem.textContent = "Edit";
            const deleteItem = document.createElement("div");
            deleteItem.classList.add("p-drop-itemm", "dell");
            deleteItem.textContent = "Delete";

            // Append dots and dropdown menu to the icons
            icons.appendChild(dot1);
            icons.appendChild(dot2);
            dropdownMenu.appendChild(editItem);
            dropdownMenu.appendChild(deleteItem);

            // Append everything to the document card
            documentCard.appendChild(docContent);
            documentCard.appendChild(icons);
            documentCard.appendChild(dropdownMenu);

            // Make the document card clickable to open the file
            documentCard.addEventListener("click", function() {
                const fileUrl = URL.createObjectURL(file);
                window.open(fileUrl, "_blank");
            });

            // Append the document card to the document grid
            documentGrid.appendChild(documentCard);
        }
    }

    // Event listener for file selection
    uploadButton.addEventListener("click", function() {
        // Create an invisible file input
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.style.display = "none";
        document.body.appendChild(fileInput);

        // Trigger the file input click to open the file picker
        fileInput.click();

        // Handle the file selection
        fileInput.addEventListener("change", handleFileUpload);
    });
});


//GRID & LIST VIEW OF DOCS
document.addEventListener("DOMContentLoaded", function () {
    const listViewIcon = document.querySelector(".proj-list");
    const gridViewIcon = document.querySelector(".proj-grid");
    const documentGrid = document.querySelector(".document-grid");

    // Function to switch to list view
    function switchToListView() {
        documentGrid.classList.add("list-view");
        documentGrid.classList.remove("grid-view");
    }

    // Function to switch to grid view
    function switchToGridView() {
        documentGrid.classList.add("grid-view");
        documentGrid.classList.remove("list-view");
    }

    // Event listeners for list and grid view icons
    listViewIcon.addEventListener("click", switchToListView);
    gridViewIcon.addEventListener("click", switchToGridView);

    // Initialize default view: set to grid view initially
    switchToGridView();

    // Optional: Interaction with document cards (if you want to show more details on click)
    const documentCards = document.querySelectorAll(".document-card");
    documentCards.forEach(card => {
        card.addEventListener("click", function() {
            // Example interaction: toggle highlighted class on click
            card.classList.toggle("highlighted-blue");
        });
    });
});



//PROJ-TASK MODAL
document.addEventListener("DOMContentLoaded", function () {
    const taskModal = document.getElementById("p-task-modal");
    const newTaskBtn = document.querySelector(".new-task-btn");
    const saveTaskBtn = document.querySelector(".p-save-task-btn");
    const tasksSection = document.getElementById("tasks-section");
    const colorOptions = document.querySelectorAll(".p-color-option");
    let selectedTaskColor = "#ffffff"; // Default color

    // Open the task modal
    newTaskBtn.addEventListener("click", () => {
        taskModal.style.display = "flex";
    });

    // Close the modal by clicking outside the content
    taskModal.addEventListener("click", (event) => {
        if (event.target === taskModal) {
            taskModal.style.display = "none";
        }
    });

    // Handle color selection
    colorOptions.forEach(option => {
        option.addEventListener("click", () => {
            colorOptions.forEach(opt => opt.classList.remove("selected"));
            option.classList.add("selected");
            selectedTaskColor = option.getAttribute("data-color");
        });
    });

    // Save task and add it to tasks section
    saveTaskBtn.addEventListener("click", (event) => {
        event.preventDefault();

        // Retrieve task details
        const taskTitle = document.getElementById("p-task-title").value;
        const assignedTo = document.getElementById("assigned-to").value;

        // Create task card if inputs are valid
        const newTask = document.createElement("div");
        newTask.classList.add("proj-task");
        newTask.style.backgroundColor = selectedTaskColor;

        // Add task content
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

        // Append elements to build the task card structure
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
    });
});



//PROJECT-CARD MENU DROPDOWN
document.addEventListener("DOMContentLoaded", function () {
    const projectContainer = document.getElementById("project-container");

    // Event listener for each menu-icon click to show/hide its dropdown
    const menuIcons = projectContainer.querySelectorAll(".menu-icon");
    
    menuIcons.forEach(icon => {
        icon.addEventListener("click", function (event) {
            event.stopPropagation(); // Prevent click event from reaching document

            // Toggle visibility of the dropdown menu within this icon
            const dropdown = icon.querySelector(".p-dropdown-menu");
            if (dropdown) {
                dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
            }
        });
    });

    // Event listener for delete button inside each dropdown menu
    projectContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete")) {
            const card = event.target.closest(".project-cards");
            if (card) {
                card.remove(); // Remove the project card
            }
        }
    });

    // Close all dropdowns if clicked outside any menu icon
    document.addEventListener("click", function () {
        document.querySelectorAll(".p-dropdown-menu").forEach(menu => menu.style.display = "none");
    });
});



//USER DROPDOWN
document.addEventListener("DOMContentLoaded", function () {
  const userImg = document.querySelector(".userImg");
  const dropdown = document.querySelector(".dropdown");

  userImg.addEventListener("click", function () {
      dropdown.classList.toggle("active");
  });

  // Close dropdown if clicking outside of it
  document.addEventListener("click", function (event) {
      if (!userImg.contains(event.target) && !dropdown.contains(event.target)) {
          dropdown.classList.remove("active");
      }
  });
});



//DELETE ACC POP-UP
document.addEventListener("DOMContentLoaded", function () {
  const deleteLink = document.querySelector(".delete-link");
  const popup = document.getElementById("popup");
  const continueButton = document.getElementById("continueButton");
  const cancelButton = document.getElementById("cancelButton");

  // Show the popup when the delete link is clicked
  deleteLink.addEventListener("click", function (event) {
      event.preventDefault();
      popup.style.display = "flex";
  });

  // Handle the Continue button click (delete action)
  continueButton.addEventListener("click", function () {
      popup.style.display = "none";
      alert("Account deleted successfully."); // Replace with actual delete function if needed
  });

  // Handle the Cancel button click (close popup)
  cancelButton.addEventListener("click", function () {
      popup.style.display = "none";
  });
});

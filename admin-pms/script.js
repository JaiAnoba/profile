// SIDEBAR NAVIGATION
document.addEventListener('DOMContentLoaded', function() {
  // Sidebar links
  const dashboardLink = document.querySelector('a[href="dashboard"]');
  const usersLink = document.querySelector('a[href="users"]');
  const postsLink = document.querySelector('a[href="posts"]');
  const settingsLink = document.querySelector('a[href="settings"]');

  // Section containers
  const dashboardSection = document.querySelector('.content-wrapper1');
  const userSection = document.querySelector('.content-wrapper2');
  const postsSection = document.querySelector('.content-wrapper3');
  const settingsSection = document.querySelector('.content-wrapper4');
  const topSection = document.querySelector('.header-wrapper');

  // Header title
  const headerTitle = document.querySelector('.header-title');
 
  // Hide all sections initially except for the dashboard
  userSection.style.display = 'none';
  postsSection.style.display = 'none';
  settingsSection.style.display = 'none';
  topSection.style.display = 'flex';

  // Function to update the header title based on the section
  function updateHeaderTitle(section) {
    if (section === userSection) {
      headerTitle.innerHTML = `
        <h1> Accounts</h1>
        <span class="des">Manage user accounts</span>
      `;
    }else if (section === postsSection) {
      headerTitle.innerHTML = `
        <h1> Users' Subscriptions</h1>
        <span class="des">Manage subscription plans</span>
      `;
    } else if (section === settingsSection) {
      headerTitle.innerHTML = `
        <h1> Settings</h1>
        <span class="des">Adjust your preferences</span>
      `;
    }else if (section === dashboardSection) {
      headerTitle.innerHTML = `
        <h1> Dashboard</h1>
        <span class="date" id="current-date"></span>
      `;
      document.getElementById("current-date").innerText = formatDate();
    }
  }

  // Dashboard section
  dashboardLink.addEventListener('click', function(e) {
    e.preventDefault();
    dashboardSection.style.display = 'block';
    userSection.style.display = 'none';
    postsSection.style.display = 'none';
    settingsSection.style.display = 'none';
    topSection.style.display = 'flex';
    updateHeaderTitle(dashboardSection);
  });

  // Users Management section
  usersLink.addEventListener('click', function(e) {
    e.preventDefault();
    dashboardSection.style.display = 'none';
    userSection.style.display = 'block';
    postsSection.style.display = 'none';
    settingsSection.style.display = 'none';
    topSection.style.display = 'flex';
    updateHeaderTitle(userSection);
  });

  // Posts Requests section
  postsLink.addEventListener('click', function(e) {
    e.preventDefault();
    dashboardSection.style.display = 'none';
    userSection.style.display = 'none';
    postsSection.style.display = 'block';
    settingsSection.style.display = 'none';
    topSection.style.display = 'flex';
    updateHeaderTitle(postsSection);
  });

  // Settings section
  settingsLink.addEventListener('click', function(e) {
    e.preventDefault();
    dashboardSection.style.display = 'none';
    userSection.style.display = 'none';
    postsSection.style.display = 'none';
    settingsSection.style.display = 'block';
    topSection.style.display = 'flex';
    updateHeaderTitle(settingsSection);
  });
});


// Function to format and display the current date in dashboard
function formatDate() {
    let today = new Date();

    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];

    let dayName = days[today.getDay()]; 
    let day = today.getDate(); 
    let month = months[today.getMonth()]; 
    let year = today.getFullYear();

    return dayName + ", " + day + " " + month + " " + year;
}

document.getElementById("current-date").innerText = formatDate();



// --- Post Stats Chart ---

// Get the canvas for the Post Stats Chart
let postStatsCanvas = document.getElementById('postStatsChart').getContext('2d');

// Bar chart
let postStatsChart = new Chart(postStatsCanvas, {
    type: 'bar', // Chart type
    data: {
        labels: ['Item 1', 'Item 2', 'Item 3'], 
        datasets: [
            {
                label: 'Saved',
                data: [5, 10, 15],
                backgroundColor: '#58b8df', 
                borderRadius: 20, 
                barThickness: 40 
            },
            {
                label: 'Likes', 
                data: [8, 12, 18],
                backgroundColor: '#3762d8',
                borderRadius: 20,
                barThickness: 40
            }
        ]
    },
    options: {
        responsive: true, // Make chart responsive
        maintainAspectRatio: false, // Disable fixed aspect ratio
        plugins: {
            legend: {
                position: 'top', // Legend position
                labels: {
                    boxWidth: 25,
                    font: {
                        size: 14,
                        family: 'Poppins', 
                    },
                    color: '#000' 
                }
            }
        },
        scales: {
            x: { // X-axis settings
                grid: {
                    display: false // Remove grid lines
                },
                ticks: {
                    font: {
                        size: 14,
                        family: 'Poppins'
                    },
                    color: '#000'
                }
            },
            y: { // Y-axis settings
                beginAtZero: true, // Start from 0
                ticks: {
                    stepSize: 5,
                    font: {
                        size: 14,
                        family: 'Poppins',
                        weight: 'bold'
                    },
                    color: '#000'
                }
            }
        }
    }
});



// --- Activity Chart ---

document.addEventListener('DOMContentLoaded', function () {
    // Get the canvas for the Activity Chart
    let activityCanvas = document.getElementById('activityChart').getContext('2d');

    // Adjust canvas resolution for high-DPI displays
    let dpr = window.devicePixelRatio || 1; // Device Pixel Ratio
    activityCanvas.canvas.width = activityCanvas.canvas.clientWidth * dpr;
    activityCanvas.canvas.height = activityCanvas.canvas.clientHeight * dpr;
    activityCanvas.scale(dpr, dpr);

    // Line chart
    let activityChart = new Chart(activityCanvas, {
        type: 'line', // Chart type
        data: {
            labels: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'], 
            datasets: [
                {
                    label: 'Posts', 
                    data: [24, 25, 40, 50, 45], 
                    borderColor: '#38b6ff', 
                    backgroundColor: '#38b6ff', 
                    fill: false, 
                    borderWidth: 2
                },
                {
                    label: 'Requests', 
                    data: [35, 17, 45, 40, 50], 
                    borderColor: '#5271ff', 
                    backgroundColor: '#5271ff', 
                    fill: false, 
                    borderWidth: 2
                },
                {
                    label: 'Exhibitions', 
                    data: [10, 5, 20, 15, 35], 
                    borderColor: '#004aad', 
                    backgroundColor: '#004aad', 
                    fill: false, 
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true, 
            maintainAspectRatio: false, 
            scales: {
                y: {
                    beginAtZero: true, 
                    ticks: {
                        font: {
                            size: 14, 
                            family: 'Poppins', 
                            weight: 'bold'
                        }
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: 14, 
                            family: 'Poppins', 
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 14, 
                            family: 'Poppins', 
                        }
                    }
                }
            }
        }
    });
});


// POPUP DELETE MESSAGE IN MANAGE ACOUNTS
document.addEventListener('DOMContentLoaded', function () {
    const trashIcons = document.querySelectorAll('.bx-archive-in');
    const popup = document.getElementById('popup');
    const cancelBtn = document.getElementById('cancelBtn');
    const continueBtn = document.getElementById('continueBtn');
  
    for (let i = 0; i < trashIcons.length; i++) {
      trashIcons[i].addEventListener('click', function () {
        // Show the popup 
        if (popup.style.display === 'none' || popup.style.display === '') {
          popup.style.display = 'flex';
        }
      });
    }
  
    // Cancel button click event
    cancelBtn.addEventListener('click', function () {
      // Hide the popup
      if (popup.style.display === 'flex') {
        popup.style.display = 'none';
      }
    });
  
    // Continue button click event
    continueBtn.addEventListener('click', function () {
      alert('User deleted successfully!');
  
      if (popup.style.display === 'flex') {
        popup.style.display = 'none';
      }
    });
});


//FILTER IN SORTING USER NAMES
document.addEventListener('DOMContentLoaded', function () {
    const filterButton = document.querySelector('.bx-filter');
    const tableBody = document.querySelector('.user-table tbody');
  
    filterButton.addEventListener('click', function () {
        const rows = tableBody.querySelectorAll('tr');
        
        // Array to store name and corresponding row
        const rowsArray = [];
        for (let i = 0; i < rows.length; i++) {

          const nameCell = rows[i].querySelector('.name');
          const nameText = nameCell.textContent.trim();
        
          // Push the name and the corresponding row to the array
          rowsArray.push({ name: nameText, row: rows[i] });
        }
      
        // Alphabetical order
        for (let i = 0; i < rowsArray.length; i++) {
          for (let j = 0; j < rowsArray.length - 1; j++) {
            if (rowsArray[j].name > rowsArray[j + 1].name) {
              // Swap the elements
              const temp = rowsArray[j];
              rowsArray[j] = rowsArray[j + 1];
              rowsArray[j + 1] = temp;
            }
          }
        }
      
        tableBody.innerHTML = '';
      
        for (let i = 0; i < rowsArray.length; i++) {
          tableBody.appendChild(rowsArray[i].row);
        }
    });
});
  

//SEARCH BAR FOR USERS
document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.querySelector('.search-bar');
    const tableRows = document.querySelectorAll('.user-table tbody tr');
  
    searchBar.addEventListener('input', () => {
        const query = searchBar.value.toLowerCase();
        
        // Loop sa tanan table rows
        for (let i = 0; i < tableRows.length; i++) {
            const nameCell = tableRows[i].querySelector('.name');
            const name = nameCell.textContent.toLowerCase();
            
            if (query === '' || name.includes(query)) {
              tableRows[i].style.display = '';
            } else {
              tableRows[i].style.display = 'none';
            }
        }
    });
});
  

//TOTAL NO. AND CURRENT NO. IN THE DASHBOARD (ACCOUNTS & POSTS REQUESTS)
document.addEventListener("DOMContentLoaded", function() {
  const tableRows = document.querySelectorAll('.user-table tbody tr');
  
  let rowCount = 0;

  for (let i = 0; i < tableRows.length; i++) {
      const cells = tableRows[i].querySelectorAll('td');
      
      let hasContent = false;
      
      for (let j = 0; j < cells.length; j++) {
          if (cells[j].textContent.trim() !== "" || cells[j].querySelector('img') !== null) {
              hasContent = true;
              break;  
          }
      }
      
      if (hasContent) {
          rowCount++;
      }
  }

  const totalUsersElement = document.querySelector('.total-users');
  const aNumberElement = document.querySelector('.a_number');
  const aBadgeElement = document.querySelector('.a-badge');

  if (totalUsersElement) {
      totalUsersElement.textContent = rowCount || 0;
  }

  if (aNumberElement) {
      aNumberElement.textContent = rowCount || 0;
  }

  if (aBadgeElement) {
      aBadgeElement.textContent = 0;
  }

  const rNumberElement = document.querySelector('.r_number');
  const pBadgeElement = document.querySelector('.p-badge');

  const today = new Date().toDateString();

  const lastUpdatedDate = localStorage.getItem('lastUpdatedDate');
  if (lastUpdatedDate !== today) {
      localStorage.setItem('dailyCardCount', 0);
      localStorage.setItem('lastUpdatedDate', today);
  }

  // Update the counts
  function updateCardCounts() {
      const cards = document.querySelectorAll('.posts-wrapper .card');
      
      rNumberElement.textContent = cards.length || 0;

      let dailyCardCount = parseInt(localStorage.getItem('dailyCardCount')) || 0;

      const trackedCardCount = parseInt(localStorage.getItem('trackedCardCount')) || 0;

      if (cards.length > trackedCardCount) {
          dailyCardCount += cards.length - trackedCardCount;
          localStorage.setItem('dailyCardCount', dailyCardCount);
          localStorage.setItem('trackedCardCount', cards.length);
      }

      // Update the badge
      pBadgeElement.textContent = dailyCardCount || 0;
  }

  updateCardCounts();

  // New card additions 
  const postsWrapper = document.querySelector('.posts-wrapper');
  const observer = new MutationObserver(updateCardCounts);

  if (postsWrapper) {
      observer.observe(postsWrapper, { childList: true });
  }

  // Display 0 if no rows or cards exist
  if (tableRows.length === 0) {
      aBadgeElement.textContent = 0;
  }

  const cards = document.querySelectorAll('.posts-wrapper .card');
  if (cards.length === 0) {
      pBadgeElement.textContent = 0;
      rNumberElement.textContent = 0;
  }
});


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
document.getElementById('password-view').style.display = 'none';  
document.getElementById('password-edit').style.display = 'block'; 
});

document.getElementById('hide-link').addEventListener('click', function(e) {
e.preventDefault();
document.getElementById('password-view').style.display = 'flex';
document.getElementById('password-edit').style.display = 'none'; 
});

document.getElementById('save-password-btn').addEventListener('click', function() {
var newPassword = document.getElementById('new-password').value;
var currentPassword = document.getElementById('current-password').value;

if (!newPassword || !currentPassword) {
    alert('Please fill in both fields.');
    return;
}

if (newPassword.length < 8) {
    alert('New password must be at least 8 characters long.');
    return;
}

if (!/[A-Z]/.test(newPassword)) {
    alert('New password must contain at least one uppercase letter.');
    return;
}

if (!/[a-z]/.test(newPassword)) {
    alert('New password must contain at least one lowercase letter.');
    return;
}

if (!/[0-9]/.test(newPassword)) {
    alert('New password must contain at least one number.');
    return;
}

if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
    alert('New password must contain at least one special character.');
    return;
}

alert('Password successfully changed!');

document.getElementById('password-view').style.display = 'flex';  
document.getElementById('password-edit').style.display = 'none'; 
});


//DELETE ACC POP-UP
document.addEventListener("DOMContentLoaded", function () {
const deleteLink = document.querySelector(".delete-link");
const popup = document.getElementById("s-popup");
const continueButton = document.getElementById("s-continueButton");
const cancelButton = document.getElementById("s-cancelButton");

// Show the popup when the delete link is clicked
deleteLink.addEventListener("click", function (event) {
    event.preventDefault();
    popup.style.display = "flex";
});

// Handle the Continue button click (delete action)
continueButton.addEventListener("click", function () {
    popup.style.display = "none";
    alert("Account deleted successfully."); 
});

// Handle the Cancel button click (close popup)
cancelButton.addEventListener("click", function () {
    popup.style.display = "none";
});
});


//UPLOAD PROFILE PIC
const uploadButton = document.querySelector('.upload-btn');
const removeButton = document.querySelector('.remove-btn');
const profilePics = document.querySelectorAll('.profile-pic1, .profile-pic2');

const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = 'image/*';

uploadButton.addEventListener('click', function () {
  fileInput.click();
});

fileInput.addEventListener('change', function () {
  if (fileInput.files && fileInput.files[0]) {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      for (let i = 0; i < profilePics.length; i++) {
        profilePics[i].style.backgroundImage = `url('${e.target.result}')`;
        profilePics[i].style.backgroundSize = 'cover';
        profilePics[i].style.backgroundPosition = 'center';
      }
      checkImageDisplay(); 
    };

    reader.readAsDataURL(file);
  }
});

// Function to check if any profile picture has an image
function checkImageDisplay() {
  let hasImage = false;
  for (let i = 0; i < profilePics.length; i++) {
    if (profilePics[i].style.backgroundImage) {
      hasImage = true;
      break;
    }
  }
  if (hasImage) {
    removeButton.style.display = 'block'; 
  } else {
    removeButton.style.display = 'none'; 
  }
}

removeButton.addEventListener('click', function () {
  for (let i = 0; i < profilePics.length; i++) {
    profilePics[i].style.backgroundImage = '';
  }
  checkImageDisplay(); 
});


//SETTINGS-PROFILE FORM
const pencilIcon = document.querySelector('.bxs-pencil');
const formButtons = document.querySelector('.form-buttons');
const inputField = document.querySelector('.input-field');
const textareaField = document.querySelector('.textarea-field');
const saveButton = document.querySelector('.save-btn');
const clearButton = document.querySelector('.clear-btn');

formButtons.style.display = 'none';
inputField.disabled = true;
textareaField.disabled = true;

const formElements = [inputField, textareaField, formButtons];

pencilIcon.addEventListener('click', function() {
    for (let i = 0; i < formElements.length; i++) {
        if (formElements[i] === formButtons) {
            if (formButtons.style.display === 'none') {
                formButtons.style.display = 'block'; 
                inputField.disabled = false;
                textareaField.disabled = false; 
            } else {
                formButtons.style.display = 'none'; 
                inputField.disabled = true; 
                textareaField.disabled = true; 
            }
        }
    }
});


saveButton.addEventListener('click', function(event) {
    event.preventDefault(); 

    console.log('Saved Username:', inputField.value);
    console.log('Saved Bio:', textareaField.value);
});

clearButton.addEventListener('click', function(event) {
    event.preventDefault(); 

    inputField.value = '';
    textareaField.value = '';
});

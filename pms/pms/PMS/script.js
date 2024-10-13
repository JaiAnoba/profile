const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right_panel_active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right_panel_active");
});            

// HOME

var toggle_btn;
var big_wrapper;
var hamburger_menu;

function declare() {
  toggle_btn = document.querySelector(".toggle-btn");
  big_wrapper = document.querySelector(".big-wrapper");
  hamburger_menu = document.querySelector(".hamburger-menu");
}

const main = document.querySelector("main");

declare();

let dark = false;

function toggleAnimation() {
  // Clone the wrapper
  dark = !dark;
  let clone = big_wrapper.cloneNode(true);
  if (dark) {
    clone.classList.remove("light");
    clone.classList.add("dark");
  } else {
    clone.classList.remove("dark");
    clone.classList.add("light");
  }
  clone.classList.add("copy");
  main.appendChild(clone);

  document.body.classList.add("stop-scrolling");

  clone.addEventListener("animationend", () => {
    document.body.classList.remove("stop-scrolling");
    big_wrapper.remove();
    clone.classList.remove("copy");
    // Reset Variables
    declare();
    events();
  });
}

function events() {
  toggle_btn.addEventListener("click", toggleAnimation);
  hamburger_menu.addEventListener("click", () => {
    big_wrapper.classList.toggle("active");
  });
}

events();

// USER
let toggle = document.querySelector('.toggle');
let left = document.querySelector('.left');
let right = document.querySelector('.right');
let close = document.querySelector('.close');
let body = document.querySelector('body');
let searchBx = document.querySelector('.searchBx');
let searchOpen = document.querySelector('.searchOpen');
let searchClose = document.querySelector('.searchClose');
toggle.addEventListener('click', () => {
	toggle.classList.toggle('active');
	left.classList.toggle('active');
	right.classList.toggle('overlay');
	body.style.overflow = 'hidden';
});
close.onclick = () => {
	toggle.classList.remove('active');
	left.classList.remove('active');
	right.classList.remove('overlay');
	body.style.overflow = '';
};
searchOpen.onclick = () => {
	searchBx.classList.add('active');
};
searchClose.onclick = () => {
	searchBx.classList.remove('active');
};
window.onclick = (e) => {
	if (e.target == right) {
		toggle.classList.remove('active');
		left.classList.remove('active');
		right.classList.remove('overlay');
		body.style.overflow = '';
	}
};

// USER DROPDOWN
// let profile = document.querySelector(".profile");
// let menu = document.querySelector(".menu");
// 
// 
// profile.addEventListener("click", ()=>{
    // menu.classList.toggle("active")
// })      

// Function to toggle the check circle
function toggleCheck(element) {
  element.classList.toggle("checked");
}

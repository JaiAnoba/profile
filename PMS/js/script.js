const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right_panel_active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right_panel_active");
});            


// USER
// let toggle = document.querySelector('.toggle');
// let left = document.querySelector('.left');
// let right = document.querySelector('.right');
// let close = document.querySelector('.close');
// let body = document.querySelector('body');
// let searchBx = document.querySelector('.searchBx');
// let searchOpen = document.querySelector('.searchOpen');
// let searchClose = document.querySelector('.searchClose');
// toggle.addEventListener('click', () => {
	// toggle.classList.toggle('active');
	// left.classList.toggle('active');
	// right.classList.toggle('overlay');
	// body.style.overflow = 'hidden';
// });
// close.onclick = () => {
	// toggle.classList.remove('active');
	// left.classList.remove('active');
	// right.classList.remove('overlay');
	// body.style.overflow = '';
// };
// searchOpen.onclick = () => {
	// searchBx.classList.add('active');
// };
// searchClose.onclick = () => {
	// searchBx.classList.remove('active');
// };
// window.onclick = (e) => {
	// if (e.target == right) {
		// toggle.classList.remove('active');
		// left.classList.remove('active');
		// right.classList.remove('overlay');
		// body.style.overflow = '';
	// }
// };

// CHECK CIRCLE
function toggleCheck(element) {
  element.classList.toggle("checked");
}



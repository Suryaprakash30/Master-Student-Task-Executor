const users = [];
const name = document.getElementById("name");
const email = document.getElementById("email");
const pass = document.getElementById("password");
const checkbox = document.getElementById("checkbox");
const logEmail = document.getElementById("logEmail");
const logPassword = document.getElementById("logPassword");

const validEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;
const toolTip1 = document.getElementsByClassName("tooltiptext")[0];
const signUp = document.getElementById("signup");
const loginModal = document.querySelector(".loginModal");
const modal = document.getElementById("modal");
const loginClose = document.querySelector(".close");
const logIn = document.getElementById("login");

function restoreFromLocalStorage() {
	const user = JSON.parse(localStorage.getItem('users'));
	if(user) {
		users.push(...user);
	}
}

pass.addEventListener('keyup', () => {
	if(!pass.value.match(validPassword)) {
		toolTip1.style.visibility = "visible";
		} else {
		toolTip1.style.visibility = "hidden";
	}
});

signUp.onclick = (e) => {
	if(email.value.match(validEmail)) {
		if(pass.value.match(validPassword)) {
			if(checkbox.checked) {
				e.preventDefault();
				const role = document.querySelector("[name=role]:checked");
				let user = {
					id: Date.now(),
					name: name.value,
					role: role.value,
					email: email.value,
					password: pass.value,
				};
				users.push(user);
				localStorage.setItem('users', JSON.stringify(users));
				alert("You have successfully registered. Login to continue");
				window.location.href = "index.html";
				} else {
				checkbox.setCustomValidity('Agree to terms and condition');
			}
			} else {
			pass.setCustomValidity('Match the format');
		}
		} else {
		email.setCustomValidity('Invalid email format');
	}
};

logIn.onclick = (e) => {
	const user = users.find(user => user.email == logEmail.value);
	if(user) {
		if(user.password == logPassword.value) {
			if(user.role === "master") {
				e.preventDefault();
				window.location.href = "master.html";
				} else {
				e.preventDefault();
				window.location.href = "student.html";
			}
			} else {
			logPassword.setCustomValidity('Password did not match');
		}
		} else {
		logEmail.setCustomValidity('Email not found');
	}
}

// Login Modal
loginModal.onclick = function() {
	modal.style.display = "block";
}
loginClose.onclick = function() {
	modal.style.display = "none";
}

window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}

window.onkeydown = function(event) {
	if (event.key == "Escape") {
		modal.style.display = "none";
	}
}

restoreFromLocalStorage();
"use strict";

//Enable tooltips everywhere
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
	return new bootstrap.Tooltip(tooltipTriggerEl)
})

    
new GitHubCalendar("#github-graph", "yoga-saputra", { responsive: true });

var form = document.getElementById("contactForm");

async function handleSubmit(event) {
	event.preventDefault();
	var status = document.getElementById("my-form-status");
	var data = new FormData(event.target);
	fetch(event.target.action, {
		method: form.method,
		body: data,
		headers: {
			'Accept': 'application/json'
		}
	}).then(response => {
		if (response.ok) {
		status.innerHTML = "Thanks for your submission!";
		status.style.color = "green"
		form.reset()
		} else {
		response.json().then(data => {
			if (Object.hasOwn(data, 'errors')) {
				status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
				status.style.color = "red"
			} else {
				status.innerHTML = "Oops! There was a problem submitting your form"
				status.style.color = "red"
			}
		})
		}
	}).catch(error => {
		status.innerHTML = "Oops! There was a problem submitting your form"
		status.style.color = "red"
	});
}
form.addEventListener("submit", handleSubmit)
    

var darkSwitch = document.getElementById("darkSwitch");
window.addEventListener("load", function () {
if (darkSwitch) {
	initTheme();
	darkSwitch.addEventListener("change", function () {
		resetTheme();
	});
}
});

/**
 * Summary: function that adds or removes the attribute 'data-theme' depending if
 * the switch is 'on' or 'off'.
 *
 * Description: initTheme is a function that uses localStorage from JavaScript DOM,
 * to store the value of the HTML switch. If the switch was already switched to
 * 'on' it will set an HTML attribute to the body named: 'data-theme' to a 'dark'
 * value. If it is the first time opening the page, or if the switch was off the
 * 'data-theme' attribute will not be set.
 * @return {void}
 */
function initTheme() {
var darkThemeSelected = localStorage.getItem("darkSwitch") === "dark";
darkThemeSelected
	? document.body.setAttribute("data-theme", "dark")
	: document.body.removeAttribute("data-theme");
}

/**
 * Summary: resetTheme checks if the switch is 'on' or 'off' and if it is toggled
 * on it will set the HTML attribute 'data-theme' to dark so the dark-theme CSS is
 * applied.
 * @return {void}
 */
function resetTheme() {
	if (darkSwitch.checked) {
		document.body.setAttribute("data-theme", "dark");
		localStorage.setItem("darkSwitch", "dark");
	} else {
		document.body.removeAttribute("data-theme");
		localStorage.removeItem("darkSwitch");
	}
}
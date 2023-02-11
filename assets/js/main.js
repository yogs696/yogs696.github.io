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
    
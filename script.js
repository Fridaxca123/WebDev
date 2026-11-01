const title = document.getElementById("main-title");
title.innerHTML = "Welcome to Asian Beauty!";

// getElementsByClassName()
const links = document.getElementsByClassName("nav-link");

for (let i = 0; i < links.length; i++) {
    links[i].style.setProperty("color", "red", "important");
}

// Modal elements
const subscribeBtn = document.getElementById("subscribe-btn");
const modal = document.getElementById("subscribe-modal");
const closeBtn = document.getElementById("close-modal");
const form = document.getElementById("subscribe-form");

// Open modal
subscribeBtn.addEventListener("click", function () {
    modal.style.display = "flex";
});

// Close modal
closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
});

// Close when clicking outside
modal.addEventListener("click", function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Submit form
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    modal.innerHTML = `
        <div class="modal-content">
            <h2>Thank you, ${name}!</h2>
            <p>You have successfully subscribed with ${email}.</p>
            <button id="finish-btn">Close</button>
        </div>
    `;

    document.getElementById("finish-btn").addEventListener("click", function () {
        modal.style.display = "none";
    });
});

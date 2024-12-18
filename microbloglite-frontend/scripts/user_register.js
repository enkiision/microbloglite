"use strict"

document.getElementById('userRegister').addEventListener('submit', function (event) {
    event.preventDefault();
    
    // input values
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const cPassword = document.getElementById("cPassword").value;

    // Validate that passwords match
    if (password !== cPassword) {
        alert('Passwords do not match!');
        return;
    }

     // Prepare user data
        const userData = { firstName, lastName, username, password };

     // Send POST request to the API
    fetch(`http://microbloglite.us-east-2.elasticbeanstalk.com/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    })
        .then((response) => {
            if (response.ok) {
                alert('User registered successfully!');
                // Redirect to the posts.html page
                window.location.href = "posts.html";
            } else if (response.status === 403) {
                alert('Username already in use. Please try another!');
            } else {
                throw new Error('Failed to register user');
            }
        })
        .catch((error) => console.error('Error:', error));
});
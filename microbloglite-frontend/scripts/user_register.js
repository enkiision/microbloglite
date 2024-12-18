"use strict";

document.getElementById("user_register").addEventListener("submit", function (event) {
  event.preventDefault();

  // input values
  // const firstName = document.getElementById("firstName").value.trim();
  const fullName = document.getElementById("fullName").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  // const cPassword = document.getElementById("cPassword").value;

  // Validate that passwords match
//   if (password !== cPassword) {
//     alert("Passwords do not match!");
//     return;
//   }

  // Prepare user data
  const userData = { fullName, username, password };

  // Send POST request to the API
  fetch(`http://microbloglite.us-east-2.elasticbeanstalk.com/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (response.ok) {
        alert("User registered successfully!");
        // Redirect to the posts.html page
        window.location.href = "posts.html";
      } else if (response.status === 403) {
        alert("Username already in use. Please try another!");
      } else {
        throw new Error("Failed to register user");
      }
    })
    .catch((error) => console.error("Error:", error));
});

//Tim's Version

async function createProfile(event) {
    event.preventDefault()
  // const firstName = document.getElementById("firstName").value.trim();
  const fullName = document.getElementById("fullName").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  // const cPassword = document.getElementById("cPassword").value;
  let signUp = {
    fullName: fullName,
    username: username,
    password: password,
  };

  try {
    let promise = fetch(`http://microbloglite.us-east-2.elasticbeanstalk.com/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signUp),
    });
    let response = await promise;
    let data = await response.json();
    console.log(data)
  } catch (error) {
    console.error("Error message", error.message);
  }
}

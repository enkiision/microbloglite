"use strict";

async function createProfile(event) {
    event.preventDefault()
  // const firstName = document.getElementById("firstName").value.trim();
  const fullName = document.getElementById("fullName").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  // const cPassword = document.getElementById("cPassword").value; I wanted to add a confirm password field but I needed to make more time
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

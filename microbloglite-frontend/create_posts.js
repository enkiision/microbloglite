"use strict";


async function createAPost() {
  const loginData = getLoginData();
  let newPost = {
    text: document.getElementById("quack").value.trim(),
  };
  try {
    let response = await fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginData.token}`,
      },
      body: JSON.stringify(newPost),
    });
    let data = await response.json();
    console.log(data);
    if (response.ok) {
      window.location.href = "posts.html";
    } else {
      console.warn("Not posting");
    }
  } catch (error) {
    console.error(error);
  }
}
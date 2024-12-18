/* Posts Page JavaScript */

"use strict";
//  Load multiple posts from the api

async function getPosts() {
  const loginData = getLoginData();
  try {
    let promise = fetch(apiBaseURL+"/api/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginData.token}`,
      },
    });
    let response = await promise;
    console.log(response);
    
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
}
function displayPosts(posts) {
  const container = document.getElementById("posts-container");
  container.innerHTML = ""; // this will clear any exisiting content

  posts.forEach ((post) => {
    const postQuack = document.createElement("div");
    postQuack.classList.add(col-md-4);

    container.appendChild(postQuack)
  }
  )
}

getPosts();

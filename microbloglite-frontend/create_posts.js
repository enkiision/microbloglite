"use strict";


async function newPosts() {
  const loginData = getLoginData();
  if (!loginData || !loginData.token) {
    console.error("User is not logged in or no token found!");
    return;
  }

  const postContent = {
    username: loginData.username,
    text: document.getElementById("quack").value,
  };

  try {
    const response = await fetch(
      "http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginData.token}`,
        },
        body: JSON.stringify(postContent),
      } // Closing parenthesis for fetch options object
    );

    if (!response.ok) {
      throw new Error("Failed to create a new post.");
    }

    const data = await response.json();
    console.log("Post created successfully:", data);


    window.location.href = "posts.html"; // Redirect to posts.html after successful creation
  } catch (error) {
    console.error("Error creating post:", error);
  }
}

async function fetchAndDisplayPosts() {
  try {
    const loginData = getLoginData
    const response = await fetch(
      "http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts",
      {
        headers: {
          Authorization: `bearer ${loginData.token},`
        },
      }
    );
    

    if (!response.ok) {
      throw new Error(`Failed to fetch posts. Status:${response.status}`);
    }

    const posts = await response.json(); // Assign fetched data to posts
    console.log(posts);

    const postsContainer = document.getElementById("postsContainer"); // Corrected ID
    postsContainer.innerHTML = ""; // This will clear the existing content

    // Ensure the posts forEach loop is properly closed
    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.className = "post card mb-3 p-3";

      // Format the post content 
      postElement.innerHTML = `
        <h5 class="card-title">${post.username}</h5>
        <p class="card-text">${post.text}</p>
        <small class="text-muted">Posted on: ${new Date(
          post.createdAt
        ).toLocaleString()}</small>`;

      // Append to the container
      postsContainer.appendChild(postElement);
    }); // Closing the forEach loop properly
    } catch (error) {
    // console.error("Error displaying posts:", error);
  }
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", fetchAndDisplayPosts);

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form from reloading the page
  newPosts();
});


/* Clear existing rows in the table body
       while (tasksTableBody.firstChild) {
         tasksTableBody.removeChild(tasksTableBody.firstChild);
       } */
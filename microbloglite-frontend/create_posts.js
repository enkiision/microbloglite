"use strict";

// async function fetchAndDisplayPosts() {
//   try {
//     const loginData = getLoginData(); 
//     const response = await fetch(
//       "http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts",
//       {
//         headers: {
//           Authorization: `Bearer ${loginData.token}`
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`Failed to fetch posts. Status:${response.status}`);
//     }
//     const posts = await response.json(); // Assign fetched data to posts
//     console.log(posts);

//     const postsContainer = document.getElementById("postsContainer"); // Corrected ID
//     postsContainer.innerHTML = ""; // This will clear the existing content

//     // posts forEach loop is properly closed
//     posts.forEach((post) => {
//       const postElement = document.createElement("div");
//       postElement.className = "post card mb-3 p-3";
 
//       postElement.innerHTML = `
//         <h5 class="card-title">${post.username}</h5>
//         <p class="card-text">${post.text}</p>
//         <small class="text-muted">Posted on: ${new Date(
//           post.createdAt
//         ).toLocaleString()}</small>`;

//       // Append to the container
//       postsContainer.appendChild(postElement);
//     });
//   } catch (error) {
//     console.error("Error displaying posts:", error); // Fixed the console.error invocation
//   }
// }

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
/* Posts Page JavaScript */

"use strict";

function getLoginData() {
  const loginData = localStorage.getItem("login-data");
  return loginData ? JSON.parse(loginData) : null; // Return parsed loginData if found, otherwise null
}

//check to make sure login works
async function login(username, password) {
  try {
    const response = await fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      throw new Error("Login failed!");
    }
    const data = await response.json();
    console.log("Login successful:", data);

    // Save login data to localStorage
    localStorage.setItem("login-data", JSON.stringify(data));
  } catch (error) {
    console.error("Error during login:", error);
  }
}

//  Load multiple posts from the api

async function getPosts() {
  const loginData = getLoginData();
  console.log("login data:",loginData);
  

    // Check if loginData is valid (if not, return an empty array to avoid breaking the rest of the code)
    // if (!loginData || !loginData.token) {
    //   console.error("User is not logged in or no token found!");
    //   return []; // Return an empty array if user is not logged in or no token is found
    // }

  try {
    const response = await fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginData.token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch posts!");
    }
    const data = await response.json(); // Now it's inside the async function
    console.log(data);
    return data;  // Return the posts data
  } catch (error) {
    console.error("Error fetching posts:", error);
    return []; // Return an empty array on error
  }
}

// Display posts on the page - asynchronous
async function displayPosts(posts) {
const container = document.getElementById("posts-container");
container.innerHTML = ""; // Clear any existing content

// Loop through the posts and create cards for each
posts.forEach(post => {
const card = createCard(post);  // Create the card
container.appendChild(card);    // Append the created card to the container
});
}

// function displayPosts(posts) {
//   const container = document.getElementById("posts-container");
//   container.innerHTML = ""; // this will clear any exisiting content

//   posts.forEach ((post) => {
//     const card = createCard(post)
//     container.appendChild(card);
//      console.log(card);
//   });
// }
function createCard(post) {

  // Create the main card div
  const card = document.createElement('div');
  card.className = 'card';

  // Create the card-body div
  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  // Create the card-text paragraph
  const textParagraph = document.createElement('p');
  textParagraph.className = 'card-text';
  textParagraph.textContent = post.text;

  // Create the username paragraph
  const usernameParagraph = document.createElement('p');
  usernameParagraph.className = 'text-muted';
  usernameParagraph.textContent = post.username;

  // Create the createdAt paragraph
  const createdAtParagraph = document.createElement('p');
  createdAtParagraph.className = 'text-muted';
  createdAtParagraph.textContent = new Date(post.createdAt).toLocaleString();

  // Append paragraphs to card-body
  cardBody.appendChild(textParagraph);
  cardBody.appendChild(usernameParagraph);
  cardBody.appendChild(createdAtParagraph);

  // Append card-body to card
  card.appendChild(cardBody);

  return card;
}


// Initialize the page by fetching posts and displaying them
async function initializePage() {
  const posts = await getPosts();
  displayPosts(posts);  // Display posts on the page
}

initializePage();  // Run the function to initialize and display posts

// interactive variables for posts****************

// const postUsername = document.querySelector("#postUsername");
// const postContent = document.querySelector("#postText");
// const postsContainer = document.querySelector("#postsContainer");

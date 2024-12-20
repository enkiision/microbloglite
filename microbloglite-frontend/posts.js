

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
    return data;  // Return posts data
  } catch (error) {
    console.error("Error fetching posts:", error);
    return []; 
  }
}

// Display posts on the page w/ async function
async function displayPosts(posts) {
const container = document.getElementById("posts-container");
container.innerHTML = ""; // Clear any existing content

// Loop through the posts and create cards for each
posts.forEach(post => {
const card = createCard(post);  // Create  card
container.appendChild(card);    // Append  created card to the container
});
}

function createCard(post) {

  //  main card div
  const card = document.createElement('div');
  card.className = 'card';

  // card-body div
  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  //  card-text paragraph
  const textParagraph = document.createElement('p');
  textParagraph.className = 'card-text';
  textParagraph.textContent = post.text;

  //  username paragraph
  const usernameParagraph = document.createElement('p');
  usernameParagraph.className = 'text-muted';
  usernameParagraph.textContent = post.username;

  //  createdAt paragraph
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

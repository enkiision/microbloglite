"use strict"
// this page isnt complete yet with poplating the bio but it does populate the username and full name.|| it does populate the bio for my specific account but I was in a frenzy doing this and I can'r remember why.
  //receive data from local storage
function getLoginData(){
  const loginData = localStorage.getItem("login-data");
  return loginData ? JSON.parse(loginData) : null;
}
// Function to fetch and display the user's profile
  async function fetchUserProfile() {
    const loginData = getLoginData();
  
    if (!loginData || !loginData.token) {
      console.error("User is not logged in or no token found!");
      window.location.replace("index.html")// redirects to login if not signed in
      return;
    }
  
    try {
      const response = await fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/users/" + loginData.username, {
        headers: {
          Authorization: `Bearer ${loginData.token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch user profile.");
  
      //populating the form fields
      const userData = await response.json();

      document.getElementById("fullName").value = userData.fullName;

      document.getElementById("username").value = userData.username;

      document.getElementById("bio").value = userData.bio;

      //display full name prominently

      document.getElementById("displayFullName").textContent = `Welcome, ${userData.fullName}`;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        alert("Failed to load profile. Please try again later.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchUserProfile();
});
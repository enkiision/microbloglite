// use this to load the profile information when the profile html is run

"use strict"

//logout function


document.addEventListener("DOMContentLoaded", () => {
    // Logout button event listener
    const logoutButton = document.getElementById("logoutButton");
  
    if (logoutButton) {
      logoutButton.addEventListener("click", () => {
        logout(); // Call the logout function
      });
    }
  });

  //profile function

  async function fetchUserProfile() {
    const loginData = getLoginData();
  
    if (!loginData || !loginData.token) {
      console.error("User is not logged in or no token found!");
      return;
    }
  
    try {
      const response = await fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/users/" + loginData.username, {
        headers: {
          Authorization: `Bearer ${loginData.token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch user profile.");
  
      const userData = await response.json();
      document.getElementById("fullName").value = userData.fullName;
      document.getElementById("username").value = userData.username;
      document.getElementById("bio").value = userData.bio;
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  }
  
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const crudSection = document.getElementById("crudSection");
  const userDetails = document.getElementById("userDetails");
  const createUserForm = document.getElementById("createUserForm");

//   let bearerToken = null;

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
  

var myHeaders = new Headers();
myHeaders.append("Content-Type", "text/plain",);
myHeaders.append('Access-Control-Allow-Origin','*');
myHeaders.append('Access-Control-Allow-Methods','POST');
var raw = "{\r\n\"login_id\":\"test@sunbasedata.com\",\r\n\"password\" :\"Test@123\"\r\n}";

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  
};
/*
var loginURL = http://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp;

jQuery(document).on('click', '#CompleteReview', function() {
    $.ajax({
        url: loginURL,
        type: 'POST',
        data: { 'course_id': course_id, 'review_id': review_id},
        success: function (response) {
            //return false;
            if (response.redirect_url == 'unauthorized' || typeof (response.redirect_url) == 'undefined') {
                window.location.href = HTTP_SERVER + "unauthorized";
                return false;
            }
            if (response.success == true) {
                window.location.href = HTTP_SERVER + 'view-request-review/' + response.encripted_course_id + "/" + response.encripted_review_id + "/" + response.formname;
            }
        },
        error: function error(err) {
            console.log(err);
        }
    });

});*/




fetch("https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp", requestOptions)
  .then((response) => response.text())
  .then((result) => {alert(result)
    localStorage.setItem('token', JSON.stringify(result.access_token));
    
})
  .catch(error => console.log('error', error));
  });

  createUserForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const newUsername = event.target.newUsername.value;
    const newEmail = event.target.newEmail.value;

    // Simulate API call for creating a user
    simulateCreateUser(newUsername, newEmail)
      .then(() => {
        // Simulate API call to fetch user details after creating
        simulateGetUserDetails()
          .then((users) => {
            displayUserDetails(users);
          });
      })
      .catch((error) => {
        alert("Failed to create user. Please try again.");
      });
  });










  function simulateCreateUser(username, email) {
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        resolve();
      }, 500); // Simulate 0.5 seconds delay
    });
  }

  function simulateGetUserDetails() {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        const users = [
          { id: 1, username: "john_doe", email: "john.doe@example.com" },
          { id: 2, username: "jane_doe", email: "jane.doe@example.com" }
        ];
        resolve(users);
      }, 500); // Simulate 0.5 seconds delay
    });
  }

  function showCRUDSection() {
    loginForm.style.display = "none";
    crudSection.style.display = "block";

    // Simulate API call to fetch user details after login
    simulateGetUserDetails()
      .then((users) => {
        displayUserDetails(users);
      });
  }

  function displayUserDetails(users) {
    userDetails.innerHTML = "";
    users.forEach((user) => {
      const userDiv = document.createElement("div");
      userDiv.innerHTML = `<p><strong>ID:</strong> ${user.id}</p>
                           <p><strong>Username:</strong> ${user.username}</p>
                           <p><strong>Email:</strong> ${user.email}</p>`;
      userDetails.appendChild(userDiv);
  });
 }
});

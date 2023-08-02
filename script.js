document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const crudSection = document.getElementById("crudSection");
    const userDetails = document.getElementById("userDetails");
    const createUserForm = document.getElementById("createUserForm");
    const DeleteUser = document.getElementById("deleteUserForm");
    const EditUser = document.getElementById("editUserForm");


    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "text/plain",);
        myHeaders.append('Access-Control-Allow-Origin', '*');
        myHeaders.append('Access-Control-Allow-Methods', 'POST');
        var raw = "{\r\n\"login_id\":\"test@sunbasedata.com\",\r\n\"password\" :\"Test@123\"\r\n}";

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,

        };
        fetch("https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                alert(result)
                localStorage.setItem('token', JSON.stringify(result.access_token));

            })
            .catch(error => console.log('error', error));
    });


    createUserForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const Fnm = event.target.FirstName.value;
        const Lnm = event.target.LastName.value;
        const email = event.target.Email.value;
        const phone = event.target.Phone.value;
        const street = event.target.Street.value;
        const cty = event.target.City.value;
        const state = event.target.State.value;
        const address = event.target.Address.value;



        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer dGVzdEBzdW5iYXNlZGF0YS5jb206VGVzdEAxMjM=");
        myHeaders.append("Content-Type", "text/plain");

        var raw = "{\r\n\"first_name\": \"Jane\",\r\n\"last_name\": \"Doe\",\r\n\"street\": \"Elvnu Street\",\r\n\"address\": \"H no 2 \",\r\n\"city\": \"Delhi\",\r\n\"state\": \"Delhi\",\r\n\"email\": \"sam@gmail.com\",\r\n\"phone\": \"12345678\"\r\n}";

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=update&uuid=test2d66b0a03a7c4cc6abc41c6c4d7ffdfe", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));


    });

    DeleteUser.addEventListener("submit", function (event) {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer dGVzdEBzdW5iYXNlZGF0YS5jb206VGVzdEAxMjM=");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=delete&uuid=test114c540210744fb7b1f47309214f7982", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    });

    EditUser.addEventListener("submit", function (event) {
        event.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer dGVzdEBzdW5iYXNlZGF0YS5jb206VGVzdEAxMjM=");
        myHeaders.append("Content-Type", "text/plain");

        var raw = "{\r\n\"first_name\": \"Jane\",\r\n\"last_name\": \"Doe\",\r\n\"street\": \"Elvnu Street\",\r\n\"address\": \"H no 2 \",\r\n\"city\": \"Delhi\",\r\n\"state\": \"Delhi\",\r\n\"email\": \"sam@gmail.com\",\r\n\"phone\": \"12345678\"\r\n}";

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=update&uuid=test2d66b0a03a7c4cc6abc41c6c4d7ffdfe", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));


    });


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

const userName = document.getElementById("userName");
const userMail = document.getElementById("userMail");
const userTel = document.getElementById("userTel");
const sendBtn = document.getElementById("sendBtn");
const randomBtn = document.getElementById("randomBtn");

printUsers();

sendBtn.addEventListener("click", () => {
    sendUser();
});

randomBtn.addEventListener("click", () => {
    randomUser();
});


function sendUser() {
    newUser = {userName: userName.value, userMail: userMail.value, userTel: userTel.value};

    fetch("http://localhost:3000/users/", {method: "post", headers: {"Content-type": "application/json"}, body: JSON.stringify(newUser)})
    .then(resp => resp.json())
    .then(data => {
        // console.log(data);
    });
};

function printUsers() {
    let usersContainer = document.getElementById("usersContainer");

    fetch("http://localhost:3000/users/allUsers")
    .then(resp => resp.json())
    .then(data => {
        console.log("Get users: ", data);
        usersContainer.insertAdjacentHTML("beforeend", `<h2>Alla användare</h2>`);

        for (user in data) {
            usersContainer.insertAdjacentHTML("beforeend", `<div><h4>${data[user].userName}<br>
            ${data[user].userMail}<br>
            ${data[user].userTel}<br></h4></div>`);
        };
    });
};

function randomUser() {
    console.log("random klick");

    fetch('https://randomuser.me/api/')
    .then(resp => resp.json())
    .then(data => {

        let randomUser = {userName: data.results[0].name.first + " " + data.results[0].name.last, userMail: data.results[0].email, userTel: data.results[0].phone};

        console.log(randomUser);

        userName.value = data.results[0].name.first;
        userMail.value = data.results[0].email;
        userTel.value = data.results[0].phone;
    });

};

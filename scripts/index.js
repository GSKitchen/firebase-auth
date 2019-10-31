// setup materialize components
document.addEventListener("DOMContentLoaded", function() {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});

//populate guides list
const guideList = document.querySelector(".guides");

const setupGuides = data => {
  if (data.length) {
    guideList.innerHTML = "";
    data.forEach(doc => {
      const guide = doc.data();

      const li = document.createElement("li");

      const divTitle = document.createElement("div");
      divTitle.setAttribute("class", "collapsible-header grey lighten-4");
      divTitle.textContent = guide.title;

      const divBody = document.createElement("div");
      divBody.setAttribute("class", "collapsible-body white");
      divBody.textContent = guide.content;

      li.appendChild(divTitle);
      li.appendChild(divBody);

      guideList.appendChild(li);
    });
  } else {
    guideList.innerHTML =
      '<h3 class="center-align grey-text">Please log in to view Guides</h3>';
  }
};

//setup navbar
const logoutLinks = document.querySelectorAll(".logged-out");
const loginLinks = document.querySelectorAll(".logged-in");
const accountLink = document.querySelector(".account-details");
const adminItems = document.querySelectorAll(".admin");

const setupNavbar = user => {
  if (user) {
    if (user.admin) {
      adminItems.forEach(item => {
        item.style.display = "block";
      });
    }
    db.collection("users")
      .doc(user.uid)
      .get()
      .then(doc => {
        const html = `<div>Logged in as <b>${
          user.email
        }</b></div><div>Bio: <b>${
          doc.data().bio
        }</b></div><div class="pink-text ">${user.admin ? "Admin" : ""}</div>`;
        accountLink.innerHTML = html;
      });

    loginLinks.forEach(item => (item.style.display = "block"));
    logoutLinks.forEach(item => (item.style.display = "none"));
  } else {
    accountLink.innerHTML = "";
    loginLinks.forEach(item => (item.style.display = "none"));
    logoutLinks.forEach(item => (item.style.display = "block"));
    adminItems.forEach(item => (item.style.display = "none"));
  }
};

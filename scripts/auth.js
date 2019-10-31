// track user status
auth.onAuthStateChanged(user => {
  if (user) {
    setupNavbar(user);
    //getting data from db
    db.collection("guides")
      .get()
      .then(snapshot => {
        setupGuides(snapshot.docs);
      });
  } else {
    console.log("user logged out");
    setupNavbar();
    setupGuides([]);
  }
});

//create new guide
const createGuide = document.querySelector("#create-form");
createGuide.addEventListener("submit", e => {
  e.preventDefault();

  db.collection("guides")
    .add({
      title: createGuide["title"].value,
      content: createGuide["content"].value
    })
    .then(() => {
      const guideModal = document.querySelector("#modal-create");
      M.Modal.getInstance(guideModal).close();
      createGuide.reset();
    })
    .catch(err => {
      console.log(err.message);
    });
});

//signup rpocess
const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit", e => {
  e.preventDefault();

  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  auth.createUserWithEmailAndPassword(email, password).then(() => {
    const signupModal = document.querySelector("#modal-signup");
    M.Modal.getInstance(signupModal).close();
    signupForm.reset();
  });
});

// logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", e => {
  e.preventDefault();
  auth.signOut();
});

// login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", e => {
  e.preventDefault();

  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  auth.signInWithEmailAndPassword(email, password).then(cred => {
    console.log(cred);
    const loginModal = document.querySelector("#modal-login");
    M.Modal.getInstance(loginModal).close();
    loginForm.reset();
  });
});

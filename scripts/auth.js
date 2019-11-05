//add admin
const adminForm = document.querySelector(".admin-actions");
adminForm.addEventListener("submit", e => {
  e.preventDefault();
  const adminEmail = document.getElementById("admin-email").value;
  const addAdminRole = functions.httpsCallable("addAdminRole");
  addAdminRole({ email: adminEmail }).then(res => {
    console.log(res);
    adminForm.reset();
  });
});

// track user status
auth.onAuthStateChanged(user => {
  if (user) {
    console.log(user.emailVerified);
    //is admin
    user.getIdTokenResult().then(idTokenResult => {
      user.admin = idTokenResult.claims.admin;
      setupNavbar(user);
    });
    //getting data from db
    db.collection("guides").onSnapshot(
      snapshot => {
        setupGuides(snapshot.docs, user);
        //setupNavbar(user);
      },
      err => {
        //console.log(err.message);
      }
    );
  } else {
    console.log("user logged out");
    setupNavbar();
    setupGuides([], null);
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

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(cred => {
      cred.user.sendEmailVerification();
      return db
        .collection("users")
        .doc(cred.user.uid)
        .set({
          bio: signupForm["signup-bio"].value
        });
    })
    .then(() => {
      const signupModal = document.querySelector("#modal-signup");
      M.Modal.getInstance(signupModal).close();
      signupForm.reset();
      signupForm.querySelector(".error").innerHTML = "";
    })
    .catch(err => {
      signupForm.querySelector(".error").innerHTML = err.message;
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

  auth
    .signInWithEmailAndPassword(email, password)
    .then(cred => {
      //console.log(cred);
      const loginModal = document.querySelector("#modal-login");
      M.Modal.getInstance(loginModal).close();
      loginForm.reset();
      loginForm.querySelector(".error").innerHTML = "";
    })
    .catch(err => {
      loginForm.querySelector(".error").innerHTML = err.message;
    });
});

// resend email
const resendEmail = document.getElementById("resendEmail");
resendEmail.addEventListener("click", e => {
  console.log("button clicked");
  auth.currentUser
    .sendEmailVerification()
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
});

// Google sign in
const googleSignin = document.getElementById("googleSignin");
googleSignin.addEventListener("click", e => {
  e.preventDefault();
  const provider = new firebase.auth.GoogleAuthProvider();

  auth
    .signInWithPopup(provider)
    .then(res => {
      const token = res.credential.accessToken;
      const user = res.user;
      console.log(user);
      const signupModal = document.querySelector("#modal-signup");
      M.Modal.getInstance(signupModal).close();
    })
    .catch(err => {
      console.log(err);
    });
});

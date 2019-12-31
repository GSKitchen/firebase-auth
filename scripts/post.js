// setup materialize components
document.addEventListener("DOMContentLoaded", function() {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});



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


const usersList = document.querySelector('.users');
axios.get('http://localhost:8080/users')
.then((response) => {
    //console.log(response);
    const li = document.createElement('li');
    const para = document.createElement('p');
    para.textContent = response.data[0].fullName + ', ' + response.data[0].email;
    li.appendChild(para);
    usersList.appendChild(li);
}).catch((err) => {
    console.log(err);
});


// auth.currentUser.getIdToken(true)

const displayPost = (user) => {
  const articleDiv = document.querySelector('.articles');
  axios.get('http://localhost:8080/posts', {
    headers: {
      'X-Authorization-Firebase': localStorage.getItem('firebaseToken')
    }
  })
  .then((response) => {
    console.log(response.data.content);
    const posts = response.data.content;
    posts.map((post) => {
      const anchor = document.createElement('a');
      const heading = document.createElement('h3');
      //anchor.setAttribute('href', '/posts/'+post.id);
      anchor.setAttribute('id', 'p'+post.id);
      anchor.setAttribute('class', 'ola postLink');
      anchor.setAttribute('onClick', 'getId(this)');
      heading.textContent = post.title;
      anchor.appendChild(heading);
      articleDiv.appendChild(anchor);
    });
  }).catch((err) => {
    console.log(err);
  });
}
/*
//navigate post
const postAnchor = document.querySelector('.postLink');
postAnchor.addEventListener('click',(e) => {
  e.preventDefault();
  console.log('kjkk');
}); */

const getId = (e) => {
  const postId = e.id.substr(1);
  axios.get('http://localhost:8080/posts/' + postId, {
    headers: {
      'X-Authorization-Firebase': localStorage.getItem('firebaseToken')
    }
  }).then((response) => {
    const post = response.data;
    const postDiv = document.querySelector('.post-details');
    postDiv.innerHTML = '';
    const article = document.createElement('article');
    article.setAttribute('id', 'article-'+post.id);
    const postTitle = document.createElement('h2');
    postTitle.textContent = post.title;
    const postBody = document.createElement('div');
    postBody.setAttribute('style', 'margin-bottom: 20px;');
    postBody.textContent = post.content;
    const postDate = document.createElement('code');
    postDate.textContent = post.createdAt;
    postDate.setAttribute('style', 'margin-right: 10px;');
    const postBy = document.createElement('code');
    postBy.textContent = post.user.fullName;

    article.appendChild(postTitle);
    article.appendChild(postDate);
    article.appendChild(postBy);
    article.appendChild(postBody);
    postDiv.appendChild(article);
  }).catch((err) =>{
    console.log('err');
  });
  return false;
}
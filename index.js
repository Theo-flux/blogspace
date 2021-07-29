const openModal = document.getElementById("open-modal");
const closeModal = document.getElementById('close-modal');
let modal = document.getElementById('id01');
let blogList = document.getElementById("blog-list");
const postForm = document.getElementById("post-form");
let postTitle = document.getElementById("post-title");
let postBody = document.getElementById("post-body");


// array to store post data gotten from the api call
let postsArr = []

// url for fetching data
const api_url = "https://apis.scrimba.com/jsonplaceholder/posts";

// open modal
openModal.addEventListener("click", function(){
  modal.style.display ="block";
});

// close modal
closeModal.addEventListener("click", function(){
  modal.style.display ="none";
});

// function to render posts on DOM
function renderPost() {
  let html = ""
  for(let post of postsArr) {
    html += `<div class="post">
      <h3 id="post-title">${post.title}</h3>
      <p id="post-body">${post.body}</p>
      </div>
    `
  }
  blogList.innerHTML = html;
}

// fetch post from jsonlaceholder post api
fetch(api_url)
    .then(res => res.json())
    .then(data => {
        postsArr = data.slice(0,5);
        renderPost();
    })

// add event listener to the postForm
postForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const fetch_options_method_post = {
    method:"post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: postTitle.value,
      body: postBody.value
    })
  }

  fetch(api_url, fetch_options_method_post)
    .then((response) => response.json())
    .then((post) => {
      postsArr.unshift(post);
      console.log(postsArr);
      renderPost();
      modal.style.display = "none";
      postForm.reset();
    })
})
console.log(postsArr)

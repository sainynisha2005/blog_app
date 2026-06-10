const API = "http://localhost:5000/posts";

// CREATE - with image upload (works on create.html)
function createPost() {
  const title = document.getElementById('title');
  const content = document.getElementById('content');
  const image = document.getElementById('image');

  if (!title.value.trim() || !content.value.trim()) {
    alert('Please fill in both title and content');
    return;
  }

  // Create FormData for file upload
  const formData = new FormData();
  formData.append('title', title.value);
  formData.append('content', content.value);
  
  if (image.files[0]) {
    formData.append('image', image.files[0]);
    console.log('📷 Uploading image:', image.files[0].name);
  }

  console.log('🚀 Sending request to:', API);

  fetch(API, {
    method: "POST",
    body: formData
  })
  .then(res => {
    console.log('📥 Response status:', res.status);
    return res.json();
  })
  .then(data => {
    console.log('✅ Post created successfully:', data);
    alert('Post created successfully!');
    title.value = '';
    content.value = '';
    image.value = '';
    window.location.href = 'index.html';
  })
  .catch(err => {
    console.error('❌ Fetch error:', err);
    console.error('❌ Is server running? Check http://localhost:5000/posts');
    
    // More specific error message
    let errorMsg = 'Error creating post: ' + err.message;
    if (err.message.includes('fetch failed')) {
      errorMsg = '❌ Cannot connect to server!\n\n✅ Make sure:\n1. Backend is running (node server.js)\n2. MongoDB is running\n3. You are in blog-app folder (not backend folder)';
    }
    alert(errorMsg);
  });
}

// READ - Display images in posts (works on index.html)
function loadPosts() {
  console.log('🚀 Fetching posts from:', API);
  
  fetch(API)
    .then(res => {
      console.log('📥 Response status:', res.status);
      return res.json();
    })
    .then(data => {
      const postsDiv = document.getElementById("posts");
      if (!postsDiv) return;

      console.log('📊 Posts received:', data.length);

      let html = "";
      data.forEach(post => {
        console.log('📝 Post:', post.title, 'Image:', post.image);
        
        // html += `
        //   <div>
        //     <h3>${post.title}</h3>
        //     ${post.image && post.image !== '' ? `<img src="${post.image}" alt="${post.title}" class="post-image">` : ''}
        //     <p>${post.content}</p>
        //     <button onclick="deletePost('${post._id}')">Delete</button>
        //   </div>
        // `;
        html += `
  <div class="post">
    <h3>${post.title}</h3>
    <p>${post.content}</p>
    <img src="${post.image}" width="200"/>
    <button onclick="deletePost('${post._id}')">Delete</button>
  </div>
`;
      });
      postsDiv.innerHTML = html;
    })
    .catch(err => {
      console.error('❌ Fetch error:', err);
      const postsDiv = document.getElementById("posts");
      if (postsDiv) {
        postsDiv.innerHTML = '<p style="color: white; text-align: center;">❌ Error loading posts.<br><br>✅ Make sure:<br>1. Backend is running (node server.js)<br>2. MongoDB is running</p>';
      }
    });
}

// DELETE
function deletePost(id) {
  fetch(`${API}/${id}`, { method: "DELETE" })
    .then(res => {
      if (res.ok) {
        console.log('✅ Post deleted:', id);
        loadPosts();
      } else {
        console.error('❌ Delete failed:', res.status);
      }
    })
    .catch(err => {
      console.error('❌ Delete error:', err);
      alert('Error deleting post: ' + err.message);
    });
}
function createPost() {
  const formData = new FormData();

  formData.append("title", document.getElementById("title").value);
  formData.append("content", document.getElementById("content").value);

  const file = document.getElementById("image").files[0];
  formData.append("image", file);

  fetch(API, {
    method: "POST",
    body: formData
  }).then(() => loadPosts());
}

// Initialize - load posts only on home page
if (document.getElementById("posts")) {
  loadPosts();
}
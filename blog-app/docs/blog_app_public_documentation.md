# Blog App — Public Documentation

## 1. Introduction
Blog App is a lightweight blogging platform that allows users to create, display, and delete blog posts with optional image uploads. It is built as a simple full-stack demo project with a JavaScript frontend and a Node.js/Express backend.

## 2. Use Case
- Create short blog posts with title, content, and optional image.
- View all published posts in a modern card-style homepage.
- Delete posts when they are no longer needed.

## 3. Industry Value
This project demonstrates a basic content management and publishing workflow relevant for:
- marketing blogs
- internal team announcements
- product update feeds
- MVP content platforms

It is especially useful for early-stage proof of concept solutions, small teams, student portfolios, and frontend/backend integration learning.

## 4. Target Roles
- Frontend Developer: builds the HTML, CSS, and client-side JavaScript.
- Backend Developer: builds APIs, storage, and upload handling.
- DevOps / Deployment Engineer: configures MongoDB and Node.js hosting.
- Product Manager: validates the blogging workflow and user experience.

## 5. Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: MongoDB
- File upload: Multer
- Cross-origin support: CORS

## 6. Technologies Used and Explanation
- **HTML**: Two pages are provided (`index.html` and `create.html`) for viewing posts and creating posts.
- **CSS**: `frontend/style.css` styles the UI with responsive layout, card design, and form interactions.
- **Vanilla JavaScript**: `frontend/script.js` implements fetch-based API calls, form submission, data rendering, and delete behavior.
- **Node.js**: Runs the backend server (`backend/server.js`) and handles request routing.
- **Express**: Provides the HTTP server, JSON middleware, static asset serving, and REST routes.
- **Mongoose**: Connects to MongoDB and defines the blog post schema.
- **Multer**: Handles image upload from the browser and stores files locally in `backend/uploads`.
- **CORS**: Allows the frontend to make requests to the backend from the browser.
- **MongoDB**: Stores blog posts with text and image metadata.

## 7. Functionality Overview
### Screenshots
- Homepage: `docs/index_screenshot.png`
- Create Post page: `docs/create_screenshot.png`

### Core Functionalities
1. Create a blog post with title, content, and optional image.
2. View all saved posts on the homepage.
3. Delete existing posts.

## 8. Frontend Flow
### Home Page (`index.html`)
- Displays the app title and navigation.
- Loads all posts from backend API.
- Renders each post card with title, content, image preview, and delete button.

### Create Page (`create.html`)
- Form fields: title, content, image upload.
- Submits the post using `fetch()` and `FormData`.
- Redirects to the homepage after successful creation.

## 9. Backend API Routes
### `POST /posts`
- Description: Create a new post with optional image upload.
- Request type: `multipart/form-data`
- Request fields:
  - `title` (string) — required
  - `content` (string) — required
  - `image` (file) — optional image file
- Response example:
```json
{
  "_id": "642b4f1a7ab3fbb50f6b5cf1",
  "title": "My First Post",
  "content": "This is a sample blog post.",
  "image": "http://localhost:5000/uploads/image-1680000000000.png",
  "__v": 0
}
```

### `GET /posts`
- Description: Fetch all blog posts.
- Response example:
```json
[
  {
    "_id": "642b4f1a7ab3fbb50f6b5cf1",
    "title": "My First Post",
    "content": "This is a sample blog post.",
    "image": "http://localhost:5000/uploads/image-1680000000000.png",
    "__v": 0
  }
]
```

### `DELETE /posts/:id`
- Description: Delete a blog post by its ID.
- Path parameter: `id` (string)
- Response example:
```json
{ "message": "Post deleted" }
```

## 10. Data Contract Summary
### Post object fields
- `_id`: unique MongoDB identifier
- `title`: post title text
- `content`: post body text
- `image`: URL string to uploaded image

## 11. Deployment and Run Instructions
1. Start MongoDB locally on `mongodb://localhost:27017`.
2. Open a terminal in `blog-app/backend`.
3. Install dependencies if needed: `npm install`.
4. Start backend server: `node server.js`.
5. Open `blog-app/frontend/index.html` and `create.html` in a browser.

## 12. Benefits for Stakeholders
- Rapid prototyping for blog/mobile content use cases.
- Easy demonstration of full-stack data flow.
- Clear separation of presentation, business logic, and storage.
- A strong starting point for feature expansion like auth, comments, and cloud storage.

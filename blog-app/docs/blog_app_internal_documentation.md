# Blog App — Internal Documentation

## 1. Project Summary
Blog App is a minimal full-stack blogging project located in `blog-app`. It provides a browser-based interface to create, view, and delete blog posts. The backend is implemented with Node.js and Express and stores data in MongoDB.

## 2. Architecture
- Frontend: `blog-app/frontend`
- Backend: `blog-app/backend`
- Static uploads: `blog-app/backend/uploads`
- Documentation and screenshots: `blog-app/docs`

## 3. Components
### Frontend
- `index.html` — homepage listing all posts.
- `create.html` — create post page.
- `script.js` — client logic for API calls.
- `style.css` — shared styling for the app.

### Backend
- `server.js` — main server entrypoint.
- `models/Post.js` — Mongoose schema for posts.
- `routes/postRoutes.js` — alternate Express router for Cloudinary-backed posts.
- `config/cloudinary.js` — Cloudinary configuration.
- `config/multer.js` — Cloudinary storage configuration for uploads.

## 4. Backend Implementation Details
### `backend/server.js`
- Uses Express with JSON middleware and CORS.
- Connects to MongoDB at `mongodb://localhost:27017/blogapp`.
- Defines a `Post` schema on the fly with `title`, `content`, and `image`.
- Uses Multer to save uploaded images to `backend/uploads`.
- Serves uploaded images from `/uploads`.

### Actual backend routes implemented in `server.js`
- `POST /posts`
  - Creates a new post.
  - Expects `multipart/form-data`.
  - Writes uploaded image files locally.
  - Stores `image` as a local URL: `http://localhost:5000/uploads/<filename>`.
- `GET /posts`
  - Returns all posts sorted by descending `_id`.
- `DELETE /posts/:id`
  - Deletes a post by ID.

## 5. Backend Data Model
### Post schema in `server.js`
- `title`: `String`
- `content`: `String`
- `image`: `String`

### Post schema in `backend/models/Post.js`
- `title`: `String`
- `content`: `String`
- `image`: `String`
- `public_id`: `String`
- `date`: `Date` (default: `Date.now`)

> Note: `backend/models/Post.js` includes `public_id` and `date`, but `server.js` does not currently write `public_id` or `date`.

## 6. Frontend Implementation Details
### `frontend/script.js`
- Defines `API = "http://localhost:5000/posts"`.
- Implements `createPost()` using `FormData`.
- Implements `loadPosts()` to fetch data and render HTML cards.
- Implements `deletePost(id)` to remove posts.
- Automatically calls `loadPosts()` on pages containing the `#posts` element.

### Frontend data flow
1. User enters title/content and optionally selects an image.
2. The browser posts `FormData` to `POST /posts`.
3. Backend stores the image and saves the post.
4. On return, the frontend redirects to `index.html`.
5. `index.html` fetches posts and renders them.

## 7. Input / Output Contracts
### Frontend -> Backend
#### POST /posts
- Request headers:
  - `Content-Type`: `multipart/form-data`
- Request body fields:
  - `title` (string)
  - `content` (string)
  - `image` (file, optional)

#### GET /posts
- No request input required.

#### DELETE /posts/:id
- URL path parameter:
  - `id` = MongoDB object ID

### Backend -> Frontend
#### POST /posts response
- JSON body example:
```json
{
  "_id": "642b4f1a7ab3fbb50f6b5cf1",
  "title": "Sample Post",
  "content": "This is the content.",
  "image": "http://localhost:5000/uploads/image-1680000000000.png",
  "__v": 0
}
```

#### GET /posts response
- JSON array of posts.
- Each object contains `_id`, `title`, `content`, `image`, and `__v`.

#### DELETE /posts/:id response
- JSON success message:
```json
{ "message": "Post deleted" }
```

## 8. Frontend File Notes
- `create.html` currently references `styles.css` while the actual stylesheet file is `style.css`.
- The `script.js` file contains two definitions of `createPost()`; the second definition overrides the first one.
- These inconsistencies should be fixed before production deployment.

## 9. Backend File Notes
- The codebase includes Cloudinary integration files (`backend/config/cloudinary.js`, `backend/config/multer.js`, `backend/routes/postRoutes.js`).
- However, `backend/server.js` does not import or use `backend/routes/postRoutes.js`.
- The current active backend uses local file storage in `backend/uploads`.

## 10. Known Issues / Risk Areas
- `create.html` uses a wrong stylesheet reference: `styles.css` vs `style.css`.
- Duplicate `createPost()` implementation in `frontend/script.js` can cause unexpected behavior.
- `backend/server.js` exposes local upload URLs and depends on a port-bound host URL.
- Cloudinary credentials are stored in plain text inside `backend/config/cloudinary.js`.
- MongoDB is expected to run locally; no remote connection or environment variables are currently configured.

## 11. Suggested Improvements
- Unify backend storage: choose either local upload storage or Cloudinary.
- Fix frontend asset path and remove duplicate function definitions.
- Add a `package.json` start script such as `"start": "node server.js"` in `backend/package.json`.
- Add environment variable support for MongoDB and port configuration.
- Add user authentication for post ownership.
- Add error response handling on frontend for failed save or delete operations.

## 12. Deployment Notes
- Backend should run from `blog-app/backend` with Node.js.
- Ensure MongoDB is running and reachable at `mongodb://localhost:27017/blogapp`.
- The app is currently static frontend HTML; it can be hosted on any static server or opened directly in the browser.
- For production, consider bundling the frontend and proxying API requests through the same domain.

## 13. References
- Homepage screenshot: `blog-app/docs/index_screenshot.png`
- Create page screenshot: `blog-app/docs/create_screenshot.png`

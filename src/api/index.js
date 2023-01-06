import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:5000" });
const API = axios.create({ baseURL: "https://horcruxes-backend.onrender.com" });

//supplying that token to the backend to be utilized in the auth middleware
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

// We are using axios to make HTTP requests to our backend

// posts requests
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const fetchPostBySearch = (searchQuery) => {
  return API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
};

export const createPost = (newPost) => API.post("/posts", newPost);

export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const commentPost = (id, value) =>
  API.patch(`/posts/${id}/commentPost`, { value });

// user/auth requests

export const signIn = (formData) => API.post(`/users/signin`, formData);

export const signUp = (formData) => API.post(`/users/signup`, formData);

import axios from 'axios';

const API_URL = '/api';

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/users/register`, userData);
};

export const loginUser = async (userData) => {
  return await axios.post(`${API_URL}/users/login`, userData);
};
export const logOutUser = async () => {
  return await axios.post(`${API_URL}/users/logout`);
};

export const getNotes = async (token) => {
  return await axios.get(`${API_URL}/notes`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const createNote = async (noteData, token) => {
  return await axios.post(`${API_URL}/notes`, noteData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const updateNote = async (noteId, noteData, token) => {
  return await axios.put(`${API_URL}/notes/${noteId}`, noteData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const deleteNote = async (noteId, token) => {
  return await axios.delete(`${API_URL}/notes/${noteId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

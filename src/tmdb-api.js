import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

// https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem
function base64ToBytes(base64) {
  const binString = atob(base64);
  return Uint8Array.from(binString, (m) => m.codePointAt(0));
}

const ACCESS_KEY = new TextDecoder().decode(
  base64ToBytes(
    "ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKaGRXUWlPaUkyTWpjNFpURTVNalZoWkdFeE5UY3pOakkyT0RCa1kySTNZelUwTkdRNE55SXNJbTVpWmlJNk1UY3lOVFUwTkRZM01pNHlOakV6TlRNc0luTjFZaUk2SWpZMlpEbGlOMlEwWVdGaE5tWTFNVGd4WlRreU9ESXdaaUlzSW5OamIzQmxjeUk2V3lKaGNHbGZjbVZoWkNKZExDSjJaWEp6YVc5dUlqb3hmUS5wRWItaTJqTVVzUjZfcVdJSXBxTmZDSVUxQnU4UnFrVlVydVBnNXQ4YkVj"
  )
);

const options = {
  headers: {
    Authorization: `Bearer ${ACCESS_KEY}`,
  },
};

export async function getTrendingMovies() {
  const response = await axios.get(`/trending/movie/day`, options);
  return response.data.results;
}

export async function searchMovies(searchQuery, page) {
  options.params = {
    query: searchQuery,
    include_adult: "false",
    language: "en-US",
    page: page,
  };
  const response = await axios.get("/search/movie", options);
  return {
    results: response.data.results,
    totalPages: response.data.total_pages,
  };
}

export async function getMovieDetails(movieId) {
  const response = await axios.get(`/movie/${movieId}`, options);
  return response.data;
}

export async function getMovieCredits(movieId) {
  const response = await axios.get(`/movie/${movieId}/credits`, options);
  return response.data.cast;
}

export async function getMovieReviews(movieId) {
  const response = await axios.get(`/movie/${movieId}/reviews`, options);
  return response.data.results;
}

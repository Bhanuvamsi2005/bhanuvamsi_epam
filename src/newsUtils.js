

const API_KEY = "032efeab8fba402593cfa37a7333fe92";
const url = "https://newsapi.org/v2/everything?q=";

export const fetchNews = async (query, setArticles) => {
  try {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    if (!res.ok) throw new Error(`API request failed with status: ${res.status}`);

    const data = await res.json();
    console.log("API Response Data:", data); 
    setArticles(data.articles || []);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
};

export const loadBookmarks = () => {
  return JSON.parse(localStorage.getItem("bookmarks")) || [];
};
export const toggleBookmark = (article, bookmarks) => {
  let updatedBookmarks = [...bookmarks];
  const index = updatedBookmarks.findIndex((a) => a.title === article.title);

  if (index >= 0) {
    updatedBookmarks.splice(index, 1);
  } else {
    updatedBookmarks.push(article);
  }

  localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  return updatedBookmarks;
};

export const isBookmarked = (title, bookmarks) => {
  return bookmarks.some((a) => a.title === title);
};

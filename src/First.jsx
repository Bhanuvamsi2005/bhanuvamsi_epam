import React, { useEffect, useState } from "react";
import "./First.css";
import news from './assets/Newsraiseai.jpg';
import { fetchNews, loadBookmarks, toggleBookmark, isBookmarked } from "./newsUtils";

const First = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("India");
  const [bookmarks, setBookmarks] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shareArticle, setShareArticle] = useState(null);

  useEffect(() => {
    fetchNews(searchQuery, setArticles);
    setBookmarks(loadBookmarks());
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleShare = (article) => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.description,
        url: article.url,
      }).catch((error) => console.log("Sharing failed", error));
    } else {
      setShareArticle(article);
    }
  };

  return (
    <div className="news-app">
      <nav className="nav">
        <div className="main-nav container flex">
          <a href="#" className="company-logo">
            <img src={news} alt="company logo" height={50} width={20} />
          </a>
          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <ul className="flex">
              <a href="https://www.linkedin.com/in/achanta-bhanu-vamsi/" target="_blank"><p>Contact me</p></a>
              {["Business", "Finance", "Politics", "Sports"].map((category) => (
                <li key={category} className="hover-link nav-item" onClick={() => fetchNews(category, setArticles)}>
                  {category}
                </li>
              ))}
            </ul>
          </div>
          <div className="search-bar flex">
          <button className="hamburger-menu" onClick={toggleMenu}>
            ☰
          </button>
            <input
              type="text"
              className="news-input"
              placeholder="e.g. Science"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-button" onClick={() => fetchNews(searchQuery, setArticles)}>
              Search
            </button>
              {/* <div className="contactus">
                <a href="#">Contact Us</a>
                </div> */}
          
          </div>
        </div>
      </nav>

      <main>
        <div className="cards-container container flex">
          {articles.length === 0 ? (
            <p>No articles found</p>
          ) : (
            articles.map((article, index) => (
              <div key={index} className="card">
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="card-header">
                  <img src={article.urlToImage || "https://via.placeholder.com/400x200"} alt="news" />
                </a>
                <div className="card-content">
                  <h3>{article.title}</h3>
                  <p>{article.description || "No description available"}</p>
                  <h6 className="news-source">{new Date(article.publishedAt).toLocaleString()}</h6>
                  <button 
                    className={`bookmark-btn ${isBookmarked(article.title, bookmarks) ? "bookmarked" : ""}`} 
                    onClick={() => {
                      setBookmarks(toggleBookmark(article, bookmarks));
                    }}
                  >
                    {isBookmarked(article.title, bookmarks) ? "☆ Bookmarked" : " ★ Bookmark"}
                  </button>
                  <button className="bookmark-btn" onClick={() => handleShare(article)}>🔗 Share</button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <section className="bookmarks-section">
        <h2>Bookmarked Articles</h2>
        <div className="cards-container container flex">
          {bookmarks.length === 0 ? (
            <p>No bookmarks yet</p>
          ) : (
            bookmarks.map((article, index) => (
              <div key={index} className="card">
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="card-header">
                  <img src={article.urlToImage || "https://via.placeholder.com/400x200"} alt="news" />
                </a>
                <div className="card-content">
                  <h3>{article.title}</h3>
                  <p>{article.description || "No description available"}</p>
                  <h6 className="news-source">{new Date(article.publishedAt).toLocaleString()}</h6>
                  <button 
                    className="remove-bookmark-btn" 
                    onClick={() => {
                      setBookmarks(toggleBookmark(article, bookmarks));
                    }}
                  >
                    ❌ Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default First;
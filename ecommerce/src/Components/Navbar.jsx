import React, { useEffect, useState } from "react";
import axios from "axios";

const Navbar = ({ onSelectCategory, onSearch }) => {
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "light-theme";
  };
  const [selectedCategory, setSelectedCategory] = useState("");
  const [theme, setTheme] = useState(getInitialTheme());
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = async (value) => {
    setInput(value);
    if (value.length >= 1) {
      setShowSearchResults(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/products/search?name=${value}`
        );
        setSearchResults(response.data);
        setNoResults(response.data.length === 0);
      } catch (error) {
        console.error("Error searching:", error);
      }
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
      setNoResults(false);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark-theme" ? "light-theme" : "dark-theme";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const categories = ["Laptop", "Headphone", "Mobile", "Electronics", "Toys", "Fashion"];

  const isDark = theme === "dark-theme";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;700;900&display=swap');

        .nb-root {
          position: sticky;
          top: 0;
          width: 100%;
          z-index: 1000;
          background: ${isDark ? "#0b0f1a" : "#f0efe9"};
          border-bottom: 3px solid ${isDark ? "#ffffff" : "#111111"};
          font-family: 'Barlow Condensed', sans-serif;
        }

        .nb-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          height: 64px;
          gap: 16px;
        }

        /* BRAND */
        .nb-brand {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 2px;
          color: ${isDark ? "#f1f5f9" : "#111"} !important;
          text-decoration: none;
          flex-shrink: 0;
        }

        /* LINKS */
        .nb-links {
          display: flex;
          align-items: center;
          gap: 4px;
          list-style: none;
          margin: 0; padding: 0;
        }
        .nb-links a,
        .nb-links button.nb-link {
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: ${isDark ? "#f1f5f9" : "#111"} !important;
          text-decoration: none;
          padding: 6px 14px;
          background: transparent;
          border: none;
          cursor: pointer;
          position: relative;
          transition: color 0.15s;
          font-family: 'Barlow Condensed', sans-serif;
        }
        .nb-links a::after,
        .nb-links button.nb-link::after {
          content: "";
          position: absolute;
          left: 14px; bottom: 2px;
          width: 0; height: 2px;
          background: #ff2eb4;
          transition: width 0.2s ease;
        }
        .nb-links a:hover::after,
        .nb-links button.nb-link:hover::after,
        .nb-links a.active::after { width: calc(100% - 28px); }
        .nb-links a:hover,
        .nb-links button.nb-link:hover { color: #ff2eb4 !important; }

        /* DROPDOWN */
        .nb-dropdown { position: relative; }
        .nb-dropdown-menu {
          display: none;
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          background: ${isDark ? "#111827" : "#fff"};
          border: 2px solid ${isDark ? "#fff" : "#111"};
          min-width: 160px;
          z-index: 999;
          padding: 4px 0;
        }
        .nb-dropdown:hover .nb-dropdown-menu { display: block; }
        .nb-dropdown-menu button {
          display: block;
          width: 100%;
          padding: 10px 16px;
          background: transparent;
          border: none;
          text-align: left;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: ${isDark ? "#f1f5f9" : "#111"};
          cursor: pointer;
          transition: background 0.15s;
        }
        .nb-dropdown-menu button:hover {
          background: ${isDark ? "#1f2937" : "#f0efe9"};
          color: #ff2eb4;
        }

        /* RIGHT SIDE */
        .nb-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        /* DARK MODE TOGGLE */
        .nb-theme-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 7px 14px;
          background: ${isDark ? "#c6ff00" : "#111"};
          border: 2px solid ${isDark ? "#111" : "#111"};
          cursor: pointer;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: ${isDark ? "#111" : "#c6ff00"};
          transition: background 0.2s, color 0.2s;
          white-space: nowrap;
        }
        .nb-theme-btn:hover {
          background: #ff2eb4;
          color: #fff;
          border-color: #ff2eb4;
        }
        .nb-theme-emoji { font-size: 16px; line-height: 1; }

        /* CART BUTTON */
        .nb-cart {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 16px;
          background: #c6ff00;
          border: 2px solid #111;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #111 !important;
          text-decoration: none;
          transition: background 0.15s;
          white-space: nowrap;
        }
        .nb-cart:hover { background: #ff2eb4; color: #fff !important; }
        .nb-cart-emoji { font-size: 16px; }

        /* SEARCH WRAPPER */
        .nb-search-wrap { position: relative; }
        .nb-search {
          background: transparent !important;
          border: 2px solid ${isDark ? "#fff" : "#111"} !important;
          padding: 7px 12px !important;
          font-family: 'Barlow Condensed', sans-serif !important;
          font-size: 14px !important;
          font-weight: 700 !important;
          color: ${isDark ? "#f1f5f9" : "#111"} !important;
          outline: none !important;
          width: 200px;
          border-radius: 0 !important;
          transition: border-color 0.15s;
        }
        .nb-search:focus { border-color: #ff2eb4 !important; }
        .nb-search::placeholder { color: #999 !important; font-weight: 400 !important; }

        /* SEARCH RESULTS */
        .nb-results {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          width: 260px;
          background: ${isDark ? "#111827" : "#fff"};
          border: 2px solid ${isDark ? "#fff" : "#111"};
          z-index: 999;
          list-style: none;
          padding: 4px 0;
          margin: 0;
        }
        .nb-results li { border-bottom: 1px solid ${isDark ? "#1f2937" : "#eee"}; }
        .nb-results li:last-child { border-bottom: none; }
        .nb-results a {
          display: block;
          padding: 10px 14px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: ${isDark ? "#f1f5f9" : "#111"} !important;
          text-decoration: none;
          transition: background 0.15s;
        }
        .nb-results a:hover { background: #c6ff00; color: #111 !important; }
        .nb-no-results {
          padding: 10px 14px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #ff2eb4;
        }

        @media (max-width: 768px) {
          .nb-inner { padding: 0 16px; gap: 8px; }
          .nb-links { display: none; }
          .nb-search { width: 120px; }
          .nb-theme-btn span.nb-theme-label { display: none; }
        }
      `}</style>

      <header className="nb-root">
        <div className="nb-inner">

          {/* BRAND */}
          <a className="nb-brand" href="/ecomm">VAULT-X</a>

          {/* NAV LINKS */}
          <ul className="nb-links">
            <li><a href="/" className="active">Home</a></li>
            <li><a href="/add_product">Add Product</a></li>
            <li className="nb-dropdown">
              <button className="nb-link">Categories ▾</button>
              <div className="nb-dropdown-menu">
                {categories.map((cat) => (
                  <button key={cat} onClick={() => handleCategorySelect(cat)}>
                    {cat}
                  </button>
                ))}
              </div>
            </li>
          </ul>

          {/* RIGHT */}
          <div className="nb-right">

            {/* DARK MODE TOGGLE */}
            <button className="nb-theme-btn" onClick={toggleTheme}>
              <span className="nb-theme-emoji">{isDark ? "☀️" : "🌙"}</span>
              <span className="nb-theme-label">{isDark ? "Light" : "Dark"}</span>
            </button>

            {/* CART */}
            <a href="/cart" className="nb-cart">
              <span className="nb-cart-emoji">🛒</span>
              Cart
            </a>

            {/* SEARCH */}
            <div className="nb-search-wrap">
              <input
                className="nb-search"
                type="search"
                placeholder="Search..."
                value={input}
                onChange={(e) => handleChange(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
              />
              {showSearchResults && (
                <ul className="nb-results">
                  {searchResults.length > 0 ? (
                    searchResults.map((result) => (
                      <li key={result.id}>
                        <a href={`/product/${result.id}`}>{result.name}</a>
                      </li>
                    ))
                  ) : (
                    noResults && (
                      <div className="nb-no-results">No product found</div>
                    )
                  )}
                </ul>
              )}
            </div>

          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
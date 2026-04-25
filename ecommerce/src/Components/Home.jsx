import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";

const CARD_ACCENTS = ["#ff2eb4", "#c6ff00", "#2b54ff", "#111", "#ff2eb4", "#c6ff00"];

const Home = ({ selectedCategory }) => {
  const { data, isError, addToCart, refreshData } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    if (!isDataFetched) {
      refreshData();
      setIsDataFetched(true);
    }
  }, [refreshData, isDataFetched]);

  useEffect(() => {
    if (data && data.length > 0) {
      const fetchImagesAndUpdateProducts = async () => {
        const updatedProducts = await Promise.all(
          data.map(async (product) => {
            try {
              const response = await axios.get(
                `http://localhost:8080/api/product/${product.id}/image`,
                { responseType: "blob" }
              );
              const imageUrl = URL.createObjectURL(response.data);
              return { ...product, imageUrl };
            } catch (error) {
              console.error("Error fetching image for product ID:", product.id, error);
              return { ...product, imageUrl: "placeholder-image-url" };
            }
          })
        );
        setProducts(updatedProducts);
      };
      fetchImagesAndUpdateProducts();
    }
  }, [data]);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  if (isError) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;700;900&display=swap');
          .hm-error {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Bebas Neue', sans-serif;
            font-size: 48px;
            letter-spacing: 3px;
            color: #111;
            background: #f0efe9;
          }
        `}</style>
        <div className="hm-error">SOMETHING WENT WRONG.</div>
      </>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;700;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .hm-page {
          min-height: 100vh;
          background-color: #f0efe9;
          background-image:
            linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px);
          background-size: 36px 36px;
          font-family: 'Barlow Condensed', sans-serif;
          padding: 48px 40px 80px;
        }

        /* ── SECTION HEADER ── */
        .hm-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 48px;
          border-bottom: 3px solid #111;
          padding-bottom: 16px;
        }
        .hm-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(40px, 6vw, 72px);
          letter-spacing: -1px;
          color: #111;
          line-height: 1;
        }
        .hm-title span { color: #ff2eb4; }
        .hm-count {
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #999;
        }

        /* ── GRID ── */
        .hm-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 32px;
        }

        /* ── CARD ── */
        .hm-card {
          position: relative;
          border: 3px solid #111;
          background: #fff;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          display: flex;
          flex-direction: column;
        }
        .hm-card:hover {
          transform: translate(-4px, -4px);
          box-shadow: 8px 8px 0px #111;
        }
        .hm-card.unavailable {
          background: #e8e8e8;
        }

        /* ACCENT TOP BORDER */
        .hm-card-accent {
          height: 6px;
          width: 100%;
          flex-shrink: 0;
        }

        /* IMAGE WRAP */
        .hm-img-wrap {
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
        }
        .hm-img {
          width: 100%;
          height: 260px;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }
        .hm-card:hover .hm-img { transform: scale(1.04); }

        /* PRICE BADGE — top right corner */
        .hm-price-badge {
          position: absolute;
          top: 12px;
          right: -3px;
          background: #c6ff00;
          border: 2px solid #111;
          padding: 4px 12px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 1px;
          color: #111;
          line-height: 1.1;
        }

        /* STAFF PICK BADGE */
        .hm-staff-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #fff;
          border: 2px solid #111;
          padding: 3px 10px;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #111;
        }

        /* CARD BODY */
        .hm-card-body {
          padding: 16px 16px 14px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 12px;
          flex: 1;
        }

        .hm-card-info { flex: 1; min-width: 0; }

        .hm-card-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 0.5px;
          color: #111;
          line-height: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 4px;
          text-decoration: none;
          display: block;
        }
        .hm-card.unavailable .hm-card-name { color: #666; }

        .hm-card-meta {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #aaa;
        }

        /* ADD BUTTON */
        .hm-add-btn {
          width: 44px;
          height: 44px;
          background: #111;
          border: 2px solid #111;
          color: #c6ff00;
          font-size: 26px;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: background 0.15s, color 0.15s;
          line-height: 1;
          font-family: 'Barlow Condensed', sans-serif;
        }
        .hm-add-btn:hover { background: #ff2eb4; border-color: #ff2eb4; color: #fff; }
        .hm-add-btn.out {
          background: #999;
          border-color: #999;
          color: #ccc;
          cursor: not-allowed;
        }

        /* EMPTY STATE */
        .hm-empty {
          grid-column: 1 / -1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 20px;
          text-align: center;
        }
        .hm-empty-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 72px;
          letter-spacing: 2px;
          color: #111;
          margin-bottom: 12px;
        }
        .hm-empty-sub {
          font-size: 15px;
          font-weight: 400;
          color: #888;
        }

        @media (max-width: 768px) {
          .hm-page { padding: 24px 16px 60px; }
          .hm-grid { grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; }
          .hm-img { height: 200px; }
        }
      `}</style>

      <div className="hm-page">

        {/* HEADER */}
        <div className="hm-header">
          <h2 className="hm-title">
            ALL <span>DROPS</span>
          </h2>
          <span className="hm-count">
            {filteredProducts.length} item{filteredProducts.length !== 1 ? "s" : ""}
            {selectedCategory ? ` · ${selectedCategory}` : ""}
          </span>
        </div>

        {/* GRID */}
        <div className="hm-grid">
          {filteredProducts.length === 0 ? (
            <div className="hm-empty">
              <div className="hm-empty-title">NO DROPS.</div>
              <div className="hm-empty-sub">Nothing here yet. Add your first product.</div>
            </div>
          ) : (
            filteredProducts.map((product, index) => {
              const { id, brand, name, price, productAvailable, imageUrl, category } = product;
              const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];

              return (
                <div
                  className={`hm-card ${!productAvailable ? "unavailable" : ""}`}
                  key={id}
                >
                  {/* ACCENT STRIPE */}
                  <div className="hm-card-accent" style={{ background: accent }} />

                  {/* IMAGE */}
                  <div className="hm-img-wrap">
                    <Link to={`/product/${id}`}>
                      <img src={imageUrl} alt={name} className="hm-img" />
                    </Link>

                    {/* PRICE BADGE */}
                    <div className="hm-price-badge">${price}</div>

                    {/* STAFF PICK — show on every 3rd card */}
                    {index % 3 === 2 && (
                      <div className="hm-staff-badge">Staff Pick</div>
                    )}
                  </div>

                  {/* CARD BODY */}
                  <div className="hm-card-body">
                    <div className="hm-card-info">
                      <Link to={`/product/${id}`} className="hm-card-name">
                        {name.toUpperCase()}
                      </Link>
                      <div className="hm-card-meta">
                        {category} / {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>

                    <button
                      className={`hm-add-btn ${!productAvailable ? "out" : ""}`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (productAvailable) addToCart(product);
                      }}
                      disabled={!productAvailable}
                      title={productAvailable ? "Add to cart" : "Out of stock"}
                    >
                      {productAvailable ? "+" : "×"}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

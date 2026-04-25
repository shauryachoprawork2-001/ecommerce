import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../Context/Context";
import axios from "../axios";

const Product = () => {
  const { id } = useParams();
  const { data, addToCart, removeFromCart, cart, refreshData } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/product/${id}`);
        setProduct(response.data);
        if (response.data.imageName) fetchImage();
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchImage = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/product/${id}/image`,
        { responseType: "blob" }
      );
      setImageUrl(URL.createObjectURL(response.data));
    };

    fetchProduct();
  }, [id]);

  const deleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/product/${id}`);
      removeFromCart(id);
      alert("Product deleted successfully");
      refreshData();
      navigate("/");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handlAddToCart = () => {
    addToCart(product);
    alert("Product added to cart");
  };

  if (!product) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;700;900&display=swap');
          .pd-loading {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f0efe9;
            font-family: 'Bebas Neue', sans-serif;
            font-size: 48px;
            letter-spacing: 4px;
            color: #111;
          }
        `}</style>
        <div className="pd-loading">LOADING...</div>
      </>
    );
  }

  const sizes = ["S", "M", "L", "XL"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;700;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .pd-page {
          min-height: 100vh;
          background-color: #f0efe9;
          background-image:
            linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px);
          background-size: 36px 36px;
          font-family: 'Barlow Condensed', sans-serif;
          padding-top: 64px;
        }

        /* ── MAIN LAYOUT ── */
        .pd-layout {
          display: grid;
          grid-template-columns: 55% 1fr;
          min-height: calc(100vh - 64px);
        }

        /* ── LEFT IMAGE ── */
        .pd-img-wrap {
          position: relative;
          border-right: 3px solid #111;
          background: #e8e7e1;
          overflow: hidden;
        }
        .pd-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          min-height: 600px;
        }
        .pd-new-badge {
          position: absolute;
          top: 20px;
          left: 20px;
          background: #fff;
          border: 2px solid #111;
          padding: 6px 14px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #111;
          z-index: 2;
        }
        .pd-img-border {
          position: absolute;
          inset: 12px;
          border: 3px solid #2b54ff;
          pointer-events: none;
          z-index: 1;
        }

        /* ── RIGHT CONTENT ── */
        .pd-content {
          padding: 48px 48px 40px;
          display: flex;
          flex-direction: column;
          gap: 0;
          overflow-y: auto;
        }

        .pd-category {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #999;
          margin-bottom: 12px;
        }

        .pd-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(52px, 7vw, 90px);
          line-height: 0.9;
          letter-spacing: -1px;
          color: #111;
          margin-bottom: 24px;
          text-transform: uppercase;
        }

        /* PRICE TAG */
        .pd-price-tag {
          display: inline-flex;
          align-items: center;
          background: #c6ff00;
          border: 2px solid #111;
          padding: 8px 20px;
          margin-bottom: 28px;
          width: fit-content;
        }
        .pd-price {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 42px;
          letter-spacing: 1px;
          color: #111;
          line-height: 1;
        }

        /* DESCRIPTION */
        .pd-desc {
          font-size: 15px;
          font-weight: 400;
          color: #555;
          line-height: 1.6;
          margin-bottom: 32px;
          max-width: 420px;
        }

        .pd-divider {
          height: 2px;
          background: #e0e0da;
          margin-bottom: 28px;
        }

        /* SIZE */
        .pd-section-label {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #111;
          margin-bottom: 12px;
        }

        .pd-sizes {
          display: flex;
          gap: 8px;
          margin-bottom: 28px;
        }
        .pd-size-btn {
          width: 48px;
          height: 48px;
          border: 2px solid #111;
          background: #fff;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 14px;
          font-weight: 900;
          letter-spacing: 1px;
          color: #111;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
          text-transform: uppercase;
        }
        .pd-size-btn:hover { background: #f0efe9; }
        .pd-size-btn.active {
          background: #111;
          color: #fff;
        }

        /* QUANTITY */
        .pd-qty-row {
          display: flex;
          align-items: center;
          gap: 0;
          border: 2px solid #111;
          width: fit-content;
          margin-bottom: 32px;
        }
        .pd-qty-btn {
          width: 44px;
          height: 44px;
          background: #fff;
          border: none;
          font-size: 22px;
          font-weight: 900;
          color: #111;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s;
          font-family: 'Barlow Condensed', sans-serif;
        }
        .pd-qty-btn:hover { background: #f0efe9; }
        .pd-qty-num {
          width: 56px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          color: #111;
          border-left: 2px solid #111;
          border-right: 2px solid #111;
        }

        /* STOCK */
        .pd-stock {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #999;
          margin-bottom: 32px;
        }
        .pd-stock span {
          color: #111;
          font-weight: 900;
        }

        /* ADD TO VAULT BUTTON */
        .pd-add-btn {
          width: 100%;
          padding: 20px;
          background: #111;
          border: 3px solid #111;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 3px;
          color: #c6ff00;
          cursor: pointer;
          text-transform: uppercase;
          transition: background 0.15s, color 0.15s;
          margin-bottom: 12px;
        }
        .pd-add-btn:hover { background: #ff2eb4; border-color: #ff2eb4; color: #fff; }
        .pd-add-btn.out-of-stock {
          background: #ccc;
          border-color: #ccc;
          color: #888;
          cursor: not-allowed;
        }

        /* ADMIN BUTTONS */
        .pd-admin-row {
          display: flex;
          gap: 8px;
          margin-top: 4px;
        }
        .pd-edit-btn {
          flex: 1;
          padding: 12px;
          background: transparent;
          border: 2px solid #111;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 14px;
          font-weight: 900;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #111;
          cursor: pointer;
          transition: background 0.15s;
        }
        .pd-edit-btn:hover { background: #f0efe9; }

        .pd-delete-btn {
          flex: 1;
          padding: 12px;
          background: transparent;
          border: 2px solid #111;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 14px;
          font-weight: 900;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #111;
          cursor: pointer;
          transition: background 0.15s, color 0.15s, border-color 0.15s;
        }
        .pd-delete-btn:hover {
          background: #111;
          color: #ff2eb4;
        }

        /* RELEASE DATE */
        .pd-meta {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 2px solid #e0e0da;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #bbb;
        }

        @media (max-width: 860px) {
          .pd-layout { grid-template-columns: 1fr; }
          .pd-img-wrap { min-height: 360px; border-right: none; border-bottom: 3px solid #111; }
          .pd-content { padding: 28px 20px; }
          .pd-name { font-size: 48px; }
        }
      `}</style>

      <div className="pd-page">
        <div className="pd-layout">

          {/* LEFT — IMAGE */}
          <div className="pd-img-wrap">
            {imageUrl && (
              <img className="pd-img" src={imageUrl} alt={product.name} />
            )}
            <div className="pd-img-border" />
            <div className="pd-new-badge">NEW DROP</div>
          </div>

          {/* RIGHT — CONTENT */}
          <div className="pd-content">

            <div className="pd-category">{product.category}</div>

            <h1 className="pd-name">{product.name}</h1>

            <div className="pd-price-tag">
              <span className="pd-price">${product.price}</span>
            </div>

            {product.desc && <p className="pd-desc">{product.desc}</p>}

            <div className="pd-divider" />

            {/* SIZE */}
            <div className="pd-section-label">Size</div>
            <div className="pd-sizes">
              {sizes.map((s) => (
                <button
                  key={s}
                  className={`pd-size-btn ${selectedSize === s ? "active" : ""}`}
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* QUANTITY */}
            <div className="pd-section-label">Quantity</div>
            <div className="pd-qty-row">
              <button
                className="pd-qty-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                −
              </button>
              <span className="pd-qty-num">{quantity}</span>
              <button
                className="pd-qty-btn"
                onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
              >
                +
              </button>
            </div>

            {/* STOCK */}
            <div className="pd-stock">
              Stock available: <span>{product.stockQuantity}</span>
            </div>

            {/* ADD TO VAULT */}
            <button
              className={`pd-add-btn ${!product.available ? "out-of-stock" : ""}`}
              onClick={handlAddToCart}
              disabled={!product.available}
            >
              {product.available
                ? `Add to Vault — $${product.price}`
                : "Out of Stock"}
            </button>

            {/* ADMIN */}
            <div className="pd-admin-row">
              <button
                className="pd-edit-btn"
                onClick={() => navigate(`/update_product/${product.id}`)}
              >
                ✏ Update
              </button>
              <button className="pd-delete-btn" onClick={deleteProduct}>
                ✕ Delete
              </button>
            </div>

            {/* META */}
            <div className="pd-meta">
              Listed on: {new Date(product.releaseDate).toLocaleDateString()} &nbsp;·&nbsp; {product.brand}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
import React, { useContext, useState, useEffect } from "react";
import AppContext from "../Context/Context";
import axios from "axios";
import CheckoutPopup from "./CheckoutPopup.jsx";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(AppContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartImage, setCartImage] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchImagesAndUpdateCart = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        const backendProductIds = response.data.map((product) => product.id);
        const updatedCartItems = cart.filter((item) => backendProductIds.includes(item.id));
        const cartItemsWithImages = await Promise.all(
          updatedCartItems.map(async (item) => {
            try {
              const response = await axios.get(
                `http://localhost:8080/api/product/${item.id}/image`,
                { responseType: "blob" }
              );
              const imageFile = await converUrlToFile(response.data, response.data.imageName);
              setCartImage(imageFile);
              const imageUrl = URL.createObjectURL(response.data);
              return { ...item, imageUrl };
            } catch (error) {
              return { ...item, imageUrl: "placeholder-image-url" };
            }
          })
        );
        setCartItems(cartItemsWithImages);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    if (cart.length) fetchImagesAndUpdateCart();
  }, [cart]);

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, [cartItems]);

  const converUrlToFile = async (blobData, fileName) => {
    return new File([blobData], fileName, { type: blobData.type });
  };

  const handleIncreaseQuantity = (itemId) => {
    setCartItems(cartItems.map((item) => {
      if (item.id === itemId) {
        if (item.quantity < item.stockQuantity) return { ...item, quantity: item.quantity + 1 };
        else alert("Cannot add more than available stock");
      }
      return item;
    }));
  };

  const handleDecreaseQuantity = (itemId) => {
    setCartItems(cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
    ));
  };

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const handleCheckout = async () => {
    try {
      for (const item of cartItems) {
        const { imageUrl, imageName, imageData, imageType, quantity, ...rest } = item;
        const updatedProductData = { ...rest, stockQuantity: item.stockQuantity - item.quantity };
        const cartProduct = new FormData();
        cartProduct.append("imageFile", cartImage);
        cartProduct.append("product", new Blob([JSON.stringify(updatedProductData)], { type: "application/json" }));
        await axios.put(`http://localhost:8080/api/product/${item.id}`, cartProduct, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      clearCart();
      setCartItems([]);
      setShowModal(false);
    } catch (error) {
      console.log("error during checkout", error);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;700;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .vault-page {
          min-height: 100vh;
          width: 100%;
          background-color: #f0efe9;
          background-image:
            linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px);
          background-size: 36px 36px;
          font-family: 'Barlow Condensed', sans-serif;
          display: flex;
          flex-direction: column;
        }

        /* ── TOP HEADER BAR ── */
        .vault-topbar {
          background: #c6ff00;
          border-bottom: 3px solid #111;
          padding: 24px 48px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }
        .vault-heading {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(52px, 8vw, 100px);
          line-height: 0.9;
          color: #111;
          letter-spacing: -2px;
        }
        .vault-heading span {
          color: #111;
          opacity: 0.45;
        }
        .vault-topbar-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }
        .vault-item-count {
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #111;
        }
        .vault-clear-btn {
          background: #111;
          color: #c6ff00;
          border: none;
          padding: 8px 20px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.15s;
        }
        .vault-clear-btn:hover { background: #ff2eb4; color: #fff; }

        /* ── MAIN LAYOUT ── */
        .vault-main {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 380px;
          min-height: calc(100vh - 160px);
        }

        /* ── LEFT: ITEMS ── */
        .vault-items-col {
          border-right: 3px solid #111;
          display: flex;
          flex-direction: column;
        }

        .vault-col-label {
          display: grid;
          grid-template-columns: 80px 1fr 160px 120px 80px 48px;
          gap: 0;
          padding: 12px 32px;
          border-bottom: 2px solid #111;
          background: #f0efe9;
        }
        .vault-col-label span {
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #999;
        }
        .vault-col-label span.center { text-align: center; }

        /* EMPTY */
        .vault-empty {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 40px;
          text-align: center;
        }
        .vault-empty-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(72px, 10vw, 120px);
          letter-spacing: 2px;
          color: #111;
          line-height: 1;
          margin-bottom: 16px;
        }
        .vault-empty-sub {
          font-size: 17px;
          font-weight: 400;
          color: #888;
          line-height: 1.6;
        }
        .vault-empty-sub strong {
          color: #ff2eb4;
          font-weight: 900;
        }

        /* ITEMS LIST */
        .vault-list { list-style: none; flex: 1; }

        .vault-item {
          display: grid;
          grid-template-columns: 100px 1fr 160px 120px 80px 48px;
          align-items: center;
          gap: 0;
          padding: 20px 32px;
          border-bottom: 2px solid #eee;
          background: #fff;
          transition: background 0.15s;
        }
        .vault-item:hover { background: #fafaf8; }

        .vault-item-img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border: 2px solid #111;
        }

        .vault-item-info { padding: 0 16px; }
        .vault-item-brand {
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #aaa;
          margin-bottom: 4px;
        }
        .vault-item-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          color: #111;
          letter-spacing: 0.5px;
          line-height: 1;
        }
        .vault-item-unit {
          font-size: 13px;
          color: #999;
          font-weight: 400;
          margin-top: 4px;
        }

        /* QTY */
        .vault-qty {
          display: flex;
          align-items: center;
          gap: 0;
          border: 2px solid #111;
          width: fit-content;
        }
        .vault-qty-btn {
          width: 34px; height: 34px;
          background: #111;
          color: #c6ff00;
          border: none;
          font-size: 20px;
          font-weight: 900;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s;
          line-height: 1;
          flex-shrink: 0;
        }
        .vault-qty-btn:hover { background: #ff2eb4; }
        .vault-qty-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          color: #111;
          width: 40px;
          text-align: center;
          border-left: 2px solid #111;
          border-right: 2px solid #111;
          padding: 2px 0;
        }

        /* PRICE */
        .vault-item-price {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          color: #111;
          letter-spacing: 1px;
          text-align: center;
        }

        /* REMOVE */
        .vault-remove {
          width: 36px; height: 36px;
          background: transparent;
          border: 2px solid #111;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          font-size: 14px;
          font-weight: 900;
          color: #111;
          transition: background 0.15s, color 0.15s;
          justify-self: center;
        }
        .vault-remove:hover { background: #111; color: #c6ff00; }

        /* ── RIGHT: SUMMARY ── */
        .vault-summary {
          display: flex;
          flex-direction: column;
          background: #f0efe9;
          position: sticky;
          top: 0;
          height: fit-content;
          min-height: calc(100vh - 160px);
        }

        .vault-summary-header {
          padding: 28px 32px 20px;
          border-bottom: 2px solid #111;
        }
        .vault-summary-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 32px;
          letter-spacing: 1px;
          color: #111;
          margin-bottom: 24px;
        }

        .vault-summary-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 12px;
        }
        .vault-summary-label {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #999;
        }
        .vault-summary-val {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          color: #111;
        }

        .vault-divider {
          height: 3px;
          background: #111;
          margin: 16px 0;
        }

        .vault-total-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .vault-total-label {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #111;
        }
        .vault-total-amount {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 52px;
          letter-spacing: -1px;
          color: #111;
          line-height: 1;
        }

        .vault-summary-footer {
          padding: 24px 32px;
          margin-top: auto;
          border-top: 2px solid #111;
        }

        .vault-checkout-btn {
          width: 100%;
          padding: 18px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          letter-spacing: 3px;
          border: 3px solid #111;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          display: block;
        }
        .vault-checkout-btn.active {
          background: #ff2eb4;
          color: #fff;
        }
        .vault-checkout-btn.active:hover {
          background: #111;
          color: #c6ff00;
        }
        .vault-checkout-btn.disabled {
          background: #e0d8e0;
          color: #bbb;
          cursor: not-allowed;
          border-color: #ccc;
        }

        .vault-note {
          margin-top: 12px;
          font-size: 11px;
          font-weight: 400;
          color: #aaa;
          letter-spacing: 1px;
          text-align: center;
          text-transform: uppercase;
        }

        /* stat pills */
        .vault-stat-pills {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 24px 32px;
          border-bottom: 2px solid #111;
        }
        .vault-pill {
          border: 2px solid #111;
          padding: 14px 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .vault-pill.pink  { background: #ff2eb4; }
        .vault-pill.black { background: #111; }
        .vault-pill-label {
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2.5px;
          text-transform: uppercase;
        }
        .vault-pill.pink  .vault-pill-label { color: #111; }
        .vault-pill.black .vault-pill-label { color: #c6ff00; }
        .vault-pill-val {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 1px;
        }
        .vault-pill.pink  .vault-pill-val { color: #111; }
        .vault-pill.black .vault-pill-val { color: #c6ff00; }

        @media (max-width: 860px) {
          .vault-main { grid-template-columns: 1fr; }
          .vault-items-col { border-right: none; border-bottom: 3px solid #111; }
          .vault-col-label { display: none; }
          .vault-item {
            grid-template-columns: 80px 1fr;
            grid-template-rows: auto auto auto;
            gap: 12px;
            padding: 16px;
          }
          .vault-qty, .vault-item-price, .vault-remove { grid-column: 2; }
          .vault-topbar { padding: 20px 20px; }
          .vault-summary { min-height: auto; }
        }
      `}</style>

      <div className="vault-page">

        {/* TOP HEADER */}
        <div className="vault-topbar">
          <h1 className="vault-heading">
            THE VAULT <span>({cartItems.length})</span>
          </h1>
          <div className="vault-topbar-right">
            <span className="vault-item-count">{cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your bag</span>
            {cartItems.length > 0 && (
              <button className="vault-clear-btn" onClick={clearCart}>Clear All</button>
            )}
          </div>
        </div>

        {/* MAIN */}
        <div className="vault-main">

          {/* LEFT COL */}
          <div className="vault-items-col">
            {cartItems.length > 0 && (
              <div className="vault-col-label">
                <span></span>
                <span>Product</span>
                <span className="center">Quantity</span>
                <span className="center">Total</span>
                <span></span>
                <span></span>
              </div>
            )}

            {cartItems.length === 0 ? (
              <div className="vault-empty">
                <div className="vault-empty-title">EMPTY.</div>
                <div className="vault-empty-sub">
                  You haven't acquired anything yet.<br />
                  <strong>Reject hesitation.</strong>
                </div>
              </div>
            ) : (
              <ul className="vault-list">
                {cartItems.map((item) => (
                  <li key={item.id} className="vault-item">
                    <img src={item.imageUrl} alt={item.name} className="vault-item-img" />

                    <div className="vault-item-info">
                      <div className="vault-item-brand">{item.brand}</div>
                      <div className="vault-item-name">{item.name}</div>
                      <div className="vault-item-unit">${item.price} each</div>
                    </div>

                    <div className="vault-qty">
                      <button className="vault-qty-btn" onClick={() => handleDecreaseQuantity(item.id)}>−</button>
                      <span className="vault-qty-num">{item.quantity}</span>
                      <button className="vault-qty-btn" onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                    </div>

                    <div className="vault-item-price">${item.price * item.quantity}</div>

                    <div></div>

                    <button className="vault-remove" onClick={() => handleRemoveFromCart(item.id)}>✕</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* RIGHT SUMMARY */}
          <div className="vault-summary">
            <div className="vault-summary-header">
              <div className="vault-summary-title">ORDER SUMMARY</div>

              <div className="vault-summary-row">
                <span className="vault-summary-label">Items</span>
                <span className="vault-summary-val">{cartItems.length}</span>
              </div>
              <div className="vault-summary-row">
                <span className="vault-summary-label">Subtotal</span>
                <span className="vault-summary-val">${totalPrice}</span>
              </div>
              <div className="vault-summary-row">
                <span className="vault-summary-label">Shipping</span>
                <span className="vault-summary-val">FREE</span>
              </div>
              <div className="vault-divider" />
              <div className="vault-total-row">
                <span className="vault-total-label">Total</span>
                <span className="vault-total-amount">${totalPrice}</span>
              </div>
            </div>

            <div className="vault-stat-pills">
              <div className="vault-pill pink">
                <span className="vault-pill-label">Items in bag</span>
                <span className="vault-pill-val">{cartItems.length.toString().padStart(2, "0")}</span>
              </div>
              <div className="vault-pill black">
                <span className="vault-pill-label">You're saving</span>
                <span className="vault-pill-val">$0</span>
              </div>
            </div>

            <div className="vault-summary-footer">
              <button
                className={`vault-checkout-btn ${cartItems.length > 0 ? "active" : "disabled"}`}
                onClick={() => cartItems.length > 0 && setShowModal(true)}
              >
                CHECKOUT →
              </button>
              <div className="vault-note">Free returns · Secure checkout</div>
            </div>
          </div>

        </div>
      </div>

      <CheckoutPopup
        show={showModal}
        handleClose={() => setShowModal(false)}
        cartItems={cartItems}
        totalPrice={totalPrice}
        handleCheckout={handleCheckout}
      />
    </>
  );
};

export default Cart;
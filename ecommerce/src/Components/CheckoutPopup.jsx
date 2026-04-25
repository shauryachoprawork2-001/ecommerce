import React from 'react';
import { Modal } from 'react-bootstrap';

const CheckoutPopup = ({ show, handleClose, cartItems, totalPrice, handleCheckout }) => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;700;900&display=swap');

        .co-modal .modal-content {
          border: 3px solid #111 !important;
          border-radius: 0 !important;
          background: #f0efe9 !important;
          font-family: 'Barlow Condensed', sans-serif;
          overflow: hidden;
        }

        /* HEADER */
        .co-header {
          background: #c6ff00;
          border-bottom: 3px solid #111;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .co-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 32px;
          letter-spacing: 1px;
          color: #111;
          line-height: 1;
        }
        .co-close {
          width: 36px;
          height: 36px;
          background: #111;
          border: none;
          color: #c6ff00;
          font-size: 18px;
          font-weight: 900;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s;
          flex-shrink: 0;
        }
        .co-close:hover { background: #ff2eb4; color: #fff; }

        /* BODY */
        .co-body {
          padding: 24px;
          background: #f0efe9;
          max-height: 60vh;
          overflow-y: auto;
        }

        /* ITEM ROW */
        .co-item {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          padding: 16px 0;
          border-bottom: 2px solid #ddd;
        }
        .co-item:last-child { border-bottom: none; }

        .co-item-img {
          width: 90px;
          height: 90px;
          object-fit: cover;
          border: 2px solid #111;
          flex-shrink: 0;
          display: block;
        }

        .co-item-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .co-item-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          color: #111;
          letter-spacing: 0.5px;
          line-height: 1;
        }
        .co-item-row {
          display: flex;
          gap: 16px;
          align-items: center;
        }
        .co-item-label {
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #999;
        }
        .co-item-val {
          font-size: 15px;
          font-weight: 700;
          color: #111;
          letter-spacing: 0.5px;
        }
        .co-item-price {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          color: #111;
          letter-spacing: 1px;
          margin-top: auto;
        }

        /* TOTAL ROW */
        .co-total {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-top: 20px;
          padding-top: 16px;
          border-top: 3px solid #111;
        }
        .co-total-label {
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #111;
        }
        .co-total-amount {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 42px;
          color: #111;
          letter-spacing: 1px;
          line-height: 1;
        }

        /* FOOTER */
        .co-footer {
          padding: 20px 24px;
          background: #f0efe9;
          border-top: 3px solid #111;
          display: flex;
          gap: 12px;
        }
        .co-confirm-btn {
          flex: 1;
          padding: 16px;
          background: #111;
          border: 2px solid #111;
          color: #c6ff00;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }
        .co-confirm-btn:hover { background: #ff2eb4; border-color: #ff2eb4; color: #fff; }

        .co-close-btn {
          padding: 16px 24px;
          background: transparent;
          border: 2px solid #111;
          color: #111;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.15s;
        }
        .co-close-btn:hover { background: #e0ded8; }

        /* EMPTY */
        .co-empty {
          text-align: center;
          padding: 40px 20px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 36px;
          color: #bbb;
          letter-spacing: 2px;
        }

        /* QUANTITY PILL */
        .co-qty-pill {
          display: inline-flex;
          align-items: center;
          background: #111;
          border: none;
          padding: 3px 10px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 1.5px;
          color: #c6ff00;
          text-transform: uppercase;
        }
      `}</style>

      <Modal show={show} onHide={handleClose} centered className="co-modal">
        <div className="modal-content">

          {/* HEADER */}
          <div className="co-header">
            <div className="co-title">Confirm Order</div>
            <button className="co-close" onClick={handleClose}>✕</button>
          </div>

          {/* BODY */}
          <div className="co-body">
            {cartItems.length === 0 ? (
              <div className="co-empty">NOTHING HERE.</div>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div key={item.id} className="co-item">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="co-item-img"
                    />
                    <div className="co-item-info">
                      <div className="co-item-name">{item.name}</div>
                      <div className="co-item-row">
                        <span className="co-item-label">Brand</span>
                        <span className="co-item-val">{item.brand}</span>
                      </div>
                      <div className="co-item-row">
                        <span className="co-item-label">Qty</span>
                        <span className="co-qty-pill">× {item.quantity}</span>
                      </div>
                      <div className="co-item-price">${item.price * item.quantity}</div>
                    </div>
                  </div>
                ))}

                {/* TOTAL */}
                <div className="co-total">
                  <span className="co-total-label">Total</span>
                  <span className="co-total-amount">${totalPrice}</span>
                </div>
              </>
            )}
          </div>

          {/* FOOTER */}
          <div className="co-footer">
            <button className="co-close-btn" onClick={handleClose}>Cancel</button>
            <button className="co-confirm-btn" onClick={handleCheckout}>
              Confirm Purchase →
            </button>
          </div>

        </div>
      </Modal>
    </>
  );
};

export default CheckoutPopup;
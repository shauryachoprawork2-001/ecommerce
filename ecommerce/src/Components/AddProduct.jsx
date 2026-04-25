import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    desc: "",
    price: "",
    category: "",
    stockQuantity: "",
    releaseDate: "",
    available: false,
  });
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleReset = () => {
    setProduct({
      name: "", brand: "", desc: "", price: "",
      category: "", stockQuantity: "", releaseDate: "", available: false,
    });
    setImage(null);
  };

//   const submitHandler = (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     formData.append("imageFile", image);
//     formData.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));
//     axios.post("http://localhost:8080/api/product", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     })
//       .then(() => alert("Product added successfully"))
//       .catch(() => alert("Error adding product"));
//   };
const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("imageFile", image);
    formData.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));
    
    axios.post("http://localhost:8080/api/product", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(() => alert("Product added successfully"))
      .catch((error) => {                              // ← replace your old .catch()
        console.log(error.response?.data);             // ← shows the error message
        console.log(error.response?.status);           // ← shows the status code (400, 500 etc)
        alert("Error adding product: " + error.response?.data);
      });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;700;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ap-page {
          min-height: 100vh;
          background-color: #f0efe9;
          background-image:
            linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px);
          background-size: 36px 36px;
          font-family: 'Barlow Condensed', sans-serif;
          padding: 0 0 60px;
        }

        /* ── HEADER ── */
        .ap-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 32px 48px 0;
          border-bottom: 3px solid #111;
          padding-bottom: 20px;
          margin-bottom: 36px;
        }
        .ap-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(56px, 9vw, 110px);
          line-height: 0.88;
          color: #111;
          letter-spacing: -2px;
        }
        .ap-badge {
          background: #c6ff00;
          border: 2px solid #111;
          padding: 8px 16px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 2px;
          color: #111;
          text-transform: uppercase;
          margin-top: 8px;
        }

        /* ── LAYOUT ── */
        .ap-body {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 28px;
          padding: 0 48px;
        }

        /* ── FORM CARD ── */
        .ap-form-card {
          background: #fff;
          border: 3px solid #111;
          padding: 36px;
        }
        .ap-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px 24px;
        }
        .ap-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .ap-field.full { grid-column: 1 / -1; }
        .ap-field.third { grid-column: span 1; }

        .ap-label {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #111;
        }
        .ap-input, .ap-select, .ap-textarea {
          background: #f0efe9;
          border: 2px solid #111;
          padding: 10px 14px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #111;
          outline: none;
          width: 100%;
          transition: background 0.15s;
        }
        .ap-input::placeholder, .ap-textarea::placeholder { color: #999; font-weight: 400; }
        .ap-input:focus, .ap-select:focus, .ap-textarea:focus {
          background: #fff;
          border-color: #ff2eb4;
        }
        .ap-textarea { resize: vertical; min-height: 90px; }
        .ap-select { cursor: pointer; }

        /* file input */
        .ap-file-label {
          display: flex;
          align-items: center;
          gap: 0;
          border: 2px solid #111;
          overflow: hidden;
          cursor: pointer;
        }
        .ap-file-btn {
          background: #111;
          color: #c6ff00;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 2px;
          padding: 10px 16px;
          flex-shrink: 0;
          text-transform: uppercase;
          cursor: pointer;
        }
        .ap-file-name {
          padding: 10px 14px;
          font-size: 13px;
          color: #666;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          background: #f0efe9;
          flex: 1;
        }
        input[type="file"] { display: none; }

        /* checkbox */
        .ap-check-row {
          grid-column: 1 / -1;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 0 4px;
          border-top: 2px solid #eee;
        }
        .ap-checkbox {
          width: 22px; height: 22px;
          border: 2px solid #111;
          background: #f0efe9;
          cursor: pointer;
          accent-color: #111;
          flex-shrink: 0;
        }
        .ap-check-label {
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #111;
        }

        /* buttons */
        .ap-btn-row {
          grid-column: 1 / -1;
          display: flex;
          gap: 12px;
          padding-top: 8px;
        }
        .ap-submit {
          background: #111;
          color: #c6ff00;
          border: 2px solid #111;
          padding: 14px 36px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 16px;
          font-weight: 900;
          letter-spacing: 3px;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }
        .ap-submit:hover { background: #ff2eb4; border-color: #ff2eb4; color: #fff; }

        .ap-reset {
          background: transparent;
          color: #111;
          border: 2px solid #111;
          padding: 14px 28px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 16px;
          font-weight: 900;
          letter-spacing: 3px;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.15s;
        }
        .ap-reset:hover { background: #f0efe9; }

        /* ── SIDE STATS ── */
        .ap-stats { display: flex; flex-direction: column; gap: 16px; }

        .stat-card {
          border: 3px solid #111;
          padding: 24px;
          position: relative;
          overflow: hidden;
        }
        .stat-card.pink  { background: #ff2eb4; }
        .stat-card.black { background: #111; }
        .stat-card.blue  { background: #2b54ff; }

        .stat-label {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .stat-card.pink  .stat-label { color: #111; }
        .stat-card.black .stat-label { color: #c6ff00; }
        .stat-card.blue  .stat-label { color: #c6ff00; }

        .stat-number {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 64px;
          line-height: 1;
          letter-spacing: -2px;
        }
        .stat-card.pink  .stat-number { color: #111; }
        .stat-card.black .stat-number { color: #c6ff00; }
        .stat-card.blue  .stat-number { color: #fff; }

        .stat-sub {
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-top: 4px;
        }
        .stat-card.pink  .stat-sub { color: #111; }
        .stat-card.black .stat-sub { color: #888; }
        .stat-card.blue  .stat-sub { color: rgba(255,255,255,0.7); }

        .stat-corner {
          position: absolute;
          top: 12px; right: 14px;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.5px;
          opacity: 0.5;
          text-transform: uppercase;
        }
        .stat-card.pink .stat-corner  { color: #111; }
        .stat-card.black .stat-corner { color: #fff; }
        .stat-card.blue .stat-corner  { color: #fff; }

        @media (max-width: 860px) {
          .ap-body { grid-template-columns: 1fr; }
          .ap-header { padding: 24px 24px 16px; }
          .ap-body { padding: 0 24px; }
          .ap-grid { grid-template-columns: 1fr; }
          .ap-field.full, .ap-check-row, .ap-btn-row { grid-column: 1; }
        }
      `}</style>

      <div className="ap-page">
        {/* HEADER */}
        <div className="ap-header">
          <h1 className="ap-title">ADD<br />PRODUCT</h1>
          <div className="ap-badge">TERMINAL V2.6</div>
        </div>

        <div className="ap-body">
          {/* FORM */}
          <div className="ap-form-card">
            <form onSubmit={submitHandler}>
              <div className="ap-grid">

                <div className="ap-field">
                  <label className="ap-label">Name</label>
                  <input className="ap-input" type="text" name="name"
                    placeholder="Sport Shoe" value={product.name} onChange={handleInputChange} />
                </div>

                <div className="ap-field">
                  <label className="ap-label">Brand</label>
                  <input className="ap-input" type="text" name="brand"
                    placeholder="Nike" value={product.brand} onChange={handleInputChange} />
                </div>

                <div className="ap-field full">
                  <label className="ap-label">Description</label>
                  <textarea className="ap-textarea" name="desc"
                    placeholder="Walk and code..." value={product.desc} onChange={handleInputChange} />
                </div>

                <div className="ap-field">
                  <label className="ap-label">Price ($)</label>
                  <input className="ap-input" type="number" name="price"
                    placeholder="99" value={product.price} onChange={handleInputChange} />
                </div>

                <div className="ap-field">
                  <label className="ap-label">Category</label>
                  <select className="ap-select" name="category"
                    value={product.category} onChange={handleInputChange}>
                    <option value="">Select category</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Headphone">Headphone</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Toys">Toys</option>
                    <option value="Fashion">Fashion</option>
                  </select>
                </div>

                <div className="ap-field">
                  <label className="ap-label">Stock Quantity</label>
                  <input className="ap-input" type="number" name="stockQuantity"
                    placeholder="100" value={product.stockQuantity} onChange={handleInputChange} />
                </div>

                <div className="ap-field">
                  <label className="ap-label">Release Date</label>
                  <input className="ap-input" type="date" name="releaseDate"
                    value={product.releaseDate} onChange={handleInputChange} />
                </div>

                <div className="ap-field full">
                  <label className="ap-label">Image</label>
                  <label className="ap-file-label">
                    <span className="ap-file-btn">Choose</span>
                    <span className="ap-file-name">
                      {image ? image.name : "No file chosen"}
                    </span>
                    <input type="file" onChange={handleImageChange} accept="image/*" />
                  </label>
                </div>

                <div className="ap-check-row">
                  <input className="ap-checkbox" type="checkbox" name="available"
                    checked={product.available}
                    onChange={(e) => setProduct({ ...product, available: e.target.checked })} />
                  <label className="ap-check-label">Product Available</label>
                </div>

                <div className="ap-btn-row">
                  <button type="submit" className="ap-submit">Submit →</button>
                  <button type="button" className="ap-reset" onClick={handleReset}>Reset</button>
                </div>

              </div>
            </form>
          </div>

          {/* SIDE STATS */}
          <div className="ap-stats">
            <div className="stat-card pink">
              <span className="stat-corner">Today</span>
              <div className="stat-label">Today</div>
              <div className="stat-number">14</div>
              <div className="stat-sub">Items Added</div>
            </div>
            <div className="stat-card black">
              <span className="stat-corner">Live</span>
              <div className="stat-label">Inventory</div>
              <div className="stat-number">2,841</div>
              <div className="stat-sub">Total Units</div>
            </div>
            <div className="stat-card blue">
              <span className="stat-corner">Queue</span>
              <div className="stat-label">Pending</div>
              <div className="stat-number">03</div>
              <div className="stat-sub">Awaiting QC</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
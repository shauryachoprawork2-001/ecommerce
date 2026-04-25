import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [image, setImage] = useState(null);
  const [updateProduct, setUpdateProduct] = useState({
    id: null,
    name: "",
    description: "",
    brand: "",
    price: "",
    category: "",
    releaseDate: "",
    productAvailable: false,
    stockQuantity: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/product/${id}`);
        setProduct(response.data);
        const responseImage = await axios.get(
          `http://localhost:8080/api/product/${id}/image`,
          { responseType: "blob" }
        );
        const imageFile = await convertUrlToFile(responseImage.data, response.data.imageName);
        setImage(imageFile);
        setUpdateProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    console.log("image Updated", image);
  }, [image]);

  const convertUrlToFile = async (blobData, fileName) => {
    return new File([blobData], fileName, { type: blobData.type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imageFile", image);
    formData.append("product", new Blob([JSON.stringify(updateProduct)], { type: "application/json" }));
    axios
      .put(`http://localhost:8080/api/product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log("Product updated successfully:", response.data);
        alert("Product updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;700;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .up-page {
          min-height: 100vh;
          width: 100%;
          background-color: #f0efe9;
          background-image:
            linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px);
          background-size: 36px 36px;
          font-family: 'Barlow Condensed', sans-serif;
        }

        /* ── HEADER ── */
        .up-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding: 32px 48px 20px;
          border-bottom: 3px solid #111;
          margin-bottom: 48px;
        }
        .up-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(52px, 9vw, 110px);
          line-height: 0.88;
          color: #111;
          letter-spacing: -2px;
        }
        .up-badge {
          background: #ff2eb4;
          border: 2px solid #111;
          padding: 8px 16px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 8px;
        }

        /* ── LAYOUT ── */
        .up-body {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 28px;
          padding: 0 48px 60px;
        }

        /* ── FORM CARD ── */
        .up-form-card {
          background: #fff;
          border: 3px solid #111;
          padding: 36px;
        }

        .up-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px 24px;
        }

        .up-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .up-field.full { grid-column: 1 / -1; }

        .up-label {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #111;
        }

        .up-input {
          background: #f0efe9;
          border: 2px solid #111;
          padding: 10px 14px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #111;
          outline: none;
          width: 100%;
          transition: background 0.15s, border-color 0.15s;
        }
        .up-input::placeholder { color: #999; font-weight: 400; }
        .up-input:focus {
          background: #fff;
          border-color: #ff2eb4;
        }

        /* FILE INPUT */
        .up-file-label {
          display: flex;
          align-items: center;
          border: 2px solid #111;
          overflow: hidden;
          cursor: pointer;
        }
        .up-file-btn {
          background: #111;
          color: #c6ff00;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 2px;
          padding: 10px 16px;
          flex-shrink: 0;
          text-transform: uppercase;
          cursor: pointer;
        }
        .up-file-name {
          padding: 10px 14px;
          font-size: 13px;
          color: #666;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          background: #f0efe9;
          flex: 1;
        }
        input[type="file"].up-file-hidden { display: none; }

        /* BUTTONS */
        .up-btn-row {
          grid-column: 1 / -1;
          display: flex;
          gap: 12px;
          padding-top: 8px;
          border-top: 2px solid #eee;
          margin-top: 4px;
        }
        .up-submit {
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
        .up-submit:hover { background: #ff2eb4; border-color: #ff2eb4; color: #fff; }

        .up-cancel {
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
          text-decoration: none;
          display: flex;
          align-items: center;
          transition: background 0.15s;
        }
        .up-cancel:hover { background: #f0efe9; }

        /* ── SIDE PANEL ── */
        .up-side { display: flex; flex-direction: column; gap: 16px; }

        .up-preview-card {
          background: #fff;
          border: 3px solid #111;
          overflow: hidden;
        }
        .up-preview-header {
          background: #111;
          padding: 12px 16px;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #c6ff00;
        }
        .up-preview-img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          display: block;
          border-bottom: 2px solid #111;
        }
        .up-preview-placeholder {
          width: 100%;
          height: 220px;
          background: #f0efe9;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 2px solid #111;
        }
        .up-preview-placeholder span {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #bbb;
        }
        .up-preview-body { padding: 16px; }
        .up-preview-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          color: #111;
          letter-spacing: 0.5px;
          line-height: 1;
          margin-bottom: 4px;
        }
        .up-preview-brand {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #aaa;
          margin-bottom: 12px;
        }
        .up-preview-price {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 36px;
          color: #111;
          letter-spacing: 1px;
        }

        /* INFO PILLS */
        .up-pill {
          border: 3px solid #111;
          padding: 18px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .up-pill.lime { background: #c6ff00; }
        .up-pill.pink { background: #ff2eb4; }
        .up-pill-label {
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #111;
        }
        .up-pill.pink .up-pill-label { color: #fff; }
        .up-pill-val {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          color: #111;
          letter-spacing: 1px;
        }
        .up-pill.pink .up-pill-val { color: #fff; }

        @media (max-width: 860px) {
          .up-body { grid-template-columns: 1fr; padding: 0 20px 40px; }
          .up-header { padding: 24px 20px 16px; }
          .up-grid { grid-template-columns: 1fr; }
          .up-field.full, .up-btn-row { grid-column: 1; }
        }
      `}</style>

      <div className="up-page">

        {/* HEADER */}
        <div className="up-header">
          <h1 className="up-title">UPDATE<br />PRODUCT</h1>
          <div className="up-badge">EDITING ID — {id}</div>
        </div>

        <div className="up-body">

          {/* FORM */}
          <div className="up-form-card">
            <form onSubmit={handleSubmit}>
              <div className="up-grid">

                <div className="up-field">
                  <label className="up-label">Name</label>
                  <input
                    className="up-input"
                    type="text"
                    placeholder="Product name"
                    value={updateProduct.name}
                    onChange={(e) => setUpdateProduct({ ...updateProduct, name: e.target.value })}
                  />
                </div>

                <div className="up-field">
                  <label className="up-label">Brand</label>
                  <input
                    className="up-input"
                    type="text"
                    placeholder="Brand name"
                    value={updateProduct.brand}
                    onChange={(e) => setUpdateProduct({ ...updateProduct, brand: e.target.value })}
                  />
                </div>

                <div className="up-field full">
                  <label className="up-label">Price ($)</label>
                  <input
                    className="up-input"
                    type="number"
                    placeholder="e.g. 99"
                    value={updateProduct.price}
                    onChange={(e) => setUpdateProduct({ ...updateProduct, price: e.target.value })}
                  />
                </div>

                <div className="up-field full">
                  <label className="up-label">Image</label>
                  <label className="up-file-label">
                    <span className="up-file-btn">Choose</span>
                    <span className="up-file-name">
                      {image ? image.name : "No file chosen"}
                    </span>
                    <input
                      type="file"
                      className="up-file-hidden"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </label>
                </div>

                <div className="up-btn-row">
                  <button type="submit" className="up-submit">Update →</button>
                  <a href="/" className="up-cancel">Cancel</a>
                </div>

              </div>
            </form>
          </div>

          {/* SIDE PANEL */}
          <div className="up-side">

            {/* LIVE PREVIEW */}
            <div className="up-preview-card">
              <div className="up-preview-header">Live Preview</div>
              {image ? (
                <img
                  className="up-preview-img"
                  src={URL.createObjectURL(image)}
                  alt="preview"
                />
              ) : (
                <div className="up-preview-placeholder">
                  <span>No image yet</span>
                </div>
              )}
              <div className="up-preview-body">
                <div className="up-preview-brand">{updateProduct.brand || "Brand"}</div>
                <div className="up-preview-name">{updateProduct.name || "Product Name"}</div>
                <div className="up-preview-price">
                  {updateProduct.price ? `$${updateProduct.price}` : "$0"}
                </div>
              </div>
            </div>

            {/* PILLS */}
            <div className="up-pill lime">
              <span className="up-pill-label">Product ID</span>
              <span className="up-pill-val">{id}</span>
            </div>
            <div className="up-pill pink">
              <span className="up-pill-label">Status</span>
              <span className="up-pill-val">Editing</span>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
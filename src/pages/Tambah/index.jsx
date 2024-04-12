import React, { useState } from "react";
import axios from "axios";
// import Input from "../../components/Input";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../utils/constant";

const Tambah = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    status: true,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseUrl}/product`,
        formData
      );
      console.log(response.data);
      setFormData({ name: "", price: "", stock: "", status: true });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Input Nama Produk"
            label="Nama Produk"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            name="price"
            type="number"
            placeholder="Input Harga Produk"
            label="Harga Produk"
            value={formData.price}
            onChange={handleChange}
          />
          <input
            name="stock"
            type="number"
            placeholder="Input Stock Produk"
            label="Stock Produk"
            value={formData.stock}
            onChange={handleChange}
          />
          <input
            name="status"
            type="checkbox"
            label="Active"
            checked={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.checked })
            }
          />
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Tambah;

import axios from "axios";
import React, { useState, useEffect } from "react";
import Input from "../../components/Input";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../utils/constant";

const Edit = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    status: true,
  });
  const navigate = useNavigate();
  const { _id } = useParams();

  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = async () => {
    const response = await axios.get(`${baseUrl}/product/${_id}`);
    setFormData(response.data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const editProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${baseUrl}/${_id}`, formData);
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
        <form onSubmit={editProduct}>
          <Input
            name="name"
            type="text"
            placeholder="Input Nama Produk"
            label="Nama Produk"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            name="price"
            type="number"
            placeholder="Input Harga Produk"
            label="Harga Produk"
            value={formData.price}
            onChange={handleChange}
          />
          <Input
            name="stock"
            type="number"
            placeholder="Input Stock Produk"
            label="Stock Produk"
            value={formData.stock}
            onChange={handleChange}
          />
          <Input
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

export default Edit;

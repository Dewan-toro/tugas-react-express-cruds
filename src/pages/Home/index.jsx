import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./index.scss";
import { baseUrl } from "../../utils/constant";
const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/product`);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (_id) => {
    const confirm = window.confirm("Are you sure?");
    if (confirm) {
      try {
        await axios.delete(`${baseUrl}/product/${_id}`);
        getProducts();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">
        Tamah Produk
      </Link>
      <div className="search">
        <input type="text" placeholder="Masukan kata kunci..." />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Stock</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.stock}</td>
              <td className="text-right">
                Rp{product.price ? product.price.toLocaleString("id-ID") : "-"}
              </td>
              <td className="text-center">
                <Link
                  to={`/detail/${product._id}`}
                  className="btn btn-sm btn-info"
                >
                  Detail
                </Link>
                <Link
                  to={`/edit/${product._id}`}
                  className="btn btn-sm btn-warning"
                >
                  Edit
                </Link>
                <Link
                  onClick={() => deleteProduct(product._id)}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;

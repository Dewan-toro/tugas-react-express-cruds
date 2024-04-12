import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "./index.scss";
import { baseUrl } from "../../utils/constant";

const Detail = () => {
  const [product, setProduct] = useState({});
  const { _id } = useParams();

  useEffect(() => {
    getProducts();
  }, [_id]);

  const getProducts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/product/${_id}`);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">
        Kembali
      </Link>
      <h2 className="t">Detail Produk</h2>
      {product ? (
        <table className="table">
          <tbody>
            <tr>
              <td>Name</td>
              <td>: {product.name}</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>
                : Rp
                {product.price ? product.price.toLocaleString("id-ID") : "-"}
              </td>
            </tr>
            <tr>
              <td>Stock</td>
              <td>: {product.stock} Unit</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>: {product.status ? "Ready" : "Not Ready"}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Detail;

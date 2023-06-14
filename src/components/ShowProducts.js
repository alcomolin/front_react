import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alert } from "../functions";

const ShowProducts = () => {
  const url = "http://yii2-react.test";
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [action, setAction] = useState(1);
  const [title, setTitle] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const res = await axios.get(`${url}/api/product`);
    setProducts(res.data);
  };

  const openModal = (op, product) => {
    setId("");
    setName("");
    setDescription("");
    setPrice("");
    setStock("");
    setAction(op);
    if (op === 1) {
      setTitle("Create Product");
    } else if (op === 2) {
      setTitle("Edit Product");
      setId(product.id);
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setStock(product.stock);
    }
  };

  const saveProduct = async () => {
    const meth = action === 1 ? "POST" : "PUT";
    const urlSave =
      meth === "PUT" ? `${url}/api/product/${id}` : `${url}/api/product`;
    const parameters = {
      name: name,
      description: description,
      price: price,
      stock: stock,
    };

    await axios({
      method: meth,
      url: urlSave,
      data: parameters,
    })
      .then(function (res) {
        console.log("res", res);
        var type = res.statusText;
        var msg = res.statusText;
        show_alert(msg, "success");
        if (type === "Created" || type === "OK") {
          document.getElementById("btnCerrar").click();
          getProducts();
        }
      })
      .catch(function (e) {
        show_alert("Error", "error");
        console.error(e);
      });
  };

  const deleteProduct = (id, name) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: `Are you sure to delete the product ${name}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      axios
        .delete(`${url}/api/product/${id}`)
        .then((response) => {
          getProducts();
          Swal.fire("Deleted!", "Your product has been deleted.", "success");
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-md-4 offset-1">
            <div>
              <button
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#modalProducts"
                onClick={() => openModal(1)}
              >
                <i className="fas fa-plus"></i> New
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 col-lg-10 offset-0 offset-lg-1">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="text-center bg-secondary text-white">ID</th>
                    <th className="bg-secondary text-white">Name</th>
                    <th className="bg-secondary text-white">Description</th>
                    <th className="bg-secondary text-white">Price</th>
                    <th className="text-center bg-secondary text-white">
                      Stock
                    </th>
                    <th className="bg-secondary text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="text-center">{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td className="text-end">
                        ${new Intl.NumberFormat("es-co").format(product.price)}
                      </td>
                      <td className="text-center">{product.stock}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-warning"
                          data-bs-toggle="modal"
                          data-bs-target="#modalProducts"
                          onClick={() => openModal(2, product)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        &nbsp;
                        <button
                          onClick={() =>
                            deleteProduct(product.id, product.name)
                          }
                          className="btn btn-danger"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div id="modalProducts" className="modal fade" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <label className="h5">{title}</label>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input type="hidden" id="id"></input>
              <div className="form-group mb-3">
                <label>Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
              <div className="form-group mb-3">
                <label>Description</label>
                <input
                  type="text"
                  id="description"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></input>
              </div>
              <div className="form-group mb-3">
                <label>Price</label>
                <input
                  type="number"
                  id="price"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </div>
              <div className="form-group mb-3">
                <label>Stock</label>
                <input
                  type="number"
                  id="stock"
                  className="form-control"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                ></input>
              </div>
              <div className="d-grid col-6 mx-auto">
                <button
                  onClick={() => saveProduct()}
                  className="btn btn-primary"
                >
                  Save
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                id="btnCerrar"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProducts;

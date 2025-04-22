import React from "react";
import Layout from "./common/Layout";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ProductImg from "../assets/images/eight.jpg";

const Shop = () => {
  return (
    <Layout>
      <div className="container">
        <nav aria-label="breadcrumb" className="py-4 ms-5">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Shop
            </li>
          </ol>
        </nav>
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 ms-5">
            <div className="card shadow border-0 mb-2">
              <div className="card-body p-4">
                <h3>Category</h3>
                <ul>
                  <li className="mb-2">
                    <input type="checkbox" />
                    <label htmlFor="" className="ps-2">
                      Kids
                    </label>
                  </li>
                  <li className="mb-2">
                    <input type="checkbox" />
                    <label htmlFor="" className="ps-2">
                      Men
                    </label>
                  </li>
                  <li className="mb-2">
                    <input type="checkbox" />
                    <label htmlFor="" className="ps-2">
                      Women
                    </label>
                  </li>
                </ul>
              </div>
            </div>
            <div className="card shadow border-0 mb-2">
              <div className="card-body p-4">
                <h3>Category</h3>
                <ul>
                  <li className="mb-2">
                    <input type="checkbox" />
                    <label htmlFor="" className="ps-2">
                      Kids
                    </label>
                  </li>
                  <li className="mb-2">
                    <input type="checkbox" />
                    <label htmlFor="" className="ps-2">
                      Men
                    </label>
                  </li>
                  <li className="mb-2">
                    <input type="checkbox" />
                    <label htmlFor="" className="ps-2">
                      Women
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Product cards */}
          <div className="col-md-8">
            <div className="row g-xxl-5">
              {" "}
              {/* <-- added g-4 for consistent gap */}
              {/* Card 1 */}
              <div className="col-md-4">
                <Card className="product-card h-100 shadow-sm border-0">
                  <Link to="/product">
                    <Card.Img
                      variant="top"
                      src={ProductImg}
                      className="product-img"
                    />
                  </Link>
                  <Card.Body className="d-flex flex-column">
                    <Link to="/product">
                      <Card.Title className="product-title">
                        Red Shirt for Men
                      </Card.Title>
                    </Link>
                    <div className="product-price mb-3">$50</div>
                    <Button variant="primary" className="mt-auto">
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-md-4">
                <Card className="product-card h-100 shadow-sm border-0">
                  <Card.Img
                    variant="top"
                    src={ProductImg}
                    className="product-img"
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="product-title">
                      Red Shirt for Men
                    </Card.Title>
                    <div className="product-price mb-3">$50</div>
                    <Button variant="primary" className="mt-auto">
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-md-4">
                <Card className="product-card h-100 shadow-sm border-0">
                  <Card.Img
                    variant="top"
                    src={ProductImg}
                    className="product-img"
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="product-title">
                      Red Shirt for Men
                    </Card.Title>
                    <div className="product-price mb-3">$50</div>
                    <Button variant="primary" className="mt-auto">
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            </div>

            <div className="row g-4 mt-5 pb-5">
              {" "}
              {/* <-- added g-4 for consistent gap */}
              {/* Card 1 */}
              <div className="col-md-4">
                <Card className="product-card h-100 shadow-sm border-0">
                  <Card.Img
                    variant="top"
                    src={ProductImg}
                    className="product-img"
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="product-title">
                      Red Shirt for Men
                    </Card.Title>
                    <div className="product-price mb-3">$50</div>
                    <Button variant="primary" className="mt-auto">
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </div>
              {/* Repeat other cards same way */}
              <div className="col-md-4">
                <Card className="product-card h-100 shadow-sm border-0">
                  <Card.Img
                    variant="top"
                    src={ProductImg}
                    className="product-img"
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="product-title">
                      Red Shirt for Men
                    </Card.Title>
                    <div className="product-price mb-3">$50</div>
                    <Button variant="primary" className="mt-auto">
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-md-4">
                <Card className="product-card h-100 shadow-sm border-0">
                  <Card.Img
                    variant="top"
                    src={ProductImg}
                    className="product-img"
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="product-title">
                      Red Shirt for Men
                    </Card.Title>
                    <div className="product-price mb-3">$50</div>
                    <Button variant="primary" className="mt-auto">
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;

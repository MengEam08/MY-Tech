import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ProductImg from '../../assets/images/eleven.jpg';

const FeaturedProducts = () => {    
  return (
    <>
    <div className='container-md'>
    <section className='section-2 py-3 ms-5'>
          <div className='container'>
            <h2>Featured Products</h2>
          </div>
          <div className='row mt-4'>
            <div className='col-md-3'>
              {/* <div className='product card border-0'>
                <div className='card-img'>
                  <img src={ProductImg} alt="" className='w-100' />
                </div>
                <div className='card-body pt-3'>
                  <a href=""> Red Check Shirt for Men</a>
                </div>
              </div> */}
              <Card className="product-card h-80 shadow-sm border-0">
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
            <div className='col-md-3'>
              {/* <div className='product card border-0'>
                <div className='card-img'>
                  <img src={ProductImg} alt="" className='w-100' />
                </div>
                <div className='card-body pt-3'>
                  <a href=""> Red Check Shirt for Men</a>
                </div>
              </div> */}
              <Card className="product-card h-80 shadow-sm border-0">
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
            <div className='col-md-3'>
              {/* <div className='product card border-0'>
                <div className='card-img'>
                  <img src={ProductImg} alt="" className='w-100' />
                </div>
                <div className='card-body pt-3'>
                  <a href=""> Red Check Shirt for Men</a>
                </div>
              </div> */}
              <Card className="product-card h-80 shadow-sm border-0">
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
            <div className='col-md-3'>
              {/* <div className='product card border-0'>
                <div className='card-img'>
                  <img src={ProductImg} alt="" className='w-100' />
                </div>
                <div className='card-body pt-3'>
                  <a href=""> Red Check Shirt for Men</a>
                </div>
              </div> */}
              <Card className="product-card h-80 shadow-sm border-0">
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
      </section>
    </div>
   </>
  );
}

export default FeaturedProducts;

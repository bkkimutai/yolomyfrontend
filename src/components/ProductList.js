
import React from 'react';
import Product from './Product';
import './styles/ProductList.css';

 function ProductList(props) {
    return (
        <React.Fragment>
        <div className='container' id="products">
            <div className="row pdg-line">
 
                {/* Product Title */}
                <div className="col-4 col-sm-4 col-md-4">
                     <div className="abt-top-border"> </div>
                </div>
                <div className="col-4 col-sm-4 col-md-4">
                    <p className="product-title text-center">PRODUCTS </p>
                </div>
                <div className="col-4 col-sm-4 col-md-4">
                    <div className="abt-top-border"> </div>
                </div>
               
            </div>
 
            {/* Product List */}
            <div className="men-products">
                <div className="row">
                {props.productList.map((product) =>
                    <  Product whenProductIsClicked = {props.onProductSelection}
                    photo = {product.photo}
                    name = {product.name}
                    price = {product.price}
                    id = {product._id} />
                    // key= {product.id}/>
 
                )}
                </div>
 
            </div>
 
        </div>
 
        </React.Fragment>
    )
 }
 
 export default ProductList;

import React, { Component } from 'react';
import API from '../../API';


import ProductList from '../productlist/ProductList';
import AddProduct from '../addproduct/AddProduct';
import NewProductForm from '../newproductform/NewProductForm';
import ProductDetail from '../productdetail/ProductDetail';

import tshirt from '../../images/products/tshirt.png';
import backpack from '../../images/products/backpack.png';
import pants from '../../images/products/pants.png';
import trekkingshoes from '../../images/products/trekkingshoes.png';
import giacket from '../../images/products/giacket.png';
import tshirt_ladies from '../../images/products/tshirt_ladies.png';
import Default_image from '../../images/backgrounds/hero.jpg';

// const actualProductList = [
  
//     {
//         name: 'T-Shirt',
//         price: '599',
//         photo: tshirt,
//         id: "1"
//     },
//     {
//         name: 'BackPack',
//         price: '1500',
//         photo: backpack,
//         id: "2"
//     },
//     {
//         name: 'Pants',
//         price: '1000',
//         photo: pants,
//         id: '3'
//     },
//     {
//         name: 'Trekking Shoes',
//         price: '2000',
//         photo: trekkingshoes,
//         id: '4'
//     },
//     {
//         name: 'Jacket',
//         price: '1500',
//         photo: giacket,
//         id: '5'
//     },
//     {
//         name:'T-Shirt Ladies',
//         price: '650',
//         photo: tshirt_ladies,
//         id: '6'
//     }
//  ]
 
class ProductControl extends Component {
   constructor(props){
       super(props);
       this.state ={
        productFormVisible: false, //for NewProductForm
        selectedProduct: null, //to ProductDetails
        actualProductList: [] // for ProductList
        
    }
   }
   async componentDidMount() {
    const res = await API.get('/product/products');
    this.setState({actualProductList: res.data});
    console.log(res);
   }
 
   handleClick = ()=>{
    if(this.state.selectedProduct !=null){
        this.setState({
            productFormVisible: false,
            selectedProduct: null
        })
    }else{
        this.setState((prevState)=>({
            productFormVisible: !prevState.productFormVisible
        }))
    }
}
handleChangingSelectedProduct = (id) => {
    const selectedProduct = this.state.actualProductList.filter(product => product.id === id)[0];
    this.setState({selectedProduct: selectedProduct});
}



 // Method to handle adding a new product
 handleAddingNewProduct = (newProduct) =>{
    if (newProduct.photo === undefined){
        newProduct.photo = Default_image
    }
    const newProductList = this.state.actualProductList.concat(newProduct)
    this.setState({
        actualProductList: newProductList,
        ProductFormVisibleOn: false
    })
};
   render() {
    let currentVisibleState = null;
    let buttonText = null;
        if(this.state.selectedProduct != null){
        currentVisibleState = <ProductDetail product ={this.state.selectedProduct} />
        buttonText = 'Back to Product List'
        }else if (this.state.productFormVisible){
        currentVisibleState = <NewProductForm  onNewProductCreation= {this.handleAddingNewProduct}/>
           buttonText = 'Go back to Product List' 
       }else{
           currentVisibleState = <ProductList productList = {this.state.actualProductList} onProductSelection = {this.handleChangingSelectedProduct}/>
           buttonText = 'Add A Product'
       }
       return (
           <React.Fragment>
            <AddProduct
               whenButtonClicked = {this.handleClick}
               buttonText = {buttonText} />
            {currentVisibleState}
           </React.Fragment>
       )
   }
}

export default ProductControl;
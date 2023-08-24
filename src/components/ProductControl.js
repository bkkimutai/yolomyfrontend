import React, { Component } from 'react';
import API from './API';
import jwt_decode from 'jwt-decode';

import ProductList from './ProductList';
import AddProduct from './AddProduct';
import NewProductForm from './NewProductForm';
import ProductDetail from './ProductDetail';
import EditProductForm from './EditProductForm';
import LoginForm from './LoginForm';
import Header from './Header'

class ProductControl extends Component {
    constructor(props){
        super(props);
        this.state ={
            actualProductList: [],
            selectedProduct: null,            
            productFormVisible: false,
            editProduct: false,
            isLoggedIn: false,
            showLoginForm: false,
            incorrectLogin: false,
            deleteMessage: false,
            editError: false       
        }
    }
    componentDidMount(){
        API.get('/products/productlist')
        .then(res =>{
            this.setState({
                actualProductList: res.data
            })
        })
    }
    handleDeletingProduct = (id) => {
        if (!this.state.isLoggedIn) {
            // Prevent deleting product if not logged in
            console.log("You must be logged in to delete a product.");
            this.setState({ deleteMessage: true });
            return;
          }

        API.delete('/products/delete/' + id)
          .then(res => {
            // You can add any code here to handle the response if needed.
            // For example, if you want to show a success message to the user.
          })
          .catch((error) => {
            // Handle the error if the deletion request fails.
            // For example, you can show an error message to the user.
            console.log(error);
          });
      
        // Update the state to remove the deleted product
        this.setState({
          actualProductList: this.state.actualProductList.filter(product => product._id !== id),
          formVisibleOnPage: false,
          selectedProduct: null
        });
      }
      
    handleEditingProduct = (editedProduct) => {
        if (!this.state.isLoggedIn) {
            // Prevent editing product if not logged in
            console.log("You must be logged in to edit a product.");
            this.setState({editError: true});
            return;
          }
        API.put('/products/updateproduct/' + this.state.selectedProduct._id, editedProduct)
        .then(res => {
            console.log(res.data);

            // Update the state here after successful API response
            this.setState({
            editProduct: false,
            });
    
            // Reload the page after the API request is completed
            window.location = '/';
        })
        .catch((error) => {
            console.log(error);
            // Handle any errors here or provide user feedback if needed
        });
    }

    // Method to handle adding a new product
    handleAddingNewProduct = (newProduct) =>{
            API.post('/products/addproduct/',newProduct)
                    .then(res => {
                        console.log(res.data);            
                    const newProductList = this.state.actualProductList.concat(newProduct)
            this.setState({
                actualProductList: newProductList,
                ProductFormVisibleOn: false
            });
            // Reload the page after the API request is successful and state is updated
            window.location.reload();
        })
        .catch(err => console.log(err));
    }
    handleClick = () => {
        if (this.state.editProduct) {
          this.setState({
            editProduct: false,
          });
        } else if (this.state.selectedProduct != null) {
          this.setState({
            productFormVisible: false,
            selectedProduct: null,
          });
        } else if (this.state.isLoggedIn) {
          // If the user is logged in, show/hide the add product form
          this.setState((prevState) => ({
            productFormVisible: !prevState.productFormVisible,
            showLoginForm: false, // Hide the login form if it was shown before
          }));
        } else {
          // If not logged in, show the login form
          this.setState({ showLoginForm: !this.state.showLoginForm, productFormVisible: false }); // Ensure productFormVisible is set to false
        }
      };  
      handleEditProductClick = () =>{
        this.setState({
            editProduct: true
        })
    };
    handleLoginButtonClick = () => {
        // Show the LoginForm when the "Login" button is clicked
        this.setState({ showLoginForm: true });
        // Scroll to the login form
        const loginForm = document.getElementById('LoginForm');
        if (loginForm) {
            loginForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    handleChangingSelectedProduct = (id) => {
        const selectedProduct = this.state.actualProductList.filter(product => product._id === id)[0];
        this.setState({selectedProduct: selectedProduct});
    }


    handleLoginSubmission = (credentials) => {
        API.post('/users/login/', credentials)
        .then((res) => {
            console.log(res.data);
            if (res.status === 200 && res.data.statusCode === 200) {   
              this.setState({ isLoggedIn: true, showLoginForm: false, incorrectLogin: false }); // Update the state after successful API response
            } else {
                // Handle the scenario where the credentials are incorrect
                console.log("Incorrect username or password");
                this.setState({ incorrectLogin: true }); // Set incorrectLogin to true
              }

        })
        .catch((error) => {
            console.log(error);
            // Handle any errors here or provide user feedback if needed
        });
    };


    render() {
        let currentVisibleState = null;
        let buttonText = null;

        if(this.state.editProduct){
            currentVisibleState = <EditProductForm  product ={this.state.selectedProduct} onEditProduct = {this.handleEditingProduct} editError={this.state.editError}/>
            buttonText = "Back to Product Detail "
        }else if(this.state.selectedProduct != null){
            currentVisibleState = <ProductDetail product ={this.state.selectedProduct} onDeleteProduct = {this.handleDeletingProduct} onEditProductClick = {this.handleEditProductClick} deleteMessage={this.state.deleteMessage} editError={this.state.editError}/>
            buttonText = 'Back to Product List'
        }else if (this.state.productFormVisible){
            currentVisibleState = <NewProductForm  onNewProductCreation= {this.handleAddingNewProduct}/>
            buttonText = 'Go back to Product List' 
        
        }else if(this.state.showLoginForm){
            currentVisibleState = <LoginForm  onLoginSubmission = {this.handleLoginSubmission} incorrectLogin={this.state.incorrectLogin}/>
            buttonText = 'View Product List without Login'

        }else{
            currentVisibleState = <ProductList productList = {this.state.actualProductList} onProductSelection = {this.handleChangingSelectedProduct}/>
            buttonText = 'Add A Product'
        }
        return (
            <React.Fragment>
                <Header whenLoginClicked = {this.handleLoginButtonClick} />
                <AddProduct whenButtonClicked = {this.handleClick} buttonText = {buttonText} />
                {currentVisibleState}
            </React.Fragment>
        )
    }
}

export default ProductControl;
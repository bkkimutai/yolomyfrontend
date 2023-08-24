
import React from 'react';

function EditProductForm(props) {

    function handleEditFormSubmission(event){
        event.preventDefault()
        props.onEditProduct({
            id: props.product._id,            
            name: event.target.name.value,
            description: event.target.description.value,
            price: Number(event.target.price.value),            
            quantity: Number (event.target.quantity.value),
            photo: event.target.photo.value,
            deleted: props.product.deleted            
        });
    }
    const { editError } = props;
   return (
       <React.Fragment>
           <div className="product-form">
              
               <form className="new-product-form" onSubmit = {handleEditFormSubmission}>
                   <h1>Product Form</h1>
                   <div className="form-input-material">
                       <input type = 'text'
                           name = 'name'
                           defaultValue = {props.product.name}
                           placeholder = ' '
                           className = 'form-control-material'
                           autoComplete="off"
                           id = 'name'
                           required
                       />
                       <label htmlFor="name"> Name</label>
                   </div>
                   <div className="form-input-material">
                       <input type = 'number'
                           name = 'price'
                           defaultValue = {props.product.price}
                           className = 'form-control-material'
                           autoComplete="off"
                           id = 'price'
                           required
                       />
                       <label htmlFor="price"> Price</label>
                   </div>
                   <div className="form-input-material">
                       <textarea type = 'text'
                           name = 'description'
                           defaultValue = {props.product.description}
                           className = 'form-control-material'
                           autoComplete="off"
                           id = 'description'
                           required
                       />
                       <label htmlFor="description"> Description </label>
                   </div>
                   <div className="form-input-material">
                       <input type = 'number'
                           name = 'quantity'
                           defaultValue = {props.product.quantity}
                           className = 'form-control-material'
                           autoComplete="off"
                           id = 'quantity'
                           required
                       />
                       <label htmlFor="quantity"> Quantity</label>
                   </div>
                   <div className="form-input-material">
                       <textarea type = 'text'
                           name = 'photo'
                           defaultValue = {props.product.photo}
                           className = 'form-control-material'
                           autoComplete="off"
                           id = 'photo'
                           required
                       />
                       <label htmlFor="photo"> Photo URL </label>
                   </div>                                   
                   <button type="submit" className="btn btn-primary btn-ghost">Update Product</button>
                   {editError && <p className="error-message text-danger">Please login to Edit Product.</p>}
               </form>
           </div>
       </React.Fragment>
   )
}


export default EditProductForm
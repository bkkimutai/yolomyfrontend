import React from 'react';
import './styles/NewProductForm.css';

function LoginForm(props) {
    function handleLoginFormSubmission(event){
        event.preventDefault();        
        props.onLoginSubmission({
            username: event.target.username.value,
            password: event.target.password.value,            
        })
    }
    const { incorrectLogin } = props;
      // Function to reset the form fields
  function resetFormFields() {
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
  }
    // Clear form fields when incorrectLogin is true
    if (incorrectLogin) {
        resetFormFields();
      }

   return (
    <React.Fragment>
    <div className="container login-form">
        <form className="new-product-form" onSubmit={handleLoginFormSubmission}>
            <h1>Login Form</h1>
            {incorrectLogin && <p className="error-message text-danger">Incorrect username or password. Please try again.</p>}
            <div className="form-input-material">
                <input
                    type="text"
                    name="username"
                    placeholder=" "
                    className="form-control-material"
                    autoComplete="off"
                    id="username"
                />
                <label htmlFor="username">Username</label>
            </div>
            <div className="form-input-material">
                <input
                    type="password"
                    name="password"
                    placeholder=" "
                    className="form-control-material"
                    autoComplete="off"
                    id="password"
                    required
                />
                <label htmlFor="password">Password</label>
            </div>
            <button type="submit" className="btn btn-primary btn-ghost">Login</button>
        </form>
    </div>
</React.Fragment>
);
}

export default LoginForm;
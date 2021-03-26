import React from 'react';

class Register extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			registerName: '',
			registerEmail: '',
			registerPass: '',
			registerAdd: '',
			registerMobile: ''
		}
	}

	onNameChange = (event) => {
		this.setState({registerName:event.target.value});
	}

    onEmailChange = (event) => {
		this.setState({registerEmail:event.target.value});
	}

	onPassChange = (event) => {
		this.setState({registerPass:event.target.value});
	}

	onAddChange = (event) => {
		this.setState({registerAdd:event.target.value});
	}

	onNumberChange = (event) => {
		this.setState({registerMobile:event.target.value});
	}

	onSubmit = () => {
	 // console.log(this.state.registerName)
   	  //console.log(this.state.registerEmail)
   	  //console.log(this.state.registerPass)
   	  //console.log(this.state.registerAdd)
   	  //console.log(this.state.registerMobile)
   	  //this.props.onRouteChange('signin');
		
		fetch('http://localhost:3000/register' , {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: this.state.registerName,
				email: this.state.registerEmail,
				password: this.state.registerPass,
				address: this.state.registerAdd,
				mobile: this.state.registerMobile
			})
		})
		.then(response => response.json())
		.then(user => {
			if(user === 'unable to register')
			  	alert('Error: Fill all the details or a user already exists with this email id');
			else
				this.props.onRouteChange('signin');		  
		}) 	
	}
	 
    render(){
	 return(
	//   <article className="br3 ba shadow-2 b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">	
	    <main className="pa4 black-80">
	      <div className="center measure">
	       <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
	         <legend className="f2 fw6 ph0 mh0">Register</legend>
	          <div className="mt3">
	          <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
	          <input 
	            className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100" 
	            type="name" 
	            name="name"  
	            id="name" 
	            onChange = {this.onNameChange}
	            />
	         </div>
	         <div className="mt3">
	          <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
	          <input 
	            className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100" 
	            type="email" 
	            name="email-address"  
	            id="email-address" 
	            onChange = {this.onEmailChange}
	            />
	         </div>
	         <div className="mv3">
	          <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
	          <input 
	            className="b pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100" 
	            type="password"
	            name="password"  
	            id="password" 
	            onChange = {this.onPassChange}
	            />
	         </div>
	         <div className="mt3">
	          <label className="db fw6 lh-copy f6" htmlFor="name">Address</label>
	          <input 
	            className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100" 
	            type="name" 
	            name="address"  
	            id="address" 
	            onChange = {this.onAddChange}
	            />
	          </div>
	          <div className="mt3">
	          <label className="db fw6 lh-copy f6" htmlFor="number">Mobile Number</label>
	          <input 
	            className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100" 
	            type="number" 
	            name="number"  
	            id="number" 
	            onChange = {this.onNumberChange}
	            />
	           </div>  
	        </fieldset>
	      <div className="">
	       <input 
	         onClick = {this.onSubmit}
	         className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
	         type="submit" 
	         value="Register" 
	         />
	      </div>
	     </div>
	  </main>
	// </article>  
    );
   } 
}

export default Register;
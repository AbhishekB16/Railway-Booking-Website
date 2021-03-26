import React from 'react';

class Details extends React.Component  {
     constructor(props){
		super(props);
		this.state = {
			trainNumber: '',
			AC_Coach: '',
			sleeperCoach: '',
			Date: ''
		}
	}

	onTrainChange = (event) => {
		this.setState({ trainNumber:event.target.value });
	}
	
	onACChange = (event) => {
		this.setState({ AC_Coach:event.target.value });
	}

	onsleeperChange = (event) => {
		this.setState({ sleeperCoach:event.target.value });
	}

	onDateChange = (event) => {
		this.setState({ Date:event.target.value });
	}
    
    onSubmit = () => {
   	  //this.props.onRouteChange('signin');
   	  //console.log(this.state.Date)
		
	fetch('http://localhost:3000/train_details' , {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				trainnumber: this.state.trainNumber,
				date: this.state.Date,
				sleeper: this.state.sleeperCoach,
				ac: this.state.AC_Coach	
			})
		})
		.then(response => response.json())
		.then(data => {
			if(data === 'success'){
			  alert('Train details added ')	
			  this.props.onRouteChange('signout');	
			}
			else if(data === 'Train Already exist on the same date')
				 alert('Train Already exist ')
			else
			  alert(' Fill all the details ');
		})	
	}

	render() {
	
	  return(
 	//    <article className="br3 ba shadow-2 b--black-10 mv4 w-100 w-50-m w-25-l mw20 center bg">	
	     <main className="pa4 black-80">
	      <div className="center measure">
	       <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
	         <legend className="f3 fw6"> Add Train Details</legend>
	         <div className="mt3">
	          <label className="db fw6 lh-copy f6" htmlFor="email-address">Train-Number</label>
	          <input 
	            className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100"
	            type="number" 
	            name="number" 
	            id="number"
	            onChange={this.onTrainChange}
	            />
	         </div>
	         <div className="mv3">
	          <label className="db fw6 lh-copy f6" htmlFor="password">Number of AC Coach</label>
	          <input 
	            className="b pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100" 
	            type="number" 
	            name="number"  
	            id="number"
	            onChange={this.onACChange}
	            />
	         </div>
	          <div className="mv3">
	          <label className="db fw6 lh-copy f6" htmlFor="password">Number of sleeper Coach</label>
	          <input 
	            className="b pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100" 
	            type="number" 
	            name="number"  
	            id="number"
	            onChange={this.onsleeperChange}
	            />
	         </div>
	          <div className="mv3">
	          <label className="db fw6 lh-copy f6" htmlFor="password">Date of journey</label>
	          <input 
	            className="b pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100" 
	            type="date" 
	            name="date"  
	            id="date"
	            onChange={this.onDateChange}
	            />
	         </div>
	        </fieldset>
	      <div className="">
	       <input 
	         onClick = {this.onSubmit}
	         className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
	         type="submit" 
	         value="Add Train" 
	         />
	      </div>
	    </div>
	  </main>
	// </article> 
	);
	}
}	

export default Details;
import React from 'react';

class Booking extends React.Component{
	constructor(props){
   	super(props);
   	this.state = {
   		trainNumber: '',
   		num_of_pass: '',
   		Date: '',
   		coach:'AC'
   	}
   }
   
   onTrainChange = (event) => {
		this.setState({ trainNumber:event.target.value });
	}
   
   onNumberOfPasChange = (event) => {
		this.setState({ num_of_pass:event.target.value });
	}

   onDateChange = (event) => {
		this.setState({ Date:event.target.value });
	}

	onCoachChange = (event) => {
		this.setState({ coach:event.target.value });
	}

	onSubmit = () => {
		//console.log(this.state.num_of_pass);
		//console.log(this.state.Date);
	 fetch('http://localhost:3000/profile', {
   		method: 'post',
   		headers: {'Content-Type': 'application/json'},
   		body: JSON.stringify({
   			trainnumber: this.state.trainNumber,
   			num_of_pass: this.state.num_of_pass,
   			date: this.state.Date,
   			coach: this.state.coach
   		})
   	})
      .then(response => response.json())
      .then(data => {
      	if(data === 'success')
      		this.props.onRouteChange('book', this.state.num_of_pass, this.state.coach, this.state.trainNumber, this.state.Date);
        
        else if(data === 'Seats not available')
             alert('Seats in the mentioned coach are not available');			 
      	
      	else if(data === 'complete all details')
      		 alert('Please complete all details')
      	
      	else
      		alert('There is no train for the mentioned date in the booking system');
      }) 
	}

	render(){
		//const {onRouteChange, onPassSubmit} = this.props;
		return(
		//    <article className="br3 ba shadow-2 b--black-10 mv4 w-100 w-50-m w-25-l mw20 center">
		   <main className="center pa4 black-80">
	       <div className="center measure">
	       <div className="mt3">
	          <label className="db fw6 lh-copy f6" htmlFor="email-address">Train Number</label>
	          <input 
	            className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100"
	            type="number" 
	            name="number" 
	            id="number"
	            onChange={this.onTrainChange}
	            />
	         </div>
	         <div className="mt3">
	          <label className="db fw6 lh-copy f6" htmlFor="email-address">Number of Passengers</label>
	          <input 
	            className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100"
	            type="number" 
	            name="number" 
	            id="number"
	            onChange={this.onNumberOfPasChange}
	            />
	         </div>
           <div className="mv3">
	          <label className="db fw6 lh-copy f6" htmlFor="password">Date of Departure</label>
	          <input 
	            className="b pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100" 
	            type="date" 
	            name="date"  
	            id="date"
	            onChange={this.onDateChange}
	            />
           </div>
              <div className="mv3">
	          <label className="db fw6 lh-copy f6">
	              Choice of Coach 
                <select value={this.state.coach} onChange={this.onCoachChange} className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100" >       
            		<option value="AC">AC Coach</option>
            		<option value="Sleeper">Sleeper Coach</option>
 				</select>
	          </label>  
	            
           </div>
           <div className="mv3">
	       <input 
	         onClick = {this.onSubmit}
	         className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
	         type="submit" 
	         value="Book Ticket" 
	         />
	      </div>
           </div>
           </main>
        //    </article>
	  );
	}
}

export default Booking;
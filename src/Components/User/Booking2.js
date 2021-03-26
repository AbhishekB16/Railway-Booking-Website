import React from 'react';

class Booking2 extends React.Component{
     constructor(props){
       super(props);
       this.state = {
        current_name: '',
        current_age: '',
        current_gender: '',
        passengers: []
       }
     }

    onNameChange = (event) => {
       this.setState({ current_name:event.target.value});
      }
    
    onAgeChange = (event) => {
       this.setState({ current_age:event.target.value});
      }

    onGenderChange = (event) => {
       this.setState({ current_gender:event.target.value});
      }
    
    addDetailsinArray = () => {
         this.state.passengers.push(
             {
              name: this.state.current_name,
              age: this.state.current_age,
              gender: this.state.current_gender
             }
          )
         alert("Passenger Details Added")
    }

    onSubmit = () => {
      /*console.log(this.state.name.length)
        this.state.name.map(name => {
          console.log(name)
         })
         */
    /*   this.state.passengers.map(data => {
             console.log(data.name);
             console.log(data.age);
             console.log(data.gender);
         })*/

       fetch('http://localhost:3000/passenger', {
           method: 'post',
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify({
            details: this.state.passengers,
            number_of_pass: this.props.number_of_pass,
            coach: this.props.coach,
            train_id: this.props.train_id,
            date: this.props.date,
            agent_email: this.props.agent_email
      })
    })
      .then(response => response.json())
      .then(data => {
        if(data === 'Error!!')
         alert('Ticket not booked');

        else {
          //console.log(data);
          this.props.onRouteChange('tick',data);
        }
         
      })
    }

     render(){
     	const {number_of_pass} = this.props;
      const detail = [];

      for(let i=1; i<=number_of_pass; i++){
        detail.push(
           <div key={i} className="fw6 ph0 mh0 pa3">
                  Passenger {i} : 
               <input 
                 className="pa2 input-reset ba hover-bg-white hover-black"
                 type='text'
                 placeholder='Full Name'
                 onChange = {this.onNameChange}
                 />

              <input 
                 className="pa2 input-reset ba hover-bg-white hover-black"
                 type='number'
                 placeholder='Age'
                 onChange = {this.onAgeChange}
                 />

             <input
                 className="pa2 input-reset ba hover-bg-white hover-black"
                 type='option'
                 placeholder='Gender'
                 onChange = {this.onGenderChange}
                 />
              <input 
                onClick = {this.addDetailsinArray}
                className="pa2 input-reset ba hover-bg-white hover-black" 
                type="submit" 
                value="Add Passenger Details" 
               />  
             </div> 
          );
      }
     	return(
     	  <div>
           <legend className="f3 fw6 ph0 mh0 center">Add Details</legend>
           <ul>{detail}</ul>
            <div className="pb4">
            <input 
              onClick = {this.onSubmit}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
              type="submit" 
              value="Book Tickets" 
             />
           </div>
       </div>  
      )
     }

}

export default Booking2; 
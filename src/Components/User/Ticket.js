import React from 'react';

class Ticket extends React.Component{
        
        render(){
            const {onRouteChange, tickets} = this.props;
            return(
               <div>
		           <legend className="f2 fw6 ph0 mh0 center">Ticket</legend>
		             
				      { tickets.map(( details, index) => (
				      	// <article className=" tc dib br3 pa3 ma2 bw2 grow shadow-5">
				      	<div>
				        <p key={index} className="f4 fw6 ph0 mh0 ">Passenger {index + 1}</p>
				        <p className="f6 fw6 ph0 mh0 center"> Name: {details.name}</p>
				        <p className="f6 fw6 ph0 mh0 center"> Age: {details.age} </p>
				        <p className="f6 fw6 ph0 mh0 center"> Gender: {details.gender}</p>
				        <p className="f6 fw6 ph0 mh0 center"> Berth: {details.coach}-{details.berth}</p>		
				        <p className="f6 fw6 ph0 mh0 center"> Type: {details.type}</p>	
				        <p className="f6 fw6 ph0 mh0 center"> PNR: {details.pnr}</p>
						<p className="f6 fw6 ph0 mh0 center"> Train ID: {tickets[0].train_id}</p>
				      <p className="f6 fw6 ph0 mh0 center"> Date of Journey: {tickets[0].date}</p>
				        <p > ------------------------------------------- </p>
				        </div>
				        // </article>
				      ))}
		            <div className="pb4 pa3">
		            <input 
		              onClick = {() => onRouteChange('signin')}
		              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
		              type="submit" 
		              value="Sign Out" 
		             />
		           </div>
		       </div>  
            ) 
         }
}

export default Ticket;
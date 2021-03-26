import Navigation from './Components/Navigation/Navigation';
// import Logo from './Components/Logo/Logo'
import Signin from './Components/Admin/Signin';
import Signin2 from './Components/User/Signin';
import Register from './Components/User//Register';
import Details from './Components/Admin/Details';
import Booking from './Components/User/Booking';
import Booking2 from './Components/User/Booking2';
import Ticket from './Components/User/Ticket';
import React, { Component } from 'react';
import './App.css';


class App extends Component {
 
 constructor(){
  super();
  this.state = {
    route : 'signin',
    agent_email: '',
    number_of_pass: '',
    coach: '',
    train_id: '',
    date: '',
    tickets: []
  }
 }

 onRouteChange = (route, value, coach, train_id, date) => {
    this.setState({route: route});
    
    if(route === 'book'){
      this.setState({number_of_pass: value});
      this.setState({coach: coach});
      this.setState({train_id: train_id});
      this.setState({date: date})
     }

    else if(route === 'home')
      this.setState({agent_email: value}); 
  
    else if(route === 'tick')
      this.setState({tickets: value});
}

  render(){
    const {route} = this.state;  
    return (
       <div className="App">
       <Navigation onRouteChange={this.onRouteChange} route={this.state.route} />
       {/* <Logo /> */}
       { route === 'signin' 
         ? <Signin2 onRouteChange={this.onRouteChange} />
         : ( route === 'register'
             ? <Register onRouteChange={this.onRouteChange} /> 
             : ( route === 'admin'
                ? <Signin onRouteChange={this.onRouteChange} />
                : ( route === 'home'
                    ? <Booking onRouteChange={this.onRouteChange} />
                    : ( route === 'book'
                        ? <Booking2 onRouteChange={this.onRouteChange} number_of_pass={this.state.number_of_pass} coach={this.state.coach} train_id={this.state.train_id} date={this.state.date} agent_email={this.state.agent_email} />
                        : ( route === 'tick'
                            ? <Ticket onRouteChange={this.onRouteChange} tickets={this.state.tickets} />
                            : <Details onRouteChange={this.onRouteChange} />
                        ) 
                     )
                   )
                )
             )
           }  
    </div>
  );
}
}

export default App;

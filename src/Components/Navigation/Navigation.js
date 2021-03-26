import React from 'react';

const Navigation = ({onRouteChange, route}) => {
	if(route === 'signin'){
	 return(
	     <nav style={{display: 'flex' , justifyContent: 'flex-end'}}>
	       <div className="flex-grow grow flex items-center"> 
	         <p  onClick={() => onRouteChange('home')} className='f5 dib black bg-white mr1 mr4-ns pv2 ph2 br-pill pointer' >LOG IN</p>
	         <p  onClick={() => onRouteChange('register')} className='f5 grow dib black bg-white mr1 mr4-ns pv2 ph2 br-pill pointer' >Register</p>
	         <p  onClick={() => onRouteChange('admin')} className='f5 grow dib black bg-white mr1 mr4-ns pv2 ph2 br-pill pointer' > Admin</p>
	       </div> 
	     </nav>
	   );
     }
     else if(route === 'register'){
       return(
	    <nav style={{display: 'flex' , justifyContent: 'flex-end'}}>
	      <div className="flex-grow flex items-center"> 
	       <p  onClick={() => onRouteChange('signin')} className='f5 grow dib black bg-white mr1 mr4-ns pv2 ph2 br-pill pointer' >Sign In</p>
	       <p  onClick={() => onRouteChange('signin')} className='f5 grow dib black bg-white mr1 mr4-ns pv2 ph2 br-pill pointer' >Register</p>
	      </div>
	     </nav>
	   );	
     }
     else if(route === 'admin'){
     	return(
	       <nav style={{display: 'flex' , justifyContent: 'flex-end'}}>
	       <div className="flex-grow flex items-center"> 
	       <p  onClick={() => onRouteChange('signin')} className='f5 grow dib black bg-white mr1 mr4-ns pv2 ph2 br-pill pointer' >Back to User Sign in</p>
	       </div>
	       </nav>
	    );
      }
     else{
     	return(
     	   <nav style={{display: 'flex' , justifyContent: 'flex-end'}}>
	       <div className="flex-grow flex items-center"> 
	       <p  onClick={() => onRouteChange('signin')} className='f5 grow dib blackbg-white mr1 mr4-ns pv2 ph2 br-pill pointer' >Sign Out</p>
	       </div>
	       </nav>	
        );
     } 
}

export default Navigation;
import React from 'react';
import Template from './Template';
import loginImage from "../assets/droneImage.jpg"
import MapContainer from './MapContainer';
function Login({isLoggedIn,setIsLoggedIn}) {
  return (
    
    <div>
      <Template
        title="Welcome Back" desc1 = "Fly High with us to Ensure Your Building's Strength" desc2 = "revolutionise your creation using drones" image ={loginImage} formtype="login" setIsLoggedIn={setIsLoggedIn}
      />
      <MapContainer></MapContainer>
    </div>
  );
}


export default Login
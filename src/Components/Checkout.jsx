import React from 'react';
import mapImage from '../mapimage.jpg'
import { useNavigate } from 'react-router-dom';
const Checkout = () => {
    const Navigate = useNavigate();
    return (
        <div className="flex flex-col items-center bg-white p-8 rounded-b-3xl shadow-xl mx-auto h-full  w-[100vw] border ">
          <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6 leading-tight">
            Plan your trip 
          </h1>
          
          <div className="w-full h-[70vh] overflow-hidden rounded-xl shadow-lg mb-6 transform transition duration-500 hover:scale-105">
            <img 
              src={mapImage}
              
              className="w-full h-full object-cover"
            />
          </div>
    
          <div className="w-full text-center">
            <p className="text-xl text-gray-600 font-medium mb-6">
            Elevate your building inspections with detailed aerial imaging. Our route planner ensures your drone captures every angle, giving you the insights you need for accurate assessments and efficient workflows.
            </p>
          </div>
    
          <div className="flex justify-center gap-10 mt-8 ">
            <button className="px-10 py-4 text-white bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full shadow-xl hover:from-teal-600 hover:to-cyan-600 transition-all ease-in-out transform hover:scale-105" onClick={()=> Navigate("/route")}>
              Plan a trip 
            </button>
            <p className='font-bold text-2xl text-center'>or</p>
            <button className="px-10 py-4 text-teal-600 border-2 border-teal-600 rounded-full bg-transparent shadow-xl hover:bg-teal-500 hover:text-white transition-all ease-in-out transform hover:scale-105" onClick={()=> Navigate("/model")}>
              Inspect
              {/* change the name of button accordingly */}
            </button>
          </div>
        </div>
      );
    };

export default Checkout;

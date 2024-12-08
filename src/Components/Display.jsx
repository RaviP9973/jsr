import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ImageContext } from "../context/ImageContext";
import { MdDirectionsRun } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Display = () => {
  const navigate = useNavigate();
  const { images } = useContext(ImageContext);
  const handleButtonClick = (image,) => {
    navigate("/genratedImage", { state: { image } }); // Navigate and pass the image data
  };

  return (
    <div className="h-[calc(100% - 25px)] overflow-y-scroll px-2">
      <h1>Uploaded Images</h1>
      <div className="flex flex-wrap gap-x-4 " >
        {images.map((image, index) => (
          <div key={index} className="group relative  mb-6 transition-all duration-300">
            <img
              src={image.url}
              alt={image.name}
              className="w-[200px] h-[200px] object-cover group-hover:brightness-[50%] transition-all duration-300"
            />
            <button className="text-[#6706ce] outline outline-[#6706ce]  absolute bottom-7 right-3 bg-white w-16 px-2 rounded-lg opacity-0 invisible  group-hover:opacity-100 group-hover:visible transition-all duration-300
            " onClick={() => handleButtonClick(image)} >
                <p className="text-md "><MdDirectionsRun />TEST</p></button>
            <p className="text-white">{image.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Display;

import React, { useContext } from "react";
import { ImageContext } from "../context/ImageContext";
import { MdDirectionsRun } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Display = () => {
  const navigate = useNavigate();
  const { images } = useContext(ImageContext);
  const handleButtonClick = (image) => {
    navigate("/genratedImage", { state: { image } }); // Navigate and pass the image data
  };

  return (
    <div className="h-[calc(100% - 25px)] overflow-y-scroll px-2">
      <h1 className="text-white text-center text-xl bg-[#6706ce] py-1 mx-10 rounded-lg shadow-md tracking-wide">
        UPLOADED IMAGES
      </h1>
      <div className="flex flex-wrap gap-x-4 justify-center mt-5">
        {images.map((image, index) => (
          <div
            key={index}
            className="h-[250px] w-[215px] bg-transparent hover:bg-[rgba(129,191,218,0.2)] relative mb-6 transition-all duration-300 transform hover:scale-105 shadow-lg flex flex-col rounded-lg justify-center items-center group"
          >
            <img
              src={image.url}
              alt={image.name}
              className="w-[200px] h-[200px] object-cover  transition-all duration-300 rounded-lg"
              onClick={() => handleButtonClick(image)}
            />
            <button
              className="text-[#6706ce] outline outline-[1px] outline-[#6706ce] absolute bottom-11 right-5 bg-white py-1 px-2 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex items-center justify-center hover:bg-[#f0e7ff] focus:ring-4 focus:ring-[#6706ce50]"
              onClick={() => handleButtonClick(image)}
            >
              <MdDirectionsRun className="text-xl" />
              <span className="text-sm font-semibold">TEST</span>
            </button>
            <p className=" text-white text-sm font-medium bg-[#6706ce] px-2 py-1 rounded-md shadow-lg w-[200px]">
              {image.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Display;

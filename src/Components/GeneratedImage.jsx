import React, { useContext, useEffect, useState } from "react";
import { FetchData } from "../Utils/Api";
import { useLocation } from "react-router-dom";
import { ImageContext } from "../context/ImageContext";
import "./loader.css";

const GeneratedImage = () => {
  const { loading, setLoading } = useContext(ImageContext);
  const location = useLocation();
  const [result, setResult] = useState(null);
  const { image } = location.state || {};

  useEffect(() => {
    setLoading(true);
    const fetchGeneratedImage = async () => {
      console.log(image);
      console.log(process.env.REACT_APP_API_KEY);
      const response = await FetchData(image, setLoading);
      setResult(response);
      console.log(response);
    };
    fetchGeneratedImage(image);
  }, [image]);

  return (
    <div>

      {result && result.imageUrl ? (
        <div className="flex justify-evenly">
          <div className="flex flex-col border-2 rounded-lg h-fit">
            <h2 className="text-[#F72C5B] text-center text-xl font-extrabold bg-white">Original Image</h2>
            <img src={image.url} alt="" className="h-96 w-[96] object-contain " />

          </div>
          <div className="flex flex-col border-2 rounded-lg h-fit">
            <h2 className="text-[#F72C5B] text-center text-xl font-extrabold bg-white">Segmented Image</h2>
          <img src={result.imageUrl} alt="" className="h-96 w-[96] object-contain "/>

          </div>
        </div>
      ) : (
        <div className="h-[80vh] w-[100vw] flex flex-col justify-center items-center gap-10">
          <span class="loader"></span>
          <p className="text-white text-lg">processing your image</p>
        </div>
      )}
    </div>
  );
};

export default GeneratedImage;

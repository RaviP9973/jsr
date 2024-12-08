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
        <div className="flex gap-5 justify-evenly">
          <img src={image.url} alt="" />
          <img src={result.imageUrl} alt="" />
        </div>
      ) : (
        <div className="h-[100vh] w-[100vw] flex justify-center items-center">
          <span class="loader"></span>
        </div>
      )}
    </div>
  );
};

export default GeneratedImage;

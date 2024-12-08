import React, { createContext, useState } from "react";

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [loading,setLoading] = useState(false);
  const [files,setFiles] = useState(null);
  return (
    <ImageContext.Provider value={{ images, setImages,loading,setLoading,files,setFiles }}>
      {children}
    </ImageContext.Provider>
  );
};

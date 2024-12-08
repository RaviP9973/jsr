import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ImageContext } from "../context/ImageContext";

function ImageUploadForm() {
  const Navigate = useNavigate();
  const { images,setImages,setFiles } = useContext(ImageContext);
  const [count,setCount] = useState(0);

  const handleFolderInput = (event) => {
    const selectedFiles = event.target.files;
    const files = Array.from(selectedFiles); // Convert FileList to Array
    setFiles(files);
    const imageFiles = files.filter((file) =>  file.type.startsWith("image/"));
    setCount(files.length);
    const imageUrls = imageFiles.map((file)=>({
      name:file.name,
      url:  URL.createObjectURL(file),
      file:file
    }));
    setImages(imageUrls);
  };

  return (
    <div className="w-full h-[200vh] text-white bg-gray-800 p-8">
      <h1 className="text-center font-extrabold text-[35px] mb-6">
        Upload Your Images
      </h1>

      <div className="flex justify-center">
        <form className="space-y-6" onSubmit={()=>{Navigate("/images", {state: {images: images}});}}>
          <div>
          <label className="inline-flex items-center justify-center min-h-[80px] min-w-[330px] box-border px-12 py-6 font-medium text-2xl bg-[#e5322d] leading-[28px] align-middle text-white no-underline mb-3 transition-colors duration-300 ease-linear border-0 rounded-3xl shadow-md max-w-[60vw] hover:bg-red-700">

            <input
              type="file"
              webkitdirectory=""
              multiple
              onChange={handleFolderInput}
            />
            </label>

          </div>

          <div className="overflow-y-scroll">
        <h3 className="text-white">Total Selected Files:</h3>
        <p>total selected file {count}</p>
      </div>

          <button
            className="
            bg-blue-500
            text-white
            font-semibold
            py-2 px-4
            rounded-lg
            hover:bg-blue-600
            focus:outline-none
            focus:ring-2
            focus:ring-blue-300
            shadow-md
            transition-all
            duration-200
            ease-in-out
          "
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ImageUploadForm;

// import React, { useContext, useState } from "react";
// import axios from "axios";
// import { ImageContext } from "../context/ImageContext";

// function ImageUploadForm() {
//   const { loading, setLoading } = useContext(ImageContext);
//   const [file, setFile] = useState(null);
//   const [data, setData] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert("Please select a file!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", file);
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         "http://localhost:4000/api/v1/genrateImage",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log("Response:", response.data);
//       setData(response.data);
//     } catch (error) {
//       console.error("Error uploading image:", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Upload an Image</h1>
//       <input className="text-white" type="file" onChange={handleFileChange} />
//       <button className="text-white" onClick={handleUpload}>
//         Upload
//       </button>

//       {loading ? (
//         <div className="text-white">Loading</div>
//       ) : (
//         <div className="text-white"> <img src={data.imageUrl} alt="" /></div>
//       )}
//     </div>
//   );
// }

// export default ImageUploadForm;

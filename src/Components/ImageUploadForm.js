import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ImageContext } from "../context/ImageContext";
import {
  MdOutlineCloudUpload,
  MdOutlineDriveFolderUpload,
} from "react-icons/md";
import { CiFileOn } from "react-icons/ci";
import Papa from "papaparse";

function ImageUploadForm() {
  const Navigate = useNavigate();
  const { images, setImages ,setOgcv,setGencv} = useContext(ImageContext);
  const [count, setCount] = useState(0);
  

  const [csvData, setCsvData] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true, // Treat first row as column headers
        skipEmptyLines: true,
        complete: (result) => {
          setCsvData(result.data); // Parsed CSV data
          setOgcv(result.data);
          console.log(result.data); // Log the data for debugging
        },
      });
    }
  };
  const handleFileChangeGen = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true, // Treat first row as column headers
        skipEmptyLines: true,
        complete: (result) => {
          setCsvData(result.data); // Parsed CSV data
          setGencv(result.data);
          console.log(result.data); // Log the data for debugging
        },
      });
    }
  };

  //file upload
  const handleFolderInput = (event) => {
    const selectedFiles = event.target.files;
    const files = Array.from(selectedFiles); // Convert FileList to Array

    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    setCount(files.length);
    const imageUrls = imageFiles.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      file: file,
    }));
    
    setImages(imageUrls);
    Navigate("/images");
  };

  return (
    <div className="w-full h-[200vh] text-white bg-gray-800 p-8 flex flex-col justify-center items-center gap-3">
      <div className="h-20 w-20  rounded-full flex items-center justify-center text-5xl bg-blue-100">
        <MdOutlineCloudUpload />
      </div>
      <h1 className="text-center font-extrabold text-[35px] mb-6">
        Drag and drop file(s) to upload, or:
      </h1>

      <div className="flex justify-center">
        <form
          className="space-y-6"
          onSubmit={() => {
            Navigate("/images", { state: { images: images } });
          }}
        >
          <div className=" flex gap-10">
            <label className="inline-flex items-center justify-center min-h-[50px] min-w-[230px] px-12 py-6 font-medium text-2xl bg-[#e5322d] text-white rounded-3xl shadow-md max-w-[60vw] transition-all duration-300 ease-linear cursor-pointer hover:bg-red-700 hover:shadow-lg">
              <div className="flex gap-4 justify-center items-center text-lg">
                <CiFileOn size={30} />
                Upload File
              </div>

              <input
                type="file"
                onChange={handleFolderInput}
                className="hidden"
              />
            </label>
            <label className="inline-flex items-center justify-center min-h-[50px] min-w-[230px] px-12 py-6 font-medium text-2xl bg-[#e5322d] text-white rounded-3xl shadow-md max-w-[60vw] transition-all duration-300 ease-linear cursor-pointer hover:bg-red-700 hover:shadow-lg">
              <div className="flex gap-4 justify-center items-center text-lg">
                <CiFileOn size={30} />
                Upload CSV
              </div>

              <input type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
            </label>
            <label className="inline-flex items-center justify-center min-h-[50px] min-w-[230px] px-12 py-6 font-medium text-2xl bg-[#e5322d] text-white rounded-3xl shadow-md max-w-[60vw] transition-all duration-300 ease-linear cursor-pointer hover:bg-red-700 hover:shadow-lg">
              <div className="flex gap-4 justify-center items-center text-lg">
                <CiFileOn size={30} />
                Upload CSV Gen
              </div>

              <input type="file" accept=".csv" className="hidden" onChange={handleFileChangeGen} />
            </label>
            <label className="inline-flex items-center justify-center min-h-[50px] min-w-[230px] px-12 py-6 font-medium text-2xl bg-[#e5322d] text-white rounded-3xl shadow-md max-w-[60vw] transition-all duration-300 ease-linear cursor-pointer hover:bg-red-700 hover:shadow-lg">
              <div className="flex gap-4 justify-center items-center text-lg">
                <MdOutlineDriveFolderUpload size={30} />
                Upload Folder
              </div>

              <input
                type="file"
                webkitdirectory=""
                multiple
                onChange={handleFolderInput}
                className="hidden"
              />
            </label>
          </div>

          {/* <div className="">
            <h3 className="text-white">Total Selected Files:</h3>
            <p>total selected file {count}</p>
          </div> */}
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

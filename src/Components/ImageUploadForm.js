import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ImageContext } from "../context/ImageContext";
import { MdOutlineCloudUpload, MdOutlineDriveFolderUpload } from "react-icons/md";
import { CiFileOn } from "react-icons/ci";
import { FaRegFileExcel } from "react-icons/fa";
import Papa from "papaparse";

function ImageUploadForm() {
  const Navigate = useNavigate();
  const { images, setImages, setOgcv, setGencv } = useContext(ImageContext);
  const [count, setCount] = useState(0);
  const [csvData, setCsvData] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setCsvData(result.data);
          setOgcv(result.data);
        },
      });
    }
  };

  const handleFileChangeGen = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setCsvData(result.data);
          setGencv(result.data);
        },
      });
    }
  };

  const handleFolderInput = (event) => {
    const selectedFiles = event.target.files;
    const files = Array.from(selectedFiles);
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
    <div className="w-full h-screen text-white p-8 flex flex-col justify-center items-center gap-3 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]">
      <div className="h-20 w-20 rounded-full flex items-center justify-center text-5xl bg-[#eab308] hover:scale-105 hover:bg-yellow-400 transition-all duration-300 ease-in-out">
        <MdOutlineCloudUpload />
      </div>
      <h1 className="text-center font-extrabold text-[35px] mb-6 hover:text-[#fdd830]">
        Drag and drop file(s) to upload, or:
      </h1>
      <div className="flex flex-col md:flex-row justify-center gap-6">
        {/* Upload File Section */}
        <label className="inline-flex items-center justify-center min-h-[50px] min-w-[230px] px-12 py-6 font-medium text-2xl bg-[#fbbf24] text-black rounded-xl shadow-lg max-w-[60vw] transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#f59e0b] hover:scale-105 hover:shadow-xl">
          <div className="flex gap-4 justify-center items-center text-lg">
            <CiFileOn size={30}/>
            Upload File
          </div>
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>
        {/* Upload CSV Button */}
        <label className="inline-flex items-center justify-center min-h-[50px] min-w-[230px] px-12 py-6 font-medium text-2xl bg-[#fbbf24] text-black rounded-xl shadow-lg max-w-[60vw] transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#f59e0b] hover:scale-105 hover:shadow-xl">
          <div className="flex gap-4 justify-center items-center text-lg">
          <FaRegFileExcel size={30}/>
            Upload CSV
          </div>
          <input type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
        </label>
        {/* Upload CSV Gen Button */}
        <label className="inline-flex items-center justify-center min-h-[50px] min-w-[230px] px-12 py-6 font-medium text-2xl bg-[#fbbf24] text-black rounded-xl shadow-lg max-w-[60vw] transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#f59e0b] hover:scale-105 hover:shadow-xl">
          <div className="flex gap-4 justify-center items-center text-lg">
          <FaRegFileExcel size={30}/>

            Upload CSV Gen
          </div>
          <input type="file" accept=".csv" className="hidden" onChange={handleFileChangeGen} />
        </label>
        {/* Upload Folder Button */}
        <label className="inline-flex items-center justify-center min-h-[50px] min-w-[230px] px-12 py-6 font-medium text-2xl bg-[#fbbf24] text-black rounded-xl shadow-lg max-w-[60vw] transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#f59e0b] hover:scale-105 hover:shadow-xl">
          <div className="flex gap-4 justify-center items-center text-lg">
            <MdOutlineDriveFolderUpload size={30} />
            Upload Folder
          </div>
          <input
            type="file"
            multiple
            webkitdirectory="true" // Enables folder upload
            onChange={handleFolderInput}
            className="hidden"
          />
           
        </label>
        <button onClick={()=>Navigate("/route")}   className="mt-6 px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow-md hover:scale-105 hover:shadow-xl hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 ease-in-out"
           >Plan Trip</button>
      </div>
    </div>
  );
}

export default ImageUploadForm;
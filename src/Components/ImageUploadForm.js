import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ImageContext } from "../context/ImageContext";
import { MdOutlineCloudUpload, MdOutlineDriveFolderUpload } from "react-icons/md";
import { FaRegFileExcel } from "react-icons/fa";
import Papa from "papaparse";

function ImageUploadForm() {
  const navigate = useNavigate();
  const { setImages, setOgcv, setGencv } = useContext(ImageContext);
  const [uploadedFiles, setUploadedFiles] = useState({
    ogFile: null,
    genFile: null,
    folderFiles: [],
  });

  // Handle Raw CSV upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setOgcv(result.data);
        },
      });
      setUploadedFiles((prev) => ({ ...prev, ogFile: file }));
    }
  };

  // Handle Measured CSV upload
  const handleFileChangeGen = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setGencv(result.data);
        },
      });
      setUploadedFiles((prev) => ({ ...prev, genFile: file }));
    }
  };

  // Handle folder upload
  const handleFolderInput = (event) => {
    const selectedFiles = event.target.files;
    const files = Array.from(selectedFiles);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const imageUrls = imageFiles.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      file: file,
    }));
    setImages(imageUrls);
    setUploadedFiles((prev) => ({ ...prev, folderFiles: imageFiles }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!uploadedFiles.ogFile || !uploadedFiles.genFile || uploadedFiles.folderFiles.length === 0) {
      alert("Please upload all the required files before submitting.");
      return;
    }
    console.log("Form submitted", uploadedFiles);
    navigate("/images");
  };

  return (
    <div className="w-full text-white p-8 flex flex-col justify-center items-center gap-8 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 min-h-screen">
      {/* Icon Section */}
      <div className="h-20 w-20 rounded-full flex items-center justify-center text-5xl bg-yellow-400 hover:scale-110 hover:bg-yellow-300 transition-transform duration-300 ease-in-out shadow-lg">
        <MdOutlineCloudUpload />
      </div>

      {/* Header */}
      <h1 className="text-center font-extrabold text-4xl mb-6 hover:text-yellow-300 transition-all duration-300">
        Upload Your Files
      </h1>

      {/* Form Section */}
      <form
        className="flex flex-col gap-6 bg-white text-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-3xl"
        onSubmit={handleSubmit}
      >
        {/* Upload Raw CSV */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center justify-center gap-4 p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 hover:shadow-md transition-all duration-300">
            <FaRegFileExcel size={30} className="text-green-600" />
            <span className="font-semibold text-lg">Select Raw CSV</span>
            <input type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
          </label>
          {uploadedFiles.ogFile && (
            <p className="text-sm text-gray-600">
              File: <span className="font-bold">{uploadedFiles.ogFile.name}</span>{" "}
              ({(uploadedFiles.ogFile.size / 1024).toFixed(2)} KB)
            </p>
          )}
        </div>

        {/* Upload Measured CSV */}
        <div className="flex flex-col gap-2">
          <label
            className={`flex items-center justify-center gap-4 p-4 border-2 ${
              uploadedFiles.ogFile
                ? "border-dashed border-gray-300 cursor-pointer hover:bg-gray-100"
                : "border-dashed border-gray-300 bg-gray-200 cursor-not-allowed"
            } rounded-lg hover:shadow-md transition-all duration-300`}
          >
            <FaRegFileExcel size={30} className="text-green-600" />
            <span className="font-semibold text-lg">Select Measured CSV</span>
            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleFileChangeGen}
              disabled={!uploadedFiles.ogFile}
            />
          </label>
          {uploadedFiles.genFile && (
            <p className="text-sm text-gray-600">
              File: <span className="font-bold">{uploadedFiles.genFile.name}</span>{" "}
              ({(uploadedFiles.genFile.size / 1024).toFixed(2)} KB)
            </p>
          )}
        </div>

        {/* Upload Folder */}
        <div className="flex flex-col gap-2">
          <label
            className={`flex items-center justify-center gap-4 p-4 border-2 ${
              uploadedFiles.ogFile && uploadedFiles.genFile
                ? "border-dashed border-gray-300 cursor-pointer hover:bg-gray-100"
                : "border-dashed border-gray-300 bg-gray-200 cursor-not-allowed"
            } rounded-lg hover:shadow-md transition-all duration-300`}
          >
            <MdOutlineDriveFolderUpload size={30} className="text-blue-600" />
            <span className="font-semibold text-lg">Select Folder</span>
            <input
              type="file"
              multiple
              webkitdirectory="true"
              className="hidden"
              onChange={handleFolderInput}
              disabled={!uploadedFiles.ogFile || !uploadedFiles.genFile}
            />
          </label>
          {uploadedFiles.folderFiles && uploadedFiles.folderFiles.length > 0 && (
            <p className="text-sm text-gray-600">
              <span className="font-bold">{uploadedFiles.folderFiles.length}</span> image(s) uploaded.
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 hover:scale-105 hover:shadow-xl ${
            uploadedFiles.ogFile && uploadedFiles.genFile && uploadedFiles.folderFiles.length > 0
              ? ""
              : " cursor-not-allowed"
          } rounded-lg shadow-lg transition-transform duration-300 ease-in-out`}
          disabled={
            !uploadedFiles.ogFile ||
            !uploadedFiles.genFile ||
            uploadedFiles.folderFiles.length === 0
          }
        >
          Submit Files
        </button>
      </form>
    </div>
  );
}

export default ImageUploadForm;

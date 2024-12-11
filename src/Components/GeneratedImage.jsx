import React, { useContext, useEffect, useState } from "react";
import { FetchData } from "../Utils/Api";
import { useLocation } from "react-router-dom";
import { ImageContext } from "../context/ImageContext";
import TableComponent from "./TableComponent";
import "./loader.css";

const GeneratedImage = () => {
  const { loading, setLoading, ogcv, gencv } = useContext(ImageContext);
  const location = useLocation();
  const [result, setResult] = useState(null);
  const { image } = location.state || {};
  const [ogData, setOgData] = useState(null);
  const [genData, setGenData] = useState(null);
  const [actualArea, setActualArea] = useState(null);
  const [apercentageError, setApercentageError] = useState(null);
  const [calculatedArea, setCalculatedArea] = useState(null);
  const [areaFlag, setAreaFlag] = useState(null);

  function getData(cvData) {
    const name1 = image.name.replace(/\.jpg$/i, "");
    return cvData.filter((house) => house.House.includes(name1));
  }

  useEffect(() => {
    const og = getData(ogcv);
    const gen = getData(gencv);
    setOgData(og);
    setGenData(gen);
  }, [ogcv, gencv, image]);

  useEffect(() => {
    if (ogData && ogData.length > 0) {
      const actualAreaValue = ogData[0]["Actual Area (sq ft)"];
      const calculatedAreaValue = 200; // Example value
      const error = ((calculatedAreaValue - actualAreaValue) / actualAreaValue) * 100;
      const flag = error >= 10;

      setActualArea(actualAreaValue);
      setCalculatedArea(calculatedAreaValue);
      setApercentageError(error.toFixed(2));
      setAreaFlag(flag ? "true" : "false");
    }
  }, [ogData]);

  useEffect(() => {
    const fetchGeneratedImage = async () => {
      const response = await FetchData(image, setLoading);
      setResult(response);
      console.log(response);
    };
    fetchGeneratedImage();
  }, [image]);

  const areacomparisonHeaders = ["Building Metrics", "Actual Area (sq ft)", "Calculated Area (sq ft)", "%Error", "Flag"];

  const AreaComparisonData = [
    {
      "Building Metrics": "Area",
      "Actual Area (sq ft)": actualArea || "Loading...",
      "Calculated Area (sq ft)": calculatedArea || "Loading...",
      "%Error": apercentageError || "Loading...",
      Flag: areaFlag || "Loading...",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-[#3b82f6] to-purple-600 p-10 h-fit">
      {result ? (
        <div className="flex flex-col items-center gap-10">
          <div className="flex justify-evenly flex-wrap gap-10 w-full">
            <div>
              <div className="flex flex-col border-2 rounded-lg h-fit shadow-lg bg-white">
                <h2 className="text-[#F72C5B] text-center text-xl font-extrabold p-2">Original Image</h2>
                <img src={image.url} alt="Original" className="h-96 w-[96] object-contain rounded-b-lg" />
              </div>
              <TableComponent headers={["House", "Coordinates", "Actual Height (ft)", "Actual Area (sq ft)"]} data={ogData} />
            </div>
            <div>
              <div className="flex flex-col border-2 rounded-lg h-fit shadow-lg bg-white">
                <h2 className="text-[#F72C5B] text-center text-xl font-extrabold p-2">Segmented Image</h2>
                <img
                  src={`data:image/png;base64,${result.result.segmented_image_base64}`}
                  alt="Segmented"
                  className="h-96 w-[96] object-contain rounded-b-lg"
                />
              </div>
              <TableComponent headers={["House", "Coordinates", "Measured Height (ft)", "Calculated Area (sq ft)"]} data={genData} />
            </div>
          </div>
          {ogData && genData && (
            <TableComponent headers={areacomparisonHeaders} data={AreaComparisonData} className="table-comparison" />
          )}
        </div>
      ) : (
        <div className="h-[80vh] w-[100vw] flex flex-col justify-center items-center gap-10">
          <span className="loader"></span>
          <p className="text-white text-lg">Processing your image...</p>
        </div>
      )}
    </div>
  );
};

export default GeneratedImage;

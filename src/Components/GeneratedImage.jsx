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
  const [actualHeight, setActualHeight] = useState(null);
  const [hpercentageError, setHpercentageError] = useState(null);
  const [measuredHeight, setMeasuredHeight] = useState(null);
  const [heightFlag, setHeightFlag] = useState(null);

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
      // Area Metrics
      const actualAreaValue = ogData[0]["Actual Area (sq ft)"];
      const calculatedAreaValue = 200; // Example value
      const areaError = ((calculatedAreaValue - actualAreaValue) / actualAreaValue) * 100;
      const areaFlagValue = areaError >= 10;

      setActualArea(actualAreaValue);
      setCalculatedArea(calculatedAreaValue);
      setApercentageError(areaError.toFixed(2));
      setAreaFlag(areaFlagValue ? "true" : "false");

      // Height Metrics
      const actualHeightValue = ogData[0]["Actual Height (ft)"];
      const measuredHeightValue = 30; // Example value
      const heightError = ((measuredHeightValue - actualHeightValue) / actualHeightValue) * 100;
      const heightFlagValue = heightError >= 10;

      setActualHeight(actualHeightValue);
      setMeasuredHeight(measuredHeightValue);
      setHpercentageError(heightError.toFixed(2));
      setHeightFlag(heightFlagValue ? "true" : "false");
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

  const areacomparisonHeaders = [
    "Building Metrics",
    "Actual Area (sq ft)",
    "Calculated Area (sq ft)",
    "%Error",
    "Flag",
  ];

  const heightcomparisonHeaders = [
    "Building Metrics",
    "Actual Height (ft)",
    "Measured Height (ft)",
    "%Error",
    "Flag",
  ];

  const AreaComparisonData = [
    {
      "Building Metrics": "Area",
      "Actual Area (sq ft)": actualArea || "Loading...",
      "Calculated Area (sq ft)": calculatedArea || "Loading...",
      "%Error": apercentageError || "Loading...",
      Flag: areaFlag || "Loading...",
    },
  ];

  const HeightComparisonData = [
    {
      "Building Metrics": "Height",
      "Actual Height (ft)": actualHeight || "Loading...",
      "Measured Height (ft)": measuredHeight || "Loading...",
      "%Error": hpercentageError || "Loading...",
      Flag: heightFlag || "Loading...",
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
              <h2 className="text-xl font-bold mb-4 text-white text-center underline decoration-yellow-300">
        House Details
      </h2>
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
              <h2 className="text-xl font-bold mb-4 text-white text-center underline decoration-yellow-300">
        House Details
      </h2>
              <TableComponent headers={["House", "Coordinates", "Measured Height (ft)", "Calculated Area (sq ft)"]} data={genData} />
            </div>
          </div>
          {ogData && genData && (
            <div className="flex flex-col gap-10">
              <TableComponent headers={areacomparisonHeaders} data={AreaComparisonData} className="table-comparison" />
              <TableComponent headers={heightcomparisonHeaders} data={HeightComparisonData} className="table-comparison" />
            </div>
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

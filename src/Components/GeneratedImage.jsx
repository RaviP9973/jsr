import React, { useContext, useEffect, useState } from "react";
import { FetchData } from "../Utils/Api";
import { useLocation } from "react-router-dom";
import { ImageContext } from "../context/ImageContext";
import "./loader.css";

const GeneratedImage = () => {
  const { loading, setLoading, ogcv, gencv } = useContext(ImageContext);
  const location = useLocation();
  const [result, setResult] = useState(null);
  const { image } = location.state || {};
  const [filteredHouses, setFilteredHouses] = useState();
  const [ogData, setOgData] = useState(null);
  const [genData, setGenData] = useState(null);

  function getData(cvData) {
    const name1 = image.name.replace(/\.jpg$/i, "");
    const filtered = cvData.filter((house) => house.House.includes(name1));
    console.log(filtered);
    return filtered;
  }

  useEffect(() => {
    setLoading(true);

    const og = getData(ogcv);
    const gen = getData(gencv);
    setOgData(og);
    setGenData(gen);
    const fetchGeneratedImage = async () => {
      const response = await FetchData(image, setLoading);
      setResult(response);
      console.log(response);
    };
    fetchGeneratedImage(image);
  }, [image]);

  return (
    <div>
      {result ? (
        <div className="flex justify-evenly">
          <div>
            <div className="flex flex-col border-2 rounded-lg h-fit">
              <h2 className="text-[#F72C5B] text-center text-xl font-extrabold bg-white">
                Original Image
              </h2>
              <img
                src={image.url}
                alt=""
                className="h-96 w-[96] object-contain "
              />
            </div>
            <div className="mt-3">
              <h2 className="text-xl font-bold mb-4 text-white text-center">
                House Details
              </h2>
              <table className="table-auto border-collapse border border-gray-300 w-full text-white">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">House</th>
                    <th className="border border-gray-300 p-2">Coordinates</th>
                    <th className="border border-gray-300 p-2">
                      Actual Height (ft)
                    </th>
                    <th className="border border-gray-300 p-2">
                      Actual Area (sq ft)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ogData.map((house, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">
                        {house.House}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {house.Coordinates}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {house["Actual Height (ft)"]}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {house["Actual Area (sq ft)"]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div className="flex flex-col border-2 rounded-lg h-fit">
              <h2 className="text-[#F72C5B] text-center text-xl font-extrabold bg-white">
                Segmented Image
              </h2>
              <img
                src={`data:image/png;base64,${result.result.segmented_image_base64}`}
                alt=""
                className="h-96 w-[96] object-contain "
              />
            </div>
            <div className="mt-3">
              <h2 className="text-xl font-bold mb-4 text-white text-center">
                House Details
              </h2>
              <table className="table-auto border-collapse border border-gray-300 w-full text-white">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">House</th>
                    <th className="border border-gray-300 p-2">Coordinates</th>
                    <th className="border border-gray-300 p-2">
                      Calc. Height (ft)
                    </th>
                    <th className="border border-gray-300 p-2">
                      Calc. Area (sq ft)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {genData.map((house, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">
                        {house.House}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {house.Coordinates}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {house["Measured Height (ft)"]}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {house["Actual Area (sq ft)"]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

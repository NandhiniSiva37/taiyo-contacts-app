import React, { useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import locationIcon from "../../assets/location.svg";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CountryInfo {
  lat: number;
  long: number;
}

interface CountryData {
  deaths: ReactNode;
  recovered: ReactNode;
  active: ReactNode;
  country: string;
  countryInfo: CountryInfo;
}

interface GraphData {
  cases: {
    [date: string]: number;
  };
  deaths: {
    [date: string]: number;
  };
  recovered: {
    [date: string]: number;
  };
}

const Charts: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [worldwideData, setWorldwideData] = useState<any>({});
  const [countryData, setCountryData] = useState<CountryData[]>([]);
  const [graphData, setGraphData] = useState<GraphData>({
    cases: {},
    deaths: {},
    recovered: {},
  });

  let customIcon = L.icon({
    iconUrl: locationIcon,
    iconRetinaUrl: locationIcon,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [25, 55],
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Fetch data from APIs and set state
      const worldwideResponse = await axios.get<any>(
        "https://disease.sh/v3/covid-19/all"
      );
      const countryResponse = await axios.get<CountryData[]>(
        "https://disease.sh/v3/covid-19/countries"
      );
      const graphResponse = await axios.get<GraphData>(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
      );

      setWorldwideData(worldwideResponse.data);
      setCountryData(countryResponse.data);
      setGraphData(graphResponse.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const chartData = {
    labels: Object.keys(graphData.cases), // Assuming dates are the labels
    datasets: [
      {
        label: "Cases",
        data: Object.values(graphData.cases),
        borderColor: "yellow",
        fill: false,
      },
      {
        label: "Deaths",
        data: Object.values(graphData.deaths),
        borderColor: "red",
        fill: false,
      },
      {
        label: "Recovered",
        data: Object.values(graphData.recovered),
        borderColor: "green",
        fill: false,
      },
    ],
  };

  return (
    <div className="ml-4 md:ml-72 flex flex-col">
      {" "}
      {loading ? (
        <div className="flex items-center justify-center h-full py-52 pr-64">
          <div className="mt-0.5 w-16 h-16 border-2 border-t-blue border-manageBgGrey rounded-[50%] border-solid animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="text-lg font-bold mb-4 md:mb-8">
            Graph data for cases with date:
          </div>
          <div className="w-full md:w-[45rem] h-[27rem]">
            {" "}
            <Line data={chartData} />
          </div>
          <div className="text-lg font-bold mb-8">
            Country Specific data of cases :{" "}
          </div>
          <div className=" w-[45rem] h-[32rem]">
            <MapContainer
              center={[51.505, -0.091]}
              zoom={5}
              style={{ height: "500px" }}
            >
              {countryData?.map((country) => (
                <Marker
                  key={country.country}
                  position={[country.countryInfo.lat, country.countryInfo.long]}
                  icon={customIcon}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
      OpenStreetMap</a> contributors'
                  />
                  <Popup>
                    <div>
                      <h2>{country.country}</h2>
                      <p>Total Active: {country.active}</p>
                      <p>Total Recovered: {country.recovered}</p>
                      <p>Total Deaths: {country.deaths}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
          <div className="text-lg font-bold mb-8">
            World wide data of cases :{" "}
          </div>
          <div className="flex flex-wrap pt-18 w-[55rem]">
            {Object.entries(worldwideData).map(([key, value]: any) => (
              <div
                key={key}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-3 text-lightGrey"
              >
                <strong>{key}:</strong> {value}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Charts;

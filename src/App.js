import { useEffect, useState } from "react";
import "./index.css";
import "animate.css";
import axios from "axios";

const Cities = [
  "Damascus",
  "Aleppo",
  "Homs",
  "Hama",
  "Latakia",
  "Tartus",
  "Deir ez-Zor",
  "Raqqa",
  "Idlib",
  "Daraa",
];

export default function App() {
  const [city, setCity] = useState("Damascus");
  const [timings, setTimings] = useState({});

  function handleCity(newCity) {
    setCity(newCity);
  }

  useEffect(() => {
    async function CallApi() {
      axios
        .get(
          `http://api.aladhan.com/v1/timingsByCity?city=${city}&country=Syria`
        )
        .then((res) => {
          setTimings(res.data.data.timings);
        });
    }
    CallApi();
  }, [city]);

  const filteredTimings = Object.entries(timings)
    .filter(([key]) => key !== "Sunset")
    .slice(0, 6)
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-lime-400 to-lime-600 p-4 md:p-8 lg:p-12">
      <CityAndCountryName city={city} />
      <CardsContainer timings={filteredTimings} />
      <ChooseCity handleCity={handleCity} />
    </div>
  );
}

function CityAndCountryName({ city }) {
  return (
    <h1 className="text-center w-full mx-auto py-4 text-4xl md:text-5xl lg:text-6xl font-semibold italic mb-6">
      {city}, Syria {new Date().toLocaleString()}
    </h1>
  );
}

function CardsContainer({ timings }) {
  const prayers = Object.keys(timings);
  const prayerTime = Object.values(timings);

  return (
    <div className="flex flex-wrap justify-center">
      {prayers.map((prayer, i) => (
        <Cards key={i} timings={prayer} q={prayerTime[i]} />
      ))}
    </div>
  );
}

function Cards({ timings, i, q }) {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 relative p-3 bg-white shadow-md rounded-lg text-left mb-4 sm:mb-6 md:mb-8 lg:mb-10 sm:mr-4 md:mr-6 lg:mr-8 transition duration-300 transform hover:scale-105 hover:bg-lime-200">
      <h3 className="text-3xl sm:text-4xl p-2 font-bold text-lime-700">
        {timings}
      </h3>
      <p className="text-2xl sm:text-3xl p-2 text-lime-900">{q}</p>
    </div>
  );
}

function ChooseCity({ handleCity }) {
  return (
    <div className="w-full md:w-2/3 lg:w-1/2 mx-auto mb-4 md:mb-6 lg:mb-8">
      <select
        className="cursor-pointer w-full px-3 py-2 rounded-lg shadow-md border border-white bg-lime-400"
        onChange={(e) => {
          handleCity(e.target.value);
        }}
      >
        {Cities.map((city, i) => (
          <option
            key={i}
            className="w-full cursor-pointer rounded-lg bg-lime-400 text-slate-900"
          >
            {city}
          </option>
        ))}
      </select>
    </div>
  );
}

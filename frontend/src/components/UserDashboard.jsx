import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./UserDashboard.css";
import {BASE_URL} from "../constants/config";
import { GET_ALL_GAMES, GET_ALL_SLIDERS } from '../constants/apiEndpoints';
import CarouselComponent from './CarousalComponent';
const UserDashboard = () => {
  const user = localStorage.getItem('username') || "VikramSah291";
  const [games, setGames] = useState([]);
  const [sliders, setSliders] = useState([]);


  useEffect(() => {
    fetchGames();
    fetchSliders();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await axios.get(GET_ALL_GAMES);
      console.log(response.data, "response");
      setGames(response.data);
    } catch (err) {
      console.error(err);
    }
  };

   const fetchSliders = async () => {
      try {
        const response = await axios.get(GET_ALL_SLIDERS);
        setSliders(response.data);
      } catch (error) {
        console.error("Error fetching sliders:", error);
      }
    };

  const scrollGames = (direction) => {
    const container = document.getElementById("gamesContainer");
    const scrollAmount = 200; // Adjust based on the card width

    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };

  const scrollSports = (direction) => {
    const container = document.getElementById("sportsContainer");
    const scrollAmount = 200; // Adjust based on the card width

    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };

  



  return (
    <div className="min-h-screen  text-white">


      {/* Main Content */}
      <main className="container mx-auto p-2 flex flex-col items-center">
        {/* Static Card */}
        <div className='w-full flex justify-between mt-10'>
        <div className="bg-gray-800 rounded-lg p-4 w-full max-w-md flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">Your VIP Progress</h3>
            <p className="text-sm text-gray-400">{user}</p>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">0.00%</p>
              <span className="text-gray-500">ⓘ</span>
            </div>
            <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: "0%" }}></div>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-gray-500">None</p>
            <p className="text-yellow-500">★ Bronze</p>
          </div>
        </div>
        <CarouselComponent dynamicCards={sliders} />
        </div>


        <div className="mt-8 w-full max-w-6xl relative overflow-hidden">
          <div className='flex flex-row justify-between'>
          <h2 className="text-2xl font-semibold mb-4">Trending Games</h2>
          <div className="absolute top-1/2 transform -translate-y-1/2 right-0 flex gap-0 top-4">
            <button
              className="bg-gray-800 text-white px-2 py-1 rounded-full hover:bg-gray-700"
              onClick={() => scrollGames("left")}
            >
              ‹
            </button>
            <button
              className="bg-gray-800 text-white px-2 py-1 rounded-full hover:bg-gray-700"
              onClick={() => scrollGames("right")}
            >
              ›
            </button>
          </div>
          </div>
          

          {/* Scrollable container */}
          <div
            className="flex overflow-x-hidden overflow-y-hidden gap-4 no-scrollbar relative"
            style={{ scrollBehavior: "smooth", width: "100%" }}
            id="gamesContainer"
          >
            {/* I just want to show the games which have type as Casino */}

            {games.filter((game) => game.type === "Casino" && game.popularity === "Very Popular" || game.popularity === "Popular").map((game, index) => (
              <div
                key={index}
                className="min-w-[15%] relative rounded-lg overflow-hidden hover:scale-105 transition transform duration-300"
              >
                {/* Game Image */}
                <img
                  src={game.image.startsWith('./') ? game.image : `${BASE_URL}/uploads/${game.image}`}
                  alt={game.name}
                  className="w-full h-32 object-cover"
                />

                {/* Overlay with game name */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center">
                  <p className='absolute top-2 left-1 transform -translate-x-1/2 bg-gray-800  w-8 h-6 flex items-center justify-center rounded-full'>{index + 1}</p>
                  <p className="text-lg font-bold text-white">{game.name}</p>
                </div>

                {/* Green dot with number */}
                <p>
                  <span className="absolute bottom-2 left-3 bg-green-500 w-3 h-3 rounded-full"></span>
                </p>

                {/* Center-aligned "playing" text */}
                <p className="text-center mt-2">{game.playing || 999} playing</p>
              </div>
            ))}
          </div>

          {/* Floating Navigation Buttons */}
          
        </div>


        {/* Trending Sports Section */}
        <div className="mt-8 w-full max-w-6xl relative overflow-hidden">
          <h2 className="text-2xl font-semibold mb-4">Trending Sports</h2>
          <div className="absolute top-4 transform -translate-y-1/2 right-0 flex gap-0 mt-2">
            <button
              className="bg-gray-800 text-white px-2 py-1 rounded-full hover:bg-gray-700"
              onClick={() => scrollSports("left")}
            >
              ‹
            </button>
            <button
              className="bg-gray-800 text-white px-2 py-1 rounded-full hover:bg-gray-700"
              onClick={() => scrollSports("right")}
            >
              ›
            </button>
          </div>

          {/* Scrollable container */}
          <div
            className="flex overflow-x-hidden overflow-y-hidden gap-4 no-scrollbar relative"
            style={{ scrollBehavior: "smooth", width: "100%" }}
            id="sportsContainer"
          >
            
              {
           games.filter((game) => game.type === 'Sport').map((sport, index) => ( 
              <div
                key={index}
                className="min-w-[15%] relative rounded-lg overflow-hidden hover:scale-105 transition transform duration-300"
              >
                {/* Sport Image */}
                <img
                  src={`${BASE_URL}/uploads/${sport.image}` || sport.image}
                  alt={sport.name}
                  className="w-full h-32 object-cover"
                />

                {/* Overlay with sport name */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center">
                  <p className='absolute top-2 left-1 transform -translate-x-1/2 bg-gray-800 w-8 h-6 flex items-center justify-center rounded-full'>{index + 1}</p>
                  <p className="text-lg font-bold text-white">{sport.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        
            
          
        
















      </main>
    </div>
  );
};

export default UserDashboard;

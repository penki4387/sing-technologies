import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./UserDashboard.css";

const UserDashboard = () => {
  const user = localStorage.getItem('username') || "VikramSah291";
  const [games, setGames] = useState([]);


  //fetch the list of the games on page load

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/games/allgames');
      console.log(response.data, "response");
      setGames(response.data);
    } catch (err) {
      console.error(err);
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {/* User Card */}
          <div className="bg-gray-800 rounded-lg p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">{user}</h3>
              <p className="text-sm text-gray-400">Your VIP Progress →</p>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">0.00%</p>
                <span className="text-gray-500">ⓘ</span>
              </div>
              <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-gray-500">None</p>
              <p className="text-yellow-500">★ Bronze</p>
            </div>
          </div>

          {/* Casino Card */}
          <div className="bg-gray-800 rounded-lg gap-4 flex flex-col items-center justify-center">

            <img
              src="./casino.jpg" // Replace with actual image URL
              alt="Casino"
              className="rounded-lg w-full "
            />
            <p className="font-semibold pb-2">Casino</p>

          </div>

          {/* Sportsbook Card */}
          <div className="bg-gray-800 rounded-lg gap-4 flex flex-col items-center justify-center">

            <img
              src="./sportsGames.jpg" // Replace with actual image URL
              alt="Sportsbook"
              className="rounded-lg w-full h-full "
            />
            <p className="font-semibold pb-2">Sportsbook</p>

          </div>
        </div>

        {/* Trending Games Section */}
        {/* if the games are present, then put it here otherwise show the existing trending games */}

        <div className="mt-8 w-full max-w-6xl relative overflow-hidden">
          <h2 className="text-2xl font-semibold mb-4">Trending Games</h2>

          {/* Scrollable container */}
          <div
            className="flex overflow-x-hidden overflow-y-hidden gap-4 no-scrollbar relative"
            style={{ scrollBehavior: "smooth", width: "100%" }}
            id="gamesContainer"
          >
            {games.map((game, index) => (
              <div
                key={index}
                className="min-w-[15%] relative rounded-lg overflow-hidden hover:scale-105 transition transform duration-300"
              >
                {/* Game Image */}
                <img
                  src={game.image}
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
          <div className="absolute top-1/2 transform -translate-y-1/2 right-0 flex gap-0 mt-2">
            <button
              className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
              onClick={() => scrollGames("left")}
            >
              ‹
            </button>
            <button
              className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
              onClick={() => scrollGames("right")}
            >
              ›
            </button>
          </div>
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
            {[
              { name: 'Soccer', image: './soccer.jpg', popularity: 'Popular' },
              { name: 'Tennis', image: './tennis.jpg', popularity: 'Popular' },
              { name: 'Basketball', image: './basketball.png', popularity: 'Popular' },
              { name: 'Cricket', image: './cricket.jpg', popularity: 'Popular' },
              { name: 'Racing', image: './racing.jpg', popularity: 'Popular' },
              { name: 'American Football', image: './americanFootball.jpg', popularity: 'Popular' },
              { name: 'Baseball', image: './baseball.jpg', popularity: 'Popular' },
              { name: 'Golf', image: './golf.jpg', popularity: 'Popular' },
              { name: 'Volleyball', image: './volleyball.jpg', popularity: 'Popular' },
              { name: 'Handball', image: './Handball.jpg', popularity: 'Popular' },
              { name: 'Ice Hockey', image: './iceHockey.jpg', popularity: 'Popular' },
              { name: 'Rugby', image: './rugby.jpg', popularity: 'Popular' },
            ].map((sport, index) => (
              <div
                key={index}
                className="min-w-[15%] relative rounded-lg overflow-hidden hover:scale-105 transition transform duration-300"
              >
                {/* Sport Image */}
                <img
                  src={sport.image}
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

        {/* Races & Raffles Section */}
        <div className="mt-8 w-full max-w-6xl">
          {/* Section Title */}
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <span className="text-blue-400">🏁</span> Races & Raffles
          </h2>

          {/* Card Container */}
          <div className="flex gap-4">
            {/* Card 1: $10m Christmas Race */}
            <div className="bg-gray-800 flex-1 rounded-lg p-4 flex flex-col justify-between">
              {/* Card Header */}



              <div className="flex justify-between items-center mt-2">


                <div>
                  <h3 className="text-white text-lg font-semibold">$10m Christmas Race</h3>
                  <p className="text-gray-400 text-sm mt-1">Ready to race to the top?</p>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-10">
                    Leaderboard
                  </button>
                </div>
                {/* Button */}

                <div className="relative w-40 h-40">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <circle
                      className="text-gray-600"
                      strokeWidth="3"
                      stroke="currentColor"
                      fill="transparent"
                      r="15"
                      cx="18"
                      cy="18"
                    />
                    <circle
                      className="text-blue-500"
                      strokeWidth="3"
                      stroke="currentColor"
                      fill="transparent"
                      r="15"
                      cx="18"
                      cy="18"
                      style={{ strokeDasharray: "94", strokeDashoffset: "25" }} // Adjust progress dynamically
                    />
                  </svg>
                  <p className="absolute inset-0 flex items-center justify-center text-white text-md">
                    Ends in<br />22d 8h
                  </p>
                </div>
              </div>


              {/* Footer */}
              <div className="flex items-center mt-4">
                <span className="text-gray-400 text-sm flex items-center gap-2">
                  <i className="text-white">ℹ️</i> Not entered yet
                </span>
              </div>
            </div>

            {/* Card 2: $75k Weekly Raffle */}
            <div className="bg-gray-800 flex-1 rounded-lg p-4 flex flex-col justify-between">
              {/* Card Header */}
             

              {/* Center Content */}
              <div className="flex justify-between items-center mt-2">
                {/* Circular Progress */}

                <div>
                <h3 className="text-white text-lg font-semibold">$75k Weekly Raffle</h3>
                <p className="text-gray-400 text-sm mt-1">Finish your week with a win!</p>
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-10">
                  0 Tickets
                </button>
              </div>


                {/* Button */}
                
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <circle
                      className="text-gray-600"
                      strokeWidth="3"
                      stroke="currentColor"
                      fill="transparent"
                      r="15"
                      cx="18"
                      cy="18"
                    />
                    <circle
                      className="text-blue-500"
                      strokeWidth="3"
                      stroke="currentColor"
                      fill="transparent"
                      r="15"
                      cx="18"
                      cy="18"
                      style={{ strokeDasharray: "94", strokeDashoffset: "50" }} // Adjust progress dynamically
                    />
                  </svg>
                  <p className="absolute inset-0 flex items-center justify-center text-white text-md">
                    Ends in<br />4d 8h
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4">
                <div className="w-full bg-gray-700 h-2 rounded-full">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: "0%" }} // Adjust dynamically
                  ></div>
                </div>
                <p className="text-gray-400 text-right text-sm mt-1">0%</p>
              </div>
            </div>
          </div>
        </div>
















      </main>
    </div>
  );
};

export default UserDashboard;

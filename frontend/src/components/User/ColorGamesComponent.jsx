import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ColorGamesComponent = () => {
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute countdown
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 10000000000)
  ); // Random number for Period
  const [activeTable, setActiveTable] = useState("Parity"); // Default active table
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [isDisabled, setIsDisabled] = useState(false); // Track if action buttons should be disabled
  const [period, setPeriod] = useState("20250103701"); // Set an initial period
  const [saturation, setSaturation] = useState(1); // Variable for table saturation effect

  const tableData = {
    Parity: Array.from({ length: 20 }, (_, i) => ({
      period: `202501037${38 - i}`,
      price: `${37000 + i * 10}`,
      number: i % 10,
      result: i % 2 === 0 ? "green" : "red",
    })),
    Sapre: Array.from({ length: 20 }, (_, i) => ({
      period: `202501037${18 - i}`,
      price: `${38000 + i * 15}`,
      number: (i + 1) % 10,
      result: (i + 1) % 2 === 0 ? "green" : "red",
    })),
    Bcone: Array.from({ length: 20 }, (_, i) => ({
      period: `202501037${58 - i}`,
      price: `${39000 + i * 20}`,
      number: (i + 2) % 10,
      result: (i + 2) % 2 === 0 ? "green" : "red",
    })),
    Emred: Array.from({ length: 20 }, (_, i) => ({
      period: `202501037${78 - i}`,
      price: `${40000 + i * 25}`,
      number: (i + 3) % 10,
      result: (i + 3) % 2 === 0 ? "green" : "red",
    })),
  };

  const recordsPerPage = 10;
  const totalPages = Math.ceil(tableData[activeTable].length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentRecords = tableData[activeTable].slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) return 60; // Reset Timer after 1 minute
        return prev - 1;
      });
    }, 1000);

    // Disable action buttons after 50 seconds (10 seconds left in the cycle)
    if (timeLeft === 20) {
      setIsDisabled(true);
    }

    // Re-enable buttons and reset after 1 minute
    if (timeLeft === 60) {
      setIsDisabled(false);
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Period change after 1 minute
  useEffect(() => {
    if (timeLeft === 0) {
      // Change the period after 1 minute (60 seconds)
      setPeriod(`202501037${Math.floor(Math.random() * 100000)}`); // Update with a random period
    }
  }, [timeLeft]);

  // Decrease saturation after 10 seconds
  useEffect(() => {
    if (timeLeft === 20) {
      setSaturation(0.5); // Decrease saturation (or any other effect you want) after 10 seconds
    }
    if (timeLeft === 60) {
      setSaturation(1); // Reset saturation after a full cycle
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen text-white flex flex-col items-center p-4">
      {/* Top Row - Table Selection */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-5xl mb-6">
        {["Parity", "Sapre", "Bcone", "Emred"].map((tableName) => (
          <button
            key={tableName}
            className={`px-2 py-1 rounded text-white ${
              activeTable === tableName ? "bg-blue-600" : "bg-gray-700"
            }`}
            onClick={() => {
              setActiveTable(tableName);
              setCurrentPage(1);
            }}
            disabled={
              isDisabled &&
              !(
                tableName === "Parity" ||
                tableName === "Sapre" ||
                tableName === "Bcone" ||
                tableName === "Emred"
              )
            }
          >
            {tableName}
          </button>
        ))}
      </div>

      {/* Timer & Period */}
      <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-5xl mb-6">
        <div className="flex items-center mb-2 sm:mb-0">
          <span className="text-green-500 font-bold text-xl">🏆</span>
          <span className="text-lg font-bold mx-2">Period</span>
          <span className="text-lg font-bold">{period}</span>
        </div>
        <span className="bg-gray-700 px-4 py-2 rounded">
          Time Left: {formatTime(timeLeft)}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 w-full max-w-5xl mb-6">
        <button
          className="px-2 py-1 rounded text-white"
          style={{
            background: isDisabled ? "rgb(149,53,83)" : "#10B981", // Change to rgb(149,53,83) after 50 seconds
          }}
          disabled={isDisabled}
        >
          Join Green
        </button>
        <button
          className="px-2 py-1 rounded text-white"
          style={{
            background: isDisabled ? "rgb(149,53,83)" : "#8b5cf6", // Change to rgb(149,53,83) after 50 seconds
          }}
          disabled={isDisabled}
        >
          Join Violet
        </button>
        <button
          className="px-2 py-1 rounded text-white"
          style={{
            background: isDisabled ? "rgb(149,53,83)" : "#EF4444", // Change to rgb(149,53,83) after 50 seconds
          }}
          disabled={isDisabled}
        >
          Join Red
        </button>
      </div>
      
      <div className="grid grid-cols-5 sm:grid-cols-5 gap-2 w-full max-w-5xl mb-6">
  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, index) => (
    <button
      key={index}
      className="px-2 py-1 rounded text-white w-full"
      style={
        isDisabled
          ? { background: "rgb(149,53,83)" } // Disabled color
          : index === 0
          ? {
              background:
                "linear-gradient(135deg, #ef4444 50%, #8b5cf6 50%)",
            } // Mixed Red & Purple for 0
          : index === 5
          ? {
              background:
                "linear-gradient(135deg, #10B981 50%, #8b5cf6 50%)",
            } // Mixed Green & Purple for 5
          : num % 2 === 0
          ? { background: "#10B981" } // Green for even numbers
          : { background: "#EF4444" } // Red for odd numbers
      }
      disabled={isDisabled}
    >
      {num}
    </button>
  ))}

  {/* Row for Big and Small Buttons */}
  <div className="col-span-5 flex gap-2 w-full">
    {/* Big Button */}
    <button
      className="px-4 py-1 text-xl rounded text-white w-full"
      style={{ background: isDisabled ? "rgb(149,53,83)" : "#EF4444" }} // Red color
      disabled={isDisabled}
    >
      Big
    </button>

    {/* Small Button */}
    <button
      className="px-4 py-1 text-xl rounded text-white w-full"
      style={{ background: isDisabled ? "rgb(149,53,83)" : "#10B981" }} // Green color
      disabled={isDisabled}
    >
      Small
    </button>
  </div>
</div>


      {/* Table */}
      <div className="w-full max-w-5xl">
        <h2 className="text-lg font-bold mb-2 flex justify-center items-center gap-2">
          <span className="text-green-500 text-xl">🏆</span>
          {activeTable} Record
        </h2>
        <table className="table-auto w-full border border-gray-700 mb-4">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-4 py-2">Period</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Number</th>
              <th className="px-4 py-2">Result</th>
              <th className="px-4 py-2">Small & Big</th> {/* New Column */}
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((row, index) => (
              <tr key={index} className="text-center">
                <td className="px-4 py-2">{row.period}</td>
                <td className="px-4 py-2">{row.price}</td>
                <td className="px-4 py-2">{row.number}</td>
                <td className="px-4 py-2">
                  {row.number === 0 ? (
                    <>
                      <span
                        style={{
                          display: "inline-block",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          backgroundColor: "#8b5cf6", // Violet
                        }}
                      ></span>
                      <span> + </span>
                      <span
                        style={{
                          display: "inline-block",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          backgroundColor: "#EF4444", // Red
                        }}
                      ></span>
                    </>
                  ) : row.number === 5 ? (
                    <>
                      <span
                        style={{
                          display: "inline-block",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          backgroundColor: "#8b5cf6", // Violet
                        }}
                      ></span>
                      <span> + </span>
                      <span
                        style={{
                          display: "inline-block",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          backgroundColor: "#10B981", // Green
                        }}
                      ></span>
                    </>
                  ) : row.result === "green" ? (
                    <span
                      style={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: "#10B981", // Green
                      }}
                    ></span>
                  ) : (
                    <span
                      style={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: "#EF4444", // Red
                      }}
                    ></span>
                  )}
                </td>
                <td className="px-4 py-2 font-bold">
                  {row.number < 5 ? (
                    <span style={{ color: "#10B981" }}>Small</span> // Green for Small
                  ) : (
                    <span style={{ color: "#EF4444" }}>Big</span> // Red for Big
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4">
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>

          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => handlePageChange(idx + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === idx + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-white"
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            className="px-4 py-2 bg-gray-700 text-white rounded"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorGamesComponent;

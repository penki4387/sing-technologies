import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PopupComponent from "./PopUpComponent"; // Import the popup

const ColorGamesComponent = () => {
  const [timeLeft, setTimeLeft] = useState({
    "1min": 60,
    "3min": 180,
    "5min": 300,
    "10min": 600,
  }); // Timer for each table
  const [isDisabled, setIsDisabled] = useState({
    "1min": false,
    "3min": false,
    "5min": false,
    "10min": false,
  });
   const [periods, setPeriods] = useState({
    "1min": "202501088594", // initial period for 1min table
    "3min": "202501088595", // initial period for 3min table
    "5min": "202501088596", // initial period for 5min table
    "10min": "202501088597", // initial period for 10min table
  });
  const [activeTable, setActiveTable] = useState("1min");
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [period, setPeriod] = useState("202501088594"); // Set an initial period
  const [saturation, setSaturation] = useState(1); // Variable for table saturation effect

  const tableData = {
    "1min": Array.from({ length: 20 }, (_, i) => ({
      period: `202501037${38 - i}`,
      price: `${37000 + i * 10}`,
      number: i % 10,
      result: i % 2 === 0 ? "green" : "red",
    })),
    "3min": Array.from({ length: 20 }, (_, i) => ({
      period: `202501037${18 - i}`,
      price: `${38000 + i * 15}`,
      number: (i + 1) % 10,
      result: (i + 1) % 2 === 0 ? "green" : "red",
    })),
    "5min": Array.from({ length: 20 }, (_, i) => ({
      period: `202501037${58 - i}`,
      price: `${39000 + i * 20}`,
      number: (i + 2) % 10,
      result: (i + 2) % 2 === 0 ? "green" : "red",
    })),
    "10min": Array.from({ length: 20 }, (_, i) => ({
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

  // Disable buttons and change color for the 1min table only after 30 seconds
  useEffect(() => {
    if (timeLeft["1min"] === 10) {
      setIsDisabled((prev) => ({ ...prev, "1min": true })); // Disable 1min buttons
    } else if (timeLeft["1min"] === 60) {
      setIsDisabled((prev) => ({ ...prev, "1min": false })); // Re-enable 1min buttons
    }
  }, [timeLeft["1min"]]);
  
  useEffect(() => {
    if (timeLeft["3min"] === 10) {
      setIsDisabled((prev) => ({ ...prev, "3min": true })); // Disable 3min buttons
    } else if (timeLeft["3min"] === 180) {
      setIsDisabled((prev) => ({ ...prev, "3min": false })); // Re-enable 3min buttons
    }
  }, [timeLeft["3min"]]);
  
  useEffect(() => {
    if (timeLeft["5min"] === 10) {
      setIsDisabled((prev) => ({ ...prev, "5min": true })); // Disable 5min buttons
    } else if (timeLeft["5min"] === 300) {
      setIsDisabled((prev) => ({ ...prev, "5min": false })); // Re-enable 3min buttons
    }
  }, [timeLeft["5min"]]);
  // Timer logic for 3min table
  useEffect(() => {
    if (timeLeft["10min"] === 10) {
      setIsDisabled((prev) => ({ ...prev, "10min": true })); // Disable 10min buttons
    } else if (timeLeft["10min"] === 600) {
      setIsDisabled((prev) => ({ ...prev, "10min": false })); // Re-enable 3min buttons
    }
  }, [timeLeft["10min"]]);

// Function to generate a new period with random last 4 digits
const generateNewPeriod = (tableName) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const randomLast4 = Math.floor(1000 + Math.random() * 9000); // Ensure 4-digit random number
  return `${year}${month}${day}${randomLast4}`;
};

// Timer for 1min table
useEffect(() => {
  const interval = setInterval(() => {
    setTimeLeft((prevTimeLeft) => {
      const newTimeLeft = { ...prevTimeLeft };

      if (newTimeLeft["1min"] === 0) {
        newTimeLeft["1min"] = 60;
        setPeriods((prev) => ({ ...prev, "1min": generateNewPeriod("1min") })); // Update period
      } else {
        newTimeLeft["1min"] -= 1;
      }

      return newTimeLeft;
    });
  }, 1000);

  return () => clearInterval(interval);
}, []);

// Timer for 3min table
useEffect(() => {
  const interval = setInterval(() => {
    setTimeLeft((prevTimeLeft) => {
      const newTimeLeft = { ...prevTimeLeft };

      if (newTimeLeft["3min"] === 0) {
        newTimeLeft["3min"] = 180;
        setPeriods((prev) => ({ ...prev, "3min": generateNewPeriod("3min") })); // Update period
      } else {
        newTimeLeft["3min"] -= 1;
      }

      return newTimeLeft;
    });
  }, 1000);

  return () => clearInterval(interval);
}, []);

// Timer for 5min table
useEffect(() => {
  const interval = setInterval(() => {
    setTimeLeft((prevTimeLeft) => {
      const newTimeLeft = { ...prevTimeLeft };

      if (newTimeLeft["5min"] === 0) {
        newTimeLeft["5min"] = 300;
        setPeriods((prev) => ({ ...prev, "5min": generateNewPeriod("5min") })); // Update period
      } else {
        newTimeLeft["5min"] -= 1;
      }

      return newTimeLeft;
    });
  }, 1000);

  return () => clearInterval(interval);
}, []);

// Timer for 10min table
useEffect(() => {
  const interval = setInterval(() => {
    setTimeLeft((prevTimeLeft) => {
      const newTimeLeft = { ...prevTimeLeft };

      if (newTimeLeft["10min"] === 0) {
        newTimeLeft["10min"] = 600;
        setPeriods((prev) => ({ ...prev, "10min": generateNewPeriod("10min") })); // Update period
      } else {
        newTimeLeft["10min"] -= 1;
      }

      return newTimeLeft;
    });
  }, 1000);

  return () => clearInterval(interval);
}, []);

  // //1min table
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTimeLeft((prevTimeLeft) => {
  //       const newTimeLeft = { ...prevTimeLeft };
  
  //       if (newTimeLeft["1min"] === 0) {
  //         newTimeLeft["1min"] = 60;
  //       } else {
  //         newTimeLeft["1min"] -= 1;
  //       }
  
  //       return newTimeLeft;
  //     });
  //   }, 1000);
  
  //   return () => clearInterval(interval);
  // }, []);
  
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTimeLeft((prevTimeLeft) => {
  //       const newTimeLeft = { ...prevTimeLeft };

  //       if (newTimeLeft["3min"] === 0) {
  //         // Reset to 180 seconds when time reaches 0
  //         newTimeLeft["3min"] = 180;
  //       } else {
  //         newTimeLeft["3min"] -= 1;
  //       }

  //       return newTimeLeft;
  //     });
  //   }, 1000);

  //   return () => clearInterval(interval); // Cleanup on unmount
  // }, []); // Only run on mount

  // // Timer logic for 5min table
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTimeLeft((prevTimeLeft) => {
  //       const newTimeLeft = { ...prevTimeLeft };

  //       if (newTimeLeft["5min"] === 0) {
  //         // Reset to 300 seconds when time reaches 0
  //         newTimeLeft["5min"] = 300;
  //       } else {
  //         newTimeLeft["5min"] -= 1;
  //       }

  //       return newTimeLeft;
  //     });
  //   }, 1000);

  //   return () => clearInterval(interval); // Cleanup on unmount
  // }, []); // Only run on mount

  // // Timer logic for 10min table
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTimeLeft((prevTimeLeft) => {
  //       const newTimeLeft = { ...prevTimeLeft };

  //       if (newTimeLeft["10min"] === 0) {
  //         // Reset to 600 seconds when time reaches 0
  //         newTimeLeft["10min"] = 600;
  //       } else {
  //         newTimeLeft["10min"] -= 1;
  //       }

  //       return newTimeLeft;
  //     });
  //   }, 1000);

  //   return () => clearInterval(interval); // Cleanup on unmount
  // }, []); // Only run on mount


  
  // Synchronized Period and Button State Update
  // useEffect(() => {
  //   if (timeLeft[activeTable] === 0) {
  //     const currentDate = new Date();
  //     const year = currentDate.getFullYear();
  //     const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed
  //     const day = currentDate.getDate().toString().padStart(2, "0");
  //     const randomLast4 = Math.floor(Math.random() * 10000); // Random last 4 digits
  //     setPeriod(`${year}${month}${day}${randomLast4}`); // Format: YYYYMMDD + last 4 random digits
  //     setIsDisabled(true); 
  //   }

  //   if (timeLeft[activeTable] === 60) {
  //     setIsDisabled(false); // Re-enable buttons after the full cycle
  //   }
  // }, [timeLeft, activeTable]);

  // Decrease saturation after 10 seconds
  useEffect(() => {
    if (timeLeft[activeTable] === 20) {
      setSaturation(0.5); // Decrease saturation after 10 seconds
    }
    if (timeLeft[activeTable] === 60) {
      setSaturation(1); // Reset saturation after a full cycle
    }
  }, [timeLeft, activeTable]);

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
        {["1min", "3min", "5min", "10min"].map((tableName) => (
          <button
            key={tableName}
            className={`px-2 py-1 rounded text-white ${
              activeTable === tableName ? "bg-blue-600" : "bg-gray-700"
            }`}
            onClick={() => {
              setActiveTable(tableName);
              setCurrentPage(1);
            }}
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
          <span className="text-lg font-bold">{periods[activeTable]}</span>
        </div>
        <span className="bg-gray-700 px-4 py-2 rounded">
          Time Left: {formatTime(timeLeft[activeTable])}
        </span>
      </div>
  
      {/* Join Buttons */}
      <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 w-full max-w-5xl mb-6">
        <button
          className="px-2 py-1 rounded text-white"
          style={{
            background: isDisabled[activeTable] ? "rgb(169, 169, 169)" : "#10B981",
          }}
          disabled={isDisabled[activeTable]}
        >
          Join Green
        </button>
        <button
          className="px-2 py-1 rounded text-white"
          style={{
            background: isDisabled[activeTable] ? "rgb(169, 169, 169)" : "#8b5cf6",
          }}
          disabled={isDisabled[activeTable]}
        >
          Join Violet
        </button>
        <button
          className="px-2 py-1 rounded text-white"
          style={{
            background: isDisabled[activeTable] ? "rgb(169, 169, 169)" : "#EF4444",
          }}
          disabled={isDisabled[activeTable]}
        >
          Join Red
        </button>
      </div>
  
      {/* Number Buttons */}
      <div className="grid grid-cols-5 sm:grid-cols-5 gap-2 w-full max-w-5xl mb-6">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, index) => {
          let backgroundColor = "rgb(169, 169, 169)"; // Default to gray if disabled
          if (!isDisabled[activeTable]) {
            if (index === 0) {
              backgroundColor = "linear-gradient(135deg, #ef4444 50%, #8b5cf6 50%)";
            } else if (index === 5) {
              backgroundColor = "linear-gradient(135deg, #10B981 50%, #8b5cf6 50%)";
            } else if (num % 2 === 0) {
              backgroundColor = "#10B981"; // Green for even numbers
            } else {
              backgroundColor = "#EF4444"; // Red for odd numbers
            }
          }
  
          return (
            <button
              key={index}
              className="px-2 py-1 rounded text-white w-full"
              style={{ background: backgroundColor }}
              disabled={isDisabled[activeTable]}
            >
              {num}
            </button>
          );
        })}
  
        {/* Row for Big and Small Buttons */}
        <div className="col-span-5 flex gap-2 w-full">
          {/* Big Button */}
          <button
            className="px-4 py-1 text-xl rounded text-white w-full"
            style={{
              background: isDisabled[activeTable] ? "rgb(169, 169, 169)" : "#EF4444",
            }}
            disabled={isDisabled[activeTable]}
          >
            Big
          </button>
  
          {/* Small Button */}
          <button
            className="px-4 py-1 text-xl rounded text-white w-full"
            style={{
              background: isDisabled[activeTable] ? "rgb(169, 169, 169)" : "#10B981",
            }}
            disabled={isDisabled[activeTable]}
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
              <th className="px-4 py-2">Small & Big</th>
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
                          backgroundColor: "#8b5cf6",
                        }}
                      ></span>
                      <span> + </span>
                      <span
                        style={{
                          display: "inline-block",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          backgroundColor: "#EF4444",
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
                          backgroundColor: "#10B981",
                        }}
                      ></span>
                      <span> + </span>
                      <span
                        style={{
                          display: "inline-block",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          backgroundColor: "#8b5cf6",
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
                        backgroundColor: "#10B981",
                      }}
                    ></span>
                  ) : (
                    <span
                      style={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: "#EF4444",
                      }}
                    ></span>
                  )}
                </td>
                <td className="px-4 py-2">
                  {row.number % 2 === 0 ? "Small" : "Big"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        {/* Pagination */}
        <div className="flex justify-center items-center gap-4">
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>
  
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

import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import GamePopup from "./PopUpComponent"; // Import the popup
import { PREDICT_COLOR,SET_WALLET_DETAILS,USER_WALLET_DETAILS,COLOR_RESULT } from "../../constants/apiEndpoints"; // Assuming this is defined
import axios from 'axios'; 


const ColorGamesComponent = () => {
  const userid = sessionStorage.getItem("userId");
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTimeLeft = sessionStorage.getItem("timeLeft");
    return savedTimeLeft
      ? JSON.parse(savedTimeLeft)
      : {
          "1min": 60,
          "3min": 180,
          "5min": 300,
          "10min": 600,
        };
  });
  // Function to generate a new period with random last 4 digits
const generateNewPeriod = (tableName) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const randomLast4 = Math.floor(1000 + Math.random() * 9000); // Ensure 4-digit random number
  return `${year}${month}${day}${randomLast4}`;
};
  const [periods, setPeriods] = useState(() => {
    const savedPeriods = sessionStorage.getItem("periods");
    return savedPeriods
      ? JSON.parse(savedPeriods)
      : {
          "1min": generateNewPeriod("1min"),
          "3min": generateNewPeriod("3min"),
          "5min": generateNewPeriod("5min"),
          "10min": generateNewPeriod("10min"),
        };
  });
  const [isDisabled, setIsDisabled] = useState({
    "1min": false,
    "3min": false,
    "5min": false,
    "10min": false,
  });
  
  const [update,setUpdate] = useState(false)
  const [balance, setBalance] = useState(false);
  const [smallBig, setSmallBig] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [activeTable, setActiveTable] = useState("1min");
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
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


  const openPopup = (title, color) => {
    setSelectedTitle(title);
    setSelectedColor(color);
    setModalOpen(true);
  };
 const toggleModal = () => {
    setModalOpen(false);
  };
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


  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTimeLeft((prevTimeLeft) => {
  //       const newTimeLeft = { ...prevTimeLeft };
  //       const currentTime = Date.now();

  //       Object.keys(newTimeLeft).forEach((key) => {
  //         const lastSavedTime = sessionStorage.getItem(`lastSavedTime-${key}`);
  //         if (lastSavedTime) {
  //           const elapsed = Math.floor((currentTime - parseInt(lastSavedTime, 10)) / 1000);
  //           newTimeLeft[key] = Math.max(newTimeLeft[key] - elapsed, 0);
  //           if (newTimeLeft[key] === 0) {
  //             newTimeLeft[key] = { "1min": 60, "3min": 180, "5min": 300, "10min": 600 }[key];
  //             setPeriods((prevPeriods) => ({ ...prevPeriods, [key]: generateNewPeriod(key) }));
  //             console.log("+++++++++++++++++++++++++++++++++");
  //           }
  //         }
  //         sessionStorage.setItem(`lastSavedTime-${key}`, currentTime.toString());
  //       });

  //       sessionStorage.setItem("timeLeft", JSON.stringify(newTimeLeft));
  //       sessionStorage.setItem("periods", JSON.stringify(periods));
  //       return newTimeLeft;
  //     });
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [periods]);

useEffect(() => {
  const interval = setInterval(() => {
    setTimeLeft((prevTimeLeft) => {
      const newTimeLeft = { ...prevTimeLeft };
      const currentTime = Date.now();

      Object.keys(newTimeLeft).forEach((key) => {
        const lastSavedTime = sessionStorage.getItem(`lastSavedTime-${key}`);
        if (lastSavedTime) {
          const elapsed = Math.floor((currentTime - parseInt(lastSavedTime, 10)) / 1000);
          newTimeLeft[key] = Math.max(newTimeLeft[key] - elapsed, 0);

          // If the timer reaches 0, reset it, generate a new period, and call the API
          if (newTimeLeft[key] === 0) {
            // Reset timer
            newTimeLeft[key] = { "1min": 60, "3min": 180, "5min": 300, "10min": 600 }[key];

            // Check if the API for this key has already been called
            const apiCalledKey = `apiCalled-${key}`;
            const apiCalled = sessionStorage.getItem(apiCalledKey);

            if (!apiCalled) {
              // Generate a new period
              const newPeriod = generateNewPeriod(key);
              setPeriods((prevPeriods) => ({ ...prevPeriods, [key]: newPeriod }));

              // Call the COLOR_RESULT API
              ColorResultAPI(newPeriod, key);

              // Mark API as called for this cycle
              sessionStorage.setItem(apiCalledKey, "true");

              // Reset API call flag after a new timer cycle starts
              setTimeout(() => {
                sessionStorage.removeItem(apiCalledKey);
              }, newTimeLeft[key] * 1000);
            }
          }
        }
        // Update session storage for the current time
        sessionStorage.setItem(`lastSavedTime-${key}`, currentTime.toString());
      });

      // Update session storage for timeLeft
      sessionStorage.setItem("timeLeft", JSON.stringify(newTimeLeft));
      return newTimeLeft;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [periods]);
  
  useEffect(() => {
    Object.keys(timeLeft).forEach((key) => {
      if (timeLeft[key] === 0) {
        setIsDisabled((prev) => ({ ...prev, [key]: false })); // Re-enable buttons after timer resets
      } else if (timeLeft[key] === 10) {
        setIsDisabled((prev) => ({ ...prev, [key]: true })); // Disable buttons when timer reaches 10 seconds
      }
    });
  }, [timeLeft]);

  // Function to call the COLOR_RESULT API
  const ColorResultAPI = async (period, mins) => {
    try {
      const payload = {
        period: period,
        mins: mins,
      };
  
      const response = await axios.post(COLOR_RESULT, payload);
      console.log(`API response for ${mins}:`, response.data);
  
      // Handle API response as needed
    } catch (error) {
      console.error(`Error calling COLOR_RESULT API for ${mins}:`, error);
    }
  };
  


 

// Timer for 1min table
useEffect(() => {
  const interval = setInterval(() => {
    setTimeLeft((prevTimeLeft) => {
      const newTimeLeft = { ...prevTimeLeft };

      if (newTimeLeft["1min"] === 0) {
        newTimeLeft["1min"] = 60;
        const newPeriod = generateNewPeriod("1min");
        setPeriods((prev) => ({ ...prev, "1min": newPeriod })); // Update period
        console.log("===========================");
          // Call the COLOR_RESULT API
      } else {
        newTimeLeft["1min"] -= 1;
      }
      sessionStorage.setItem('timeLeft', JSON.stringify(newTimeLeft));
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

 
// Fetch wallet details from API
const fetchWalletDetails = async () => {
  const userId = sessionStorage.getItem("userId"); // Get user ID from session storage
    try {
      const response = await axios.get(USER_WALLET_DETAILS(userId), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Find the CP balance in the response
      const cpBalance = response.data.find(item => item.cryptoname === "CP");
      console.log(cpBalance,);
      
      if (cpBalance) {
        setBalance(parseInt(cpBalance.balance, 10)); // Set the CP balance
      }
    } catch (error) {
      console.error("Error fetching wallet details:", error);
    }
  };

  useEffect(() => {
    if(update || balance === false){
     
      
      fetchWalletDetails();
    }
   // Fetch wallet details when the component mounts
  }, [update]);

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
    const handleGamePopUp = (data) => {
    // Check if userId is null or undefined
    if (!userid) {
      alert("Error: User not logged in. Please log in to proceed.");
      return; // Stop the function execution
    }
  
    const amount = data;
    const color = selectedColor; // Ensure this variable is defined and has a value
    let number = [];
    let smallBigValue = "";
  
    if (selectedTitle === "Join Green") {
      number = [2, 4, 5, 6, 8];
    } else if (selectedTitle === "Join Red") {
      number = [0, 1, 3, 7, 9];
    } else if (selectedTitle === "Join Violet") {
      number = [0, 5];
    } else if (smallBig === "small") {
      number = [0, 1, 2, 3, 4]; // Small numbers
      smallBigValue = "small";
    } else if (smallBig === "big") {
      number = [5, 6, 7, 8, 9]; // Big numbers
      smallBigValue = "big";
    } else {
      number = [parseInt(selectedTitle.split(" ")[1])];
    }
  
    const period = periods[activeTable]; // Ensure periods is defined
    const mins = activeTable; // Ensure activeTable is correctly defined
  
    const payload = {
      userid,
      amount,
      color,
      number,
      period,
      mins,
      small_big: smallBigValue,
    };
  
    console.log("Payload:====================", payload);
  
    // Call PREDICT_COLOR API
    axios
      .post(PREDICT_COLOR, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("API response:", response.data);
        // After successful prediction, update wallet balance
              // Deduct the amount from the current balance
              const newBalance = balance-parseInt(amount, 10);
              console.log("New Balance after deduction:", newBalance);
  
              // Prepare payload for wallet update  
              const updatePayload = {
                userId: userid,
                cryptoname: "CP",
                balance: newBalance.toString(),
              };
  
              console.log(updatePayload, "=====================");
              // Call SET_WALLET_DETAILS API to update the balance
              axios
                .put(SET_WALLET_DETAILS, updatePayload, {
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
                .then((updateResponse) => {
                  setUpdate(true)
                  window.location.reload();
                  console.log("Wallet updated successfully:", updateResponse.data);
              
                })
                .catch((updateError) => {
                  console.error("Error updating wallet:", updateError);
                });

          })
      
      .catch((error) => {
        console.error("Error calling PREDICT_COLOR API:", error);
      });
  };


  // Disable buttons and change color for the 1min table only after 30 seconds
  // useEffect(() => {
  //   if (timeLeft["1min"] === 10) {
  //     setIsDisabled((prev) => ({ ...prev, "1min": true })); // Disable 1min buttons
  //   } else if (timeLeft["1min"] === 60) {
  //     setIsDisabled((prev) => ({ ...prev, "1min": false })); // Re-enable 1min buttons
  //   }
  // }, [timeLeft["1min"]]);
  
  // useEffect(() => {
  //   if (timeLeft["3min"] === 10) {
  //     setIsDisabled((prev) => ({ ...prev, "3min": true })); // Disable 3min buttons
  //   } else if (timeLeft["3min"] === 180) {
  //     setIsDisabled((prev) => ({ ...prev, "3min": false })); // Re-enable 3min buttons
  //   }
  // }, [timeLeft["3min"]]);
  
  // useEffect(() => {
  //   if (timeLeft["5min"] === 10) {
  //     setIsDisabled((prev) => ({ ...prev, "5min": true })); // Disable 5min buttons
  //   } else if (timeLeft["5min"] === 300) {
  //     setIsDisabled((prev) => ({ ...prev, "5min": false })); // Re-enable 3min buttons
  //   }
  // }, [timeLeft["5min"]]);
  // Timer logic for 3min table 
  // useEffect(() => {
  //   if (timeLeft["10min"] === 10) {
  //     setIsDisabled((prev) => ({ ...prev, "10min": true })); // Disable 10min buttons
  //   } else if (timeLeft["10min"] === 600) {
  //     setIsDisabled((prev) => ({ ...prev, "10min": false })); // Re-enable 3min buttons
  //   }
  // }, [timeLeft["10min"]]);
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
 {/* Timer & Period */}
<div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-5xl mb-6">
  <div className="flex items-center mb-2 sm:mb-0">
    <span className="text-green-500 font-bold text-xl">🏆</span>
    <span className="text-lg font-bold mx-2">Period</span>
    <span
      className="text-white font-bold px-4 py-2 rounded"
      style={{ backgroundColor: "rgb(26, 61, 40)" }} // Desired color
    >
      {periods[activeTable]}
    </span>
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
          onClick={() => openPopup("Join Green", "#10B981")}
        >
          Join Green
        </button>
        <button
          className="px-2 py-1 rounded text-white"
          style={{
            background: isDisabled[activeTable] ? "rgb(169, 169, 169)" : "#8b5cf6",
          }}
          disabled={isDisabled[activeTable]}
          onClick={() => openPopup("Join Violet", "#8B1DBD")}
        >
          Join Violet
        </button>
        <button
          className="px-2 py-1 rounded text-white"
          style={{
            background: isDisabled[activeTable] ? "rgb(169, 169, 169)" : "#EF4444",
          }}
          disabled={isDisabled[activeTable]}
          onClick={() => openPopup("Join Red", "#EF4444")}
        >
          Join Red
        </button>
      </div>
  
      {/* Number Buttons */}
      <div className="grid grid-cols-5 sm:grid-cols-5 gap-2 w-full max-w-5xl mb-6">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
          let backgroundColor = "rgb(169, 169, 169)"; // Default gray if disabled
          let buttonTitle = `Number ${num} Selected`;

          if (!isDisabled[activeTable]) {
            if (num === 0) {
              backgroundColor = "linear-gradient(135deg, #ef4444 50%, #8b5cf6 50%)"; // Red & Violet
            } else if (num === 5) {
              backgroundColor = "linear-gradient(135deg, #10B981 50%, #8b5cf6 50%)"; // Green & Violet
            } else if (num % 2 === 0) {
              backgroundColor = "#10B981"; // Green for even numbers
            } else {
              backgroundColor = "#EF4444"; // Red for odd numbers
            }
          }
  
          return (
            <button
              key={num}
              className="px-2 py-1 rounded text-white w-full"
              style={{ background: backgroundColor }}
              disabled={isDisabled[activeTable]}
              onClick={() => openPopup(buttonTitle, backgroundColor)}
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
            onClick={() => {
              setSmallBig("big"); // Set smallBig to 'big'
              openPopup("Big Selected", "#EF4444");
             
            }}
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
            onClick={() => {
              setSmallBig("small"); // Set smallBig to 'small'
              openPopup("Small Selected", "#10B981");
            
            }}
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
                          backgroundColor: "#10B981",
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
     {/* Game Popup Component */}
     {modalOpen && (
        <GamePopup modalOpen={modalOpen} toggleModal={toggleModal} title={selectedTitle} color={selectedColor} sendData={handleGamePopUp} balance = {balance} setBalance ={setBalance} />
      )}
    </div>
  );
  
  
};

export default ColorGamesComponent;

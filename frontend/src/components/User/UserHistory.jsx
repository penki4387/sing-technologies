import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios"; // Import axios
import { USER_HISTORY } from "../../constants/apiEndpoints"; // Assuming this is defined

const HIstoryComponent = () => {
  const [activeTable, setActiveTable] = useState("History");
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]); // State to store the fetched data
  const [userId, setUserId] = useState(null);
  const isFetchedRef = useRef(false);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    if (storedUserId && !isFetchedRef.current) {
      isFetchedRef.current = true; // Mark API call as done
      fetchUserHistory(storedUserId);
    }
  }, []);

  // Function to fetch user history from the API using axios
  const fetchUserHistory = async (id) => {
    try {
      const response = await axios.get(USER_HISTORY(id));
      const updatedData = response.data.map((row) => {
        // Determine color based on gradient or number
        if (
          row.color === "linear-gradient(135deg, #ef4444 50%, #8b5cf6 50%)" ||
          row.number === 0
        ) {
          return { ...row, color: "#8B5CF6 + #EF4444" };
        } else if (
          row.color === "linear-gradient(135deg, #10B981 50%, #8b5cf6 50%)" ||
          row.number === 5
        ) {
          return { ...row, color: "#8B5CF6 + #10B981" };
        }
        return row;
      });
      setTableData(updatedData);
    } catch (error) {
      console.error("Error fetching user history:", error);
    }
  };

  const recordsPerPage = 10;
  const totalPages = Math.ceil(tableData.length / recordsPerPage);

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

  const currentRecords = tableData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  return (
    <div className="min-h-screen text-white flex flex-col items-center p-4">
      <div className="w-full max-w-5xl">
        <h2 className="text-lg font-bold mb-2 flex justify-center items-center gap-2">
          <span className="text-green-500 text-xl">🏆</span>
          {activeTable}
        </h2>
        <table className="table-auto w-full border border-gray-700 mb-4">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-4 py-2">Period</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Number</th>
              <th className="px-4 py-2">Color</th>
              <th className="px-4 py-2">mins</th>
              <th className="px-4 py-2">Small&Big</th>
              <th className="px-4 py-2">win_or_lose</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((row, index) => (
              <tr key={index} className="text-center">
                <td className="px-4 py-2">{row.period}</td>
                <td className="px-4 py-2">{row.amount}</td>
                <td className="px-4 py-2">{row.number}</td>
                <td className="px-4 py-2">
                  {row.color.includes("+") ? (
                    row.color.split("+").map((color, idx) => (
                      <React.Fragment key={idx}>
                        {idx > 0 && <span> + </span>}
                        <span
                          style={{
                            display: "inline-block",
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            backgroundColor: color,
                          }}
                        ></span>
                      </React.Fragment>
                    ))
                  ) : (
                    <span
                      style={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: row.color,
                      }}
                    ></span>
                  )}
                </td>
                <td className="px-4 py-2">{row.mins}</td>
                <td className="px-4 py-2">{row.small_big}</td>
                <td className="px-4 py-2">{row.win_or_lose}</td>
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

export default HIstoryComponent;

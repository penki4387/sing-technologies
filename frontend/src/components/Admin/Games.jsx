import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, } from "../../constants/config";
import {GET_ALL_GAMES, ADD_GAME, UPDATE_GAME, DELETE_GAME} from "../../constants/apiEndpoints";

import { FaEdit, FaTrash } from "react-icons/fa";
import "./UserDashboard.css"
const Games = () => {
    const [games, setGames] = useState([]);
    const [formData, setFormData] = useState({
        id: null,
        name: "",
        popularity: "",
        description: "",
        image: null,
        type: ""
    });
    const [editing, setEditing] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const gamesPerPage = 10; // Number of games per page
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);



    const fetchGames = async () => {
        try {
            const response = await axios.get(GET_ALL_GAMES);
            if (response.data && response.data.length > 0) {
                setGames(response.data);
            } else {
                console.log("No games found!");
                setGames([]); // Handle gracefully
            }
        } catch (err) {
            console.error("Failed to fetch games:", err);
        }
    };

    const totalPages = Math.ceil(games.length / gamesPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };



    const updateScrollButtons = (containerId) => {
        const container = document.getElementById(containerId);
        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth);
    };

    

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("name", formData.name);
        data.append("popularity", formData.popularity);
        data.append("description", formData.description);
        data.append("type", formData.type);
        if (formData.image) data.append("image", formData.image);

        try {
            if (editing) {
                await axios.put(`${UPDATE_GAME(formData.id)}`, data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                alert("Game updated successfully");
            } else {
                await axios.post(ADD_GAME, data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                alert("Game created successfully");
            }
            fetchGames();
            resetForm();
            setShowForm(false);
        } catch (error) {
            console.error("Error submitting game:", error);
        }
    };

    const handleEdit = (game) => {
        console.log(game, "game")
        setFormData({
            id: game.id,
            name: game.name,
            popularity: game.popularity,
            description: game.description,
            image: game.image.startsWith('./') ? game.image : `${BASE_URL}/uploads/${game.image}`,
            type: game.type
        });
        setEditing(true);
        setShowForm(true);
    };


    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this game?")) {
            try {
                await axios.delete(DELETE_GAME(id));
                alert("Game deleted successfully");
                fetchGames();
            } catch (error) {
                console.error("Error deleting game:", error);
            }
        }
    };

    const resetForm = () => {
        setFormData({
            id: null,
            name: "",
            popularity: "",
            description: "",
            image: null,
            type: ""
        });
        setEditing(false);
        setShowForm(false); // Ensure the form closes on reset
    };


    useEffect(() => {
        fetchGames();
    }, []);

    return (
        <div className="h-full no-scrollbar bg-gray-200 rounded-lg shadow-md" >{/* style={{ backgroundColor: "rgba(21,49,32,255)" }} */}
            {games.length > 0 && !showForm && (
                <div className="block right-0 top-20 fixed">
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Add a New Game
                    </button>
                </div>
            )}
            <h1 className="text-2xl font-bold text-black my-4 flex justify-center items-center">
                Games Management
            </h1>


            {/* Form Section */}
            {(games.length === 0 || showForm) && (
                <form
                    onSubmit={handleFormSubmit}
                    className="bg-white shadow rounded-lg p-6 mb-6 max-w-md mx-auto relative"
                >
                    {/* Close Button */}
                    <button
                        type="button"
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowForm(false)}
                    >
                        ✕
                    </button>

                    {/* Game Name Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Game Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData?.name}
                            onChange={handleInputChange}
                            placeholder="Enter game name"
                            className="w-full p-3 text-black border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                            required
                        />
                    </div>

                    {/* Popularity Field */}
                    <div className="mb-4">
                        <label className="block text-black font-medium mb-2">Popularity</label>
                        <input
                            type="text"
                            name="popularity"
                            value={formData?.popularity}
                            onChange={handleInputChange}
                            placeholder={formData.popularity}
                            className="w-full p-3 text-black border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                            required
                        />
                    </div>

                    {/* I want type of be Select with two options "Casino" and "Sport" */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Type</label>
                        <select
                            name="type"
                            value={formData?.type}
                            onChange={handleInputChange}
                            className="w-full p-3 text-black border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                            placeholder={formData.type}
                            required
                        >
                            <option value="Casino">Casino</option>
                            <option value="Sport">Sport</option>
                        </select>   
            
                    </div>
                    


                    {/* Description Field */}
                    <div className="mb-4">
                        <label className="block text-black font-medium mb-2">Description</label>

                        <textarea
                            name="description"
                            value={formData?.description}
                            onChange={handleInputChange}
                            placeholder="Enter description"
                            className="w-full p-3 text-black border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                            required
                        ></textarea>
                    </div>

                    {/* Image Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Image</label>
                        {/* Show Current Image if Editing */}
                        {editing && formData.image && typeof formData.image === "string" && (
                            <div className="mb-2">
                                <img
                                    src={formData.image}
                                    alt="Current game"
                                    className="w-10 object-cover rounded"
                                />
                                <p className="text-sm text-gray-600">Current Image</p>
                            </div>
                        )}
                        <input
                            type="file"
                            name="image"
                            onChange={handleInputChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-green-50 file:text-green-600 hover:file:bg-green-100"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            {editing ? "Update Game" : "Add Game"}
                        </button>
                        {editing && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>

            )}

            {/* Game List Section */}
            <div className="flex justify-center w-full mt-5">
                {!editing && !showForm && (
                    <div>
                        {games && games.length > 0 ? (
                            <div className="overflow-x-auto no-scrollbar">
                                <table className="table-auto w-full bg-gray-800 text-white border-collapse border border-gray-700 rounded-lg">
                                    <thead>
                                        <tr>
                                            <th className="border border-gray-700 px-4 py-2">Image</th>
                                            <th className="border border-gray-700 px-4 py-2">Name</th>
                                            <th className="border border-gray-700 px-4 py-2">Game Type</th>
                                            <th className="border border-gray-700 px-4 py-2">Popularity</th>
                                            <th className="border border-gray-700 px-4 py-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentGames.map((game, index) => (
                                            <tr key={index} className="hover:bg-gray-700">
                                                {/* Game Image */}
                                                <td className="border border-gray-700 px-4 py-1">
                                                    <img
                                                        src={game.image.startsWith('./') ? game.image : `${BASE_URL}/uploads/${game.image}`}
                                                        alt={game.name}
                                                        className="w-12 h-12 object-cover rounded-lg"
                                                    />
                                                </td>

                                                {/* Game Name */}
                                                <td className="border border-gray-700 px-4 py-1 text-center">
                                                    <p className="text-lg font-semibold">{game.name}</p>
                                                </td>
                                                <td className="border border-gray-700 px-4 py-1 text-center">
                                                    <p className="text-lg font-semibold">{game.type}</p>
                                                </td>
                                                <td className="border border-gray-700 px-4 py-1 text-center">
                                                    <p className="text-lg font-semibold">{game.popularity}</p>
                                                </td>

                                                {/* Action Buttons */}
                                                <td className="border border-gray-700 px-4 py-1 text-center">
                                                    <div className="flex justify-center gap-4">
                                                        {/* Edit Button */}
                                                        <button
                                                            onClick={() => handleEdit(game)}
                                                            className="text-blue-500 hover:text-blue-700 transition"
                                                        >
                                                            <FaEdit size={20} />
                                                        </button>

                                                        {/* Delete Button */}
                                                        <button
                                                            onClick={() => handleDelete(game.id)}
                                                            className="text-red-500 hover:text-red-700 transition"
                                                        >
                                                            <FaTrash size={20} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Pagination Buttons */}
                                <div className="flex justify-center mt-2 gap-4 mb-2">
                                    <button
                                        onClick={handlePreviousPage}
                                        disabled={currentPage === 1}
                                        className={`px-2 py-1 rounded-lg ${currentPage === 1 ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                                    >
                                        Previous
                                    </button>
                                    <span className="mt-1">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <button
                                        onClick={handleNextPage}
                                        disabled={currentPage === totalPages}
                                        className={`px-2 py-1 rounded-lg ${currentPage === totalPages ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p className="text-center text-gray-400">No games available</p>
                        )}
                    </div>
                )}
            </div>

        </div>
    );
};

export default Games;

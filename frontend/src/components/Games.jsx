import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/config";
import Carousel from "./Carousel";
import { FaEdit, FaTrash } from "react-icons/fa";
const Games = () => {
    const [games, setGames] = useState([]);
    const [formData, setFormData] = useState({
        id: null,
        name: "",
        popularity: "",
        description: "",
        image: null,
    });
    const [editing, setEditing] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const fetchGames = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/games/allgames');
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


    const updateScrollButtons = (containerId) => {
        const container = document.getElementById(containerId);
        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth);
    };

    const scrollGames = (direction) => {
        const container = document.getElementById("gamesContainer");
        const scrollAmount = 200;
        if (direction === "left") container.scrollLeft -= scrollAmount;
        else container.scrollLeft += scrollAmount;
        updateScrollButtons("gamesContainer");
    };

    useEffect(() => {
        updateScrollButtons("gamesContainer");
    }, [games]);

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
        if (formData.image) data.append("image", formData.image);

        try {
            if (editing) {
                await axios.put(`${BASE_URL}/api/games/updategame/${formData.id}`, data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                alert("Game updated successfully");
            } else {
                await axios.post(`${BASE_URL}/api/games/addgame`, data, {
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
            image: game.image.startsWith('./') ? game.image : `${BASE_URL}/uploads/${game.image}`
        });
        setEditing(true);
        setShowForm(true);
    };


    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this game?")) {
            try {
                await axios.delete(`${BASE_URL}/api/games/deletegame/${id}`);
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
        });
        setEditing(false);
        setShowForm(false); // Ensure the form closes on reset
    };


    useEffect(() => {
        fetchGames();
    }, []);

    return (
        <div className="h-full" style={{ backgroundColor: "rgba(21,49,32,255)" }}>
            {games.length > 0 && !showForm && (
                <div className="block right-0 top-20 fixed">
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Add a New Game
                    </button>
                </div>
            )}
            <h1 className="text-2xl font-bold text-white mb-20 flex justify-center items-center">
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
            <div>
                {!editing && !showForm && (
                    <Carousel
                        items={games}
                        containerId="gamesContainer"
                        scrollFunction={scrollGames}
                        renderItem={(game, index) => (
                            <div key={index} className="min-w-[15%] relative rounded-lg overflow-hidden bg-gray-800 hover:scale-105 transition duration-300">
                                {/* Game Image */}
                                <img
                                    src={game.image.startsWith('./') ? game.image : `${BASE_URL}/uploads/${game.image}`}
                                    alt={game.name}
                                    className="w-full h-32 object-cover"
                                />

                                {/* Game Details Overlay */}
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-between p-4">
                                    {/* Game Name */}
                                    <p className="text-lg font-bold text-white text-center">{game.name}</p>


                                    <div className="flex justify-between ">

                                        <button
                                            onClick={() => handleEdit(game)}
                                            className=""
                                        >
                                            <FaEdit />

                                        </button>

                                        {/* Delete Button */}
                                        <button
                                            onClick={() => handleDelete(game.id)}
                                            className="text-red"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    />

                )}



            </div>
        </div>
    );
};

export default Games;

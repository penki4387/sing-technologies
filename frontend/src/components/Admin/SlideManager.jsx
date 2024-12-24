import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/config";
import { GET_ALL_SLIDERS, ADD_SLIDER, UPDATE_SLIDER, DELETE_SLIDER } from "../../constants/apiEndpoints";

const SliderManager = () => {
  const [sliders, setSliders] = useState([]);
  const [newSlider, setNewSlider] = useState({ title: "", image: null });
  const [editingId, setEditingId] = useState(null);
  const [editingSlider, setEditingSlider] = useState({ title: "", image: null });
  const [message, setMessage] = useState({message:"",type:""});

  // Fetch sliders from API
  const fetchSliders = async () => {
    try {
      const response = await axios.get(GET_ALL_SLIDERS);
      setSliders(response.data);
      setMessage({message:" All Sliders Fetched successfully",type:"Success"});;
      setTimeout(() => {
        setMessage({message:"",type:""});
          
      }, 3000);
    } catch (error) {
      console.error("Error fetching sliders:", error);
      setMessage({message:"Error fetching sliders",type:"Error"});
    }
  };

  // Create a new slider
  const createSlider = async () => {
    if (!newSlider.title || !newSlider.image) {
      alert("Please provide both title and image.");
      return;
    }
    const formData = new FormData();
    formData.append("title", newSlider.title);
    formData.append("image", newSlider.image);

    try {
      await axios.post(ADD_SLIDER, formData);
      setMessage({message:"Slider created successfully",type:"Success"});
      setTimeout(() => {
        setMessage({message:"",type:""});
          
      }, 3000);
      setNewSlider({ title: "", image: null });
      fetchSliders();
    } catch (error) {
      console.error("Error creating slider:", error);
      setMessage({message:"Error creating slider",type:"Error"});
      setTimeout(() => {
        setMessage({message:"",type:""});
          
      }, 3000);
    }
  };

  // Update a slider
  const updateSlider = async (id) => {
    const formData = new FormData();
    formData.append("title", editingSlider.title);
    if (editingSlider.image) {
      formData.append("image", editingSlider.image);
    }

    try {
      await axios.put(UPDATE_SLIDER(id), formData);
      setMessage({message:"Slider updated successfully",type:"Success"});
      setTimeout(() => {
        setMessage({message:"",type:""});
          
      }, 3000);
      setEditingId(null);
      setEditingSlider({ title: "", image: null });
      fetchSliders();
    } catch (error) {
      console.error("Error updating slider:", error);
      setMessage({message:"Error updating slider",type:"Error"});
      setTimeout(() => {
        setMessage({message:"",type:""});
          
      }, 3000);
    }
  };

  // Delete a slider
  const deleteSlider = async (id) => {
    try {
      await axios.delete(DELETE_SLIDER(id));
      setMessage({message:"Slider deleted successfully",type:"Success"});
      setTimeout(() => {
        setMessage({message:"",type:""});
          
      }, 3000);
      fetchSliders();
    } catch (error) {
      console.error("Error deleting slider:", error);
      setMessage({message:"Error deleting slider",type:"Error"});
      setTimeout(() => {
        setMessage({message:"",type:""});
          
      }, 3000);
    }
  };

  // Handle image upload for new slider
  const handleNewImageUpload = (e) => {
    setNewSlider({ ...newSlider, image: e.target.files[0] });
  };

  // Handle image upload for editing slider
  const handleEditImageUpload = (e) => {
    setEditingSlider({ ...editingSlider, image: e.target.files[0] });
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  return (
    <div className="container mx-auto p-4">
                <h1  className={message.type === "Success" ? " flex text-green-500 text-md font-bold mb-2 items-center justify-center" : " flex text-md font-bold mb-2 text-red-500 items-center justify-center"}>{message.message}</h1>

        <div className="flex  justify-center">
        <h1 className="text-2xl font-bold mb-4">Slider Manager</h1>
        </div>
      

      {/* Create New Slider */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Create New Slider</h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Title"
            value={newSlider.title}
            onChange={(e) => setNewSlider({ ...newSlider, title: e.target.value })}
            className="border border-gray-300 rounded-md p-2 flex-grow"
          />
          <input
            type="file"
            onChange={handleNewImageUpload}
            className="border border-gray-300 rounded-md p-2"
          />
          <button
            onClick={createSlider}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>

      {/* List of Sliders */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Slider List</h2>
        <div className="overflow-x-auto">
            {sliders.length === 0 ? (
              <p>No sliders found.</p>
            ) : (
                <table className="w-full text-left border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Image</th>
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sliders.map((slider, index) => (
                <tr key={slider.id}>
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={`${BASE_URL}/uploads/${slider.image}`}
                      alt={slider.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {editingId === slider.id ? (
                      <input
                        type="text"
                        value={editingSlider.title}
                        onChange={(e) =>
                          setEditingSlider({ ...editingSlider, title: e.target.value })
                        }
                        className="border border-gray-300 rounded-md p-2"
                      />
                    ) : (
                      slider.title
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 space-x-2">
                    {editingId === slider.id ? (
                      <>
                        <input
                          type="file"
                          onChange={handleEditImageUpload}
                          className="border border-gray-300 rounded-md p-2"
                        />
                        <button
                          onClick={() => updateSlider(slider.id)}
                          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditingId(slider.id);
                            setEditingSlider(slider);
                          }}
                          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteSlider(slider.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
                
            )}
          
        </div>
      </div>
    </div>
  );
};

export default SliderManager;

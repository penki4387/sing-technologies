import { useEffect,useState } from "react";
import axios from "axios";
import { GET_ALL_USERS, GET_ALL_GAMES } from "../constants/apiEndpoints";
import AdminBankAccountslist from "./AdminBankAccountslist";
const AdminHome = () => {

    const [users,setUsers] = useState([]);
    const[games,setGames] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(GET_ALL_USERS);
                setUsers(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        const fetchGames = async () => {
            try {
                const response = await axios.get(GET_ALL_GAMES);
                setGames(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchUsers();
        fetchGames();
    }, []);
    return (
        <div>
            < div className="mt-8 w-full max-w-6xl gap-10" >
                

                {/* Card Container */}
                < div className="flex gap-4 justify-center" >
                    {/* Card 1: $10m Christmas Race */}
                    < div className="bg-gray-800 flex-1 rounded-lg p-4 flex flex-col justify-between" >
                        {/* Card Header */}



                        < div className="flex justify-between items-center mt-2" >


                            <div>
                                <h3 className="text-white text-lg font-semibold">Users</h3>
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
                                        
                                        style={{ strokeDasharray: "95", strokeDashoffset: "2" }} // Adjust progress dynamically
                                    />
                                </svg>
                                <p className="absolute inset-0 flex items-center justify-center text-white text-2xl bold">
                                    {users.length}
                                </p>
                            </div>
                        </div >


                        {/* Footer */}
                        < div className="flex items-center mt-4" >
                            <span className="text-gray-400 text-sm flex items-center gap-2">
                                <i className="text-white">ℹ️</i> Not entered yet
                            </span>
                        </div >
                    </div >

                    {/* Card 2: $75k Weekly Raffle */}
                    < div className="bg-gray-800 flex-1 rounded-lg p-4 flex flex-col justify-between" >
                        {/* Card Header */}


                        {/* Center Content */}
                        <div className="flex justify-between items-center mt-2">
                            {/* Circular Progress */}

                            <div>
                                <h3 className="text-white text-lg font-semibold">Games</h3>
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
                                    {games.length}
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

                    </div >
                </div >
                <AdminBankAccountslist/>
               </div>

</div>
            )
};


            export default AdminHome
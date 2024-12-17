import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserDashboard from "../components/UserDashboard";
import BankAccountManager from "../components/BankAccountManager";
import UserSettings from "../components/UserSettings";
import KYCManager from "../components/KYCManager";

const Homepage = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");
  const [selectedGame, setSelectedGame] = useState(null);
  const [isGamesOpen, setIsGamesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedProfileItem, setSelectedProfileItem] = useState(null);
  const [hoverSidebarElement, setHoverSidebarElement] = useState(null);

  const navigate = useNavigate();

  const renderComponent = () => {
    switch (activeComponent) {
      case "dashboard":
        return <UserDashboard />;
      case "games":
        switch (selectedGame) {
          case "gameTypeA":
            return <div>Game Type A Content</div>;
          case "gameTypeB":
            return <div>Game Type B Content</div>;
          default:
            return <div>Select a game to view details.</div>;
        }
      case "profile":
        switch (selectedProfileItem) {
          case "profileTypeA":
            return <KYCManager/>;
          case "profileTypeB":
            return <BankAccountManager/>;
          case "profileTypeC":
            return <UserSettings/>;
          default:
            return <div>Select a profile item to view details.</div>;
        }
      case "settings":
        return <div>Settings Page</div>;
      default:
        return <UserDashboard />;
    }
  };

  return (
    <div className="flex h-100" style={{ backgroundColor: "rgba(21, 49, 32, 255)" }}>
      {/* Sidebar */}
      <aside
        className="w-[20%] text-white flex flex-col h-screen fixed top-20 left-0"
        style={{ backgroundColor: "rgba(41, 69, 52, 255)" }}
      >
        <h2 className="text-xl font-bold py-4 px-6 my-2 mx-4" style={{ backgroundColor: "rgba(51, 79, 62, 255)" }}>
          User Dashboard
        </h2>
        <nav className="flex-1">
          <ul className="flex flex-col rounded-lg shadow-md p-2 mx-4 my-0" style={{ backgroundColor: "rgba(51, 79, 62, 255)" }}>
            <li>
              <button
                onClick={() => setActiveComponent("dashboard")}
                className="w-full text-center py-3 px-6"
                style={{
                  backgroundColor: hoverSidebarElement === "Dashboard" ? "rgba(61, 89, 72, 255)" : "rgba(51, 79, 62, 255)",
                }}
                onMouseEnter={() => setHoverSidebarElement("Dashboard")}
                onMouseLeave={() => setHoverSidebarElement(null)}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setIsGamesOpen((prev) => !prev);
                  setActiveComponent("games");
                }}
                className="w-full text-center py-3 px-6"
                style={{
                  backgroundColor: hoverSidebarElement === "Games" ? "rgba(61, 89, 72, 255)" : "rgba(51, 79, 62, 255)",
                }}
                onMouseEnter={() => setHoverSidebarElement("Games")}
                onMouseLeave={() => setHoverSidebarElement(null)}
              >
                Games {isGamesOpen ? "▾" : "▸"}
              </button>
              <ul
                className="overflow-hidden transition-all duration-300"
                style={{
                  height: isGamesOpen ? `${2 * 40}px` : "0",
                  backgroundColor: "rgba(51, 79, 62, 255)",
                }}
              >
                <li>
                  <button
                    onClick={() => setSelectedGame("gameTypeA")}
                    className="block w-full text-center py-1 px-4"
                    style={{
                      backgroundColor: hoverSidebarElement === "Game Type A" ? "rgba(61, 89, 72, 255)" : "rgba(51, 79, 62, 255)",
                    }}
                    onMouseEnter={() => setHoverSidebarElement("Game Type A")}
                    onMouseLeave={() => setHoverSidebarElement(null)}
                  >
                    Color Games
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setSelectedGame("gameTypeB")}
                    className="block w-full text-center py-1 px-4"
                    style={{
                      backgroundColor: hoverSidebarElement === "Game Type B" ? "rgba(61, 89, 72, 255)" : "rgba(51, 79, 62, 255)",
                    }}
                    onMouseEnter={() => setHoverSidebarElement("Game Type B")}
                    onMouseLeave={() => setHoverSidebarElement(null)}
                  >
                    Normal Games
                  </button>
                </li>
              </ul>
            </li>
            <li>
              <button
                onClick={() => setActiveComponent("settings")}
                className="w-full text-center py-3 px-6"
                style={{
                  backgroundColor: hoverSidebarElement === "Settings" ? "rgba(61, 89, 72, 255)" : "rgba(51, 79, 62, 255)",
                }}
                onMouseEnter={() => setHoverSidebarElement("Settings")}
                onMouseLeave={() => setHoverSidebarElement(null)}
              >
                Settings
              </button>
            </li>
            <li>
              <button
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className="w-full text-center py-3 px-6"
                style={{
                  backgroundColor: hoverSidebarElement === "Profile" ? "rgba(61, 89, 72, 255)" : "rgba(51, 79, 62, 255)",
                }}
                onMouseEnter={() => setHoverSidebarElement("Profile")}
                onMouseLeave={() => setHoverSidebarElement(null)}
              >
                Profile {isProfileOpen ? "▾" : "▸"}
              </button>
              <ul
                className="overflow-hidden transition-all duration-300"
                style={{
                  height: isProfileOpen ? `${3 * 40}px` : "0",
                  backgroundColor: "rgba(51, 79, 62, 255)",
                }}
              >
                <li>
                  <button
                    onClick={() => {
                      setSelectedProfileItem("profileTypeA");
                      setActiveComponent("profile");
                    }}
                    className="block w-full text-center py-1 px-4"
                    style={{
                      backgroundColor: hoverSidebarElement === "Profile Type A" ? "rgba(61, 89, 72, 255)" : "rgba(51, 79, 62, 255)",
                    }}
                    onMouseEnter={() => setHoverSidebarElement("Profile Type A")}
                    onMouseLeave={() => setHoverSidebarElement(null)}
                  >
                    KYC
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setSelectedProfileItem("profileTypeB");
                      setActiveComponent("profile");
                    }}
                    className="block w-full text-center py-1 px-4"
                    style={{
                      backgroundColor: hoverSidebarElement === "Profile Type B" ? "rgba(61, 89, 72, 255)" : "rgba(51, 79, 62, 255)",
                    }}
                    onMouseEnter={() => setHoverSidebarElement("Profile Type B")}
                    onMouseLeave={() => setHoverSidebarElement(null)}
                  >
                    Bank Account
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setSelectedProfileItem("profileTypeC");
                      setActiveComponent("profile");
                    }}
                    className="block w-full text-center py-1 px-4"
                    style={{
                      backgroundColor: hoverSidebarElement === "Profile Type C" ? "rgba(61, 89, 72, 255)" : "rgba(51, 79, 62, 255)",
                    }}
                    onMouseEnter={() => setHoverSidebarElement("Profile Type C")}
                    onMouseLeave={() => setHoverSidebarElement(null)}
                  >
                    Settings
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className="flex-1 p-6 ml-[20%] overflow-y-auto mt-20 h-screen "
        style={{ backgroundColor: "rgba(21,49,32,255)" }}
      >
        {renderComponent()}
      </main>
    </div>
  );
};

export default Homepage;

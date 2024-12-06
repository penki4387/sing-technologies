import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserDashboard from "../components/UserDashboard";

const Homepage = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");
  const [selectedGame, setSelectedGame] = useState(null);
  const [isGamesOpen, setIsGamesOpen] = useState(false);
  const [hoverSidebarElement, setHoverSidebarElement] = useState(null);

  const navigate = useNavigate;

  const renderComponent = () => {
    switch (activeComponent) {
      case "dashboard":
        return <div><UserDashboard /></div>;
      case "games":
        if (selectedGame === "gameTypeA") {
          return <div>Game Type A Content</div>;
        } else if (selectedGame === "gameTypeB") {
          return <div>Game Type B Content</div>;
        } else {
          return <div><UserDashboard /></div>;
        }
      case "bankAccounts":
        return <div>Bank Accounts Page</div>;
      case "settings":
        return <div>Settings Page</div>;
      default:
        return <UserDashboard />;
    }
  };

  return (
    <div className="flex h-100">
      {/* Sidebar */}
      <aside
        className="w-64 text-white flex flex-col h-100"
        style={{ backgroundColor: `rgba(41, 69, 52, 255)` }}
      >
        
        <h2 className="text-xl font-bold py-4 px-6 my-2 mx-4" style={{ backgroundColor: `rgba(51, 79, 62, 255)` }}>User Dashboard </h2>
        <nav className="flex-1">
          <ul
            className="flex flex-col rounded-lg shadow-md p-2 mx-4 my-0"
            style={{ backgroundColor: `rgba(51, 79, 62, 255)` }}
          >
            <li>
              <button
                onClick={() => setActiveComponent("dashboard")}
                className="w-full text-center py-3 px-6"
                style={{
                  backgroundColor:
                    hoverSidebarElement === "Dashboard"
                      ? `rgba(61, 89, 72, 255)`
                      : `rgba(51, 79, 62, 255)`,
                }}
                onMouseEnter={() => setHoverSidebarElement("Dashboard")}
                onMouseLeave={() => setHoverSidebarElement(null)}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setIsGamesOpen((prev) => !prev)}
                className="w-full text-center py-3 px-6"
                style={{
                  backgroundColor:
                    hoverSidebarElement === "Games"
                      ? `rgba(61, 89, 72, 255)`
                      : `rgba(51, 79, 62, 255)`,
                }}
                onMouseEnter={() => setHoverSidebarElement("Games")}
                onMouseLeave={() => setHoverSidebarElement(null)}
              >
                Games {isGamesOpen ? "▾" : "▸"}
              </button>
              {/* Dropdown Menu */}
              <ul
                className="overflow-hidden transition-all duration-300"
                style={{
                  height: isGamesOpen ? "80px" : "0", // Adjust based on item count
                  backgroundColor: `rgba(51, 79, 62, 255)`,
                }}
              >
                <li>
                  <button
                    onClick={() => {
                      setSelectedGame("gameTypeA");
                      setIsGamesOpen(false);
                    }}
                    className="block w-full text-center py-1 px-4"
                    style={{
                      backgroundColor:
                        hoverSidebarElement === "Game Type A"
                          ? `rgba(61, 89, 72, 255)`
                          : `rgba(51, 79, 62, 255)`,
                    }}
                    onMouseEnter={() => setHoverSidebarElement("Game Type A")}
                    onMouseLeave={() => setHoverSidebarElement(null)}
                  >
                    Color Games
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setSelectedGame("gameTypeB");
                      setIsGamesOpen(false);
                    }}
                    className="block w-full text-center py-1 px-4"
                    style={{
                      backgroundColor:
                        hoverSidebarElement === "Game Type B"
                          ? `rgba(61, 89, 72, 255)`
                          : `rgba(51, 79, 62, 255)`,
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
                  backgroundColor:
                    hoverSidebarElement === "Settings"
                      ? `rgba(61, 89, 72, 255)`
                      : `rgba(51, 79, 62, 255)`,
                }}
                onMouseEnter={() => setHoverSidebarElement("Settings")}
                onMouseLeave={() => setHoverSidebarElement(null)}
              >
                Settings
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveComponent("bankAccounts")}
                className="w-full text-center py-3 px-6"
                style={{
                  backgroundColor:
                    hoverSidebarElement === "bankAccounts"
                      ? `rgba(61, 89, 72, 255)`
                      : `rgba(51, 79, 62, 255)`,
                }}
                onMouseEnter={() => setHoverSidebarElement("bankAccounts")}
                onMouseLeave={() => setHoverSidebarElement(null)}
              >
                Bank Accounts
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className="flex-1 p-6"
        style={{ backgroundColor: "rgba(21,49,32,255)" }}
      >
        {renderComponent()}
      </main>
    </div>
  );
};

export default Homepage;

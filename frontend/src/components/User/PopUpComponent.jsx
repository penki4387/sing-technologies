import React, { useState } from "react";

const PopupComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(10);
  const [quantity, setQuantity] = useState(1);
  const [balance, setBalance] = useState(50); // Example balance
  const [isChecked, setIsChecked] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleAmountClick = (amount) => {
    setSelectedAmount(amount);
  };

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity(quantity + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const totalContractMoney = selectedAmount * quantity;

  return (
    <div>
      <button onClick={togglePopup} style={{ padding: "10px 20px", backgroundColor: "purple", color: "white", border: "none", borderRadius: "5px" }}>
        Join Violet
      </button>

      {isOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ width: "500px", backgroundColor: "white", borderRadius: "10px", overflow: "hidden" }}>
            <div style={{ backgroundColor: "purple", color: "white", padding: "15px", textAlign: "center", fontSize: "18px" }}>
              Join Violet
            </div>
            <div style={{ padding: "20px" }}>
              <div style={{ marginBottom: "15px" }}>
                <div style={{ marginBottom: "10px", fontWeight: "bold" }}>Contract Money</div>
                <div style={{ display: "flex", gap: "10px" }}>
                  {[10, 100, 1000, 10000].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleAmountClick(amount)}
                      style={{
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "5px",
                        backgroundColor: selectedAmount === amount ? "green" : "#f0f0f0",
                        color: selectedAmount === amount ? "white" : "black",
                      }}
                    >
                      {amount}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <div style={{ marginBottom: "10px", fontWeight: "bold" }}>Number</div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button
                    onClick={() => handleQuantityChange("decrement")}
                    style={{ padding: "5px 10px", border: "1px solid #ccc", borderRadius: "5px" }}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("increment")}
                    style={{ padding: "5px 10px", border: "1px solid #ccc", borderRadius: "5px" }}
                  >
                    +
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: "15px", color: totalContractMoney > balance ? "red" : "black" }}>
                {totalContractMoney > balance ? "Balance is not enough." : ""}
                <div>Total contract money is {totalContractMoney}</div>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    style={{ marginRight: "10px" }}
                  />
                  I agree <span style={{ color: "red" }}>PRESALE RULE</span>
                </label>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  onClick={togglePopup}
                  style={{ padding: "10px 20px", border: "none", backgroundColor: "#f0f0f0", borderRadius: "5px" }}
                >
                  CANCEL
                </button>
                <button
                  disabled={!isChecked || totalContractMoney > balance}
                  style={{
                    padding: "10px 20px",
                    border: "none",
                    backgroundColor: !isChecked || totalContractMoney > balance ? "#ccc" : "green",
                    color: "white",
                    borderRadius: "5px",
                  }}
                >
                  CONFIRM
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupComponent;

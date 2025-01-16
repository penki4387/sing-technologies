import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PresaleRuleContent from './PreSaleRuleContent';  // Import the presale rule content
import axios from "axios"; // Import axios
import { PREDICT_COLOR } from "../../constants/apiEndpoints"; // Assuming this is defined

const GamePopup = ({ modalOpen, toggleModal, title, color }) => {
  const [amount, setAmount] = useState(50);
  const [balance, setBalance] = useState(50);
  const [isAgreed, setIsAgreed] = useState(false);
  const [error, setError] = useState("");
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false); // New state for second modal

  // Handle amount input change
  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    if (value < 10) {
      setError("Minimum amount should be 10 rupees.");
    } else {
      setError("");
    }
  };

  // Handle Confirm button click
  const handleConfirm = () => {
    if (amount < 10) {
      setError("Minimum amount should be 10 rupees.");
      return;
    }
    if (balance < amount) {
      setError("Balance is not enough.");
      return;
    }
    if (!isAgreed) {
      setError("You must agree to the presale rule.");
      return;
    }

    setBalance(balance - amount);
    alert(`Transaction successful! Amount: ₹${amount} for ${title}`);
    toggleModal(); // Close modal after transaction
  };

  // Open second modal when PRESALE RULE is clicked
  const handlePresaleRuleClick = () => {
    setIsSecondModalOpen(true); // Open second modal when PRESALE RULE is clicked
  };

  // Second modal (Presale Rule Info)
  const toggleSecondModal = () => {
    setIsSecondModalOpen(!isSecondModalOpen);
  };

  return (
    <>
      <Modal isOpen={modalOpen} toggle={toggleModal} centered>
        <ModalHeader toggle={toggleModal} style={{ background: color, color: "white" }}>
          {title}
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="amount">Enter Contract Money</Label>
            <Input
              type="number"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              min="10"
              placeholder="Enter amount (min 10)"
            />
          </FormGroup>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <p style={{ color: "green" }}>Total contract money is {amount || 0}</p>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                checked={isAgreed}
                onChange={() => setIsAgreed(!isAgreed)}
              />
              I agree
              <span 
                style={{ color: "red", cursor: "pointer" }} 
                onClick={handlePresaleRuleClick} // <-- Highlighted change
              >
                {" "}PRESALE RULE
              </span>
            </Label>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>CANCEL</Button>
          <Button color="success" onClick={handleConfirm}>CONFIRM</Button>
        </ModalFooter>
      </Modal>

      {/* Second Modal for Presale Rule (Make it larger) */}
      <Modal 
        isOpen={isSecondModalOpen} 
        toggle={toggleSecondModal} 
        centered 
        size="lg"  // <-- Highlighted change: size="lg" to make the modal large
      >
        <ModalHeader toggle={toggleSecondModal} style={{ background: color, color: "white" }}>
          PRESALE RULE
        </ModalHeader>
        <ModalBody>
          <PresaleRuleContent /> {/* Use the imported content */}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleSecondModal}>CLOSE</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default GamePopup;

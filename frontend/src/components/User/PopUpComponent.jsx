import { useState } from "react";

const ColorGamePopup = ({ walletBalance, onClose, onConfirm }) => {
  const [selectedAmount, setSelectedAmount] = useState(10);
  const [quantity, setQuantity] = useState(1);
  const [isAgreed, setIsAgreed] = useState(false);

  const totalContractMoney = selectedAmount * quantity;
  const isBalanceEnough = walletBalance >= totalContractMoney;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96">
        <div className="bg-green-500 text-white text-center py-2 text-lg font-semibold">
          Number 1 Selected
        </div>
        <div className="p-4">
          <p className="font-medium mb-2">Contract Money</p>
          <div className="flex gap-4 mb-4">
            {[10, 100, 1000, 10000].map((amount) => (
              <button
                key={amount}
                className={`px-4 py-2 rounded ${selectedAmount === amount ? "bg-green-500 text-white" : "bg-gray-200"}`}
                onClick={() => setSelectedAmount(amount)}
              >
                {amount}
              </button>
            ))}
          </div>

          <p className="font-medium mb-2">Number</p>
          <div className="flex items-center gap-2 mb-4">
            <button
              className="px-3 py-1 border rounded bg-gray-200"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              className="px-3 py-1 border rounded bg-gray-200"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>

          <p className="text-sm">
            Total contract money is <span className="text-green-500">{totalContractMoney}</span>
          </p>
          {!isBalanceEnough && (
            <p className="text-red-500 text-sm">Balance is not enough</p>
          )}

          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={() => setIsAgreed(!isAgreed)}
              className="mr-2"
            />
            <span>
              I agree <span className="text-red-500">PRESALE RULE</span>
            </span>
          </div>
        </div>

        <div className="flex border-t">
          <button
            className="w-1/2 py-2 text-center border-r hover:bg-gray-200"
            onClick={onClose}
          >
            CANCEL
          </button>
          <button
            className={`w-1/2 py-2 text-center ${isBalanceEnough && isAgreed ? "text-green-500" : "text-gray-400 cursor-not-allowed"}`}
            disabled={!isBalanceEnough || !isAgreed}
            onClick={() => isBalanceEnough && isAgreed && onConfirm(totalContractMoney)}
          >
            CONFIRM
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorGamePopup;

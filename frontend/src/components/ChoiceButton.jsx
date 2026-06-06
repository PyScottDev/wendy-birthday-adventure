import React from 'react';

export default function ChoiceButton({ choice, inventory, onClick }) {
  const isLocked = choice.requiredItem && !inventory.includes(choice.requiredItem);

  const handleClick = (e) => {
    if (isLocked) {
      e.preventDefault();
      return;
    }
    onClick(choice);
  };

  return (
    <button
      className={`choice-button ${isLocked ? 'locked' : 'active'}`}
      onClick={handleClick}
      disabled={isLocked}
      type="button"
    >
      <div className="ticket-edge-left"></div>
      <div className="ticket-body">
        <span className="choice-text">{choice.text}</span>
        {choice.requiredItem && (
          <span className="requirement-tag">
            {isLocked ? '🔒 Requires: ' : '🔓 Unlocked with: '}
            <strong className="item-highlight">{choice.requiredItem}</strong>
          </span>
        )}
      </div>
      <div className="ticket-edge-right"></div>
    </button>
  );
}

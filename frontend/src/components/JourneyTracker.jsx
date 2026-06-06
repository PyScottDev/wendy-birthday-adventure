import React from 'react';

export default function JourneyTracker({ visitedCount }) {
  // Let's scale the unique scenes to represent "doors discovered" out of 52.
  // Wendy has explored visitedCount distinct rooms. Since she wants to discover 52 doors,
  // we can show her progress beautifully, e.g., "3 of 52 Doors Opened"
  return (
    <div className="journey-tracker">
      <div className="tracker-header">
        <span className="tracker-icon">🚪</span>
        <span className="tracker-title">Doors Discovered</span>
      </div>
      <div className="tracker-progress">
        <span className="tracker-value">{visitedCount}</span>
        <span className="tracker-divider">/</span>
        <span className="tracker-total">52</span>
      </div>
      <div className="tracker-subtitle">
        Exploring the secret pathways of the Gielgud Theatre
      </div>
    </div>
  );
}

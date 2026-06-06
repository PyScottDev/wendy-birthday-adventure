import React, { useState, useEffect } from 'react';
import ChoiceButton from './ChoiceButton';

export default function StoryScene({ scene, inventory, onChoiceClick, recentlyAddedItem }) {
  const [imageError, setImageError] = useState(false);

  // Reset image error state whenever scene changes
  useEffect(() => {
    setImageError(false);
  }, [scene.id]);

  // Split text by double newlines to render as nice distinct paragraphs
  const paragraphs = scene.text.split('\n\n');

  return (
    <div className="story-scene-card">
      {recentlyAddedItem && (
        <div className="item-notification-banner animate-slide-in">
          <span className="banner-sparkle">✨</span>
          <span className="banner-text">
            Added to your prop table: <strong>{recentlyAddedItem}</strong>!
          </span>
          <span className="banner-sparkle">✨</span>
        </div>
      )}

      <div className="scene-image-container">
        {imageError ? (
          <div className="theatrical-image-placeholder">
            <div className="placeholder-curtains"></div>
            <div className="placeholder-spotlight"></div>
            <div className="placeholder-content">
              <span className="placeholder-icon">🎭</span>
              <span className="placeholder-scene-title">{scene.title}</span>
              <span className="placeholder-note">[ Photo Placeholder ]</span>
            </div>
          </div>
        ) : (
          <img
            src={scene.image}
            alt={scene.title}
            className="scene-image"
            onError={() => setImageError(true)}
          />
        )}
        <div className="scene-spotlight-glow"></div>
      </div>

      <div className="scene-content">
        <h2 className="scene-title">{scene.title}</h2>
        <div className="scene-text">
          {paragraphs.map((p, idx) => (
            <p key={idx} className="story-paragraph">
              {p}
            </p>
          ))}
        </div>
      </div>

      <div className="choices-section">
        <div className="choices-divider">
          <span className="divider-star">★</span>
          <span className="divider-label">Make Your Decision</span>
          <span className="divider-star">★</span>
        </div>
        <div className="choices-grid">
          {scene.choices.map((choice, index) => (
            <ChoiceButton
              key={index}
              choice={choice}
              inventory={inventory}
              onClick={onChoiceClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

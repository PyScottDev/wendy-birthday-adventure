import React, { useState } from 'react';

export default function EndingScreen({ scene, inventory, visitedCount, onRestart }) {
  const [imageError, setImageError] = useState(false);

  // Split text into paragraphs
  const paragraphs = scene.text.split('\n\n');

  // Map ending types to headers
  const getEndingTitle = (type) => {
    switch (type) {
      case 'best':
        return '🏆 Best Birthday Ending Reached!';
      case 'musical':
        return '🎭 The Theatrical Triumph Ending Reached!';
      case 'ghost':
        return '👻 The Spectral Standing Ovation Ending!';
      case 'cake':
        return '🎂 The Great Avant-Garde Cake Ending!';
      default:
        return '🎉 Happy 52nd Birthday, Wendy!';
    }
  };

  return (
    <div className="ending-container animate-fade-in">
      <div className="curtain-call-header">
        <h1 className="ending-banner-title">{getEndingTitle(scene.endingType)}</h1>
        <div className="curtain-ribbon"></div>
      </div>

      <div className="ending-layout-grid">
        {/* Left Side: Story text & Image */}
        <div className="ending-story-card">
          <div className="scene-image-container ending-image-container">
            {scene.video ? (
              <video
                src={scene.video}
                className="scene-video"
                controls
                playsInline
                preload="metadata"
                poster={scene.image}
              >
                Your browser does not support the video tag.
              </video>
            ) : imageError ? (
              <div className="theatrical-image-placeholder ending-placeholder">
                <div className="placeholder-curtains"></div>
                <div className="placeholder-spotlight"></div>
                <div className="placeholder-content">
                  <span className="placeholder-icon">⭐</span>
                  <span className="placeholder-scene-title">{scene.title}</span>
                  <span className="placeholder-note">[ Ending Photo ]</span>
                </div>
              </div>
            ) : (
              <>
                <img
                  src={scene.image}
                  alt={scene.title}
                  className="scene-image"
                  onError={() => setImageError(true)}
                />
                <div className="scene-spotlight-glow"></div>
              </>
            )}
          </div>

          <div className="ending-story-content">
            <h2 className="ending-scene-title">{scene.title}</h2>
            <div className="scene-text">
              {paragraphs.map((p, idx) => (
                <p key={idx} className="story-paragraph">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Personal Message from Scott & Stats */}
        <div className="ending-side-panel">
          {/* PERSONAL NOTE CARD */}
          <div className="personal-note-card">
            <div className="note-seal">👑</div>
            <h2 className="note-title">A Special Birthday Message</h2>
            <div className="note-body">
              <p className="note-salutation">Hey Wendy,</p>
              
              {/* --- EDITABLE BIRTHDAY MESSAGE PLACEHOLDER --- */}
              <p className="note-text">
              Happy 52nd Birthday! 🎂✨
              </p>
              <p className="note-text">
              Hope that you are having a wonderful day.  I really do hope that Luna and I can come and see the show sometime.
              </p>
              <p className="note-text">
              Not sure which video ending you have landed on, but there are four in total with four different videos.  And certainly there is one in particular that is my favourite. 
              </p>
              <p className="note-text">
              Have a great year, plenty of cake and hopefully see you soon
              </p>
              {/* ----------------------------------------------- */}

              <p className="note-signoff">Love,</p>
              <p className="note-signature">Scott & Luna xxx</p>
            </div>
            <div className="note-decor-bottom"></div>
          </div>

          {/* PLAYTHROUGH STATS */}
          <div className="stats-card">
            <h3 className="stats-title">🎭 Wendy's Journey Report</h3>
            <div className="stats-list">
              <div className="stat-item">
                <span className="stat-label">Doors Discovered:</span>
                <span className="stat-val">{visitedCount} / 52</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Props Collected:</span>
                <span className="stat-val">{inventory.length} / 5</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Ending Achieved:</span>
                <span className="stat-val capitalize">{scene.endingType || 'Standard'}</span>
              </div>
            </div>
          </div>

          {/* RESTART */}
          <button className="restart-button-main" onClick={onRestart}>
            🎟️ Explore Another Door (Restart)
          </button>
        </div>
      </div>
    </div>
  );
}

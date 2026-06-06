import React, { useState, useEffect } from 'react';
import { fetchStartScene, fetchScene } from './api/storyApi';
import StoryScene from './components/StoryScene';
import EndingScreen from './components/EndingScreen';
import Inventory from './components/Inventory';
import JourneyTracker from './components/JourneyTracker';
import './styles/App.css';

export default function App() {
  const [currentScene, setCurrentScene] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [visitedScenes, setVisitedScenes] = useState(new Set());
  const [recentlyAddedItem, setRecentlyAddedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastTimeoutId, setToastTimeoutId] = useState(null);

  // Initialize the story
  const initializeStory = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchStartScene();
      const firstScene = data.firstScene;
      setCurrentScene(firstScene);
      setVisitedScenes(new Set([firstScene.id]));
      setInventory([]);
      setRecentlyAddedItem(null);
    } catch (err) {
      setError(
        'The theater lights seem to have flickered out! The Gielgud Theatre API is currently unavailable.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initializeStory();
    return () => {
      if (toastTimeoutId) clearTimeout(toastTimeoutId);
    };
  }, []);

  // Handle a choice click
  const handleChoiceClick = async (choice) => {
    // 1. Check if the choice has item requirement and if it is locked
    if (choice.requiredItem && !inventory.includes(choice.requiredItem)) {
      return; // Locked - should be disabled by component anyway
    }

    setLoading(true);
    try {
      // 2. Fetch the next scene first to ensure it succeeds
      const nextScene = await fetchScene(choice.nextScene);

      // 3. Optional Progressive Enhancement: View Transition API
      const performStateUpdates = () => {
        // Handle adding item if applicable
        if (choice.addItem) {
          setInventory((prev) => {
            if (prev.includes(choice.addItem)) return prev;
            return [...prev, choice.addItem];
          });
          setRecentlyAddedItem(choice.addItem);

          // Clear banner after 4 seconds
          if (toastTimeoutId) clearTimeout(toastTimeoutId);
          const timeoutId = setTimeout(() => {
            setRecentlyAddedItem(null);
          }, 4000);
          setToastTimeoutId(timeoutId);
        } else {
          setRecentlyAddedItem(null);
        }

        // Update current scene
        setCurrentScene(nextScene);

        // Track unique visited scenes
        setVisitedScenes((prev) => {
          const updated = new Set(prev);
          updated.add(nextScene.id);
          return updated;
        });
      };

      if (document.startViewTransition) {
        document.startViewTransition(() => {
          performStateUpdates();
        });
      } else {
        performStateUpdates();
      }
    } catch (err) {
      console.error(err);
      // We do not overwrite the entire screen with an error, just notify the user in console
      // or we could show a transient notification. Let's show a graceful window alert or standard handler
      alert('Backstage door seems jammed! Let\'s try that choice again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        initializeStory();
      });
    } else {
      initializeStory();
    }
  };

  // --- RENDERING VARIOUS STATES ---

  // 1. Loading state
  if (loading && !currentScene) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <div className="loading-text">Tuning the orchestra...</div>
        </div>
      </div>
    );
  }

  // 2. Error state (e.g. backend unavailable)
  if (error) {
    return (
      <div className="error-screen">
        <div className="error-content">
          <div className="error-icon">🎭</div>
          <h2 className="error-title">Curtain Malfunction</h2>
          <p className="error-message">{error}</p>
          <button className="retry-button" onClick={initializeStory}>
            🔌 Reconnect & Raise Curtains
          </button>
        </div>
      </div>
    );
  }

  // 3. Active Playthrough
  const isEnding = currentScene?.isEnding;

  return (
    <div className="app-container">
      {/* Title Header */}
      <header className="theater-header">
        <div className="app-title-container">
          <h1 className="app-title">Wendy and the 52 Doors of the Gielgud</h1>
          <p className="app-subtitle">A Magical Backstage Birthday Adventure</p>
        </div>
        {!isEnding && (
          <button className="restart-trigger-header" onClick={handleRestart}>
            🔄 Restart Story
          </button>
        )}
      </header>

      {/* Main Content Area */}
      <main className="theater-main">
        {isEnding ? (
          <EndingScreen
            scene={currentScene}
            inventory={inventory}
            visitedCount={visitedScenes.size}
            onRestart={handleRestart}
          />
        ) : (
          <div className="theater-grid">
            {/* Story scene viewport */}
            <div className="story-card-column">
              {currentScene && (
                <StoryScene
                  scene={currentScene}
                  inventory={inventory}
                  onChoiceClick={handleChoiceClick}
                  recentlyAddedItem={recentlyAddedItem}
                />
              )}
            </div>

            {/* Sidebar Status (Props Table and Tracker) */}
            <aside className="sidebar-panel">
              <JourneyTracker visitedCount={visitedScenes.size} />
              <Inventory items={inventory} />
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

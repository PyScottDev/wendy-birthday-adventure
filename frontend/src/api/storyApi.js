const API_BASE_URL = '/api';

/**
 * Fetches the starting scene of the story.
 * @returns {Promise<Object>} The start scene metadata and details.
 */
export async function fetchStartScene() {
  try {
    const response = await fetch(`${API_BASE_URL}/story/start`);
    if (!response.ok) {
      throw new Error(`Failed to fetch start scene: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API Error in fetchStartScene:', error);
    throw error;
  }
}

/**
 * Fetches a single scene by its ID.
 * @param {string} sceneId 
 * @returns {Promise<Object>} The scene details.
 */
export async function fetchScene(sceneId) {
  try {
    const response = await fetch(`${API_BASE_URL}/story/scenes/${sceneId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch scene ${sceneId}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`API Error in fetchScene(${sceneId}):`, error);
    throw error;
  }
}

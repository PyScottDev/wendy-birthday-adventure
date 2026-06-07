from pathlib import Path
import json
import os

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

try:
    from .story import Story, Scene
except ImportError:
    from story import Story, Scene
    
app = FastAPI(title="Wendy and the 52 Doors of the Gielgud - API")

# Enable CORS for React development server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the story data
STORY_FILE_PATH = os.path.join(os.path.dirname(__file__), "data", "wendy_story.json")


def load_story() -> Story:
    if not os.path.exists(STORY_FILE_PATH):
        raise FileNotFoundError(f"Story database not found at: {STORY_FILE_PATH}")
    with open(STORY_FILE_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)
    return Story(**data)


try:
    story_data = load_story()
except Exception as e:
    print(f"Error loading story: {e}")
    story_data = None


@app.get("/api/story")
def get_full_story():
    """Returns the complete story structure."""
    if not story_data:
        raise HTTPException(status_code=500, detail="Story data is not loaded.")
    return story_data


@app.get("/api/story/start")
def get_start_scene():
    """Returns the starting scene ID and title."""
    if not story_data:
        raise HTTPException(status_code=500, detail="Story data is not loaded.")
    return {
        "startScene": story_data.startScene,
        "firstScene": story_data.scenes[story_data.startScene],
    }


@app.get("/api/story/scenes/{scene_id}", response_model=Scene)
def get_scene(scene_id: str):
    """Retrieves a single scene by its ID."""
    if not story_data:
        raise HTTPException(status_code=500, detail="Story data is not loaded.")
    if scene_id not in story_data.scenes:
        raise HTTPException(status_code=404, detail=f"Scene '{scene_id}' not found.")
    return story_data.scenes[scene_id]


@app.get("/api/health")
def health_check():
    """Returns api health status."""
    return {"status": "ok", "loaded": story_data is not None}


# Serve built React frontend
BASE_DIR = Path(__file__).resolve().parent
FRONTEND_DIST = BASE_DIR / "frontend_dist"

if FRONTEND_DIST.exists():
    app.mount(
        "/assets",
        StaticFiles(directory=FRONTEND_DIST / "assets"),
        name="assets",
    )

    app.mount(
        "/images",
        StaticFiles(directory=FRONTEND_DIST / "images"),
        name="images",
    )

    app.mount(
        "/videos",
        StaticFiles(directory=FRONTEND_DIST / "videos"),
        name="videos",
    )

    @app.get("/{full_path:path}")
    def serve_react_app(full_path: str):
        return FileResponse(FRONTEND_DIST / "index.html")
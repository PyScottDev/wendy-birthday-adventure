from pydantic import BaseModel
from typing import List, Optional, Dict

class Choice(BaseModel):
    text: str
    nextScene: str
    addItem: Optional[str] = None
    requiredItem: Optional[str] = None

class Scene(BaseModel):
    id: str
    title: str
    image: str
    video: Optional[str] = None
    text: str
    choices: List[Choice]
    isEnding: Optional[bool] = False
    endingType: Optional[str] = None

class Story(BaseModel):
    startScene: str
    scenes: Dict[str, Scene]

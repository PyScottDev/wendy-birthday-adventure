# Wendy and the 52 Doors of the Gielgud 🎭✨

A polished, personal full-stack choose-your-own-adventure web application created as a 52nd birthday gift for Wendy. 

The story revolves around Wendy's theatrical career, backstage life, Gielgud Theatre, her current performance in *Oliver!* in London's West End, running jokes, and a slightly magical version of the West End. 

---

## Technical Stack
- **Backend**: FastAPI (Python) serving 20-scene story JSON data.
- **Frontend**: React (Vite + JavaScript) with high-end, responsive, and mobile-friendly custom Vanilla CSS styling mimicking vintage playbills and tickets.
- **State Navigation**: Tracks Wendy's inventory, unique visited rooms ("Doors Discovered"), choice requirements, and endings. Uses optional View Transitions API for seamless, smooth visual transitions.

---

## Local Run Instructions

To run the application locally, you will need two terminal windows: one for the backend server and one for the frontend development server.

### 1. Running the FastAPI Backend
Open a terminal in the project root and run:
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install fastapi uvicorn pydantic
uvicorn app.main:app --reload
```
*The FastAPI backend will start up and run on **`http://localhost:8000`**.*

### 2. Running the React Frontend
Open a second terminal in the project root and run:
```bash
cd frontend
npm install
npm run dev
```
*The Vite React development server will start up and run on **`http://localhost:5173`**.*

Open your web browser and navigate to **`http://localhost:5173`** to play!

---

## How to Customize the Gift for Wendy

This application was engineered specifically to be easily editable and customizable before you present it to Wendy.

### 1. Replacing Placeholder Photos
The app features custom scene images for all branches and endings. By default, it displays gorgeous, custom-animated theatrical curtain and rotating spotlight placeholders.

To drop in actual photos of Wendy, the Gielgud Theatre, or family memories:
1. Save your photos as JPEG files.
2. Place them inside the **`frontend/public/images/`** folder.
3. Name the files according to the corresponding scene:
   - `stage-door.jpg` (Opening scene: Wendy arriving, humming card)
   - `card-open.jpg` (The humming birthday card opening, glitter)
   - `card-shake.jpg` (Wendy shaking it suspiciously)
   - `card-bag.jpg` (The bag vibrating and singing)
   - `backstage-crossroads.jpg` (Backstage wings with 3 golden paths)
   - `wardrobe-room.jpg` (Whispering wardrobe room)
   - `talking-hat.jpg` (The opinionated talking top hat)
   - `costume-trunk.jpg` (The heavy iron-bound costume trunk)
   - `dressing-room-mirror.jpg` (The dressing room mirror spotlight)
   - `dickensian-west-end.jpg` (Foggy Victorian Shaftesbury Avenue in 1850)
   - `theatre-poster.jpg` (The glowing poster of "Wendy and the 52 Doors")
   - `foggy-alley.jpg` (Victorian side alley with the child actor)
   - `backstage-corridor.jpg` (Backstage corridor: Emergency Birthday Protocol)
   - `trapdoor.jpg` (Beneath the stage prop labyrinth)
   - `cue-light.jpg` (Pulsing green cue light / Theatre ghost)
   - `understudy-meeting.jpg` (The secret understudies society)
   - `prop-table.jpg` (The prop table / Stressed stage manager)
   - `final-door.jpg` (The magnificent wooden 52nd door)
   - `birthday-ending.jpg` (Cast presenting the birthday cake - Best Ending)
   - `musical-ending.jpg` (The Wendy! musical billboard/stage - Theatrical Triumph Ending)
   - `ghost-ending.jpg` (Auditorium with glowing theatre ghosts - Spectral Standing Ovation Ending)
   - `cake-ending.jpg` (Wendy tap-dancing around the cake built into the set - Great Cake Incident)

*Any missing images will automatically degrade gracefully back to the beautiful CSS spotlight placeholder rather than showing broken image icons.*

### 2. Customizing the Personal Birthday Message
To change or expand the personal message card that is shown on the final ending screen:
1. Open the file **`frontend/src/components/EndingScreen.jsx`** in a code editor.
2. Locate the section marked with:
   ```jsx
   {/* --- EDITABLE BIRTHDAY MESSAGE PLACEHOLDER --- */}
   ```
3. Modify the paragraphs inside the `<p className="note-text">` tags to say exactly what you want!
4. Save the file. The React server will live-reload, updating the message instantly.

---

## Playthrough Secrets & Branching paths
To test the game's various paths, try making different choices:
- **The Wardrobe Path**: Can unlock the **silver tap shoe** or **marked-up script**.
- **The Stage Door Path**: Can unlock the **gold theatre ticket** or **birthday candle**.
- **The Trapdoor Path**: Can unlock the **theatre key** or **prop spoon**.
- **The 52nd Door Special Endings**:
  - Open with the *Theatre Key* -> **Best Birthday Ending**
  - Open with the *Marked-Up Script* + high note -> **Chaotic Musical Ending**
  - Open with *Gold Ticket* or *Birthday Candle* -> **Ghost of the Gielgud Standing Ovation**
  - Open with *Prop Spoon* or *Silver Tap Shoe* -> **Great Cake Incident Ending**
  - Two default choices are always available so the game can never be locked out!

"use strict";
// 2x2 grid:
//   Spiral Stair    | Lamp Room
//   Keeper's Kitchen| Rocks
const rooms = {
    stair: {
        short: "Stair",
        mood: "Cold, echoing, and damp.",
        scene: "scene-stair",
        name: "Spiral Stair",
        description: "Iron steps wind upward through a narrow stone shaft, slick with salt damp. A cold draught carries the smell of oil and the far-off boom of the sea.",
        exits: { east: "lamp", south: "kitchen" },
        blocked: {
            north: "The stair ends at a rusted hatch bolted shut from the other side.",
            west: "The curved wall is solid granite, cold under your palm.",
        },
    },
    lamp: {
        short: "Lamp",
        mood: "Warm brass, dust, and waiting.",
        scene: "scene-lamp",
        name: "Lamp Room",
        description: "A great brass lamp squats inside a cage of glass, its lens dark and dusty. Beyond the panes, fog presses in from every side.",
        exits: { west: "stair", south: "rocks" },
        blocked: {
            north: "Only the glass and the fog lie that way, and a long drop beneath.",
            east: "The gallery door is jammed shut by years of rust.",
        },
    },
    kitchen: {
        short: "Kitchen",
        mood: "Quiet, left mid-meal.",
        scene: "scene-kitchen",
        name: "Keeper's Kitchen",
        description: "A blackened stove sits cold beside a table set for one, the tea long since gone. A logbook lies open, its last entry unfinished.",
        exits: { north: "stair", east: "rocks" },
        blocked: {
            south: "A low door leads to a coal cellar flooded with black water.",
            west: "The pantry shelves are bare and the wall behind them is solid.",
        },
    },
    rocks: {
        short: "Rocks",
        mood: "Wind, spray, and grey light.",
        scene: "scene-rocks",
        name: "Rocks",
        description: "Black rocks slick with weed rise from the surf at the foot of the tower. Above you the lighthouse stands dark against a low grey sky.",
        exits: { north: "lamp", west: "kitchen" },
        blocked: {
            south: "The sea is far too rough to wade into.",
            east: "The rocks drop sheer into deep, churning water.",
        },
    },
};
const keyToDirection = {
    ArrowUp: "north",
    ArrowDown: "south",
    ArrowLeft: "west",
    ArrowRight: "east",
};
// Map layout, top row first
const grid = [
    ["stair", "lamp"],
    ["kitchen", "rocks"],
];
const FADE_MS = 250; // must match the #view transition in index.html
let current = "rocks";
let moving = false;
function byId(id) {
    const el = document.getElementById(id);
    if (!el)
        throw new Error(`Missing element #${id}`);
    return el;
}
function buildMap() {
    const map = byId("map");
    map.replaceChildren();
    for (const row of grid) {
        for (const id of row) {
            const cell = document.createElement("button");
            cell.type = "button";
            cell.dataset.room = id;
            cell.textContent = rooms[id].short;
            cell.addEventListener("click", () => goTo(id));
            map.appendChild(cell);
        }
    }
}
function render(message = "") {
    const room = rooms[current];
    document.body.dataset.room = current;
    byId("room").textContent = room.name;
    byId("mood").textContent = room.mood;
    const reachable = new Set(Object.values(room.exits));
    for (const cell of document.querySelectorAll("#map button")) {
        const id = cell.dataset.room ?? "";
        cell.classList.toggle("here", id === current);
        cell.classList.toggle("reachable", reachable.has(id));
        cell.disabled = id === current;
    }
    byId("description").textContent = room.description;
    for (const scene of document.querySelectorAll(".scene")) {
        scene.toggleAttribute("hidden", scene.id !== room.scene);
    }
    const exitsEl = byId("exits");
    exitsEl.textContent = "You can go: ";
    for (const dir of Object.keys(room.exits)) {
        const span = document.createElement("span");
        span.textContent = dir;
        exitsEl.appendChild(span);
    }
    byId("message").textContent = message;
}
function move(dir) {
    if (moving)
        return;
    const room = rooms[current];
    const next = room.exits[dir];
    if (!next) {
        render(room.blocked[dir] ?? "You can't go that way.");
        return;
    }
    travel(next);
}
/** Map click: only rooms with a direct exit from here are reachable */
function goTo(id) {
    if (moving || id === current)
        return;
    const room = rooms[current];
    if (!Object.values(room.exits).includes(id)) {
        render(`There's no direct way to the ${rooms[id].name} from here.`);
        return;
    }
    travel(id);
}
function travel(next) {
    // Fade the view out, swap the room, then let it fade back in
    moving = true;
    const view = byId("view");
    view.classList.add("fading");
    window.setTimeout(() => {
        current = next;
        render();
        view.classList.remove("fading");
        moving = false;
    }, FADE_MS);
}
document.addEventListener("keydown", (event) => {
    const dir = keyToDirection[event.key];
    if (dir) {
        event.preventDefault();
        move(dir);
    }
});
buildMap();
render();

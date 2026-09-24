"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  FADE_MS,
  isReachable,
  keyToDirection,
  rooms,
  startRoom,
  type Direction,
  type RoomId,
} from "@/lib/rooms";
import Keys from "./Keys";
import Map from "./Map";
import RoughFilter from "./RoughFilter";
import Scene from "./Scene";

export default function Game() {
  const [current, setCurrent] = useState<RoomId>(startRoom);
  const [fading, setFading] = useState(false);
  const [message, setMessage] = useState("");
  const timer = useRef<number | null>(null);

  const room = rooms[current];

  // The current room's palette lives on <body> so the whole page recolours
  useEffect(() => {
    document.body.dataset.room = current;
  }, [current]);

  // Fade the view out, swap the room, then let it fade back in
  const travel = useCallback((next: RoomId) => {
    setFading(true);
    setMessage("");
    timer.current = window.setTimeout(() => {
      setCurrent(next);
      setFading(false);
      timer.current = null;
    }, FADE_MS);
  }, []);

  const move = useCallback(
    (dir: Direction) => {
      if (fading) return;
      const next = room.exits[dir];
      if (next) travel(next);
      else setMessage(room.blocked[dir] ?? "You can't go that way.");
    },
    [fading, room, travel],
  );

  // Map click: only rooms with a direct exit from here are reachable
  const goTo = useCallback(
    (id: RoomId) => {
      if (fading || id === current) return;
      if (isReachable(room, id)) travel(id);
      else setMessage(`There's no direct way to the ${rooms[id].name} from here.`);
    },
    [current, fading, room, travel],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const dir = keyToDirection[event.key];
      if (dir) {
        event.preventDefault();
        move(dir);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [move]);

  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, []);

  return (
    <>
      <RoughFilter />
      <main className="panel">
        <h1 className="eyebrow">The Lighthouse</h1>
        <Map current={room} onSelect={goTo} />

        <section className={fading ? "view fading" : "view"}>
          <h2 className="room-name">{room.name}</h2>
          <p className="mood">{room.mood}</p>
          <Scene room={current} />
          <p className="description">{room.description}</p>
          <p className="exits">
            You can go:{" "}
            {Object.keys(room.exits).map((dir) => (
              <span key={dir}>{dir}</span>
            ))}
          </p>
        </section>

        <p className="message">{message}</p>
        <footer className="footer">
          <Keys room={room} />
          <span>Use the arrow keys to move, or click a room on the map.</span>
        </footer>
      </main>
    </>
  );
}

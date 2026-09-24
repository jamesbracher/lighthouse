"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  FADE_MS,
  keyToDirection,
  rooms,
  startRoom,
  type Direction,
  type RoomId,
} from "@/lib/rooms";
import { goTo, initialState, move, type GameState, type MoveResult } from "@/lib/game";
import Keys from "./Keys";
import Map from "./Map";
import RoughFilter from "./RoughFilter";
import Scene from "./Scene";
import Tower from "./Tower";

export default function Game() {
  const [state, setState] = useState<GameState>(initialState);
  const [fading, setFading] = useState(false);
  const [message, setMessage] = useState("");
  const [pinRoom, setPinRoom] = useState<RoomId>(startRoom);
  const timer = useRef<number | null>(null);

  const room = rooms[state.room];

  // The current room's palette lives on <body> so the whole page recolours
  useEffect(() => {
    document.body.dataset.room = state.room;
  }, [state.room]);

  // Apply a rules result: fade to the new room, or show why we stayed put
  const apply = useCallback(
    (result: MoveResult) => {
      if (fading) return;
      if (!result.moved) {
        setMessage(result.message);
        return;
      }
      setFading(true);
      setMessage("");
      setPinRoom(result.state.room);
      timer.current = window.setTimeout(() => {
        setState(result.state);
        setFading(false);
        timer.current = null;
      }, FADE_MS);
    },
    [fading],
  );

  const onKey = useCallback(
    (event: KeyboardEvent) => {
      const dir: Direction | undefined = keyToDirection[event.key];
      if (dir) {
        event.preventDefault();
        apply(move(state, dir));
      }
    },
    [apply, state],
  );

  const onSelect = useCallback((id: RoomId) => apply(goTo(state, id)), [apply, state]);

  useEffect(() => {
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onKey]);

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
        <Map current={room} onSelect={onSelect} />

        <section className={fading ? "view fading" : "view"}>
          <h2 className="room-name">{room.name}</h2>
          <p className="mood">{room.mood}</p>
          <Scene room={state.room} />
        </section>

        <Tower current={room} pinRoom={pinRoom} onSelect={onSelect} />

        <section className={fading ? "view fading" : "view"}>
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

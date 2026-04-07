"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Lane = 0 | 1 | 2;
type FallingType = "cap" | "hat";

type FallingItem = {
  id: number;
  lane: Lane;
  y: number;
  type: FallingType;
};

const LANES: Lane[] = [0, 1, 2];
const PLAYER_Y = 500;
const ITEM_SIZE = 56;
const PLAYER_WIDTH = 84;
const PLAYER_HEIGHT = 84;
const GAME_WIDTH = 360;
const GAME_HEIGHT = 640;
const LANE_X = [60, 180, 300];

function laneToX(lane: Lane) {
  return LANE_X[lane];
}

export default function CapCatchGame() {
  const [playerLane, setPlayerLane] = useState<Lane>(1);
  const [items, setItems] = useState<FallingItem[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [isRunning, setIsRunning] = useState(true);
  const [bestScore, setBestScore] = useState(0);

  const itemIdRef = useRef(0);
  const speedRef = useRef(2.8);
  const spawnRateRef = useRef(1100);
  const lastSpawnRef = useRef(0);
  const lastFrameRef = useRef(0);
  const difficultyTimerRef = useRef(0);

  useEffect(() => {
    const savedBest = window.localStorage.getItem("salva-cap-catch-best-score");
    if (savedBest) {
      setBestScore(Number(savedBest));
    }
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (!isRunning && event.key.toLowerCase() === "enter") {
        resetGame();
        return;
      }

      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        setPlayerLane((prev) => (prev > 0 ? ((prev - 1) as Lane) : prev));
      }

      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        setPlayerLane((prev) => (prev < 2 ? ((prev + 1) as Lane) : prev));
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning) return;

    let animationFrame = 0;

    const update = (timestamp: number) => {
      if (!lastFrameRef.current) lastFrameRef.current = timestamp;
      const delta = timestamp - lastFrameRef.current;
      lastFrameRef.current = timestamp;

      difficultyTimerRef.current += delta;

      if (difficultyTimerRef.current >= 4000) {
        difficultyTimerRef.current = 0;
        speedRef.current = Math.min(speedRef.current + 0.35, 10);
        spawnRateRef.current = Math.max(spawnRateRef.current - 60, 320);
      }

      if (timestamp - lastSpawnRef.current >= spawnRateRef.current) {
        lastSpawnRef.current = timestamp;

        const lane = LANES[Math.floor(Math.random() * LANES.length)];
        const type: FallingType = Math.random() < 0.72 ? "cap" : "hat";

        setItems((prev) => [
          ...prev,
          {
            id: itemIdRef.current++,
            lane,
            y: -ITEM_SIZE,
            type,
          },
        ]);
      }

      setItems((prev) => {
        const nextItems: FallingItem[] = [];

        for (const item of prev) {
          const nextY = item.y + speedRef.current * (delta / 16.67);

          const sameLane = item.lane === playerLane;
          const collided =
            sameLane &&
            nextY + ITEM_SIZE / 2 >= PLAYER_Y &&
            nextY <= PLAYER_Y + PLAYER_HEIGHT / 2;

          if (collided) {
            if (item.type === "cap") {
              setScore((prevScore) => prevScore + 1);
            } else {
              setLives((prevLives) => {
                const nextLives = prevLives - 1;
                if (nextLives <= 0) {
                  setIsRunning(false);
                }
                return nextLives;
              });
            }
            continue;
          }

          if (nextY < GAME_HEIGHT + ITEM_SIZE) {
            nextItems.push({ ...item, y: nextY });
          }
        }

        return nextItems;
      });

      animationFrame = requestAnimationFrame(update);
    };

    animationFrame = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationFrame);
  }, [isRunning, playerLane]);

  useEffect(() => {
    if (!isRunning) {
      setBestScore((prevBest) => {
        const nextBest = Math.max(prevBest, score);
        window.localStorage.setItem(
          "salva-cap-catch-best-score",
          String(nextBest)
        );
        return nextBest;
      });
    }
  }, [isRunning, score]);

  const playerX = useMemo(() => laneToX(playerLane), [playerLane]);

  function resetGame() {
    setPlayerLane(1);
    setItems([]);
    setScore(0);
    setLives(3);
    setIsRunning(true);
    itemIdRef.current = 0;
    speedRef.current = 2.8;
    spawnRateRef.current = 1100;
    lastSpawnRef.current = 0;
    lastFrameRef.current = 0;
    difficultyTimerRef.current = 0;
  }

  function moveLeft() {
    setPlayerLane((prev) => (prev > 0 ? ((prev - 1) as Lane) : prev));
  }

  function moveRight() {
    setPlayerLane((prev) => (prev < 2 ? ((prev + 1) as Lane) : prev));
  }

  function moveToLane(lane: Lane) {
    setPlayerLane(lane);
  }

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex w-full max-w-md items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
        <span>Puntaje: <strong className="text-white">{score}</strong></span>
        <span>Vidas: <strong className="text-white">{lives}</strong></span>
        <span>Récord: <strong className="text-white">{bestScore}</strong></span>
      </div>

      <div
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-sky-900 via-neutral-900 to-neutral-950 shadow-2xl"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-1/3 top-0 h-full w-px bg-white/20" />
          <div className="absolute left-2/3 top-0 h-full w-px bg-white/20" />
        </div>

        {items.map((item) => (
          <div
            key={item.id}
            className="absolute flex items-center justify-center text-3xl"
            style={{
              left: laneToX(item.lane) - ITEM_SIZE / 2,
              top: item.y,
              width: ITEM_SIZE,
              height: ITEM_SIZE,
            }}
          >
            {item.type === "cap" ? "🧢" : "👒"}
          </div>
        ))}

        <div
          className="absolute flex items-center justify-center rounded-full border border-white/20 bg-emerald-400 text-4xl shadow-lg"
          style={{
            left: playerX - PLAYER_WIDTH / 2,
            top: PLAYER_Y,
            width: PLAYER_WIDTH,
            height: PLAYER_HEIGHT,
          }}
        >
          🐥
        </div>

        {!isRunning && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/75 px-6 text-center">
            <h2 className="text-3xl font-semibold text-white">Game Over</h2>
            <p className="mt-3 text-white/80">Puntaje final: {score}</p>
            <button
              onClick={resetGame}
              className="mt-6 rounded-full bg-white px-6 py-3 font-medium text-black transition hover:scale-105"
            >
              Jugar otra vez
            </button>
            <p className="mt-3 text-xs text-white/50">
              También puedes presionar Enter
            </p>
          </div>
        )}
      </div>

      <div className="grid w-full max-w-md grid-cols-3 gap-3">
        <button
          onClick={() => moveToLane(0)}
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:bg-white/10"
        >
          Izquierda
        </button>
        <button
          onClick={() => moveToLane(1)}
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:bg-white/10"
        >
          Centro
        </button>
        <button
          onClick={() => moveToLane(2)}
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:bg-white/10"
        >
          Derecha
        </button>
      </div>

      <div className="flex w-full max-w-md gap-3 sm:hidden">
        <button
          onClick={moveLeft}
          className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:bg-white/10"
        >
          ←
        </button>
        <button
          onClick={moveRight}
          className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:bg-white/10"
        >
          →
        </button>
      </div>
    </div>
  );
}

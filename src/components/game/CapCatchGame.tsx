"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Lane = 0 | 1 | 2;
type FallingType = "cap" | "hat";

type FallingItem = {
  id: number;
  lane: Lane;
  y: number;
  type: FallingType;
};

const LANES: Lane[] = [0, 1, 2];

const GAME_WIDTH = 360;
const GAME_HEIGHT = 640;

const PLAYER_WIDTH = 96;
const PLAYER_HEIGHT = 96;
const PLAYER_Y = 512;

const ITEM_SIZE = 58;

const LANE_X = [60, 180, 300];

function laneToX(lane: Lane) {
  return LANE_X[lane];
}

export default function CapCatchGame() {
  const [playerLane, setPlayerLane] = useState<Lane>(1);
  const [items, setItems] = useState<FallingItem[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [bestScore, setBestScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const itemIdRef = useRef(0);
  const speedRef = useRef(2.8);
  const spawnRateRef = useRef(1000);
  const lastSpawnRef = useRef(0);
  const lastFrameRef = useRef(0);
  const difficultyTimerRef = useRef(0);

  const musicAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    musicAudioRef.current = new Audio("/music.mp3");
    musicAudioRef.current.loop = true;
    musicAudioRef.current.volume = 0.45;

    const savedBest = window.localStorage.getItem("salva-cap-catch-best-score");
    if (savedBest) {
      setBestScore(Number(savedBest));
    }

    const savedMuted = window.localStorage.getItem("salva-cap-catch-muted");
    if (savedMuted === "true") {
      setIsMuted(true);
    }

    return () => {
      musicAudioRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    if (musicAudioRef.current) {
      musicAudioRef.current.muted = isMuted;
    }

    window.localStorage.setItem("salva-cap-catch-muted", String(isMuted));
  }, [isMuted]);

  function playMusic() {
    const music = musicAudioRef.current;
    if (!music || isMuted) return;
    music.play().catch(() => {});
  }

  function pauseMusic() {
    musicAudioRef.current?.pause();
  }

  function resetState() {
    setPlayerLane(1);
    setItems([]);
    setScore(0);
    setLives(3);
    setIsRunning(true);
    setHasStarted(true);

    itemIdRef.current = 0;
    speedRef.current = 2.8;
    spawnRateRef.current = 1000;
    lastSpawnRef.current = 0;
    lastFrameRef.current = 0;
    difficultyTimerRef.current = 0;
  }

  function startGame() {
    resetState();
    playMusic();
  }

  function endGame() {
    setIsRunning(false);
    pauseMusic();
  }

  function toggleMute() {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (nextMuted) {
      pauseMusic();
    } else if (hasStarted && isRunning) {
      playMusic();
    }
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (!hasStarted && event.key === "Enter") {
        startGame();
        return;
      }

      if (!isRunning && hasStarted && event.key === "Enter") {
        startGame();
        return;
      }

      if (event.key.toLowerCase() === "m") {
        setIsMuted((prev) => !prev);
        return;
      }

      if (!isRunning) return;

      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        setPlayerLane((prev) => (prev > 0 ? ((prev - 1) as Lane) : prev));
      }

      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        setPlayerLane((prev) => (prev < 2 ? ((prev + 1) as Lane) : prev));
      }

      if (event.key === "1") setPlayerLane(0);
      if (event.key === "2") setPlayerLane(1);
      if (event.key === "3") setPlayerLane(2);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [hasStarted, isRunning, startGame]);

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
        spawnRateRef.current = Math.max(spawnRateRef.current - 55, 300);
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
            nextY + ITEM_SIZE * 0.7 >= PLAYER_Y &&
            nextY <= PLAYER_Y + PLAYER_HEIGHT * 0.55;

          if (collided) {
            if (item.type === "cap") {
              setScore((prevScore) => prevScore + 1);
            } else {
              setLives((prevLives) => {
                const nextLives = prevLives - 1;
                if (nextLives <= 0) {
                  endGame();
                  return 0;
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
  }, [endGame, isRunning, playerLane]);

  useEffect(() => {
    if (!isRunning && hasStarted) {
      setBestScore((prevBest) => {
        const nextBest = Math.max(prevBest, score);
        window.localStorage.setItem(
          "salva-cap-catch-best-score",
          String(nextBest)
        );
        return nextBest;
      });
    }
  }, [hasStarted, isRunning, score]);

  const playerX = useMemo(() => laneToX(playerLane), [playerLane]);

  function moveLeft() {
    if (!isRunning) return;
    setPlayerLane((prev) => (prev > 0 ? ((prev - 1) as Lane) : prev));
  }

  function moveRight() {
    if (!isRunning) return;
    setPlayerLane((prev) => (prev < 2 ? ((prev + 1) as Lane) : prev));
  }

  function moveToLane(lane: Lane) {
    if (!isRunning) return;
    setPlayerLane(lane);
  }

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex w-full max-w-md items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 backdrop-blur">
        <span>
          Puntaje: <strong className="text-white">{score}</strong>
        </span>
        <span>
          Vidas: <strong className="text-white">{lives}</strong>
        </span>
        <span>
          Récord: <strong className="text-white">{bestScore}</strong>
        </span>
      </div>

      <div
        className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
      >
        <Image
          src="/background.png"
          alt="Fondo del minijuego"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/10" />

        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-1/3 top-0 h-full w-px bg-white/25" />
          <div className="absolute left-2/3 top-0 h-full w-px bg-white/25" />
        </div>

        <button
          onClick={toggleMute}
          className="absolute right-3 top-3 z-30 rounded-full border border-white/15 bg-black/35 px-3 py-2 text-xs text-white backdrop-blur transition hover:bg-black/50"
        >
          {isMuted ? "Activar música" : "Silenciar"}
        </button>

        {items.map((item) => (
          <div
            key={item.id}
            className="absolute"
            style={{
              left: laneToX(item.lane) - ITEM_SIZE / 2,
              top: item.y,
              width: ITEM_SIZE,
              height: ITEM_SIZE,
            }}
          >
            <Image
              src={item.type === "cap" ? "/cap.png" : "/hat.png"}
              alt={item.type === "cap" ? "Gorra" : "Sombrero"}
              width={ITEM_SIZE}
              height={ITEM_SIZE}
              className="pointer-events-none select-none object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.35)]"
              draggable={false}
            />
          </div>
        ))}

        <div
          className="absolute"
          style={{
            left: playerX - PLAYER_WIDTH / 2,
            top: PLAYER_Y,
            width: PLAYER_WIDTH,
            height: PLAYER_HEIGHT,
          }}
        >
          <Image
            src="/salva-gorrin.png"
            alt="Salva Gorrín"
            width={PLAYER_WIDTH}
            height={PLAYER_HEIGHT}
            priority
            className="pointer-events-none select-none object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.45)]"
            draggable={false}
          />
        </div>

        {!hasStarted && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/55 px-6 text-center backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">
              Mini videojuego
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-white">
              Cap Catch
            </h2>
           <div className="mt-4 space-y-3">
  <p className="max-w-xs text-sm leading-6 text-white/80">
    Atrapa las gorras, evita los sombreros y sobrevive con tus 3
    vidas. Cada vez caerán más rápido y con mayor frecuencia.
  </p>

  <div className="max-w-xs rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3">
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
      Próximamente: Reto Salva Gorrín
    </p>
    <p className="mt-2 text-sm leading-6 text-white/80">
      Demuestra tu nivel y compite por recompensas exclusivas.
    </p>
  </div>
</div>
            <button
              onClick={startGame}
              className="mt-6 rounded-full bg-white px-6 py-3 font-medium text-black transition hover:scale-105"
            >
              Empezar
            </button>
            <p className="mt-3 text-xs text-white/50">
              En PC usa flechas o A/D. Presiona M para silenciar.
            </p>
          </div>
        )}

        {!isRunning && hasStarted && lives <= 0 && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/65 px-6 text-center backdrop-blur-sm">
            <h2 className="text-3xl font-semibold text-white">Game Over</h2>
            <p className="mt-3 text-white/80">Puntaje final: {score}</p>
            <button
              onClick={startGame}
              className="mt-6 rounded-full bg-white px-6 py-3 font-medium text-black transition hover:scale-105"
            >
              Jugar otra vez
            </button>
            <p className="mt-3 text-xs text-white/50">
              Presiona Enter para reiniciar
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

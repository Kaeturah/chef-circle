"use client";

import { useRef, useState } from "react";

type Category = "chef" | "baker" | "pastry";
type Tier = "verified" | "premium" | "casual";

type Chef = {
  name: string;
  age: number;
  exp: string;
  cat: Category;
  catLabel: string;
  photo: string;
  gradient: string;
  tier: Tier;
  rating: string;
  loc: string;
  dishes: string[];
  price: string;
  hasProfile?: boolean;
};

const CHEFS: Chef[] = [
  {
    name: "Amaka Obi", age: 29, exp: "5 yrs experience", cat: "chef", catLabel: "Chef",
    photo: "/chefs/amaka.jpg", gradient: "linear-gradient(135deg,#2F8C57,#1C5A36)",
    tier: "verified", rating: "4.9", loc: "Owerri, Imo",
    dishes: ["Egusi soup", "Vegetable soup", "Nsala"], price: "9,000",
  },
  {
    name: "Tunde Bakare", age: 34, exp: "6 yrs experience", cat: "chef", catLabel: "Chef",
    photo: "/chefs/tunde.jpg", gradient: "linear-gradient(135deg,#E9762F,#C8401A)",
    tier: "verified", rating: "4.8", loc: "Lekki, Lagos",
    dishes: ["Party jollof", "Amala & ewedu", "Pepper soup"], price: "12,000", hasProfile: true,
  },
  {
    name: "Blessing Eze", age: 27, exp: "4 yrs experience", cat: "pastry", catLabel: "Pastry chef",
    photo: "/chefs/blessing.jpg", gradient: "linear-gradient(135deg,#B0408F,#7A2A63)",
    tier: "premium", rating: "5.0", loc: "Victoria Island, Lagos",
    dishes: ["Small chops", "Puff-puff", "Meat pie"], price: "15,000",
  },
  {
    name: "Chinwe Okafor", age: 41, exp: "12 yrs experience", cat: "chef", catLabel: "Chef",
    photo: "/chefs/chinwe.jpg", gradient: "linear-gradient(135deg,#C8901F,#9A6A12)",
    tier: "premium", rating: "4.9", loc: "Owerri, Imo",
    dishes: ["Ofe Owerri", "Oha soup", "Continental"], price: "25,000",
  },
  {
    name: "David Adeyemi", age: 31, exp: "7 yrs experience", cat: "baker", catLabel: "Baker",
    photo: "/chefs/david.jpg", gradient: "linear-gradient(135deg,#3D6E8E,#274C63)",
    tier: "verified", rating: "4.7", loc: "Ikeja, Lagos",
    dishes: ["Celebration cakes", "Bread", "Cupcakes"], price: "18,000",
  },
  {
    name: "Aisha Mohammed", age: 26, exp: "3 yrs experience", cat: "chef", catLabel: "Chef",
    photo: "/chefs/aisha.jpg", gradient: "linear-gradient(135deg,#5A7D2A,#3C551A)",
    tier: "casual", rating: "4.5", loc: "Yaba, Lagos",
    dishes: ["Suya platter", "Masa", "Kilishi"], price: "7,500",
  },
  {
    name: "Ngozi Kalu", age: 33, exp: "8 yrs experience", cat: "baker", catLabel: "Baker",
    photo: "/chefs/ngozi.jpg", gradient: "linear-gradient(135deg,#C0392B,#7E2018)",
    tier: "verified", rating: "4.8", loc: "Owerri, Imo",
    dishes: ["Wedding cakes", "Chin chin", "Doughnuts"], price: "20,000",
  },
];

const CATS = [
  { id: "all", label: "All" },
  { id: "chef", label: "Chefs" },
  { id: "baker", label: "Bakers" },
  { id: "pastry", label: "Pastry" },
] as const;

const TICKER_DISHES = [
  "Party Jollof", "Ofe Owerri", "Small Chops", "Amala & Ewedu",
  "Wedding Cakes", "Suya Platter", "Pepper Soup", "Puff-Puff",
];

function PotIcon({ full = true }: { full?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d={full ? "M3 11h18M5 11a7 7 0 0 1 14 0M12 4v2M8 21h8M10 21v-3M14 21v-3" : "M3 11h18M5 11a7 7 0 0 1 14 0M12 4v2M8 21h8"} />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1L12 16.6 5.7 21l2.3-7.1-6-4.5h7.6z" />
    </svg>
  );
}

function TickIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
    </svg>
  );
}

/* line-art scene: chef's wok tossing over a flame, spatula at the ready */
function WokScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 100" className={`scene ${className ?? ""}`} aria-hidden>
      <g stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round">
        <circle className="toss" cx="60" cy="44" r="2.6" />
        <circle className="toss" cx="70" cy="46" r="2.1" style={{ animationDelay: ".5s" }} />
        <circle className="toss" cx="79" cy="44" r="1.7" style={{ animationDelay: "1.1s" }} />
        <circle className="toss" cx="52" cy="46" r="1.8" style={{ animationDelay: "1.7s" }} />
        <path d="M34 50 Q70 84 106 50" />
        <path d="M30 50 H110" />
        <path d="M30 50 h-11 M110 50 h11" />
        {/* spatula resting over the rim */}
        <path d="M100 44 l22 -20" />
        <path d="M96 48 q10 -10 14 -6" />
        <path className="flame" d="M56 88 c2.5 -7 7.5 -7 10 0" />
        <path className="flame" d="M71 90 c2 -6 6 -6 8 0" style={{ animationDelay: ".35s" }} />
        <path className="flame" d="M45 90 c2 -6 6 -6 8 0" style={{ animationDelay: ".7s" }} />
        <path className="steam" d="M90 38 c-3 -4 3 -8 0 -12" />
        <path className="steam" d="M98 36 c-3 -4 3 -8 0 -12" style={{ animationDelay: "1.3s" }} />
      </g>
    </svg>
  );
}

/* line-art scene: cloche lid lifting off a serving plate, with a sparkle */
function ClocheScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 72" className={`scene ${className ?? ""}`} aria-hidden>
      <g stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round">
        <g className="cloche-lid">
          <path d="M32 48 a28 28 0 0 1 56 0" />
          <path d="M60 20 v-5" />
          <circle cx="60" cy="12" r="2.6" />
        </g>
        <path d="M24 48 H96" />
        <path d="M30 54 H90" />
        <path className="steam" d="M52 42 c-2 -3 2 -6 0 -9" />
        <path className="steam" d="M66 42 c-2 -3 2 -6 0 -9" style={{ animationDelay: "1.1s" }} />
        <path className="sparkle" d="M98 16 v8 M94 20 h8" />
        <path className="sparkle" d="M22 22 v6 M19 25 h6" style={{ animationDelay: ".4s" }} />
      </g>
    </svg>
  );
}

/* line-art scene: chef's knife rocking on a board, veg bits hopping */
function KnifeChopScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 84" className={`scene ${className ?? ""}`} aria-hidden>
      <g stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round">
        <circle className="hop" cx="46" cy="62" r="2.4" />
        <circle className="hop" cx="58" cy="63" r="2" style={{ animationDelay: ".12s" }} />
        <circle className="hop" cx="38" cy="63" r="1.7" style={{ animationDelay: ".22s" }} />
        <g className="chop">
          <path d="M30 46 Q30 26 58 24 L88 24 L88 46 Z" />
          <path d="M88 32 h18" />
        </g>
        <path d="M16 68 H104" />
        <path d="M22 68 v4 M98 68 v4" />
      </g>
    </svg>
  );
}

/* line-art scene: pot boiling, lid rattling, steam escaping */
function BoilPotScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 92" className={`scene ${className ?? ""}`} aria-hidden>
      <g stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round">
        <path className="steam" d="M38 34 c-3 -4 3 -8 0 -12" />
        <path className="steam" d="M60 34 c-3 -4 3 -8 0 -12" style={{ animationDelay: "1.2s" }} />
        <g className="jiggle">
          <path d="M30 42 q20 -14 40 0" />
          <path d="M50 34 v-4" />
          <circle cx="50" cy="27" r="2.4" />
        </g>
        <path d="M26 42 H74" />
        <path d="M26 46 h-8 M74 46 h8" />
        <path d="M30 42 v20 q0 8 8 8 h24 q8 0 8 -8 v-20" />
      </g>
    </svg>
  );
}

/* line-art scene: whisk stirring a mixing bowl */
function WhiskBowlScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 88" className={`scene ${className ?? ""}`} aria-hidden>
      <g stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round">
        <g className="whisk">
          <path d="M72 8 L60 36" />
          <path d="M60 36 q-10 8 -2 14 q10 2 8 -12" />
          <path d="M60 36 q10 8 2 14" />
        </g>
        <path d="M20 46 H90" />
        <path d="M24 46 q31 30 62 0" />
        <path d="M48 74 h16" />
      </g>
    </svg>
  );
}

/* line-art scene: pancake flipping out of a pan */
function PanFlipScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 76" className={`scene ${className ?? ""}`} aria-hidden>
      <g stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round">
        <ellipse className="flip" cx="62" cy="34" rx="12" ry="3.4" />
        <path d="M40 42 q22 16 44 0" />
        <path d="M38 42 H86" />
        <path d="M14 40 L38 42" />
      </g>
    </svg>
  );
}

/* line-art scene: salt shaker tipping, grains falling */
function SprinkleScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 84 92" className={`scene ${className ?? ""}`} aria-hidden>
      <g stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round">
        <g className="tilt">
          <path d="M32 18 h20 v8 h-20 Z" />
          <path d="M30 26 h24 v20 q0 5 -5 5 h-14 q-5 0 -5 -5 Z" />
        </g>
        <circle className="grain" cx="30" cy="58" r="1.6" />
        <circle className="grain" cx="36" cy="62" r="1.4" style={{ animationDelay: ".4s" }} />
        <circle className="grain" cx="24" cy="60" r="1.4" style={{ animationDelay: ".8s" }} />
      </g>
    </svg>
  );
}

function TierBadge({ tier }: { tier: Tier }) {
  if (tier === "premium") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-gold-bright/40 bg-black/40 px-[10px] py-1 text-[11px] font-bold text-gold-bright backdrop-blur-md">
        <span className="size-3"><StarIcon /></span>Premium
      </span>
    );
  }
  if (tier === "verified") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-green-bright/40 bg-black/40 px-[10px] py-1 text-[11px] font-bold text-green-bright backdrop-blur-md">
        <span className="size-3"><TickIcon /></span>Verified
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full border border-white/25 bg-black/40 px-[10px] py-1 text-[11px] font-bold text-white/85 backdrop-blur-md">
      Listed
    </span>
  );
}

export default function Home() {
  const [cat, setCat] = useState<"all" | Category>("all");
  const [queue, setQueue] = useState<Chef[]>(CHEFS);
  const [history, setHistory] = useState<Chef[]>([]);
  const [drag, setDrag] = useState<{ dx: number; dy: number } | null>(null);
  const [fly, setFly] = useState<-1 | 0 | 1>(0);
  const [gateOpen, setGateOpen] = useState(false);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  // mirrors `drag` state so onPointerUp sees the latest offset even when the
  // final pointermove and pointerup land in the same frame
  const dragNow = useRef<{ dx: number; dy: number } | null>(null);

  function pickCat(next: "all" | Category) {
    setCat(next);
    setQueue(next === "all" ? CHEFS : CHEFS.filter((c) => c.cat === next));
    setHistory([]);
    setDrag(null);
    setFly(0);
  }

  function flyTop(dir: -1 | 1) {
    if (fly || queue.length === 0) return;
    setFly(dir);
    window.setTimeout(() => {
      setHistory((h) => [...h, queue[0]]);
      setQueue((q) => q.slice(1));
      setFly(0);
      setDrag(null);
      if (dir === 1) setGateOpen(true);
    }, 280);
  }

  function undo() {
    if (history.length === 0 || fly) return;
    setQueue((q) => [history[history.length - 1], ...q]);
    setHistory((h) => h.slice(0, -1));
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (fly) return;
    if ((e.target as HTMLElement).closest("[data-peek]")) return;
    dragStart.current = { x: e.clientX, y: e.clientY };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // pointer capture is best-effort; dragging still works without it
    }
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragStart.current || fly) return;
    dragNow.current = { dx: e.clientX - dragStart.current.x, dy: e.clientY - dragStart.current.y };
    setDrag(dragNow.current);
  }

  function onPointerUp() {
    if (!dragStart.current) return;
    dragStart.current = null;
    const dx = dragNow.current?.dx ?? 0;
    dragNow.current = null;
    if (dx > 110) flyTop(1);
    else if (dx < -110) flyTop(-1);
    else setDrag(null);
  }

  const bookOpacity = fly === 1 ? 1 : drag && drag.dx > 0 ? Math.min(drag.dx / 90, 1) : 0;
  const passOpacity = fly === -1 ? 1 : drag && drag.dx < 0 ? Math.min(-drag.dx / 90, 1) : 0;

  return (
    <div className="relative z-[2] mx-auto w-full max-w-[1080px] px-4 pb-36 md:px-7 md:pb-32">
      {/* Ambient kitchen scenes (line art, desktop gutters) */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden text-forest md:block">
        <KnifeChopScene className="absolute left-8 top-[20%] w-[104px] opacity-35" />
        <WhiskBowlScene className="absolute left-14 top-[52%] w-[96px] opacity-30" />
        <WokScene className="absolute bottom-28 left-8 w-[132px] opacity-45" />
        <BoilPotScene className="absolute right-10 top-[18%] w-[92px] opacity-35" />
        <PanFlipScene className="absolute right-12 top-[50%] w-[112px] opacity-30" />
        <ClocheScene className="absolute bottom-44 right-10 w-[104px] opacity-40" />
        <SprinkleScene className="absolute bottom-[12%] right-[22%] hidden w-[64px] opacity-30 xl:block" />
      </div>

      {/* App bar */}
      <header className="sticky top-0 z-20 -mx-4 flex items-center justify-between border-b border-line/70 bg-ivory/80 px-4 pb-3 pt-4 backdrop-blur-xl md:-mx-7 md:px-7 [animation:fade-up_.5s_ease_both]">
        <div className="flex items-center gap-[10px] font-display text-[22px] font-extrabold tracking-[-0.02em] text-forest-deep">
          <span className="grid size-[34px] shrink-0 place-items-center rounded-[11px] bg-[linear-gradient(140deg,#16745B,#0E4A38)] text-ivory shadow-[0_8px_20px_-6px_rgba(14,74,56,.55)]">
            <span className="size-5"><PotIcon /></span>
          </span>
          ChefCircle
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-[6px] rounded-full border border-line bg-surface px-3 py-[7px] text-[12.5px] font-semibold text-ink-soft shadow-[0_2px_8px_rgba(26,33,28,.05)] sm:inline-flex">
            <svg className="size-[14px] text-forest-bright" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Lagos, NG
          </span>
          <button className="grid size-10 place-items-center rounded-[12px] border border-line bg-surface text-ink shadow-[0_2px_8px_rgba(26,33,28,.05)] transition-colors hover:bg-line-soft">
            <svg className="size-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M7 12h10M10 18h4" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero */}
      <div className="relative mb-3 mt-4 text-center [animation:fade-up_.6s_.08s_ease_both]">
        {/* mini kitchen scenes flanking the hero on mobile */}
        <WokScene className="absolute -left-1 top-1 -z-10 w-14 text-forest opacity-25 md:hidden" />
        <BoilPotScene className="absolute -right-1 top-0 -z-10 w-12 text-forest opacity-25 md:hidden" />
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[.24em] text-forest-bright">
          Discover · Lagos &amp; Owerri · Verified
        </p>
        <h1 className="mx-auto max-w-[640px] text-[clamp(26px,6vw,44px)] font-extrabold leading-[1.05] tracking-[-0.02em] text-forest-deep">
          Chefs worth{" "}
          <span className="bg-[linear-gradient(100deg,#16745B_15%,#C8901F_85%)] bg-clip-text text-transparent">
            swiping right
          </span>{" "}
          for
        </h1>
        <p className="mx-auto mt-2 hidden max-w-[440px] text-[14px] text-ink-soft sm:block">
          Verified chefs, bakers &amp; pastry pros — cooked fresh in your home.
        </p>
      </div>

      {/* Dish ticker */}
      <div className="mb-4 overflow-hidden border-y border-line/80 py-[7px] [animation:fade-up_.6s_.14s_ease_both]" aria-hidden>
        <div className="ticker-track flex w-max items-center gap-7">
          {[...TICKER_DISHES, ...TICKER_DISHES].map((dish, i) => (
            <span key={i} className="flex items-center gap-7 whitespace-nowrap text-[10.5px] font-bold uppercase tracking-[.2em] text-ink-faint">
              {dish}
              <span className="text-[8px] text-gold">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Guest banner */}
      <div className="mx-auto mb-4 flex max-w-[560px] items-center gap-[10px] rounded-2xl border border-line bg-surface px-4 py-2 text-[13px] text-ink-soft shadow-[0_4px_16px_rgba(26,33,28,.05)] [animation:fade-up_.6s_.18s_ease_both]">
        <span>👋 Browsing as <b className="font-bold text-ink">guest</b> — swipe freely.</span>
        <button
          onClick={() => setGateOpen(true)}
          className="ml-auto shrink-0 rounded-full bg-forest px-4 py-[7px] text-[12.5px] font-bold text-ivory shadow-[0_8px_18px_-6px_rgba(14,74,56,.6)] transition-transform hover:scale-[1.04] hover:bg-forest-deep"
        >
          Sign in
        </button>
      </div>

      {/* Category chips */}
      <div className="mb-4 flex justify-center gap-2 overflow-x-auto pb-[6px] [animation:fade-up_.6s_.24s_ease_both] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {CATS.map((c) => (
          <button
            key={c.id}
            onClick={() => pickCat(c.id)}
            className={`shrink-0 rounded-full border px-4 py-2 text-[13px] font-semibold transition-all duration-200 ${
              cat === c.id
                ? "border-forest bg-forest text-ivory shadow-[0_8px_20px_-8px_rgba(14,74,56,.7)]"
                : "border-line bg-surface text-ink-soft hover:border-forest/40 hover:text-forest"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Swipe deck */}
      <div className="mx-auto max-w-[420px] [animation:deal-in_.7s_.3s_ease_both]">
        <div className="relative h-[min(56vh,560px)] min-h-[400px] touch-pan-y">
          {queue.length === 0 && (
            <div className="absolute inset-0 grid place-items-center rounded-[26px] border-2 border-dashed border-ink/15 bg-surface/70 p-[30px] text-center text-ink-soft backdrop-blur-md">
              <div>
                <h3 className="mb-[6px] text-[20px] text-ink">You&apos;ve seen everyone nearby</h3>
                <p className="text-[13.5px]">Change category or widen your area to see more chefs, bakers and pastry pros.</p>
                <button
                  onClick={() => pickCat(cat)}
                  className="mt-4 rounded-xl bg-forest px-5 py-[11px] font-bold text-ivory shadow-[0_10px_24px_-8px_rgba(14,74,56,.7)] transition-transform hover:scale-[1.03]"
                >
                  Start over
                </button>
              </div>
            </div>
          )}

          {queue.slice(0, 3).map((chef, depth) => {
            const isTop = depth === 0;
            const style: React.CSSProperties = !isTop
              ? {
                  transform: `translateY(${depth * 12}px) scale(${1 - depth * 0.04})`,
                  zIndex: 10 - depth,
                  filter: "brightness(.85)",
                  transition: "transform .3s ease, opacity .3s ease, filter .3s ease",
                }
              : fly
                ? {
                    transform: `translate(${fly * 560}px,-40px) rotate(${fly * 22}deg)`,
                    opacity: 0,
                    zIndex: 10,
                    transition: "transform .35s ease, opacity .35s ease",
                  }
                : drag
                  ? {
                      transform: `translate(${drag.dx}px,${drag.dy * 0.4}px) rotate(${drag.dx * 0.06}deg)`,
                      zIndex: 10,
                      transition: "none",
                    }
                  : { zIndex: 10, transition: "transform .3s ease, opacity .3s ease, filter .3s ease" };

            return (
              <div
                key={chef.name}
                className={`group absolute inset-0 select-none overflow-hidden rounded-[26px] border border-black/5 bg-surface shadow-[0_34px_70px_-24px_rgba(26,33,28,.45),0_12px_30px_-16px_rgba(14,74,56,.25)] will-change-transform ${
                  isTop ? (drag ? "cursor-grabbing" : `cursor-grab ${fly ? "" : "card-idle"}`) : ""
                }`}
                style={style}
                onPointerDown={isTop ? onPointerDown : undefined}
                onPointerMove={isTop ? onPointerMove : undefined}
                onPointerUp={isTop ? onPointerUp : undefined}
                onPointerCancel={isTop ? onPointerUp : undefined}
              >
                {/* photo (gradient shows while it loads) */}
                <div className="absolute inset-0" style={{ background: chef.gradient }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={chef.photo}
                    alt={chef.name}
                    draggable={false}
                    className="size-full object-cover object-[center_22%] transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                  />
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,10,8,.38)_0%,transparent_26%,transparent_44%,rgba(6,10,8,.92)_100%)]" />
                {/* light sweep across the photo on hover */}
                <div className="pointer-events-none absolute inset-0 z-[2] -translate-x-[160%] bg-[linear-gradient(105deg,transparent_42%,rgba(255,255,255,.16)_50%,transparent_58%)] transition-transform duration-1000 ease-out group-hover:translate-x-[160%]" />

                {isTop && (
                  <>
                    <div
                      className="absolute left-[18px] top-[60px] z-[5] -rotate-[14deg] rounded-[10px] border-4 border-green-bright px-[18px] py-[6px] font-display text-[32px] font-extrabold tracking-[.06em] text-green-bright [text-shadow:0_0_24px_rgba(74,222,128,.6)]"
                      style={{ opacity: bookOpacity }}
                    >
                      BOOK
                    </div>
                    <div
                      className="absolute right-[18px] top-[60px] z-[5] rotate-[14deg] rounded-[10px] border-4 border-red-bright px-[18px] py-[6px] font-display text-[32px] font-extrabold tracking-[.06em] text-red-bright [text-shadow:0_0_24px_rgba(248,113,113,.6)]"
                      style={{ opacity: passOpacity }}
                    >
                      PASS
                    </div>
                  </>
                )}

                <div className="absolute left-4 right-4 top-4 z-[3] flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full border border-white/25 bg-black/40 px-[10px] py-1 text-[11px] font-bold text-white backdrop-blur-md">
                    {chef.catLabel}
                  </span>
                  <TierBadge tier={chef.tier} />
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-[3] p-5 text-white">
                  <div className="mb-[10px] inline-flex items-center gap-[5px] rounded-full border border-white/15 bg-black/40 px-3 py-[5px] text-[14px] font-bold backdrop-blur-md">
                    <span className="size-[14px] text-gold-bright"><StarIcon /></span>
                    {chef.rating}
                  </div>
                  <h2 className="flex flex-wrap items-baseline gap-2 text-[28px] font-extrabold [text-shadow:0_2px_18px_rgba(0,0,0,.5)]">
                    {chef.name} <span className="text-[17px] font-semibold text-white/70">{chef.age}</span>
                  </h2>
                  <div className="mt-[3px] text-[14px] font-semibold text-white/90">
                    {chef.exp} · from{" "}
                    <span className="text-gold-bright">₦{chef.price}</span>/session
                  </div>
                  <div className="mt-[1px] text-[13px] text-white/60">{chef.loc}</div>
                  <div className="mt-3 flex flex-wrap gap-[6px]">
                    {chef.dishes.map((dish) => (
                      <span
                        key={dish}
                        className="rounded-full border border-white/15 bg-white/10 px-3 py-[5px] text-[12px] font-semibold text-white backdrop-blur-md"
                      >
                        {dish}
                      </span>
                    ))}
                  </div>
                </div>

                {chef.hasProfile && (
                  <button
                    data-peek
                    title="View profile"
                    className="absolute bottom-5 right-4 z-[4] grid size-[42px] place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/25"
                  >
                    <span className="size-5"><EyeIcon /></span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Deck actions */}
        <div className="mt-4 flex items-center justify-center gap-[22px] [animation:fade-up_.6s_.45s_ease_both]">
          <button
            onClick={undo}
            title="Undo"
            className="grid size-12 place-items-center rounded-full border border-line bg-surface text-ink-faint shadow-[0_4px_14px_rgba(26,33,28,.08)] transition-all duration-150 hover:scale-[1.08] hover:text-ink"
          >
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 7v6h6M3 13a9 9 0 1 0 3-7.7" />
            </svg>
          </button>
          <button
            onClick={() => flyTop(-1)}
            title="Pass"
            className="grid size-[60px] place-items-center rounded-full border border-red/25 bg-surface text-red shadow-[0_4px_14px_rgba(26,33,28,.08)] transition-all duration-150 hover:scale-[1.08] hover:bg-red/5"
          >
            <svg className="size-[26px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
          <button
            onClick={() => flyTop(1)}
            title="Book"
            className="grid size-[72px] place-items-center rounded-full bg-[linear-gradient(140deg,#16745B,#0E4A38)] text-ivory [animation:ember-pulse_2.6s_ease-in-out_infinite] transition-transform duration-150 hover:scale-[1.08]"
          >
            <span className="size-7"><PotIcon /></span>
          </button>
          <button
            title="View profile"
            className="grid size-12 place-items-center rounded-full border border-line bg-surface text-ink-faint shadow-[0_4px_14px_rgba(26,33,28,.08)] transition-all duration-150 hover:scale-[1.08] hover:text-ink"
          >
            <span className="size-5"><EyeIcon /></span>
          </button>
        </div>
        <p className="mt-3 hidden text-center text-[12.5px] text-ink-faint [animation:fade-up_.6s_.5s_ease_both] [@media(min-height:760px)]:block">
          Swipe right or tap the pot to book · swipe left to pass · tap the eye for full profile
        </p>
      </div>

      {/* Login gate modal */}
      {gateOpen && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center bg-forest-deep/40 backdrop-blur-sm sm:items-center">
          <div className="w-full max-w-[420px] rounded-t-[26px] border border-line bg-surface px-[22px] pb-[30px] pt-[26px] text-center shadow-[0_-20px_60px_rgba(26,33,28,.25)] [animation:fade-up_.35s_ease_both] sm:rounded-[26px]">
            <div className="mx-auto mb-[14px] grid size-14 place-items-center rounded-2xl bg-mint-wash text-forest">
              <svg className="size-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="11" width="16" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
            </div>
            <h2 className="text-[21px] text-forest-deep">Sign in to keep going</h2>
            <p className="mb-[18px] mt-2 text-[14px] leading-[1.55] text-ink-soft">
              You&apos;ve found a chef you like! Create a free account to book, message and pay
              securely — it takes under a minute.
            </p>
            <button
              onClick={() => setGateOpen(false)}
              className="mb-[10px] flex h-[52px] w-full items-center justify-center rounded-[14px] bg-forest text-[15px] font-bold text-ivory shadow-[0_12px_28px_-10px_rgba(14,74,56,.7)] transition-transform duration-150 hover:scale-[1.02] hover:bg-forest-deep"
            >
              Sign in / Create account
            </button>
            <button onClick={() => setGateOpen(false)} className="p-2 text-[14px] font-semibold text-ink-faint hover:text-ink">
              Keep browsing
            </button>
          </div>
        </div>
      )}

      {/* Floating tab dock */}
      <nav className="fixed inset-x-4 bottom-4 z-40 mx-auto flex max-w-[440px] justify-around rounded-full border border-line bg-surface/90 px-2 py-2 shadow-[0_18px_44px_-14px_rgba(26,33,28,.35)] backdrop-blur-xl [animation:fade-up_.6s_.55s_ease_both]">
        {(
          [
            ["Home", true],
            ["Bookings", false],
            ["Wallet", false],
            ["Cook", false],
            ["Profile", false],
          ] as const
        ).map(([label, active]) => (
          <button
            key={label}
            className={`relative flex flex-col items-center gap-[2px] rounded-full px-3 py-[6px] text-[10.5px] font-semibold transition-colors ${
              active ? "text-forest" : "text-ink-faint hover:text-ink"
            }`}
          >
            <svg className="size-[21px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {label === "Home" && <path d="M12 3 3 10v11h6v-6h6v6h6V10Z" />}
              {label === "Bookings" && (
                <>
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </>
              )}
              {label === "Wallet" && (
                <>
                  <rect x="2" y="6" width="20" height="14" rx="2" />
                  <path d="M2 10h20M17 15h2" />
                </>
              )}
              {label === "Cook" && <path d="M3 11h18M5 11a7 7 0 0 1 14 0M12 4v2M8 21h8" />}
              {label === "Profile" && (
                <>
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21a8 8 0 0 1 16 0" />
                </>
              )}
            </svg>
            {label}
            {active && <span className="absolute -bottom-[2px] size-1 rounded-full bg-forest shadow-[0_0_8px_2px_rgba(22,116,91,.6)]" />}
          </button>
        ))}
      </nav>
    </div>
  );
}

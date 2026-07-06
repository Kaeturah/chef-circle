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
  gradient: string;
  initials: string;
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
    gradient: "linear-gradient(135deg,#2F8C57,#1C5A36)", initials: "AO", tier: "verified",
    rating: "4.9", loc: "Owerri, Imo", dishes: ["Egusi soup", "Vegetable soup", "Nsala"], price: "9,000",
  },
  {
    name: "Tunde Bakare", age: 34, exp: "6 yrs experience", cat: "chef", catLabel: "Chef",
    gradient: "linear-gradient(135deg,#E9762F,#C8401A)", initials: "TB", tier: "verified",
    rating: "4.8", loc: "Lekki, Lagos", dishes: ["Party jollof", "Amala & ewedu", "Pepper soup"],
    price: "12,000", hasProfile: true,
  },
  {
    name: "Blessing Eze", age: 27, exp: "4 yrs experience", cat: "pastry", catLabel: "Pastry chef",
    gradient: "linear-gradient(135deg,#B0408F,#7A2A63)", initials: "BE", tier: "premium",
    rating: "5.0", loc: "Victoria Island, Lagos", dishes: ["Small chops", "Puff-puff", "Meat pie"], price: "15,000",
  },
  {
    name: "Chinwe Okafor", age: 41, exp: "12 yrs experience", cat: "chef", catLabel: "Chef",
    gradient: "linear-gradient(135deg,#C8901F,#9A6A12)", initials: "CO", tier: "premium",
    rating: "4.9", loc: "Owerri, Imo", dishes: ["Ofe Owerri", "Oha soup", "Continental"], price: "25,000",
  },
  {
    name: "David Adeyemi", age: 31, exp: "7 yrs experience", cat: "baker", catLabel: "Baker",
    gradient: "linear-gradient(135deg,#3D6E8E,#274C63)", initials: "DA", tier: "verified",
    rating: "4.7", loc: "Ikeja, Lagos", dishes: ["Celebration cakes", "Bread", "Cupcakes"], price: "18,000",
  },
  {
    name: "Aisha Mohammed", age: 26, exp: "3 yrs experience", cat: "chef", catLabel: "Chef",
    gradient: "linear-gradient(135deg,#5A7D2A,#3C551A)", initials: "AM", tier: "casual",
    rating: "4.5", loc: "Yaba, Lagos", dishes: ["Suya platter", "Masa", "Kilishi"], price: "7,500",
  },
  {
    name: "Ngozi Kalu", age: 33, exp: "8 yrs experience", cat: "baker", catLabel: "Baker",
    gradient: "linear-gradient(135deg,#C0392B,#7E2018)", initials: "NK", tier: "verified",
    rating: "4.8", loc: "Owerri, Imo", dishes: ["Wedding cakes", "Chin chin", "Doughnuts"], price: "20,000",
  },
];

const CATS = [
  { id: "all", label: "All" },
  { id: "chef", label: "Chefs" },
  { id: "baker", label: "Bakers" },
  { id: "pastry", label: "Pastry" },
] as const;

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

function TierBadge({ tier }: { tier: Tier }) {
  if (tier === "premium") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-gold-wash px-2 py-[3px] text-[11px] font-bold text-gold">
        <span className="size-3"><StarIcon /></span>Premium
      </span>
    );
  }
  if (tier === "verified") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-green-wash px-2 py-[3px] text-[11px] font-bold text-green">
        <span className="size-3"><TickIcon /></span>Verified
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-[#EFEAE2] px-2 py-[3px] text-[11px] font-bold text-ink-soft">
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
    <div className="mx-auto w-full max-w-[1080px] px-4 pb-[120px] md:px-7 md:pb-[90px]">
      {/* App bar */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-paper pb-3 pt-4">
        <div className="flex items-center gap-[9px] font-display text-[21px] font-extrabold tracking-[-0.02em]">
          <span className="grid size-[30px] shrink-0 place-items-center rounded-[9px] bg-orange text-white">
            <span className="size-[18px]"><PotIcon /></span>
          </span>
          ChefCircle
        </div>
        <button className="grid size-10 place-items-center rounded-[11px] border border-line bg-surface text-ink">
          <svg className="size-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M7 12h10M10 18h4" />
          </svg>
        </button>
      </header>

      {/* Guest banner */}
      <div className="mb-3 flex items-center gap-[10px] rounded-xl bg-ink px-[14px] py-[10px] text-[13px] text-white">
        <span>👋 Browsing as <b className="font-bold">guest</b> — swipe freely.</span>
        <button
          onClick={() => setGateOpen(true)}
          className="ml-auto shrink-0 rounded-full bg-orange px-[13px] py-[7px] text-[12.5px] font-bold text-white"
        >
          Sign in
        </button>
      </div>

      {/* Category chips */}
      <div className="mb-2 flex justify-center gap-2 overflow-x-auto pb-[6px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {CATS.map((c) => (
          <button
            key={c.id}
            onClick={() => pickCat(c.id)}
            className={`shrink-0 rounded-full border px-[15px] py-2 text-[13px] font-semibold transition-colors duration-150 ${
              cat === c.id
                ? "border-orange bg-orange-wash text-orange-deep"
                : "border-line bg-surface text-ink-soft"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Swipe deck */}
      <div className="mx-auto max-w-[420px]">
        <div className="relative h-[min(62vh,560px)] min-h-[430px] touch-pan-y">
          {queue.length === 0 && (
            <div className="absolute inset-0 grid place-items-center rounded-[22px] border-2 border-dashed border-line p-[30px] text-center text-ink-soft">
              <div>
                <h3 className="mb-[6px] text-[19px] text-ink">You&apos;ve seen everyone nearby</h3>
                <p>Change category or widen your area to see more chefs, bakers and pastry pros.</p>
                <button
                  onClick={() => pickCat(cat)}
                  className="mt-[14px] rounded-[11px] bg-ink px-5 py-[11px] font-bold text-white"
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
                  transform: `translateY(${depth * 10}px) scale(${1 - depth * 0.035})`,
                  zIndex: 10 - depth,
                  transition: "transform .3s ease, opacity .3s ease",
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
                  : { zIndex: 10, transition: "transform .3s ease, opacity .3s ease" };

            return (
              <div
                key={chef.name}
                className={`absolute inset-0 select-none overflow-hidden rounded-[22px] bg-surface shadow-[0_10px_34px_rgba(30,27,24,.16)] will-change-transform ${
                  isTop ? (drag ? "cursor-grabbing" : "cursor-grab") : ""
                }`}
                style={style}
                onPointerDown={isTop ? onPointerDown : undefined}
                onPointerMove={isTop ? onPointerMove : undefined}
                onPointerUp={isTop ? onPointerUp : undefined}
                onPointerCancel={isTop ? onPointerUp : undefined}
              >
                <div className="absolute inset-0 grid place-items-center" style={{ background: chef.gradient }}>
                  <span className="font-display text-[84px] font-extrabold text-white/85">{chef.initials}</span>
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.18)_0%,transparent_30%,transparent_45%,rgba(10,8,6,.86)_100%)]" />

                {isTop && (
                  <>
                    <div
                      className="absolute left-[18px] top-[60px] z-[5] -rotate-[14deg] rounded-[10px] border-4 border-[#4ADE80] px-[18px] py-[6px] font-display text-[32px] font-extrabold tracking-[.06em] text-[#4ADE80]"
                      style={{ opacity: bookOpacity }}
                    >
                      BOOK
                    </div>
                    <div
                      className="absolute right-[18px] top-[60px] z-[5] rotate-[14deg] rounded-[10px] border-4 border-[#F87171] px-[18px] py-[6px] font-display text-[32px] font-extrabold tracking-[.06em] text-[#F87171]"
                      style={{ opacity: passOpacity }}
                    >
                      PASS
                    </div>
                  </>
                )}

                <div className="absolute left-[14px] right-[14px] top-[14px] z-[3] flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-[3px] text-[11px] font-bold text-white backdrop-blur-[4px]">
                    {chef.catLabel}
                  </span>
                  <TierBadge tier={chef.tier} />
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-[3] p-[18px] text-white">
                  <div className="mb-2 inline-flex items-center gap-[5px] rounded-full bg-white/20 px-[11px] py-[5px] text-[14px] font-bold backdrop-blur-[4px]">
                    <span className="size-[14px] text-gold"><StarIcon /></span>
                    {chef.rating}
                  </div>
                  <h2 className="flex flex-wrap items-baseline gap-2 text-[26px] font-extrabold">
                    {chef.name} <span className="text-[17px] font-semibold text-white/75">{chef.age}</span>
                  </h2>
                  <div className="mt-[2px] text-[13.5px] font-semibold text-white/85">
                    {chef.exp} · from ₦{chef.price}/session
                  </div>
                  <div className="mt-[1px] text-[13px] text-white/70">{chef.loc}</div>
                  <div className="mt-[10px] flex flex-wrap gap-[6px]">
                    {chef.dishes.map((dish) => (
                      <span
                        key={dish}
                        className="rounded-full bg-white/15 px-[11px] py-[5px] text-[12px] font-semibold text-white backdrop-blur-[4px]"
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
                    className="absolute bottom-4 right-[14px] z-[4] grid size-[42px] place-items-center rounded-full bg-white/20 text-white backdrop-blur-[4px]"
                  >
                    <span className="size-5"><EyeIcon /></span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Deck actions */}
        <div className="mt-[18px] flex items-center justify-center gap-[22px]">
          <button
            onClick={undo}
            title="Undo"
            className="grid size-12 place-items-center rounded-full border border-line bg-surface text-ink-faint shadow-card transition-transform duration-150 hover:scale-[1.07]"
          >
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 7v6h6M3 13a9 9 0 1 0 3-7.7" />
            </svg>
          </button>
          <button
            onClick={() => flyTop(-1)}
            title="Pass"
            className="grid size-[60px] place-items-center rounded-full border border-line bg-surface text-red shadow-card transition-transform duration-150 hover:scale-[1.07]"
          >
            <svg className="size-[26px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
          <button
            onClick={() => flyTop(1)}
            title="Book"
            className="grid size-[70px] place-items-center rounded-full bg-orange text-white shadow-card transition-all duration-150 hover:scale-[1.07] hover:bg-orange-deep"
          >
            <span className="size-[26px]"><PotIcon /></span>
          </button>
          <button
            title="View profile"
            className="grid size-12 place-items-center rounded-full border border-line bg-surface text-ink-faint shadow-card transition-transform duration-150 hover:scale-[1.07]"
          >
            <span className="size-5"><EyeIcon /></span>
          </button>
        </div>
        <p className="mt-3 text-center text-[12.5px] text-ink-faint">
          Swipe right or tap the pot to book · swipe left to pass · tap the eye for full profile
        </p>
      </div>

      {/* Login gate modal */}
      {gateOpen && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center bg-[rgba(20,17,14,.55)] sm:items-center">
          <div className="w-full max-w-[420px] rounded-t-[22px] bg-surface px-[22px] pb-[30px] pt-[26px] text-center sm:rounded-[22px]">
            <div className="mx-auto mb-[14px] grid size-14 place-items-center rounded-2xl bg-orange-wash text-orange-deep">
              <svg className="size-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="11" width="16" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
            </div>
            <h2 className="text-[21px]">Sign in to keep going</h2>
            <p className="mb-[18px] mt-2 text-[14px] leading-[1.55] text-ink-soft">
              You&apos;ve found a chef you like! Create a free account to book, message and pay
              securely — it takes under a minute.
            </p>
            <button
              onClick={() => setGateOpen(false)}
              className="mb-[10px] flex h-[52px] w-full items-center justify-center rounded-[13px] bg-orange text-[15px] font-bold text-white transition-colors duration-150 hover:bg-orange-deep"
            >
              Sign in / Create account
            </button>
            <button onClick={() => setGateOpen(false)} className="p-2 text-[14px] font-semibold text-ink-faint">
              Keep browsing
            </button>
          </div>
        </div>
      )}

      {/* Tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto flex justify-around border-t border-line bg-surface pt-2 pb-[max(8px,env(safe-area-inset-bottom))] md:max-w-[520px] md:rounded-t-[18px] md:shadow-[0_-4px_20px_rgba(30,27,24,.08)]">
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
            className={`flex flex-col items-center gap-[3px] px-3 py-1 text-[11px] font-semibold ${
              active ? "text-orange" : "text-ink-faint"
            }`}
          >
            <svg className="size-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
          </button>
        ))}
      </nav>
    </div>
  );
}

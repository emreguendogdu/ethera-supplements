interface ViewToggleProps {
  isGridMode: boolean;
  onToggle: () => void;
}

export default function ViewToggle({ isGridMode, onToggle }: ViewToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 shrink-0 uppercase tracking-wide"
    >
      {isGridMode ? (
        <>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 2H14V14H2V2Z" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          Focus View
        </>
      ) : (
        <>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="2"
              y="2"
              width="5"
              height="5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <rect
              x="9"
              y="2"
              width="5"
              height="5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <rect
              x="2"
              y="9"
              width="5"
              height="5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <rect
              x="9"
              y="9"
              width="5"
              height="5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          Grid View
        </>
      )}
    </button>
  );
}


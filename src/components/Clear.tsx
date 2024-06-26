const BLINK_STYLE = {
  animation: "blink 3s infinite",
};

const KEYFRAMES_STYLE = `
      @keyframes blink {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0;
          animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
        }
      }
    `;

const Clear = (
  { showClear, fontSize, isDark = false }: {
    showClear: boolean;
    fontSize: number;
    isDark?: boolean;
  },
) => {
  return (
    <div
      className={`flex flex-col font-notoSerif`}
      style={{
        opacity: showClear ? 1 : 0,
        transition: "opacity 1s ease-in-out",
      }}
    >
      <div
        className={`flex justify-center ${
          !isDark ? "text-charcoal" : "text-lime"
        }`}
        style={{
          fontSize: String(fontSize * 0.3) + "px",
          fontWeight: 500,
        }}
      >
        Clear!
      </div>
      <style>{KEYFRAMES_STYLE}</style>
      <div
        className={`flex justify-center ${
          !isDark ? "text-charcoal" : "text-lime"
        }`}
        style={{
          fontSize: String(fontSize * 0.25) + "px",
          fontWeight: 500,
          ...BLINK_STYLE,
        }}
      >
        <span
          style={{
            letterSpacing: "-.2em",
            width: "2em",
            marginRight: ".5em",
          }}
        >
          ――
        </span>Press Space
        <span
          style={{
            letterSpacing: "-.2em",
            width: "2em",
            marginLeft: ".5em",
          }}
        >
          ――
        </span>
      </div>
    </div>
  );
};

export default Clear;

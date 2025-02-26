import { MdHome } from "react-icons/md";
import { Link } from "react-router-dom";
import { RiTwitterXFill } from "react-icons/ri";
import { COLOR } from "@/lib/const";

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
  { showClear, fontSize, isDark = false, sharedText }: {
    showClear: boolean;
    fontSize: number;
    isDark?: boolean;
    sharedText: string;
  },
) => {
  const iconColor = isDark ? COLOR.LIME : COLOR.CHARCOAL;
  return (
    <div>
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

        <div className="flex justify-center space-x-2 mt-3">
          <Link tabIndex={-1} to="/">
            <MdHome
              tabIndex={-1}
              className="w-9 h-9"
              color={iconColor}
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Home"
              data-tooltip-place="bottom"
            />
          </Link>
          <a
            href={`https://x.com/intent/post?url=https%3A%2F%haze-ii.kaiix.dev%2F&text=${
              encodeURI("謎解きゲーム『HAZE II』\n\n" + sharedText + "\n")
            }`}
            target="_blank"
            rel="noreferrer"
            tabIndex={-1}
            className="flex items-center justify-center"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Share on X"
            data-tooltip-place="bottom"
          >
            <RiTwitterXFill className="w-7 h-7" color={iconColor} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Clear;

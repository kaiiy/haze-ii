import { MdHome } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { SceneId } from "@/lib/storage";

interface NavProps {
  text: string;
  showClickMe?: boolean;
  shareText?: string;
  id?: SceneId;
  hideId?: boolean;
}

const Nav = ({ text, showClickMe, shareText, id, hideId }: NavProps) => {
  const twitterText = shareText || "謎解きゲーム『HAZE II』";
  return (
    <>
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 bg-white backdrop-blur-md shadow-sm p-4 px-4 border-b font-notoSans z-50 md:hidden">
        <div className="flex justify-between items-center">
          <Link tabIndex={-1} to="/">
            <span className="text-xl font-bold">HAZE II</span>{" "}
            {hideId ? "" : <span className="text-md font-bold">/ {id}</span>}
          </Link>
          <div className="flex gap-4 items-center">
            <a
              id="share-on-x-mobile"
              href={`https://x.com/intent/post?url=${
                encodeURIComponent("https://haze-ii.kaiix.dev/")
              }&text=${encodeURIComponent(twitterText)}&hashtags=${
                encodeURIComponent("ヘイズHAZE2")
              }`}
              target="_blank"
              rel="noreferrer"
              tabIndex={-1}
              className="flex items-center justify-center"
              data-tooltip-id={showClickMe ? "my-tooltip-clear" : "my-tooltip"}
              data-tooltip-content={showClickMe ? "Click Me" : "Share on X"}
              data-tooltip-place="bottom"
            >
              <RiTwitterXFill className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/kaiiy/haze-ii"
              target="_blank"
              rel="noreferrer"
              tabIndex={-1}
              className="flex items-center justify-center"
              data-tooltip-id="my-tooltip"
              data-tooltip-content="View Repository"
              data-tooltip-place="bottom"
            >
              <FaGithub className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-white backdrop-blur-md shadow-sm rounded-r-lg p-4 h-1/2 max-h-screen border-r overflow-hidden font-notoSans z-50 hidden md:block">
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-4">
            <Link tabIndex={-1} to="/">
              <MdHome
                tabIndex={-1}
                className="w-9 h-9"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Home"
                data-tooltip-place="right"
              />
            </Link>
            <a
              id="share-on-x"
              href={`https://x.com/intent/post?url=${
                encodeURIComponent("https://haze-ii.kaiix.dev/")
              }&text=${encodeURIComponent(twitterText)}&hashtags=${
                encodeURIComponent("ヘイズHAZE2")
              }`}
              target="_blank"
              rel="noreferrer"
              tabIndex={-1}
              className="flex items-center justify-center"
              data-tooltip-id={showClickMe ? "my-tooltip-clear" : "my-tooltip"}
              data-tooltip-content={showClickMe ? "Click Me" : "Share on X"}
              data-tooltip-place="right"
            >
              <RiTwitterXFill className="w-7 h-7" />
            </a>
            <a
              href="https://github.com/kaiiy/haze-ii"
              target="_blank"
              rel="noreferrer"
              tabIndex={-1}
              className="flex items-center justify-center"
              data-tooltip-id="my-tooltip"
              data-tooltip-content="View Repository"
              data-tooltip-place="right"
            >
              <FaGithub className="w-7 h-7" />
            </a>
            <hr />
          </div>

          <span
            className="inline-block"
            style={{
              writingMode: "vertical-lr",
              paddingLeft: "6px",
              paddingTop: "8px",
              paddingBottom: "6px",
              whiteSpace: "nowrap",
              fontSize: "24px",
              lineHeight: "24px",
            }}
          >
            {text}
          </span>
        </div>
      </div>
    </>
  );
};

export default Nav;

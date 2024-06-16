import { MdHome } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaCoffee } from "react-icons/fa";

interface NavProps {
  text: string;
}

const Nav = ({ text }: NavProps) => {
  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-white backdrop-blur-md shadow-sm rounded-r-lg p-4 h-1/2 max-h-screen border-r overflow-hidden font-notoSans">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-4">
          <Link tabIndex={-1} to="/">
            <MdHome
              className="w-9 h-9"
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Home"
              data-tooltip-place="right"
            />
          </Link>
          <a
            href="https://x.com/intent/post?url=https%3A%2F%2Fgithub.com%2Fkaiiy%2Fmist&text=MIST"
            target="_blank"
            rel="noreferrer"
            tabIndex={-1}
            className="flex items-center justify-center"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Share on X"
            data-tooltip-place="right"
          >
            <RiTwitterXFill className="w-7 h-7" />
          </a>
          <a
            href="https://github.com/kaiiy/mist"
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
          <a
            href="https://www.buymeacoffee.com/kaiiy"
            target="_blank"
            rel="noreferrer"
            tabIndex={-1}
            className="flex items-center justify-center"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Buy me a coffee"
            data-tooltip-place="right"
          >
            <FaCoffee className="w-8 h-8" />
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
  );
};

export default Nav;

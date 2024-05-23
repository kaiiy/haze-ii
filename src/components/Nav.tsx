import { MdHome } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

interface NavProps {
  text: string;
}

const Nav = ({ text }: NavProps) => {
  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-white backdrop-blur-md shadow-sm rounded-r-lg p-4 h-1/2 max-h-screen border-r overflow-hidden font-notoSans">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-4">
          <Link to="/">
            <MdHome
              className="w-10 h-10"
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Home"
              data-tooltip-place="right"
            />
          </Link>
          <a
            href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fkaiiy%mist&text=MIST"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-10 h-10"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Share on X"
            data-tooltip-place="right"
          >
            <RiTwitterXFill className="w-8 h-8" />
          </a>
          <a
            href="https://github.com/kaiiy/mist"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-10 h-10"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="View the repository"
            data-tooltip-place="right"
          >
            <FaGithub className="w-8 h-8" />
          </a>
          <hr />
        </div>

        <span
          className="text-3xl inline-block"
          style={{
            writingMode: "vertical-lr",
            paddingLeft: "0.3rem",
            paddingTop: "8px",
            paddingBottom: "6px",
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

export default Nav;

import { MdHome } from "react-icons/md";
import { Link } from "react-router-dom";

const ButtonIcon = () => {
  return <MdHome className="w-10 h-10" />;
};

const Nav = () => {
  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-white backdrop-blur-md shadow-sm rounded-r-lg p-4 h-1/2 max-h-screen border-r">
      <div className="flex flex-col gap-4">
        <span
          className="text-3xl inline"
          style={{
            writingMode: "vertical-lr",
            paddingLeft: "0.3rem",
          }}
        >
          SCENE 0
        </span>
        <hr />
        <Link to="/">
          <ButtonIcon />
        </Link>
      </div>
    </div>
  );
};

export default Nav;

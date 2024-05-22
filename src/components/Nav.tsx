import { MdHome } from "react-icons/md";

const ButtonIcon = () => {
  return <MdHome className="w-10 h-10" />;
};

const Nav = () => {
  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-white backdrop-blur-md shadow-sm rounded-r-lg p-4 h-1/2 max-h-screen flex flex-col justify-center border-r">
      <div className="flex flex-col items-center border">
        {/* https://zenn.dev/catnose99/scraps/a1379d162cb399  */}
        <span className="transform -rotate-90 mb-2 text-2xl border">
          Scene 0
        </span>
        <ButtonIcon />
      </div>
    </div>
  );
};

export default Nav;

import { Tooltip } from "react-tooltip";

const NavTooltip = () => (
  <Tooltip
    className="hidden md:block lg:block"
    id="my-tooltip"
    style={{
      zIndex: "calc(infinity)",
      backgroundColor: "#202020",
      color: "#f7f7f7",
    }}
  />
);

export default NavTooltip;

import { Tooltip } from "react-tooltip";
import { COLOR } from "@/lib/const";

const NavTooltip = () => (
  <Tooltip
    className="hidden md:block lg:block"
    id="my-tooltip"
    style={{
      zIndex: "calc(infinity)",
      backgroundColor: COLOR.CHARCOAL,
      color: COLOR.LIME,
    }}
  />
);

export default NavTooltip;

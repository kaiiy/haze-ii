import { Tooltip } from "react-tooltip";
import { COLOR } from "@/lib/const";

interface NavTooltipClearProps {
  show: boolean;
}

const NavTooltipClear = ({ show }: NavTooltipClearProps) => (
  <Tooltip
    className="hidden md:block lg:block"
    id="my-tooltip-clear"
    isOpen={show}
    style={{
      zIndex: "calc(infinity)",
      backgroundColor: COLOR.CHARCOAL,
      color: COLOR.LIME,
    }}
  />
);

export default NavTooltipClear;

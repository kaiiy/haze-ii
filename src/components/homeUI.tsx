import { Button } from "@/components/ui/button";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { SceneId, SceneStates } from "@/lib/storage";

const showLeftArrow = (currentPage: number, isDark: boolean) => {
  if (currentPage == 2) {
    return true;
  } else if (currentPage == 1 && !isDark) {
    return true;
  }

  return false;
};

const showRightArrow = (currentPage: number, isDark: boolean) => {
  if (currentPage == 0) {
    return true;
  } else if (currentPage == 1 && !isDark) {
    return true;
  }
  return false;
};

interface SwitchPageProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  isDark: boolean;
}

const SwitchPage = ({
  currentPage,
  setCurrentPage,
  isDark,
}: SwitchPageProps) => {
  return (
    <div className="flex justify-center items-center gap-1 font-notoSans">
      <Button
        variant="outline"
        size="icon"
        className={`${showLeftArrow(currentPage, isDark) ? "" : "invisible"}`}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        <MdOutlineChevronLeft size={24} />
      </Button>
      <span
        className={`${isDark ? "text-white" : "text-black"
          } text-[24px] leading-[36px] mt-[-4px] pt-0 pb-0 w-[24px] text-center justify-center font-medium`}
      >
        {"|".repeat(currentPage + 1)}
      </span>
      <Button
        variant="outline"
        size="icon"
        className={`${showRightArrow(currentPage, isDark) ? "" : "invisible"}`}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        <MdOutlineChevronRight size={24} />
      </Button>
    </div>
  );
};

interface SceneBoxProps {
  scene: string;
  isDark?: boolean;
  clear?: boolean;
}

const SceneBox = ({ scene, isDark, clear = false }: SceneBoxProps) => {
  return (
    <div
      className={`w-32 h-32 border ${!isDark
        ? "border-charcoal bg-white hover:text-lime hover:bg-charcoal text-charcoal"
        : "border-lime bg-[#070707] hover:text-charcoal hover:bg-lime text-lime"
        } text-center text-2xl flex items-center justify-center cursor-pointer transition duration-300 ${clear ? "border-[3px]" : ""
        }`}
    >
      {scene}
    </div>
  );
};

const isClear = (
  scene: SceneId,
  states: SceneStates,
) => {
  for (const state of states) {
    if (scene === state.id) {
      return state.checked;
    }
  }
  return false;
};

interface ScenesProps {
  scenes: Readonly<SceneId[]>;
  isDark?: boolean;
  states: SceneStates;
}

// TODO: 中央寄せ
const Scenes = ({ scenes, isDark, states }: ScenesProps) => {
  const gridColsClass = scenes.length === 1 ? "grid-cols-1" : "grid-cols-2 sm:grid-cols-4";

  return (
    <div className="flex justify-center">
      <div className={`inline-grid ${gridColsClass} gap-3 font-notoSerif mb-12`}>
        {scenes.map((scene, index) => (
          <Link
            to={`/${scene}`}
            key={index}
          >
            <SceneBox
              scene={scene}
              isDark={isDark}
              clear={isClear(scene, states)}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export { isClear as isSceneClear, SceneBox, Scenes, SwitchPage };

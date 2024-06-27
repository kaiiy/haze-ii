import ContainerBase from "@/components/ContainerBase";
import Nav from "@/components/Nav";
import NavTooltip from "@/components/NavTooltip";
import { Switch } from "@/components/ui/switch";
import Clear from "@/components/Clear";

import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

import { Checkbox } from "@/components/ui/checkbox";

import { vStorage } from "@/lib/storage";
import { useEffect, useState } from "react";

// temporary data
const sceneStates = [
  {
    title: "SCENE 7",
    checked: {
      light: true,
      dark: false,
    },
  },
  {
    title: "SCENE 8",
    checked: {
      light: true,
      dark: false,
    },
  },
  {
    title: "SCENE 9",
    checked: {
      light: true,
      dark: false,
    },
  },
];

interface SceneProps {
  baseSize: number;
  containerWidth: number;
}

const Scene = ({ containerWidth, baseSize }: SceneProps) => {
  const [isDark, setIsDark] = useState(false);
  const [showClear, _] = useState(false);

  const cellSize = baseSize * 6;
  const fontSize = cellSize / 2;

  const switchTheme = () => {
    vStorage.overwrite({
      theme: isDark ? "light" : "dark",
    });
    setIsDark(!isDark);
  };

  useEffect(() => {
    const storage = vStorage.load();
    setIsDark(storage.theme === "dark");
  }, []);

  return (
    <ContainerBase
      width={containerWidth}
      style={{
        minHeight: "100vh",
        position: "relative",
      }}
      isDark={isDark}
    >
      <NavTooltip />
      <Nav text="CHECKPOINT 2" />

      <div
        className="absolute w-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          zIndex: 10,
        }}
      >
        <div
          className={`font-notoSerif ${isDark ? "text-lime" : "text-charcoal"}`}
          style={{
            marginBottom: "80px",
          }}
        >
          <div
            className={`text-2xl border-b ${
              isDark ? "border-white" : "border-charcoal"
            } text-center mb-3`}
          >
            クリア条件
          </div>
          <div className="text-2xl text-center">
            すべてにチェックがつくこと
          </div>
        </div>

        {sceneStates.map((scene, index) => (
          <div
            className={`flex items-center space-x-4 justify-center mb-4 ${
              isDark ? "text-lime" : "text-charcoal"
            }`}
            key={index}
          >
            <Checkbox
              disabled
              checked={isDark ? scene.checked.dark : scene.checked.light}
              className={`${isDark ? "border-white" : ""}`}
            />
            <span
              style={{
                fontSize: "28px",
                lineHeight: "28px",
              }}
            >
              {scene.title}
            </span>
          </div>
        ))}

        <div
          className="flex items-center space-x-6 justify-center"
          style={{
            marginTop: "80px",
            marginBottom: "40px",
          }}
        >
          <CiLight size={36} color={`${isDark ? "#f7f7f7" : "#202020"}`} />
          <Switch
            checked={isDark}
            onClick={switchTheme}
            className="border-lime"
          />
          <MdDarkMode size={36} color={`${isDark ? "#f7f7f7" : "#202020"}`} />
        </div>

        <Clear showClear={showClear} fontSize={fontSize} isDark={isDark} />
      </div>
    </ContainerBase>
  );
};

export default Scene;

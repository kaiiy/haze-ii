import ContainerBase from "@/components/ContainerBase";
import Nav from "@/components/Nav";
import NavTooltip from "@/components/NavTooltip";
import { Switch } from "@/components/ui/switch";

import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

import { Checkbox } from "@/components/ui/checkbox";

import { vStorage } from "@/lib/storage";
import { useEffect, useState } from "react";

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

const Scene = ({ containerWidth }: SceneProps) => {
  const [isDark, setIsDark] = useState(false);

  const switchTheme = () => {
    vStorage.overwrite({
      theme: isDark ? "light" : "dark",
    });
    setIsDark(!isDark);
  };

  useEffect(() => {
    const storage = vStorage.load();
    setIsDark(storage.theme === "dark");
  }, [isDark]);

  return (
    <ContainerBase
      width={containerWidth}
      style={{
        minHeight: "100vh",
        position: "relative",
      }}
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
          className="font-notoSerif"
          style={{
            marginBottom: "80px",
          }}
        >
          <div className="text-2xl border-b border-charcoal text-center mb-3">
            クリア条件
          </div>
          <div className="text-2xl text-center">
            すべてにチェックがつくこと
          </div>
        </div>

        {sceneStates.map((scene, index) => (
          <div
            className="flex items-center space-x-4 justify-center mb-4"
            key={index}
          >
            <Checkbox
              disabled
              checked={isDark ? scene.checked.dark : scene.checked.light}
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
          }}
        >
          <CiLight size={36} />
          <Switch checked={isDark} onClick={switchTheme} />
          <MdDarkMode size={36} />
        </div>
      </div>
    </ContainerBase>
  );
};

export default Scene;

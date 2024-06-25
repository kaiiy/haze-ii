import ContainerBase from "./ContainerBase";

type ContainerProps = {
  children: React.ReactNode;
  width: number;
  isDark?: boolean;
};

const Container = ({ children, width, isDark }: ContainerProps) => {
  // undefinedの場合はfalseを設定
  const isDarkMode = isDark ?? false;
  return (
    <div
      className={`w-full min-h-screen ${
        isDarkMode ? "bg-charcoal" : "bg-lime"
      }`}
    >
      <ContainerBase
        width={width}
        style={{
          paddingTop: "80px",
          paddingBottom: "80px",
        }}
        isDark={isDarkMode}
      >
        {children}
      </ContainerBase>
    </div>
  );
};

export default Container;

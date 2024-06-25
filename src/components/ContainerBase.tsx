type ContainerProps = {
  children: React.ReactNode;
  width: number;
  style?: React.CSSProperties;
  isDark?: boolean;
};

const ContainerBase = ({ children, width, style, isDark }: ContainerProps) => {
  return (
    <div
      className={`flex justify-center w-screen ${
        isDark ? "bg-charcoal" : "bg-lime"
      }`}
      style={style}
    >
      <div
        className="h-full"
        style={{ width: String(width) + "px" }}
      >
        {children}
      </div>
    </div>
  );
};

export default ContainerBase;

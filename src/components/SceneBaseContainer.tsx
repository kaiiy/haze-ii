type ContainerProps = {
  children: React.ReactNode;
  width: number;
  isDark?: boolean;
};

const Container = ({ children, width, isDark }: ContainerProps) => {
  return (
    <div
      className={`flex justify-center w-screen ${isDark ? "bg-charcoal" : ""}`}
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

export default Container;

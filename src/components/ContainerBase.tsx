type ContainerProps = {
  children: React.ReactNode;
  width: number;
  style?: React.CSSProperties;
};

const ContainerBase = ({ children, width, style }: ContainerProps) => {
  return (
    <div className="flex justify-center w-screen" style={style}>
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

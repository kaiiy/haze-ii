type ContainerProps = {
  children: React.ReactNode;
  width: number;
};

const Container = ({ children, width }: ContainerProps) => {
  return (
    <div className="flex justify-center w-screen">
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

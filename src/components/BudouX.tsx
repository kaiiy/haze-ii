import { loadDefaultJapaneseParser } from "budoux";

interface BudouXProps {
  text: string;
}

const BudouX = ({ text }: BudouXProps) => {
  const parser = loadDefaultJapaneseParser();
  return (
    <span>
      {parser.parse(text).map((s, i) => (
        <span
          style={{
            display: "inline-block",
          }}
          key={i}
        >
          {s}
        </span>
      ))}
    </span>
  );
};

export default BudouX;

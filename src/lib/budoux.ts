import { loadDefaultJapaneseParser } from "budoux";
import React from "react";
const parser = loadDefaultJapaneseParser();

export const useBudouX = () => {
  const parse = (text: string) => {
    return parser.parse(text).map((s) =>
      React.createElement("span", { key: s }, s)
    );
  };
  return {
    parse,
  };
};

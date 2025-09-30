import React from "react";

const HeadWord = ({ HeadWord, color = "#ec1a63" }) => {
  return (
    <h2
      className="text-4xl font-extrabold mb-4 tracking-wide drop-shadow"
      style={{ color }}
    >
      {HeadWord}
    </h2>
  );
};

export default HeadWord;

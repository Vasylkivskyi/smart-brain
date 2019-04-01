import React from "react";

const Rank = (props) => {
  return (
    <div>
      <div className="white f3 center">{`${props.name}, your current entry count is...`}</div>
      <div className="white f1 center">{props.entries}</div>
    </div>
  );
};

export default Rank;

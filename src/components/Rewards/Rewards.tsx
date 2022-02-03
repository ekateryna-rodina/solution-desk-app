import React from "react";
import { default as RewardIcon } from "../icons/RewardIcon";

type RewardsProps = {
  count: number;
};
const Rewards = ({ count = 0 }: RewardsProps) => {
  console.log(count);
  return (
    <div className="flex justify-between items-center gap-2">
      {Array(4)
        .fill(null)
        .map((r, i) => (
          <RewardIcon key={i} fill={"fill-yellow-400/80"} />
        ))}
    </div>
  );
};

export default Rewards;

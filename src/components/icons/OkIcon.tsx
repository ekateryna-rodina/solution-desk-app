import React from "react";
import { IconProps } from "../../types";

const OkIcon = ({ fill }: IconProps) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_304_193)">
        <path
          d="M10 0C4.47717 0 0 4.47717 0 10C0 15.5228 4.47717 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47717 15.5228 0 10 0ZM10 2.17285C14.3228 2.17285 17.8259 5.67827 17.8259 10C17.8259 14.3218 14.3228 17.8259 10 17.8259C5.67717 17.8259 2.17407 14.3218 2.17407 10C2.17408 5.67827 5.67717 2.17285 10 2.17285ZM13.8318 5.25147L8.03588 11.0486L6.156 9.1687L4.31152 11.012L6.1914 12.8919L8.04808 14.7485L9.89137 12.9041L15.6885 7.10815L13.8318 5.25147V5.25147Z"
          className={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_304_193">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default OkIcon;

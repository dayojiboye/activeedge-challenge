import React from "react";
import "./styles.scss";

const CustomTextarea = ({ ...props }) => {
  return (
    <div className="custom-text-area">
      <textarea {...props} />
    </div>
  );
};

export default CustomTextarea;

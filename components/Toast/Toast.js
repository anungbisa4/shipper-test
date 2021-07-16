import { useState } from "react";

const Toast = ({ value }) => (
  <>
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <p>{value}</p>
      </div>
    </div>
  </>
);

export default Toast;

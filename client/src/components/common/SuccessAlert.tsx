import React from "react";
import { ISuccessAlert } from "../../interfaces/common";

export const SuccessAlert: React.FC<ISuccessAlert> = ({ message }) => {
  return (
    <div className="alert alert-success" role="alert">
      {message}! You will be redirected to show collections page in 5 seconds...
    </div>
  );
};

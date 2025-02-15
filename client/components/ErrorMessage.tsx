import { Typography } from "@mui/material";
import React, { FC } from "react";

interface ErrorMessageProps {
  textContent: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ textContent }) => {
  return (
    <Typography fontSize={12} color={"error"} marginTop={1}>
      {textContent}
    </Typography>
  );
};

export default ErrorMessage;

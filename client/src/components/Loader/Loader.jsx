import { CircularProgress } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <CircularProgress isIndeterminate color="green.300" />
    </div>
  );
};

export default Loader;

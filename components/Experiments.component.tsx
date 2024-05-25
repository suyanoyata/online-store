/* eslint-disable react/display-name */
import React from "react";

const Experiment = ({
  children,
  state,
}: {
  children: React.ReactNode;
  state: boolean;
}) => {
  return <>{state && children}</>;
};

export default Experiment;

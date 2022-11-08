import React from "react";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "../Layout";
import { Main, PoW } from "./Pages";

const index = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Main />} />
        <Route path="pow" element={<PoW />} />
      </Route>
    </Routes>
  );
};

export default index;

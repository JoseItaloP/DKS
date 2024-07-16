import React from "react";
import { Route, Routes } from "react-router-dom";
import TypeNewPost from "./TypeNewPost";
import NewDebate from "./NewDebate";
import NewGeneral from "./NewGeneral";
import NewRule from "./NewRule";
import NewResume from './NewResume'

const NewPost = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<TypeNewPost />} />
        <Route path="/NewResume" element={<NewResume />} />
        <Route path="/NewDebate" element={<NewDebate />} />
        <Route path="/NewRule" element={<NewRule />} />
        <Route path="/NewGeneral" element={<NewGeneral />} />
      </Routes>
    </>
  );
};

export default NewPost;

import React, { useEffect, useState } from "react";
import useFirebase from "./useFirebase";
import { useNavigate } from "react-router-dom";

const useNewPost = () => {
  const navigate = useNavigate();
  const [NewPost, setNewPost] = useState(null);
  const {
    CreatDebatePost,
    CreatGeneralPost,
    CreatRulePost,
    CreatResulmySystemPost,
    setUpdate,
  } = useFirebase();

  const nav = () => {
    navigate("/DKS");
  };

  const newElement = (value) => {
    setNewPost(value);
  };

  useEffect(() => {
    if (NewPost) {
      switch (NewPost.Id) {
        case "NewGeneralPost":
          CreatGeneralPost(
            NewPost.TituloP,
            NewPost.GeneralTxT,
            NewPost.UserName,
            NewPost.UserId,
            NewPost.ImgUrl
          );
          break;

        case "NewDebatePost":
          CreatDebatePost(
            NewPost.TituloP,
            NewPost.DebateTxT,
            NewPost.UserName,
            NewPost.UserId
          );
          setUpdate("DEBATE");
          break;

        case "NewResumePost":
          CreatResulmySystemPost(
            NewPost.TituloP,
            NewPost.ResumeTxT,
            NewPost.CI,
            NewPost.UserId,
            NewPost.UserName,
            NewPost.ImgUrl,
            NewPost.GeS,
          );
          break;

        case "NewRulePost":
          CreatRulePost(
            NewPost.TituloP,
            NewPost.RuleTxT,
            NewPost.SyR,
            NewPost.UserId,
            NewPost.UserName,
            NewPost.ImgUrl
          );
          break;

        default:
          break;
      }
      nav();
    }
  }, [NewPost]);

  return {
    newElement,
  };
};

export default useNewPost;

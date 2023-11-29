import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { RouteHistoryContext } from "@/contexts/routeHistoryContext";
import { useNavigate, NavigateFunction } from "react-router-dom";

import { CreateBtnBar } from "./CreateBackBar";

import axios from "axios";

export function CreateBlogPage() {
  const { setRouteHistory } = useContext(RouteHistoryContext);

  useEffect(() => {
    setRouteHistory((prevHistory: string[]) => [...prevHistory, "/createBlog"]);
  }, []);

  const navigate = useNavigate();

  const handleGoBack = async () => {
    navigate(-1);
  };

  const [titleValue, setTitleValue] = useState("Title");
  const [contentValue, setContentValue] = useState("Content");

  const handleTitleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setTitleValue(e.target.value);
  };

  const handleContentChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContentValue(e.target.value);
  };

  const { createBlog, createLoading } = useCreateBlog(
    titleValue,
    contentValue,
    navigate,
  );

  return (
    <motion.div
      className="w-[100vw] h-[100vh] grid place-items-center"
      initial={{ x: 1000 }}
      animate={{ x: 0 }}
      exit={{ x: 1000 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex gap-2">
        <CreateBtnBar
          backFunc={handleGoBack}
          createLoading={createLoading}
          createBlog={() => {
            if (titleValue !== "" && contentValue !== "") {
              createBlog();
            }
          }}
        ></CreateBtnBar>
        <div className="flex flex-col  rounded-lg dark:bg-opacity-90 py-2 px-10 border-2 light:border-black shadow-sm w-[35vw] h-[87vh] overflow-hidden">
          <textarea
            rows={1}
            maxLength={25}
            spellCheck="false"
            onChange={handleTitleChange}
            value={titleValue}
            className="w-[25vw] blue mx-auto text-2xl font-bold text-center ghost-input"
          />
          <h3 className="text-center text-sm">By Me</h3>
          <textarea
            spellCheck="false"
            onChange={handleContentChange}
            value={contentValue}
            rows={21}
            maxLength={1000}
            className="w-[30vw] mt-2 mx-auto ghost-input"
          />
        </div>
      </div>
    </motion.div>
  );
}

const useCreateBlog = (
  title: string,
  content: string,
  navigate: NavigateFunction,
) => {
  const createBlogLocally = () => {
    const myBlogs = localStorage.getItem("myBlogs");
    if(myBlogs !== null){
      const storedBlogs = JSON.parse(myBlogs) || [];
      if (Array.isArray(JSON.parse(storedBlogs))) {
        const updatedBlogs = storedBlogs.push({
          author: localStorage.getItem("username"),
          title: title,
          content: content,
        });
        localStorage.setItem("myBlogs", JSON.stringify(updatedBlogs));
      }
    }
  };

  const [createLoading, setCreateLoading] = useState(false);

  const createBlog = async () => {
    console.log("ran");
    setCreateLoading(true);
    try {
      const data = {
        author: localStorage.getItem("username"),
        title: title,
        content: content,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      await axios.post(
        `http://localhost:3000/posts`,
        data,
        config,
      );
      createBlogLocally();
      setCreateLoading(false);
      navigate("/creater-interface/blogs");
    } catch (err) {
      console.log(err);
    }
  };

  return { createBlog, createLoading };
};

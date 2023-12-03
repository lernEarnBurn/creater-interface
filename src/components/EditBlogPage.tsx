import { PageAnimation } from "./PageAnimation";
import { EditBtnBar } from "./EditBackBar";
import { Alert } from "./Alert";
import { AnimatePresence } from "framer-motion";

import { RouteHistoryContext } from "@/contexts/routeHistoryContext";
import { useEffect, useState, useContext } from "react";
import axios from "axios";

import { Blog } from "./MyBlogMenu";
import { useNavigate, NavigateFunction } from "react-router-dom";

export function EditBlogPage() {
  //this is done to ensure to ensure a clean aimation transition and avoid another query
  const storedBlogData = localStorage.getItem("selectedMyBlog");
  const blogData = storedBlogData ? JSON.parse(storedBlogData) : null;

  const navigate = useNavigate();

  const handleGoBack = async () => {
    navigate(-1);
    await saveBlog(false);
  };

  const [titleValue, setTitleValue] = useState(blogData?.title);
  const [contentValue, setContentValue] = useState(blogData?.content);

  const handleTitleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setTitleValue(e.target.value);
  };

  const handleContentChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContentValue(e.target.value);
  };

  useUpdateBlogLocally(titleValue, contentValue, blogData);

  //have a saved thing pop up (shadcn might have an easy out of the box solution)
  const { loadingSave, saveBlog, showAlert } = useUpdateBlogOnDb(
    blogData,
    titleValue,
    contentValue,
  );

  const { deleteBlog, deleteLoading } = useDeleteBlog(blogData, navigate);

  const { setRouteHistory } = useContext(RouteHistoryContext);

  useEffect(() => {
    setRouteHistory((prevHistory: string[]) => [...prevHistory, "/editBlog"]);
  }, []);

  return (
    <div className="scroller h-[100.01vh]">
      <section className="h-[100vh] w-[100vw] grid place-items-center">
        <AnimatePresence>{showAlert && <Alert />}</AnimatePresence>
        <PageAnimation>
          <div className="flex flex-col z-10 rounded-lg dark:bg-opacity-90 py-2 px-10 border-2 light:border-black shadow-sm w-[35vw] h-[87vh] overflow-hidden">
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
              rows={21}
              maxLength={1000}
              value={contentValue}
              className="w-[30vw] mt-2 mx-auto ghost-input"
            />
          </div>
          <EditBtnBar
            loadingSave={loadingSave}
            deleteLoading={deleteLoading}
            deleteFunc={deleteBlog}
            backFunc={handleGoBack}
            saveFunc={() => saveBlog(true)}
          ></EditBtnBar>
        </PageAnimation>
      </section>
    </div>
  );
}

const useUpdateBlogOnDb = (
  blogData: Blog,
  titleValue: string,
  contentValue: string,
) => {
  const [loadingSave, setLoadingSave] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const saveBlog = async (shouldShowAlert: boolean) => {
    setLoadingSave(true);
    const token = localStorage.getItem("token");

    try {
      console.log("saving blog...");
      await axios.put(
        `https://fierce-dawn-84888-34f3e45a7f77.herokuapp.com/posts/${blogData._id}`,
        { newTitle: titleValue, newContent: contentValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setLoadingSave(false);
      if (shouldShowAlert) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 900);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { loadingSave, saveBlog, showAlert };
};

const useUpdateBlogLocally = (
  titleValue: string,
  contentValue: string,
  blogData: Blog,
) => {
  useEffect(() => {
    return () => {
      const myBlogs = localStorage.getItem("myBlogs");
      if(myBlogs !== null){
        const storedBlogs = JSON.parse(myBlogs) || [];
        if (storedBlogs.length > 0) {
          const indexToUpdate = storedBlogs.findIndex(
            (blog: Blog) => blog._id === blogData._id,
          );
          if (indexToUpdate !== -1 && indexToUpdate < storedBlogs.length) {
            storedBlogs[indexToUpdate].title = titleValue;
            storedBlogs[indexToUpdate].content = contentValue;
            localStorage.setItem("myBlogs", JSON.stringify(storedBlogs));
          }
        }
      }
    };
  }, [titleValue, contentValue, blogData]);
};

const useDeleteBlog = (blogData: Blog, navigate: NavigateFunction) => {
  const [deleteLoading, setDeleteLoading] = useState(false);

  const deleteBlogLocally = () => {
    const myBlogs = localStorage.getItem("myBlogs");
    if(myBlogs !== null){
      const storedBlogs = JSON.parse(myBlogs) || [];
      const updatedBlogs = storedBlogs.filter(
        (blog: Blog) => blog._id !== blogData._id,
      );
      localStorage.setItem("myBlogs", JSON.stringify(updatedBlogs));
    }
  };

  const deleteBlog = async () => {
    setDeleteLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://fierce-dawn-84888-34f3e45a7f77.herokuapp.com/posts/${blogData._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      deleteBlogLocally();
      setDeleteLoading(false);
      navigate("/creater-interface/blogs");
    } catch (err) {
      console.log(err);
    }
  };

  return { deleteBlog, deleteLoading };
};

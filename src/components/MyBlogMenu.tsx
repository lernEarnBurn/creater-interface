import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FilePlus } from "lucide-react";
import { BlogSkeleton } from "./ui/BlogSkeleton";

import { motion } from "framer-motion";

import { RouteHistoryContext } from "@/contexts/routeHistoryContext";

export interface Blog {
  _id: string;
  author: User;
  content: string;
  title: string;
}

export interface User {
  _id: string;
  username: string;
  password: string;
}

export function MyBlogMenu() {
  const { blogs, loading } = useFetchMyBlogs();

  const navigate = useNavigate();
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);
  //to catch up the itemsRef
  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, blogs.length);
  }, [blogs]);

  function transitionToBlogPage(blog: Blog, index: number): void {
    if (itemsRef.current && itemsRef.current[index]) {
      itemsRef.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    const updatedBlogs = [
      blog,
      ...blogs.slice(0, index),
      ...blogs.slice(index + 1),
    ];

    localStorage.setItem("myBlogs", JSON.stringify(updatedBlogs));
    localStorage.setItem("selectedMyBlog", JSON.stringify(blog));

    setTimeout(() => {
      navigate(`/creater-interface/blogs/${blog._id}`);
    }, 350);
  }

  const [animateToCreateBlog, setAnimateToCreateBlog] = useState(false);

  function toCreateBlog() {
    setAnimateToCreateBlog(true);
    navigate("/creater-interface/blogs/create-blog");
  }

  const { routeHistory, setRouteHistory } = useContext(RouteHistoryContext);
  const [animate] = useState(
    routeHistory[routeHistory.length - 1] === "/createBlog",
  );

  useEffect(() => {
    setRouteHistory((prevHistory: string[]) => [...prevHistory, "/myBlogMenu"]);
  }, []);

  return (
    <>
      <div className="fix-bg-bug"></div>
      <motion.div
        className="top-div relative top-24 flex flex-col gap-4 overflow-y-auto min-h-[100vh] min-w-[99vw]  items-center pb-10"
        initial={animate ? { x: -1000 } : {}}
        animate={animate ? { x: 0 } : {}}
        exit={animateToCreateBlog ? { x: -1000 } : {}}
        transition={{ duration: 0.3 }}
      >
        {!loading ? (
          blogs.map((blog, index) => (
            <div
              ref={(elem) => (itemsRef.current[index] = elem)}
              onClick={() => transitionToBlogPage(blog, index)}
              className="z-10 rounded-lg dark:bg-opacity-90 mt-[4.5vh] py-2 px-10 border-2 light:border-black shadow-sm w-[35vw] h-[87vh] overflow-hidden"
              key={index}
            >
              <h2 className="text-center text-2xl">
                <strong>{blog.title}</strong>
              </h2>
              <h3 className="text-center text-sm">By Me</h3>
              <p className="mt-2 text-md h-[31.5em] w-[30vw]">{blog.content}</p>
            </div>
          ))
        ) : (
          <BlogSkeleton />
        )}

        {!loading && (
          <div
            onClick={toCreateBlog}
            className="z-10 rounded-lg dark:bg-opacity-90 mt-[4.5vh] py-2 px-10 border-2 light:border-black shadow-sm w-[35vw] h-[87vh] overflow-hidden"
          >
            <FilePlus className="blue w-[30vw] h-[80vh]" />
          </div>
        )}
      </motion.div>
    </>
  );
}

function useFetchMyBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);

  console.log(`blogs: ${blogs}`);

  useEffect(() => {
    const getMyBlogs = async () => {
      const storedBlogs = localStorage.getItem("myBlogs");
      const userString = localStorage.getItem("user");

      if (storedBlogs && Array.isArray(JSON.parse(storedBlogs))) {
        setBlogs(JSON.parse(storedBlogs));
      } else {
        try {
          if (userString) {
            const user = JSON.parse(userString);
            setLoading(true);
            const response = await axios.get(
              `http://localhost:3000/posts/${user._id}`,
            );
            setBlogs(response.data);
            setLoading(false);
          }
        } catch (err) {
          console.log(err);
        }
      }
    };

    getMyBlogs();
    console.log(`blogs: ${blogs}`);
  }, []);

  return { blogs, loading };
}

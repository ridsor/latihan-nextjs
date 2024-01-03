"use client";

import { useEffect } from "react";
import styles from "./postPage.module.css";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { postSelectors } from "@/redux/features/postSlice";
import { store } from "@/redux/store";
import { getPosts } from "@/redux/features/postSlice";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function Post() {
  // throw new Error("Something went wrong!");

  const posts = useAppSelector<Post[]>(postSelectors.selectAll);

  useEffect(() => {
    store.dispatch(getPosts());
  }, []);

  return (
    <>
      <h1 className={styles.bgRed}>Post</h1>
      <div className="flex gap-2 flex-col">
        {posts.map((post) => (
          <div key={post.id}>
            <i>{post.title}</i>
            <p>{post.body}</p>
            <Link
              href={`/posts/${post.id}`}
              className="px-3 py-2 bg-blue-500 rounded-md text-white"
            >
              Detail
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

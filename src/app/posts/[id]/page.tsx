"use client";

import { postSelectors } from "@/redux/features/postSlice";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";

interface Props {
  params: {
    id: number;
  };
}

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function DetailPost(props: Props) {
  const post = useAppSelector((state) =>
    postSelectors.selectById(state, props.params.id)
  );

  return (
    <div>
      <i>{post?.title}</i>
      <p>{post?.body}</p>
      <Link
        href={`/posts`}
        className="px-3 py-2 bg-blue-500 rounded-md text-white">
        Back
      </Link>
    </div>
  );
}

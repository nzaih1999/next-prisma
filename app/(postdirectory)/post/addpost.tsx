"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function AddPosts() {
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const addPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const body = {
      title: formData.get("title") as string,
    };
    if (body.title === "") {
      throw new Error("Post cannot be empty");
    }
    const response = await fetch(`/api/post`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.refresh();
    ref.current!.value = "";
    console.log(response);
  };
  return (
    <div className="flex items-center justify-center py-5">
      <div>
        <form action="" onSubmit={addPost} className="flex items-center gap-1">
          <input
            ref={ref}
            placeholder="What's Happening?"
            name="title"
            className="w-full border border-yellow-500 textarea textarea-lg md:h-[100px]"
          />
          <button
            type="submit"
            className="px-4 py-3 font-semibold text-white bg-purple-600 border-none rounded-md outline-none hover:bg-purple-400 active:bg-purple-500"
          >
            {" "}
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

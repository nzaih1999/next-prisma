import Link from "next/link";
import Avatar from "../Avatar";
import { relativeDate } from "@/utils/utils";
import { Heart, MessageSquare } from "lucide-react";

type Props = {
  title: string;
  content?: string;
  id: string;
  date: string;
  name: string;
  userId: string;
  image: string;
  commentNumber: number;
};

export default function ProfilePostCard({
  title,
  id,
  date,
  name,
  userId,
  image,
  commentNumber,
}: Props) {
  return (
    <Link href={`/post/${id}`} className="p-4 mx-2 my-3 border rounded ">
      <div className="flex items-center justify-between gap-1 ">
        <div className="flex items-center gap-1">
          <Avatar image={image!} name={name!} />
          <div className="font-semibold ">{name!}</div>
        </div>
        <small className="flex items-center text-sm font-normal text-yellow-500 ">
          {relativeDate(date)}
        </small>
      </div>
      <div className="mx-12">
        <p className="px-1 font-medium text-purple-600">{title}</p>
      </div>
      <div className="flex items-center justify-between py-3 px-[50px]">
        <p className="flex items-center gap-1">
          <MessageSquare />
          {commentNumber}
        </p>
        <Heart />
      </div>
    </Link>
  );
}
import { prisma } from "@/lib/prisma";
import RetweetClient from "./bookmarkClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Book } from "lucide-react";
import BookmarkClient from "./bookmarkClient";

type Props = {
  postId: string;
};
export default async function BookMarkButton({ postId }: Props) {
  const session = await getServerSession(authOptions);
  const currentEmail = session?.user?.email;
  const currentUserId = await prisma.user
    .findUnique({
      where: {
        email: currentEmail!,
      },
    })
    .then((user) => user?.id);

  const isBookmarked = await prisma.bookmark.findFirst({
    where: {
      authorId: currentUserId,
      postId: postId,
    },
    include: {
      user: true,
    },
  });

  return (
    <BookmarkClient
      userId={currentUserId!}
      id={isBookmarked?.id!}
      isBookmarked={!!isBookmarked}
      postId={postId}
      bookmarkedUserId={isBookmarked?.user.id!}
    />
  );
}

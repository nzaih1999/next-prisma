import { getServerSession } from "next-auth";
import SideBarLinks from "./SideBarLinks";
import { BiHomeCircle } from "react-icons/bi";
import { prisma } from "@/lib/prisma";
import { RxAvatar } from "react-icons/rx";
import { LuEdit } from "react-icons/lu";
import LogoutButton from "./LogoutButton";
import { authOptions } from "@/utils/auth";

export default async function SideBar() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  const userId = await prisma.user

    ?.findFirst({
      where: {
        email: session?.user?.email!,
      },
    })
    .then((user) => user?.id);
  return (
    <>
      {session && (
        <div className="fixed lg:px-16 md:px-4 sm:px-4">
          <SideBarLinks
            href="/"
            text="Home"
            icon={<BiHomeCircle className="text-2xl text-purple-500" />}
          />
          <SideBarLinks
            href={`/profile/${userId}`}
            text="Profile"
            icon={<RxAvatar className="text-2xl text-purple-500" />}
          />
          <SideBarLinks
            href={`/editprofile/${userId}`}
            text="Edit Profile"
            icon={<LuEdit className="text-2xl text-purple-500" />}
          />
          <div className="px-4 py-4">
            <LogoutButton />
          </div>
        </div>
      )}
    </>
  );
}

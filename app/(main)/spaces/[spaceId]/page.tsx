"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

const Space = () => {
  const pathname = usePathname();
  const spaceId = pathname.split("/")[2];
  return <div>{spaceId}</div>;
};

export default Space;

"use client";

import { useRouter } from "next/navigation";

export default function SpaceCard({
  spaceName,
  spaceId,
  createdAt,
  active,
}: {
  spaceName: string;
  spaceId: string;
  createdAt: string;
  active: boolean;
}) {
  const router = useRouter();
  return (
    <div
      className="border-2 border-gray-200 py-4 rounded-xl w-64 px-2 hover:cursor-pointer"
      onClick={() => {
        router.push(`/spaces/${spaceId}`);
      }}
    >
      <div className="flex justify-between">
        <p className="text-gray-400">Space Name</p>
        <p className="font-bold">{spaceName}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-400">Created At</p>
        <p>{createdAt}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-400">Space ID</p>
        <p>{spaceId.substring(0, 8)}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-400">Active</p>
        <p className="text-sm items-center">{active ? "🟢" : "🔴"}</p>
      </div>
    </div>
  );
}

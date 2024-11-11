import { BsPlus } from "react-icons/bs";
import CreateNewSpaceModal from "./SapceModal";
import SpaceCard from "./SpaceCard";
import { useState } from "react";
import { Space } from "@/app/_types";

export default function SpacesSection({ mySpaces }: { mySpaces: Space[] }) {
  console.log(mySpaces);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className=" border-2 py-2 px-4 rounded-xl ">
      <div className=" flex justify-between items-center">
        <h1 className="text-xl font-semibold">Your recent spaces</h1>
        <button
          className="p-1 hover:scale-105 transition  rounded-xl text-2xl"
          onClick={openModal}
        >
          <BsPlus />
        </button>
        {isModalOpen && <CreateNewSpaceModal closeModal={closeModal} />}
      </div>
      <div className="grid grid-cols-4 gap-12 my-4">
        {mySpaces.map((space) => (
          <SpaceCard
            key={space.id}
            spaceId={space.id}
            createdAt={space.createdAt.toDateString()}
            spaceName={space.spaceName || ""}
            active={space.active}
          />
        ))}
      </div>
    </div>
  );
}

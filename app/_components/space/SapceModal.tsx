import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CreateNewSpaceModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const [spaceName, setSpaceName] = useState("");
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white shadow-lg p-8 w-80 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Create a space</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="spaceName" className="">
            Space Name
          </label>
          <input
            type="text"
            name=""
            id="spaceName"
            value={spaceName}
            onChange={(e) => {
              setSpaceName(e.target.value);
            }}
            className="bg-gray-200 w-64 py-1 text-sm px-2"
          />
        </div>
        <div className="flex mt-12 gap-6">
          <button
            onClick={async () => {
              const result = await axios.post("/api/space", {
                spaceName,
                active: true,
              });
              if (result.status === 200) {
                toast.success(result.data.message);
              } else {
                toast.error(result.data.message);
              }
              closeModal();
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-xl "
          >
            Submit
          </button>
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-red-500 text-white rounded-xl "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

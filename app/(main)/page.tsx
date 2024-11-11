"use client";
import React, { useEffect, useState } from "react";
import { getCurrentUserSpaces } from "../actions/getCurrentUserSpaces";

import SpacesSection from "../_components/space/SpaceSection";
import { Space } from "../_types";

const Dashboard = () => {
  const [mySpaces, setMySpaces] = useState<Space[] | undefined>([]);
  const [lodaing, setLoading] = useState(false);

  useEffect(() => {
    async function getSpaces() {
      setLoading(true);
      const spaces = await getCurrentUserSpaces();
      setMySpaces(spaces as Space[]);
      setLoading(false);
    }
    getSpaces();
  }, []);

  if (lodaing) {
    return <p>Loading...</p>;
  }
  console.log(mySpaces);
  return (
    <div className=" w-full flex flex-col gap-y-4 p-2">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      {mySpaces && <SpacesSection mySpaces={mySpaces} />}
      <div className="border-2 p-2 rounded-xl ">
        <div>
          <h1 className="text-xl font-semibold">Spaces</h1>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Dashboard;

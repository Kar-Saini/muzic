-- CreateTable
CREATE TABLE "Space" (
    "id" TEXT NOT NULL,
    "spaceName" TEXT,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "Space_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SpaceToStream" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SpaceToStream_AB_unique" ON "_SpaceToStream"("A", "B");

-- CreateIndex
CREATE INDEX "_SpaceToStream_B_index" ON "_SpaceToStream"("B");

-- AddForeignKey
ALTER TABLE "Space" ADD CONSTRAINT "Space_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpaceToStream" ADD CONSTRAINT "_SpaceToStream_A_fkey" FOREIGN KEY ("A") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpaceToStream" ADD CONSTRAINT "_SpaceToStream_B_fkey" FOREIGN KEY ("B") REFERENCES "Stream"("id") ON DELETE CASCADE ON UPDATE CASCADE;

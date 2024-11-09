/*
  Warnings:

  - Added the required column `type` to the `Stream` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StreamType" AS ENUM ('Youtube', 'Spotify');

-- AlterTable
ALTER TABLE "Stream" ADD COLUMN     "type" "StreamType" NOT NULL;

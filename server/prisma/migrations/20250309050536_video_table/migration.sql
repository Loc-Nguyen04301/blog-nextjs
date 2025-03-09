/*
  Warnings:

  - You are about to drop the column `thumnail` on the `Video` table. All the data in the column will be lost.
  - Made the column `duration` on table `Video` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "thumnail",
ALTER COLUMN "duration" SET NOT NULL;

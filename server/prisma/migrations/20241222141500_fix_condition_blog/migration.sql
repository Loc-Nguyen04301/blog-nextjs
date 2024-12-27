/*
  Warnings:

  - You are about to drop the column `name` on the `Blog` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Blog` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "name";

-- CreateIndex
CREATE UNIQUE INDEX "Blog_title_key" ON "Blog"("title");

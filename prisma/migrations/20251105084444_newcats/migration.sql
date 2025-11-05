/*
  Warnings:

  - You are about to drop the column `email` on the `Cats` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Cats` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Cats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cats" DROP COLUMN "email",
DROP COLUMN "image",
DROP COLUMN "password",
ALTER COLUMN "url" DROP NOT NULL;

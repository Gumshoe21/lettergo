/*
  Warnings:

  - You are about to drop the column `username2` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_username2_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "username2";

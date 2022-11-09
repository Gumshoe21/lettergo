/*
  Warnings:

  - A unique constraint covering the columns `[username2]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "username2" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_username2_key" ON "users"("username2");

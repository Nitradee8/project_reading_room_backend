/*
  Warnings:

  - You are about to alter the column `content` on the `product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(500)` to `VarChar(300)`.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `content` VARCHAR(300) NOT NULL;

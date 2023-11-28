/*
  Warnings:

  - Made the column `content` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `content` VARCHAR(500) NOT NULL;

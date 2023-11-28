/*
  Warnings:

  - You are about to drop the column `imageId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the `image` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `image` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_imageId_fkey`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `imageId`,
    ADD COLUMN `content` VARCHAR(191) NULL,
    ADD COLUMN `image` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE `image`;

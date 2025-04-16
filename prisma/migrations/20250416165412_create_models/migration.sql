/*
  Warnings:

  - You are about to drop the column `improvementTips` on the `Assessment` table. All the data in the column will be lost.
  - Made the column `status` on table `CoverLetter` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Assessment" DROP COLUMN "improvementTips",
ADD COLUMN     "improvementTip" TEXT;

-- AlterTable
ALTER TABLE "CoverLetter" ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'draft';

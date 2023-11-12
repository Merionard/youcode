/*
  Warnings:

  - You are about to drop the column `description` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Lesson` table. All the data in the column will be lost.
  - Added the required column `content` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rank` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LessonState" AS ENUM ('HIDDEN', 'PUBLISHED', 'PUBLIC');

-- CreateEnum
CREATE TYPE "Progress" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_userId_fkey";

-- DropIndex
DROP INDEX "Lesson_name_key";

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "description",
DROP COLUMN "image",
DROP COLUMN "userId",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "courseId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "rank" TEXT NOT NULL,
ADD COLUMN     "state" "LessonState" NOT NULL DEFAULT 'HIDDEN';

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "presentation" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LessonOnUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "progress" "Progress" NOT NULL DEFAULT 'NOT_STARTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LessonOnUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseOnUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "canceledAt" TIMESTAMP(3),

    CONSTRAINT "CourseOnUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LessonOnUser_userId_lessonId_key" ON "LessonOnUser"("userId", "lessonId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseOnUser_userId_courseId_key" ON "CourseOnUser"("userId", "courseId");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonOnUser" ADD CONSTRAINT "LessonOnUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonOnUser" ADD CONSTRAINT "LessonOnUser_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseOnUser" ADD CONSTRAINT "CourseOnUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseOnUser" ADD CONSTRAINT "CourseOnUser_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

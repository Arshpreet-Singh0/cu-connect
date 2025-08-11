-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('student', 'mentor');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profileImage" TEXT,
    "role" "public"."Role" NOT NULL,
    "department" TEXT NOT NULL,
    "yearOfGraduation" INTEGER,
    "bio" VARCHAR(500),
    "skills" TEXT[],
    "overallRankScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SocialLinks" (
    "id" TEXT NOT NULL,
    "linkedin" TEXT,
    "github" TEXT,
    "portfolio" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SocialLinks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CodingProfiles" (
    "id" TEXT NOT NULL,
    "leetcodeUser" TEXT,
    "codeforcesUser" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CodingProfiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ChatbotHistory" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ChatbotHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SocialLinks_userId_key" ON "public"."SocialLinks"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CodingProfiles_userId_key" ON "public"."CodingProfiles"("userId");

-- AddForeignKey
ALTER TABLE "public"."SocialLinks" ADD CONSTRAINT "SocialLinks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CodingProfiles" ADD CONSTRAINT "CodingProfiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChatbotHistory" ADD CONSTRAINT "ChatbotHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

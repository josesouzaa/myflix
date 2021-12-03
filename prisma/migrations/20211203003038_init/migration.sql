-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Favorite" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "genres" TEXT,
    "release_date" TEXT NOT NULL,
    "vote_average" INTEGER NOT NULL,
    "poster_path" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "userUuid" TEXT,
    CONSTRAINT "Favorite_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User" ("uuid") ON DELETE SET NULL ON UPDATE CASCADE
);

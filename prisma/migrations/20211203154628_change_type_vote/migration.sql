/*
  Warnings:

  - You are about to alter the column `vote_average` on the `Favorite` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Favorite" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "genres" TEXT,
    "release_date" TEXT NOT NULL,
    "vote_average" REAL NOT NULL,
    "poster_path" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "userUuid" TEXT,
    CONSTRAINT "Favorite_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User" ("uuid") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Favorite" ("genres", "id", "overview", "poster_path", "release_date", "title", "userUuid", "uuid", "vote_average") SELECT "genres", "id", "overview", "poster_path", "release_date", "title", "userUuid", "uuid", "vote_average" FROM "Favorite";
DROP TABLE "Favorite";
ALTER TABLE "new_Favorite" RENAME TO "Favorite";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

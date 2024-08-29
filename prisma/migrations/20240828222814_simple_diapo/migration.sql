/*
  Warnings:

  - You are about to drop the column `subtitle` on the `Diapo` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Diapo` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Diapo` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Diapo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Diapo" ("createdAt", "id", "path") SELECT "createdAt", "id", "path" FROM "Diapo";
DROP TABLE "Diapo";
ALTER TABLE "new_Diapo" RENAME TO "Diapo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

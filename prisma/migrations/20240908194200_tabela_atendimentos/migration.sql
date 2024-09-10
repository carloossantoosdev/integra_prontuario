/*
  Warnings:

  - You are about to drop the column `attendant` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `birthDate` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `lastAppointmentDate` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `observations` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `procedures` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `appointments` table. All the data in the column will be lost.
  - Added the required column `atendente` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `condutas` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_nascimento` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_primeiro_atendimento` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_ultimo_atendimento` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor` to the `appointments` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_appointments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "data_nascimento" DATETIME NOT NULL,
    "data_primeiro_atendimento" DATETIME NOT NULL,
    "data_ultimo_atendimento" DATETIME NOT NULL,
    "valor" REAL NOT NULL,
    "condutas" TEXT NOT NULL,
    "observacoes" TEXT,
    "atendente" TEXT NOT NULL
);
INSERT INTO "new_appointments" ("id") SELECT "id" FROM "appointments";
DROP TABLE "appointments";
ALTER TABLE "new_appointments" RENAME TO "appointments";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

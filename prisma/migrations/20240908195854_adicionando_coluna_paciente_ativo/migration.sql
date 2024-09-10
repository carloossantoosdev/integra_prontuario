/*
  Warnings:

  - Added the required column `ativo` to the `appointments` table without a default value. This is not possible if the table is not empty.

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
    "ativo" BOOLEAN NOT NULL,
    "atendente" TEXT NOT NULL
);
INSERT INTO "new_appointments" ("atendente", "condutas", "data_nascimento", "data_primeiro_atendimento", "data_ultimo_atendimento", "id", "nome", "observacoes", "valor") SELECT "atendente", "condutas", "data_nascimento", "data_primeiro_atendimento", "data_ultimo_atendimento", "id", "nome", "observacoes", "valor" FROM "appointments";
DROP TABLE "appointments";
ALTER TABLE "new_appointments" RENAME TO "appointments";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

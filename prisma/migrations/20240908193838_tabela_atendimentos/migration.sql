/*
  Warnings:

  - You are about to drop the `Appointment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Appointment";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "appointments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "startDate" DATETIME NOT NULL,
    "lastAppointmentDate" DATETIME NOT NULL,
    "value" REAL NOT NULL,
    "procedures" TEXT NOT NULL,
    "observations" TEXT,
    "attendant" TEXT NOT NULL
);

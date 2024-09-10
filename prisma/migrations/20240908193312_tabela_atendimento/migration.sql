-- CreateTable
CREATE TABLE "Appointment" (
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

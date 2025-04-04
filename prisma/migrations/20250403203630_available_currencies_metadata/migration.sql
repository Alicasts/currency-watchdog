-- CreateTable
CREATE TABLE "AvailableCurrency" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AvailableCurrencyMetadata" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "updatedAt" DATETIME NOT NULL
);

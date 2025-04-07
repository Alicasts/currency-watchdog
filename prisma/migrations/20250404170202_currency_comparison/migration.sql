-- CreateTable
CREATE TABLE "CurrencyComparison" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "codein" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "high" TEXT NOT NULL,
    "low" TEXT NOT NULL,
    "varBid" TEXT NOT NULL,
    "pctChange" TEXT NOT NULL,
    "bid" TEXT NOT NULL,
    "ask" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,
    "createDate" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CurrencyHistoricalData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "comparisonId" TEXT NOT NULL,
    "high" TEXT NOT NULL,
    "low" TEXT NOT NULL,
    "varBid" TEXT NOT NULL,
    "pctChange" TEXT NOT NULL,
    "bid" TEXT NOT NULL,
    "ask" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,
    CONSTRAINT "CurrencyHistoricalData_comparisonId_fkey" FOREIGN KEY ("comparisonId") REFERENCES "CurrencyComparison" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

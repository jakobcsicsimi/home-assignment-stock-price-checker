-- CreateTable
CREATE TABLE "Stock" (
    "id" INTEGER NOT NULL,
    "symbol" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Stock_symbol_date_idx" ON "Stock"("symbol", "date");

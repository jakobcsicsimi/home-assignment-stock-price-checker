import { Stock } from 'prisma/generated/client';

export const calculateStockPriceAverage = ({
  stockRecords,
}: {
  stockRecords: Stock[];
}) => {
  if (!stockRecords.length) {
    return 0;
  }

  const sum = stockRecords.reduce(
    (accumulatedAverage, record) => accumulatedAverage + record.price,
    0,
  );

  const rounded = Math.round((sum / stockRecords.length) * 100) / 100;

  return rounded;
};

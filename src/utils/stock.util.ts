import { Stock } from 'prisma/generated/client';

export const calculateStockPriceAverage = ({
  stockRecords,
}: {
  stockRecords: Stock[];
}) => {
  return stockRecords.reduce(
    (accumulatedAverage, record) => accumulatedAverage + record.price,
    0,
  );
};

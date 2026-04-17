import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class StockSymbolParamDto {
  @IsString()
  @ApiProperty({ type: String })
  @Transform(({ value }: { value: string }) => value.toUpperCase())
  symbol!: string;
}

export class StockCountQueryParamDto {
  @ApiPropertyOptional({ type: Number })
  @Type(() => Number)
  count!: number;
}

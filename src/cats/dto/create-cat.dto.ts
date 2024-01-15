import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';
import { Breed } from 'src/breeds/entities/breed.entity';

export class CreateCatDto {
  @IsString()
  name: string;

  @IsInt()
  @IsPositive()
  age: number;

  @IsString()
  @IsOptional()
  breed: string;
}

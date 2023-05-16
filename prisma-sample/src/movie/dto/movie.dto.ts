import { IsString } from 'class-validator';

export class MovieDto implements Readonly<MovieDto> {
  @IsString()
  title: string;

  @IsString()
  year: string;

  @IsString()
  director: string;

  @IsString()
  plot: string;
}

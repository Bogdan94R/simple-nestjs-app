import { plainToClass } from 'class-transformer';
import { IsNotEmpty, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsNotEmpty()
  POSTGRES_HOST!: string;

  @IsNotEmpty()
  POSTGRES_PORT!: string;

  @IsNotEmpty()
  POSTGRES_DB!: string;

  @IsNotEmpty()
  POSTGRES_USER!: string;

  @IsNotEmpty()
  POSTGRES_PASSWORD!: string;

  @IsNotEmpty()
  DATABASE_URL!: string;
}

export function validate(
  config: Record<string, unknown>,
): EnvironmentVariables {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

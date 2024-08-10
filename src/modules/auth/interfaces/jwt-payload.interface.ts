import { Role } from '@db-prisma-client';

export interface IJwtPayload {
  sub: number;
  role: Role;
}

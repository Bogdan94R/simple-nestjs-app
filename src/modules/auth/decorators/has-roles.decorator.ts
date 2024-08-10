import { SetMetadata } from '@nestjs/common';
import { Role } from '@db-prisma-client';

export const HasRoles = (...roles: Role[]) => SetMetadata('roles', roles);

import { User } from '@/user/entities/user.entity';
import { Integration } from './integration.entity';
import { IntegrationSession } from '@/core/types';
import { Tenant } from '@/tenant/entities/tenant.entity';
export declare class IntegrationState {
    id: number;
    tenantId?: number;
    userId?: number;
    user: User;
    tenant: Tenant;
    integration: Integration;
    session: IntegrationSession;
    createdAt: Date;
    updatedAt: Date;
}

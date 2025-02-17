export declare class PasswordResetToken {
    id: number;
    token: string;
    expiresAt: Date;
    consumed?: boolean;
    consumedAt?: Date;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

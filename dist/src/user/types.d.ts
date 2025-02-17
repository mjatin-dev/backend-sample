export declare enum UserType {
    SUPER_ADMIN = "super_admin",
    PLATFORM_USER = "admin",
    TENANT_USER = "owner",
    USER = "user"
}
export declare enum Gender {
    MALE = "mail",
    FEMALE = "female",
    OTHER = "other"
}
export interface UserContactInfoCreationAttributes {
    userId: number;
    phoneNumber?: string;
    mobileNumber?: string;
}
export interface UserContactInfoUpdateAttributes {
    phoneNumber?: string;
    mobileNumber?: string;
}
export declare enum AddressType {
    MAILING = "mailing",
    BUSINESS = "business"
}

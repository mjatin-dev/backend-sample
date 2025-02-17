import { KMS } from 'aws-sdk';
export declare class KmsManagerService {
    kms: KMS;
    constructor();
    encrypt(keyId: any, source: any): Promise<string>;
    decrypt(source: any): Promise<string>;
}

import { KMS } from 'aws-sdk';

export class KmsManagerService {
  kms;

  constructor() {
    this.kms = new KMS({ region: process.env.AWS_DEFAULT_REGION });
  }

  async encrypt(keyId: string, source: string) {
    const params = {
      KeyId: keyId,
      Plaintext: source,
    };
    const { CiphertextBlob } = await this.kms.encrypt(params).promise();
    return (CiphertextBlob || '').toString('base64');
  }

  async decrypt(source: string) {
    const params = {
      CiphertextBlob: Buffer.from(source, 'base64'),
    };
    const { Plaintext } = await this.kms.decrypt(params).promise();
    return (Plaintext || '').toString();
  }
}

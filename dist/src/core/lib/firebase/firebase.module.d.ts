import { DynamicModule } from '@nestjs/common';
import { IFirebaseModuleOptions } from './types';
export declare class FirebaseModule {
    static forRoot(options: IFirebaseModuleOptions): DynamicModule;
}

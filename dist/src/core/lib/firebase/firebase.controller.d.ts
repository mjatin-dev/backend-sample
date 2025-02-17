import { IFirebaseProvider } from './types';
export declare class FirebaseController {
    private readonly firebase;
    constructor(firebase: IFirebaseProvider);
    index(): Promise<void>;
}

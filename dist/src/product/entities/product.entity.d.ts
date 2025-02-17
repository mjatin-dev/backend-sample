import { User } from '@/user/entities/user.entity';
import { ProductCategory, ProductCurrency, ProductRateChargeType } from '../types';
export declare class Product {
    productId: number;
    productName: string;
    description: string;
    category: ProductCategory;
    rateChargeType: ProductRateChargeType;
    currency: ProductCurrency;
    price: number;
    createdBy: number;
    isActive: boolean;
    createDate: Date;
    productCreator: User;
}

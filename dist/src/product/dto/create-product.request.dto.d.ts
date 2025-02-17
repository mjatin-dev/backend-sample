import { ProductCategory, ProductCurrency, ProductRateChargeType } from '../types';
export declare class CreateProductRequestDto {
    productName: string;
    description: string;
    category: ProductCategory;
    rateChargeType: ProductRateChargeType;
    currency: ProductCurrency;
    price: number;
}

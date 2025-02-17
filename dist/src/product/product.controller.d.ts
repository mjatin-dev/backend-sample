import { ProductService } from './product.service';
import { CreateProductRequestDto } from './dto/create-product.request.dto';
import { UpdateProductRequestDto } from './dto/update-product-request.dto';
import { SuccessResponseObject } from '../common/http';
import { IAuthedUser } from '@/auth/types';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    createProduct(authedUser: IAuthedUser, body: CreateProductRequestDto): Promise<SuccessResponseObject>;
    updateProduct(authedUser: IAuthedUser, id: number, body: UpdateProductRequestDto): Promise<SuccessResponseObject>;
    getProducts(authedUser: IAuthedUser): Promise<SuccessResponseObject>;
    getProduct(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
    deleteProduct(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
}

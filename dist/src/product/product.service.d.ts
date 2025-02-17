import { CreateProductRequestDto } from './dto/create-product.request.dto';
import { ProductResponseDto } from './dto/product.response.dto';
import { UpdateProductRequestDto } from './dto/update-product-request.dto';
import { ProductRepository } from './repositories/product.repository';
export declare class ProductService {
    private readonly productRepository;
    constructor(productRepository: ProductRepository);
    create(data: CreateProductRequestDto, userId: number): Promise<ProductResponseDto>;
    findOne(id: number, companyId: number): Promise<ProductResponseDto>;
    update(id: number, data: UpdateProductRequestDto, companyId: number): Promise<void>;
    findAll(companyId: number): Promise<ProductResponseDto[]>;
    delete(id: number, companyId: number): Promise<void>;
}

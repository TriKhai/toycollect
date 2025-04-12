package com.ct201.toycollect.service.imp;

import com.ct201.toycollect.dto.ProductStatisticsDTO;
import com.ct201.toycollect.dto.product.ProductDTO;
import com.ct201.toycollect.dto.product.ProductPageDTO;
import com.ct201.toycollect.dto.product.ProductSimpleDTO;
import com.ct201.toycollect.payload.request.ProductRequest;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

public interface ProductService {

    ProductPageDTO getProducts(int page, int size);
    List<ProductDTO> getAllProducts();
    ProductDTO findById(Integer id);
    boolean addProduct(MultipartFile fileImage,
                       String name,
                       String manufactureDate,
                       int stock,
                       String description,
                       double price,
                       String color,
                       String rarity,
                       String material,
                       String versionProduct,
                       int ageRecommendation,
                       double length,
                       double width,
                       double height,
                       double weight,
                       int brandId,
                       int promotionId,
                       int typeId);

    boolean updateProduct(int id, MultipartFile fileImage,
                       String name,
                       String manufactureDate,
                       int stock,
                       String description,
                       double price,
                       String color,
                       String rarity,
                       String material,
                       String versionProduct,
                       int ageRecommendation,
                       double length,
                       double width,
                       double height,
                       double weight,
                       int brandId,
                       int promotionId,
                       int typeId);
    void deleteProduct(int id);

    List<ProductSimpleDTO> getLatestProducts(int limit);
    long getCountProducts();
    long getCountProductsInStock();
    long getCountProductsSold();
}

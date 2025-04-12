package com.ct201.toycollect.controller;

import com.ct201.toycollect.dto.product.ProductDTO;
import com.ct201.toycollect.dto.product.ProductPageDTO;
import com.ct201.toycollect.dto.product.ProductSimpleDTO;
import com.ct201.toycollect.payload.ResponseData;
import com.ct201.toycollect.payload.request.ProductRequest;
import com.ct201.toycollect.service.imp.FileService;
import com.ct201.toycollect.service.imp.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    ProductService productService;

    @Autowired
    FileService fileService;

    @GetMapping("")
    public ResponseEntity<?> getAllProducts(@RequestParam(defaultValue = "0") int page,
                                            @RequestParam(defaultValue = "8") int size) {
        ResponseData responseData = new ResponseData();
        try {
            ProductPageDTO products = productService.getProducts(page, size);

            // If no products found
            if (products == null || products.getProducts().isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            // Set response data
            responseData.setData(products);
            responseData.setStatus(200);
            responseData.setSuccess(true);
            responseData.setDescription("Products retrieved successfully");

            return new ResponseEntity<>(responseData, HttpStatus.OK);

        } catch (Exception e) {
            // Log the error
            System.out.println("Error retrieving products" + e);

            // Set error response
            responseData.setStatus(500);
            responseData.setSuccess(false);
            responseData.setDescription("An error occurred while retrieving products");
            responseData.setData(null);

            return new ResponseEntity<>(responseData, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get-detail")
    public ResponseEntity<?> getProductDetail(@RequestParam int id) {
        System.out.println("getProductDetail: "+ id);
        ResponseData responseData = new ResponseData();
        ProductDTO productDetail = productService.findById(id);
        if(productDetail == null) {
            responseData.setStatus(404);
            responseData.setSuccess(false);
            responseData.setDescription("Product not found");
            responseData.setData(null);
            return new ResponseEntity<>(responseData, HttpStatus.NOT_FOUND);
        }
        responseData.setData(productDetail);
        responseData.setStatus(200);
        responseData.setSuccess(true);
        responseData.setDescription("Product details retrieved successfully");
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/latest")
    public ResponseEntity<?> getLatestProducts() {
        ResponseData responseData = new ResponseData();
        List<ProductSimpleDTO> latestProducts = productService.getLatestProducts(6);

        if (latestProducts == null || latestProducts.isEmpty()) {
            responseData.setSuccess(false);
            responseData.setData(null);
            responseData.setStatus(HttpStatus.NOT_FOUND.value());
            responseData.setDescription("No products found.");
            return new ResponseEntity<>(responseData, HttpStatus.NOT_FOUND);
        }

        responseData.setSuccess(true);
        responseData.setData(latestProducts);
        responseData.setStatus(HttpStatus.OK.value());
        responseData.setDescription("Successfully retrieved the latest products.");
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PostMapping("/add-product")
    public ResponseEntity<?> addProduct( @RequestParam(value = "fileImage", required = false) MultipartFile fileImage,
            @RequestParam String name,
            @RequestParam(value = "manufactureDate", required = true) String manufactureDate,
            @RequestParam int stock,
            @RequestParam String description,
            @RequestParam double price,
            @RequestParam String color,
            @RequestParam String rarity,
            @RequestParam String material,
            @RequestParam String versionProduct,
            @RequestParam int ageRecommendation,
            @RequestParam double length,
            @RequestParam double width,
            @RequestParam double height,
            @RequestParam double weight,
            @RequestParam int brandId,
            @RequestParam int promotionId,
            @RequestParam int typeId)
    {
        ResponseData responseData = new ResponseData();
        boolean success = productService.addProduct(fileImage, name, manufactureDate,
         stock,
         description,
         price,
         color,
         rarity,
         material,
         versionProduct,
         ageRecommendation,
         length,
         width,
         height,
         weight,
         brandId,
         promotionId,
         typeId);
        responseData.setData(success);
        responseData.setStatus(201);
        responseData.setSuccess(true);
        responseData.setDescription("Product added successfully");
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PutMapping("/update-product/{id}")
    public ResponseEntity<?> updateProduct( @PathVariable("id") int id,
                                            @RequestParam(value = "fileImage", required = false) MultipartFile fileImage,
                                            @RequestParam String name,

                                            @RequestParam String manufactureDate,
                                            @RequestParam int stock,
                                            @RequestParam String description,
                                            @RequestParam double price,
                                            @RequestParam String color,
                                            @RequestParam String rarity,
                                            @RequestParam String material,
                                            @RequestParam String versionProduct,
                                            @RequestParam int ageRecommendation,
                                            @RequestParam double length,
                                            @RequestParam double width,
                                            @RequestParam double height,
                                            @RequestParam double weight,
                                            @RequestParam int brandId,
                                            @RequestParam int promotionId,
                                            @RequestParam int typeId) {
            ResponseData responseData = new ResponseData();
            System.out.println(fileImage);
            boolean isUpdated = productService.updateProduct(id, fileImage, name,
                    manufactureDate,
                    stock,
                    description,
                    price,
                    color,
                    rarity,
                    material,
                    versionProduct,
                    ageRecommendation,
                    length,
                    width,
                    height,
                    weight,
                    brandId,
                    promotionId,
                    typeId);
            if(!isUpdated) {
                responseData.setStatus(404);
                responseData.setSuccess(false);
                responseData.setDescription("Product not found");
                responseData.setData(null);
            }
            responseData.setStatus(200);
            responseData.setSuccess(true);
            responseData.setDescription("Product updated successfully");
            return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @DeleteMapping("/delete-product")
    public ResponseEntity<?> deleteProduct(@RequestParam int id) {
        try {
            productService.deleteProduct(id); // Gọi service xử lý xóa
            return ResponseEntity.ok(new ResponseData(true, 200, "Product deleted successfully"));
        } catch (RuntimeException e) {
            // Return 409 if foreign key constraint issue occurs
            if (e.getMessage().contains("referenced in order details")) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(new ResponseData(false, 409, e.getMessage()));
            }
            // For general errors
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseData(false, 400, e.getMessage()));
        }
    }

    // Không cần thiết vì đã lưu file vào static
    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = fileService.loadFile(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }




}

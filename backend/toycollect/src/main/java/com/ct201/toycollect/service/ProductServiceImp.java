package com.ct201.toycollect.service;

import com.ct201.toycollect.dto.AddressDTO;
import com.ct201.toycollect.dto.ContactDTO;
import com.ct201.toycollect.dto.ProductStatisticsDTO;
import com.ct201.toycollect.dto.product.*;
import com.ct201.toycollect.entity.Brand;
import com.ct201.toycollect.entity.Product;
import com.ct201.toycollect.entity.ProductType;
import com.ct201.toycollect.entity.Promotion;
import com.ct201.toycollect.payload.request.ProductRequest;
import com.ct201.toycollect.repository.*;
import com.ct201.toycollect.service.imp.FileService;
import com.ct201.toycollect.service.imp.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductServiceImp implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private ProductTypeRepository productTypeRepository;

    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private FileService fileService;

    private Date parseDate(String dateStr) {
        // Try parsing with different formats in order
        List<String> formats = Arrays.asList("yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd"); // Include flexible formats
        for (String format : formats) {
            try {
                SimpleDateFormat sdf = new SimpleDateFormat(format);
                sdf.setLenient(false); // Strict parsing
                return sdf.parse(dateStr);
            } catch (ParseException ignored) {
                // Ignore and try the next format
            }
        }
        return null; // Return null if no format matched
    }

    @Override
    public ProductPageDTO getProducts(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("id"));
        Page<Product> productPage = productRepository.findAll(pageRequest);

        if(productPage.isEmpty()) {
            return null;
        }

        List<ProductSimpleDTO> listProductDTO = new ArrayList<>();
        for (Product product : productPage.getContent()) {
            ProductSimpleDTO productDTO = new ProductSimpleDTO();

            productDTO.setId(product.getId());
            productDTO.setName(product.getName());
            productDTO.setStock(product.getStock());
            productDTO.setPrice(product.getPrice());
            productDTO.setImage(product.getImage());
            if(product.getPromotion() != null) {
                productDTO.setDiscount(product.getPromotion().getPercent());
            }


            listProductDTO.add(productDTO);
        }


        return new ProductPageDTO(
                listProductDTO,     // Danh sách sản phẩm
                productPage.getTotalPages(),    // Tổng số trang
                productPage.getTotalElements(), // Tổng số bản ghi
                productPage.getSize(),          // Số bản ghi mỗi trang
                productPage.getNumber()         // Trang hiện tại (bắt đầu từ 0)
        );
    }

    @Override
    public List<ProductDTO> getAllProducts() {
        List<ProductDTO> listProductDTO = new ArrayList<>();
        List<Product> productOptional = productRepository.findAll();
        if(productOptional.isEmpty()) {
            return null;
        }
        for (Product product : productOptional) {
            ProductDTO productDTO = new ProductDTO();
            DimetionsProductDTO dimetions = new DimetionsProductDTO();
            AttributesProductDTO attributes = new AttributesProductDTO();

            BrandProductDTO brand = new BrandProductDTO();
            TypeProductDTO type = new TypeProductDTO();
            PromotionProductDTO promotion = new PromotionProductDTO();

            productDTO.setId(product.getId());
            productDTO.setName(product.getName());
            productDTO.setManufactureDate(product.getManufactureDate());
            productDTO.setStock(product.getStock());
            productDTO.setPrice(product.getPrice());
            productDTO.setDescription(product.getDescription());
            productDTO.setImage(product.getImage());
            productDTO.setSold(product.getSold());

            dimetions.setLength(product.getLength());
            dimetions.setWidth(product.getWidth());
            dimetions.setHeight(product.getHeight());
            dimetions.setWeight(product.getWeight());

            attributes.setColor(product.getColor());
            attributes.setRarity(product.getRarity());
            attributes.setMaterial(product.getMaterial());
            attributes.setVersionProduct(product.getVersionProduct());
            attributes.setAgeRecommendation(product.getAgeRecommendation());

            productDTO.setCreatedAt(product.getCreatedAt() != null ? Date.from(product.getCreatedAt()) : null);
            productDTO.setUpdatedAt(product.getUpdatedAt() != null ? Date.from(product.getUpdatedAt()) : null);

            if(product.getBrand() != null) {
                AddressDTO address = new AddressDTO();
                address.setCommune(product.getBrand().getCommune());
                address.setCountry(product.getBrand().getCountry());
                address.setDistrict(product.getBrand().getDistrict());
                address.setProvince(product.getBrand().getProvince());
                address.setStreet(product.getBrand().getStreet());

                ContactDTO contact = new ContactDTO();
                contact.setEmail(product.getBrand().getEmail());
                contact.setPhone(product.getBrand().getPhone());

                brand.setName(product.getBrand().getName());
                brand.setAddress(address);
                brand.setContact(contact);

            }

            if(product.getPromotion() != null) {
                promotion.setName(product.getPromotion().getName());
                promotion.setPercent(product.getPromotion().getPercent());
                promotion.setDescription(product.getPromotion().getDescription());
            }

            if(product.getProductType() != null) {
                type.setName(product.getProductType().getName());
                type.setTheme(product.getProductType().getTheme());
                type.setDescription(product.getProductType().getDescription());
            }

            productDTO.setBrand(brand);
            productDTO.setPromotion(promotion);
            productDTO.setType(type);

            productDTO.setAttributes(attributes);
            productDTO.setDimetions(dimetions);

            listProductDTO.add(productDTO);
        }
        return listProductDTO;
    }


    @Override
    public ProductDTO findById(Integer id) {
        ProductDTO productDTO = new ProductDTO();
        Optional<Product> productOptional = productRepository.findById(id);
        if(productOptional.isEmpty()) {
            return null;
        }
        Product product = productOptional.get();
        DimetionsProductDTO dimetions = new DimetionsProductDTO();
        AttributesProductDTO attributes = new AttributesProductDTO();

        BrandProductDTO brand = new BrandProductDTO();
        TypeProductDTO type = new TypeProductDTO();
        PromotionProductDTO promotion = new PromotionProductDTO();

        productDTO.setId(product.getId());
        productDTO.setName(product.getName());
        productDTO.setManufactureDate(product.getManufactureDate());
        productDTO.setStock(product.getStock());
        productDTO.setPrice(product.getPrice());
        productDTO.setDescription(product.getDescription());
        productDTO.setImage(product.getImage());

        dimetions.setLength(product.getLength());
        dimetions.setWidth(product.getWidth());
        dimetions.setHeight(product.getHeight());
        dimetions.setWeight(product.getWeight());

        attributes.setColor(product.getColor());
        attributes.setRarity(product.getRarity());
        attributes.setMaterial(product.getMaterial());
        attributes.setVersionProduct(product.getVersionProduct());
        attributes.setAgeRecommendation(product.getAgeRecommendation());

        productDTO.setCreatedAt(product.getCreatedAt() != null ? Date.from(product.getCreatedAt()) : null);
        productDTO.setUpdatedAt(product.getUpdatedAt() != null ? Date.from(product.getUpdatedAt()) : null);

        if(product.getBrand() != null) {
            AddressDTO address = new AddressDTO();
            address.setCommune(product.getBrand().getCommune());
            address.setCountry(product.getBrand().getCountry());
            address.setDistrict(product.getBrand().getDistrict());
            address.setProvince(product.getBrand().getProvince());
            address.setStreet(product.getBrand().getStreet());

            ContactDTO contact = new ContactDTO();
            contact.setEmail(product.getBrand().getEmail());
            contact.setPhone(product.getBrand().getPhone());

            brand.setName(product.getBrand().getName());
            brand.setAddress(address);
            brand.setContact(contact);

        }

        if(product.getPromotion() != null) {
            promotion.setName(product.getPromotion().getName());
            promotion.setPercent(product.getPromotion().getPercent());
            promotion.setDescription(product.getPromotion().getDescription());
        }

        if(product.getProductType() != null) {
            type.setName(product.getProductType().getName());
            type.setTheme(product.getProductType().getTheme());
            type.setDescription(product.getProductType().getDescription());
        }

        productDTO.setBrand(brand);
        productDTO.setPromotion(promotion);
        productDTO.setType(type);

        productDTO.setAttributes(attributes);
        productDTO.setDimetions(dimetions);

        return productDTO;
    }

    @Override
    public boolean addProduct(MultipartFile fileImage,
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
                              int typeId) {
        try {
            String nameFile = null; // Variable to store the file name

            // Only attempt to process the file if it's not null and contains data
            if (fileImage != null && !fileImage.isEmpty()) {
                nameFile = fileService.createNameFile(fileImage);
                boolean isSuccess = fileService.saveProduct(fileImage, nameFile);
                if (!isSuccess) {
                    return false;
                }
            }

            // Check and parse the `manufactureDate` if provided
            Date date = null; // Default to null if no date is provided
            if (manufactureDate != null && !manufactureDate.trim().isEmpty()) {
                date = parseDate(manufactureDate);

                if (date == null) {
                    throw new IllegalArgumentException("Invalid manufactureDate format. Please use 'yyyy-MM-dd HH:mm:ss'. Example: '2025-03-20 12:00:00'.");
                }
            }

            // Proceed to create the product
            Product product = new Product();
            product.setName(name);
            product.setManufactureDate(date); // Can remain null if manufactureDate is optional
            product.setStock(stock);
            product.setDescription(description);
            product.setPrice(price);
            product.setAgeRecommendation(ageRecommendation);
            product.setWidth(width);
            product.setHeight(height);
            product.setWeight(weight);
            product.setLength(length);
            product.setColor(color);
            product.setRarity(rarity);
            product.setMaterial(material);
            product.setVersionProduct(versionProduct);

            // Set the image name if available
            if (nameFile != null) {
                product.setImage(nameFile);
            }

            // Fetch and set related entities
            Brand brand = brandRepository.findById(brandId)
                    .orElseThrow(() -> new RuntimeException("Brand not found"));
            ProductType productType = productTypeRepository.findById(typeId)
                    .orElseThrow(() -> new RuntimeException("ProductType not found"));
            Promotion promotion = promotionRepository.findById(promotionId)
                    .orElseThrow(() -> new RuntimeException("Promotion not found"));

            product.setBrand(brand);
            product.setPromotion(promotion);
            product.setProductType(productType);

            productRepository.save(product);
            return true;

        } catch (IllegalArgumentException e) {
            // Log validation or business logic errors
            System.out.println("Validation error: " + e.getMessage());
            throw e;
        } catch (Exception e) {
            // Log unexpected errors
            System.out.println("Unexpected error: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean updateProduct(int id, MultipartFile fileImage,
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
                                 int typeId) {
        Optional<Product> productOptional = productRepository.findById(id);
        if(productOptional.isEmpty()) {
            throw new RuntimeException("Product with ID " + id + " not found.");
        }
        Product product = productOptional.get();

        try {


            product.setName(name);

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            Date date = parseDate(manufactureDate);
            product.setManufactureDate(date);
//            if (manufactureDate == null || manufactureDate.trim().isEmpty()) {
//                // Optional date case: Leave it as null or set a default value (example: current date)
//                product.setManufactureDate(null); // Case for Optional Date: Keep it unset
//                // Example Case for Default Date (uncomment if needed):
//                // product.setManufactureDate(new Date()); // Default to current date
//            } else {
//                Date date = sdf.parse(manufactureDate);
//                product.setManufactureDate(date); // Mandatory Date: Set valid parsed date
//            }

            product.setStock(stock);
            product.setDescription(description);
            product.setPrice(price);
            product.setColor(color);
            product.setRarity(rarity);
            product.setMaterial(material);
            product.setVersionProduct(versionProduct);
            product.setAgeRecommendation(ageRecommendation);
            product.setWidth(width);
            product.setHeight(height);
            product.setWeight(weight);
            product.setLength(length);

            // Kiểm tra và gán Brand từ cơ sở dữ liệu
            Brand brand = brandRepository.findById(brandId)
                    .orElseThrow(() -> new RuntimeException("Brand not found"));

            // Kiểm tra và gán ProductType từ cơ sở dữ liệu
            ProductType productType = productTypeRepository.findById(typeId)
                    .orElseThrow(() -> new RuntimeException("ProductType not found"));

            // Kiểm tra và gán Promotion từ cơ sở dữ liệu
            Promotion promotion = promotionRepository.findById(promotionId)
                    .orElseThrow(() -> new RuntimeException("Promotion not found"));

            product.setBrand(brand);
            product.setProductType(productType);
            product.setPromotion(promotion);

            String nameFile = updateFileImage(fileImage, product.getImage());
            if(nameFile != null) {
                product.setImage(nameFile);
            }

            productRepository.save(product);
            return true;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void deleteProduct(int id) {
        // Kiểm tra sản phẩm có tồn tại hay không
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        if (orderDetailRepository.existsByProductId(id)) {
            throw new RuntimeException("Cannot delete product as it is referenced in order details.");
        }
        // Xóa file ảnh nếu có
        String imageName = product.getImage();
        if (imageName != null && !imageName.isEmpty()) {
            boolean isFileDeleted = fileService.deleteProductFile(imageName);
            if (!isFileDeleted) {
                System.out.println("Warning: File deletion failed or file does not exist for: " + imageName);
            }
        }

        // Thực hiện xóa
        productRepository.deleteById(id);
    }

    @Override
    public List<ProductSimpleDTO> getLatestProducts(int limit) {
        List<Product> products = productRepository.findLatestProducts(limit);
        return products.stream()
                .map(product -> new ProductSimpleDTO(
                        product.getId(),
                        product.getName(),
                        product.getStock(),
                        product.getPrice(),
                        product.getImage(),
                        (product.getPromotion() != null)
                                ? product.getPromotion().getPercent()
                                : 0.0 // Giá trị mặc định cho null
                ))
                .collect(Collectors.toList());
    }

    @Override
    public long getCountProducts() {
        return productRepository.count();
    }

    @Override
    public long getCountProductsInStock() {
        return productRepository.countTotalProducts();
    }

    @Override
    public long getCountProductsSold() {
        return productRepository.countTotalProductsSold();
    }


    public String updateFileImage(MultipartFile fileImage, String imageName) {
        System.out.println("HELLO fileImage");
        if(fileImage == null || fileImage.isEmpty()) {
            return null;
        }

        if(imageName != null && !imageName.isEmpty()) {
            boolean isDeleted = fileService.deleteProductFile(imageName);
            if (!isDeleted) {
                throw new RuntimeException("Failed to delete old image file: " + imageName);
            }
        }

        String nameFile = fileService.createNameFile(fileImage);
        boolean isSuccess = fileService.saveProduct(fileImage, nameFile);

        if(!isSuccess) {
            throw new RuntimeException("Failed to save the new image file.");
        }

        return nameFile;
    }


}


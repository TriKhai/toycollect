package com.ct201.toycollect.service;

import com.ct201.toycollect.dto.ProductTypeDTO;
import com.ct201.toycollect.dto.product.ProductDTO;
import com.ct201.toycollect.entity.Product;
import com.ct201.toycollect.entity.ProductType;
import com.ct201.toycollect.payload.request.ProductTypeRequest;
import com.ct201.toycollect.repository.ProductTypeRepository;
import com.ct201.toycollect.service.imp.ProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ProductTypeServiceImp implements ProductTypeService {
    @Autowired
    private ProductTypeRepository repo;

    @Override
    public List<ProductTypeDTO> findAll() {
        List<ProductType> productTypes = repo.findAll();
        if (productTypes.isEmpty()) {
            return null;
        }
        List<ProductTypeDTO> productTypesDTO = new ArrayList<>();
        for (ProductType productType : productTypes) {
            ProductTypeDTO dto = new ProductTypeDTO();
            dto.setId(productType.getId());
            dto.setName(productType.getName());
            dto.setDescription(productType.getDescription());
            dto.setTheme(productType.getTheme());
            dto.setCreatedAt(productType.getCreatedAt() != null ? Date.from(productType.getCreatedAt()) : null);
            dto.setUpdatedAt(productType.getUpdatedAt() != null ? Date.from(productType.getUpdatedAt()) : null);

            productTypesDTO.add(dto);
        }
        return productTypesDTO;
    }

    @Override
    public ProductTypeDTO findById(Integer id) {
        Optional<ProductType> productTypeOptional = repo.findById(id);
        if(productTypeOptional.isEmpty()) {
            return null;
        }
        ProductType productType = productTypeOptional.get();
        ProductTypeDTO dto = new ProductTypeDTO();
        dto.setId(productType.getId());
        dto.setName(productType.getName());
        dto.setDescription(productType.getDescription());
        dto.setTheme(productType.getTheme());
        dto.setCreatedAt(productType.getCreatedAt() != null ? Date.from(productType.getCreatedAt()) : null);
        dto.setUpdatedAt(productType.getUpdatedAt() != null ? Date.from(productType.getUpdatedAt()) : null);

        return dto;
    }

    @Override
    public boolean addType(ProductTypeRequest request) {
        try {
            ProductType productType = new ProductType();
            productType.setName(request.getName());
            productType.setDescription(request.getDescription());
            productType.setTheme(request.getTheme());
            repo.save(productType);
            return true;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean updateType(int id, ProductTypeRequest request) {
        Optional<ProductType> productTypeOptional = repo.findById(id);
        if(productTypeOptional.isEmpty()) {
            return false;
        }
        ProductType productType = productTypeOptional.get();
        productType.setName(request.getName());
        productType.setDescription(request.getDescription());
        productType.setTheme(request.getTheme());
        repo.save(productType);
        return true;
    }

    @Override
    public boolean deleteById(int id) {
        Optional<ProductType> productTypeOptional = repo.findById(id);
        if(productTypeOptional.isEmpty()) {
            return false;
        }
        for(Product product : productTypeOptional.get().getProducts()) {
            product.setProductType(null);
        }
        repo.delete(productTypeOptional.get());
        return true;
    }

    @Override
    public long countTypes() {
        return repo.count();
    }
}

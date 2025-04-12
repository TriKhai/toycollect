package com.ct201.toycollect.service.imp;

import com.ct201.toycollect.dto.ProductTypeDTO;
import com.ct201.toycollect.payload.request.ProductTypeRequest;

import java.util.List;

public interface ProductTypeService {
    List<ProductTypeDTO> findAll();
    ProductTypeDTO findById(Integer id);
    boolean addType(ProductTypeRequest request);
    boolean updateType(int id, ProductTypeRequest request);
    boolean deleteById(int id);
    long countTypes();
}

package com.ct201.toycollect.service.imp;

import com.ct201.toycollect.dto.BrandDTO;
import com.ct201.toycollect.payload.request.BrandRequest;

import java.util.List;

public interface BrandService {
    List<BrandDTO> findAllBrand();
    BrandDTO findBrandById(Integer id);
    boolean addBrand(BrandRequest brandRequest);
    boolean updateBrand(int id, BrandRequest brandRequest);
    boolean deleteBrand(int id);
    long countBrands();
}

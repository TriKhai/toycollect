package com.ct201.toycollect.controller;

import com.ct201.toycollect.dto.BrandDTO;
import com.ct201.toycollect.payload.ResponseData;
import com.ct201.toycollect.payload.request.BrandRequest;
import com.ct201.toycollect.service.imp.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/brand")
public class BrandController {
    @Autowired
    private BrandService brandService;
    // 1. Get all brands
    @GetMapping("")
    public ResponseEntity<?> getAllBrands() {
        System.out.println("get all brands");
        ResponseData responseData = new ResponseData();
        List<BrandDTO> brands = brandService.findAllBrand();
        if (brands.isEmpty()) {
            responseData.setStatus(404);
            responseData.setData(null);
            responseData.setDescription("Brands not found");
            responseData.setSuccess(false);
            return new ResponseEntity<>(responseData, HttpStatus.OK);
        }
        responseData.setData(brands);
        responseData.setSuccess(true);
        responseData.setDescription("Success");
        responseData.setStatus(200);
        return new ResponseEntity<>(brands, HttpStatus.OK);
    }

    // 2. Get a brand by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getBrandById(@PathVariable("id") int id) {
        BrandDTO brand = brandService.findBrandById(id);
        ResponseData res = new ResponseData();
        if (brand ==null) {
            res.setStatus(404);
            res.setData(null);
            res.setDescription("Brand not found");
            res.setSuccess(false);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }
        res.setData(brand);
        res.setSuccess(true);
        res.setDescription("Success");
        res.setStatus(200);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 3. Create a new brand
    @PostMapping("")
    public ResponseEntity<?> createBrand(@RequestBody BrandRequest brandRequest) {
        ResponseData responseData = new ResponseData();
        boolean success = brandService.addBrand(brandRequest);
        if (!success) {
            responseData.setStatus(500);
            responseData.setData(null);
            responseData.setDescription("Error");
            responseData.setSuccess(false);
            return new ResponseEntity<>(responseData, HttpStatus.OK);
        }
        responseData.setStatus(201);
        responseData.setData(brandRequest);
        responseData.setSuccess(true);
        responseData.setDescription("Success");
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    // 4. Update an existing brand
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBrand(@PathVariable("id") int id, @RequestBody BrandRequest brandRequest) {
        ResponseData responseData = new ResponseData();
        boolean success = brandService.updateBrand(id, brandRequest);
        if (!success) {
            responseData.setStatus(404);
            responseData.setData(null);
            responseData.setDescription("Not found");
            responseData.setSuccess(false);
            return new ResponseEntity<>(responseData, HttpStatus.OK);
        }
        responseData.setStatus(200);
        responseData.setData(brandRequest);
        responseData.setSuccess(true);
        responseData.setDescription("updated");
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    // 5. Delete a brand by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBrand(@PathVariable("id") int id) {
        ResponseData responseData = new ResponseData();
        boolean isDeleted = brandService.deleteBrand(id);
        if (!isDeleted) {
            responseData.setStatus(500);
            responseData.setData(null);
            responseData.setDescription("Error");
            responseData.setSuccess(false);
            return new ResponseEntity<>(responseData, HttpStatus.OK);
        }
        responseData.setStatus(200);
        responseData.setData(id);
        responseData.setSuccess(true);
        responseData.setDescription("Deleted");
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }
}

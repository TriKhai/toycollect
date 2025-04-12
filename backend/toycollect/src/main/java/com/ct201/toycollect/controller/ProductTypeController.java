package com.ct201.toycollect.controller;

import com.ct201.toycollect.dto.ProductTypeDTO;
import com.ct201.toycollect.payload.ResponseData;
import com.ct201.toycollect.payload.request.ProductTypeRequest;
import com.ct201.toycollect.service.imp.ProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product-type")
public class ProductTypeController {
    @Autowired
    private ProductTypeService productTypeService;

    @GetMapping("")
    public ResponseEntity<?> getAllProductTypes() {
        ResponseData resp = new ResponseData();
        List<ProductTypeDTO> list = productTypeService.findAll();
        if(list.isEmpty()) {
            resp.setStatus(404);
            resp.setDescription("Not found");
            resp.setData(null);
            resp.setSuccess(Boolean.FALSE);
            return new ResponseEntity<>(resp, HttpStatus.NOT_FOUND);
        }
        resp.setStatus(200);
        resp.setData(list);
        resp.setDescription("Success");
        resp.setSuccess(Boolean.TRUE);
        return new ResponseEntity<>(resp, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductType(@PathVariable("id") Integer id) {
        ResponseData resp = new ResponseData();
        ProductTypeDTO productType = productTypeService.findById(id);
        if(productType == null) {
            resp.setStatus(404);
            resp.setDescription("Not found");
            resp.setData(null);
            resp.setSuccess(Boolean.FALSE);
            return new ResponseEntity<>(resp, HttpStatus.NOT_FOUND);
        }
        resp.setStatus(200);
        resp.setData(productType);
        resp.setDescription("Success");
        resp.setSuccess(Boolean.TRUE);
        return new ResponseEntity<>(resp, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> addProductType(@RequestBody ProductTypeRequest request) {
        ResponseData resp = new ResponseData();
        boolean success = productTypeService.addType(request);
        if(!success) {
            resp.setStatus(500);
            resp.setDescription("Failed to add product type");
            resp.setData(null);
            resp.setSuccess(Boolean.FALSE);
            return new ResponseEntity<>(resp, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        resp.setStatus(201);
        resp.setData(request);
        resp.setDescription("Success");
        resp.setSuccess(Boolean.TRUE);
        return new ResponseEntity<>(resp, HttpStatus.OK);

    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProductType(@PathVariable("id") Integer id, @RequestBody ProductTypeRequest request) {
        ResponseData resp = new ResponseData();
        boolean success = productTypeService.updateType(id, request);
        if(!success) {
            resp.setStatus(500);
            resp.setDescription("Failed to update product type");
            resp.setData(null);
            resp.setSuccess(Boolean.FALSE);
            return new ResponseEntity<>(resp, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        resp.setStatus(201);
        resp.setData(request);
        resp.setDescription("Success");
        resp.setSuccess(Boolean.TRUE);
        return new ResponseEntity<>(resp, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProductType(@PathVariable("id") Integer id) {
        ResponseData resp = new ResponseData();
        boolean success = productTypeService.deleteById(id);
        if(!success) {
            resp.setStatus(500);
            resp.setDescription("Failed to delete product type");
            resp.setData(null);
            resp.setSuccess(Boolean.FALSE);
            return new ResponseEntity<>(resp, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        resp.setStatus(200);
        resp.setData(id);
        resp.setDescription("Success");
        resp.setSuccess(Boolean.TRUE);
        return new ResponseEntity<>(resp, HttpStatus.OK);
    }
}


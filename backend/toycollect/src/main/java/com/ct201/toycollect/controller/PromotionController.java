package com.ct201.toycollect.controller;

import com.ct201.toycollect.dto.PromotionDTO;
import com.ct201.toycollect.entity.Promotion;
import com.ct201.toycollect.payload.ResponseData;
import com.ct201.toycollect.payload.request.BrandRequest;
import com.ct201.toycollect.payload.request.PromotionRequest;
import com.ct201.toycollect.service.imp.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/promotion")
public class PromotionController {
    @Autowired
    private PromotionService promotionService;

    @GetMapping("")
    public ResponseEntity<?> getAllPromotion() {
        ResponseData responseData = new ResponseData();
        List<PromotionDTO> promotions = promotionService.findAllPromotion();
        if (promotions.isEmpty()) {
            responseData.setStatus(404);
            responseData.setSuccess(Boolean.FALSE);
            responseData.setData(null);
            responseData.setDescription("Promotion is empty");
            return new ResponseEntity<>(responseData, HttpStatus.NOT_FOUND);
        }
        responseData.setData(promotions);
        responseData.setStatus(200);
        responseData.setSuccess(Boolean.TRUE);
        responseData.setDescription("get all promotion success");
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPromotionById(@PathVariable Integer id) {
        ResponseData responseData = new ResponseData();
        PromotionDTO promotion = promotionService.findPromotionById(id);
        if (promotion == null) {
            responseData.setStatus(404);
            responseData.setSuccess(Boolean.FALSE);
            responseData.setData(null);
            responseData.setDescription("Not Found");
            return new ResponseEntity<>(responseData, HttpStatus.NOT_FOUND);
        }
        responseData.setData(promotion);
        responseData.setStatus(200);
        responseData.setSuccess(Boolean.TRUE);
        responseData.setDescription("get promotion id: " + id);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> createPromotion(@RequestBody PromotionRequest promotionRequest) {
        ResponseData responseData = new ResponseData();
        System.out.println(promotionRequest.toString());
        boolean success = promotionService.addPromotion(promotionRequest);
        if (!success) {
            responseData.setStatus(500);
            responseData.setData(null);
            responseData.setDescription("Error");
            responseData.setSuccess(false);
            return new ResponseEntity<>(responseData, HttpStatus.OK);
        }
        responseData.setStatus(201);
        responseData.setData(promotionRequest);
        responseData.setSuccess(true);
        responseData.setDescription("Success");
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePromotion(@PathVariable("id") int id, @RequestBody PromotionRequest promotionRequest) {
        ResponseData responseData = new ResponseData();
        boolean success = promotionService.updatePromotion(id, promotionRequest);
        if (!success) {
            responseData.setStatus(404);
            responseData.setData(null);
            responseData.setDescription("Not found");
            responseData.setSuccess(false);
            return new ResponseEntity<>(responseData, HttpStatus.OK);
        }
        responseData.setStatus(200);
        responseData.setData(promotionRequest);
        responseData.setSuccess(true);
        responseData.setDescription("updated");
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    // 5. Delete a brand by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePromotion(@PathVariable("id") int id) {
        ResponseData responseData = new ResponseData();
        boolean isDeleted = promotionService.deletePromotion(id);
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

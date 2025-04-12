package com.ct201.toycollect.service;

import com.ct201.toycollect.dto.PromotionDTO;
import com.ct201.toycollect.entity.Product;
import com.ct201.toycollect.entity.Promotion;
import com.ct201.toycollect.payload.request.PromotionRequest;
import com.ct201.toycollect.repository.PromotionRepository;
import com.ct201.toycollect.service.imp.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PromotionServiceImp implements PromotionService {

    @Autowired
    private PromotionRepository repo;

    @Override
    public List<PromotionDTO> findAllPromotion() {
        List<Promotion> list = repo.findAll();
        if(list.isEmpty()) {
            return null;
        }
        List<PromotionDTO> promotions = new ArrayList<>();
        for (Promotion promotion : list) {
            PromotionDTO dto = new PromotionDTO();
            dto.setId(promotion.getId());
            dto.setName(promotion.getName());
            dto.setDescription(promotion.getDescription());
            dto.setPercent(promotion.getPercent());
            dto.setStartDate(promotion.getStartDate());
            dto.setEndDate(promotion.getEndDate());
            dto.setCreatedAt(promotion.getCreatedAt() != null ? Date.from(promotion.getCreatedAt()) : null);
            dto.setUpdatedAt(promotion.getUpdatedAt() != null ? Date.from(promotion.getUpdatedAt()) : null);
            promotions.add(dto);
        }
        return promotions;
    }

    @Override
    public PromotionDTO findPromotionById(Integer id) {
        Optional<Promotion> promotionOptional = repo.findById(id);
        if(promotionOptional.isEmpty()) {
            return null;
        }
        Promotion promotion = promotionOptional.get();
        PromotionDTO dto = new PromotionDTO();
        dto.setId(promotion.getId());
        dto.setName(promotion.getName());
        dto.setDescription(promotion.getDescription());
        dto.setPercent(promotion.getPercent());
        dto.setStartDate(promotion.getStartDate());
        dto.setEndDate(promotion.getEndDate());
        dto.setCreatedAt(promotion.getCreatedAt() != null ? Date.from(promotion.getCreatedAt()) : null);
        dto.setUpdatedAt(promotion.getUpdatedAt() != null ? Date.from(promotion.getUpdatedAt()) : null);
        return dto;
    }

    @Override
    public boolean addPromotion(PromotionRequest promotionRequest) {
        System.out.println(promotionRequest.toString());
        try {
            Promotion promotion = new Promotion();
            promotion.setName(promotionRequest.getName());
            promotion.setDescription(promotionRequest.getDescription());
            promotion.setPercent(promotionRequest.getPercent());

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date startDate = sdf.parse(promotionRequest.getStartDate());
            Date endDate = sdf.parse(promotionRequest.getEndDate());
            promotion.setStartDate(startDate);
            promotion.setEndDate(endDate);

            repo.save(promotion);
            return true;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean updatePromotion(Integer id, PromotionRequest promotionRequest) {
        try {
            Optional<Promotion> promotionOptional = repo.findById(id);
            if(promotionOptional.isEmpty()) {
                return false;
            }
            Promotion promotion = promotionOptional.get();
            promotion.setName(promotionRequest.getName());
            promotion.setDescription(promotionRequest.getDescription());
            promotion.setPercent(promotionRequest.getPercent());
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date startDate = sdf.parse(promotionRequest.getStartDate());
            Date endDate = sdf.parse(promotionRequest.getEndDate());
            promotion.setStartDate(startDate);
            promotion.setEndDate(endDate);
            repo.save(promotion);
            return true;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean deletePromotion(Integer id) {
        Optional<Promotion> promotionOptional = repo.findById(id);
        if(promotionOptional.isEmpty()) {
            return false;
        }
        for(Product product: promotionOptional.get().getProducts()) {
            product.setPromotion(null);
        }
        repo.delete(promotionOptional.get());
        return true;
    }

    @Override
    public long countPromotions() {
        return repo.count();
    }
}

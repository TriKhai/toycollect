package com.ct201.toycollect.service.imp;

import com.ct201.toycollect.dto.PromotionDTO;
import com.ct201.toycollect.payload.request.PromotionRequest;

import java.util.List;

public interface PromotionService {
    List<PromotionDTO> findAllPromotion();
    PromotionDTO findPromotionById(Integer id);
    boolean addPromotion(PromotionRequest promotionRequest);
    boolean updatePromotion(Integer id, PromotionRequest promotionRequest);
    boolean deletePromotion(Integer id);
    long countPromotions();
}

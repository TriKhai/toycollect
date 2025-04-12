package com.ct201.toycollect.service;

import com.ct201.toycollect.dto.AddressDTO;
import com.ct201.toycollect.dto.BrandDTO;
import com.ct201.toycollect.dto.ContactDTO;
import com.ct201.toycollect.entity.Brand;
import com.ct201.toycollect.entity.Product;
import com.ct201.toycollect.payload.request.BrandRequest;
import com.ct201.toycollect.repository.BrandRepository;
import com.ct201.toycollect.service.imp.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class BrandServiceImp implements BrandService {
    @Autowired
    BrandRepository repo;
    @Autowired
    private BrandRepository brandRepository;

    @Override
    public List<BrandDTO> findAllBrand() {
        List<Brand> listBrand = repo.findAll();
        if (listBrand.isEmpty()) {
            return null;
        }

        List<BrandDTO> listBrandDTO = new ArrayList<>();
        for (Brand brand : listBrand) {
            BrandDTO brandDTO = new BrandDTO();
            ContactDTO contactDTO = new ContactDTO();
            AddressDTO addressDTO = new AddressDTO();

            brandDTO.setId(brand.getId());
            brandDTO.setName(brand.getName());

            contactDTO.setEmail(brand.getEmail());
            contactDTO.setPhone(brand.getPhone());

            addressDTO.setCountry(brand.getCountry());
            addressDTO.setProvince(brand.getProvince());
            addressDTO.setDistrict(brand.getDistrict());
            addressDTO.setStreet(brand.getStreet());
            addressDTO.setCommune(brand.getCommune());

            brandDTO.setAddress(addressDTO);
            brandDTO.setContact(contactDTO);

            brandDTO.setCreatedAt(brand.getCreatedAt() != null ? Date.from(brand.getCreatedAt()) : null);
            brandDTO.setUpdatedAt(brand.getUpdatedAt() != null ? Date.from(brand.getUpdatedAt()) : null);

            listBrandDTO.add(brandDTO);
        }
        return listBrandDTO;
    }

    @Override
    public BrandDTO findBrandById(Integer id) {
        Optional<Brand> brandOptional = repo.findById(id);
        if (brandOptional.isEmpty()) {
            return null;
        }
        Brand brand = brandOptional.get();

        BrandDTO brandDTO = new BrandDTO();
        ContactDTO contactDTO = new ContactDTO();
        AddressDTO addressDTO = new AddressDTO();

        brandDTO.setId(brand.getId());
        brandDTO.setName(brand.getName());

        contactDTO.setEmail(brand.getEmail());
        contactDTO.setPhone(brand.getPhone());

        addressDTO.setCountry(brand.getCountry());
        addressDTO.setProvince(brand.getProvince());
        addressDTO.setDistrict(brand.getDistrict());
        addressDTO.setStreet(brand.getStreet());
        addressDTO.setCommune(brand.getCommune());

        brandDTO.setAddress(addressDTO);
        brandDTO.setContact(contactDTO);

        brandDTO.setCreatedAt(brand.getCreatedAt() != null ? Date.from(brand.getCreatedAt()) : null);
        brandDTO.setUpdatedAt(brand.getUpdatedAt() != null ? Date.from(brand.getUpdatedAt()) : null);

        return brandDTO;
    }

    @Override
    public boolean addBrand(BrandRequest brandRequest) {
        try {
            Brand brand = new Brand();
            brand.setName(brandRequest.getName());
            brand.setEmail(brandRequest.getEmail());
            brand.setPhone(brandRequest.getPhone());
            brand.setCountry(brandRequest.getCountry());
            brand.setProvince(brandRequest.getProvince());
            brand.setDistrict(brandRequest.getDistrict());
            brand.setStreet(brandRequest.getStreet());
            brand.setCommune(brandRequest.getCommune());
            repo.save(brand);
            return true;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean updateBrand(int id, BrandRequest brandRequest) {
        Optional<Brand> brandOptional = repo.findById(id);
        if (brandOptional.isEmpty()) {
            return false;
        }
        Brand brand = brandOptional.get();
        brand.setName(brandRequest.getName());
        brand.setEmail(brandRequest.getEmail());
        brand.setPhone(brandRequest.getPhone());
        brand.setCountry(brandRequest.getCountry());
        brand.setProvince(brandRequest.getProvince());
        brand.setDistrict(brandRequest.getDistrict());
        brand.setStreet(brandRequest.getStreet());
        brand.setCommune(brandRequest.getCommune());
        repo.save(brand);
        return true;
    }

    @Override
    public boolean deleteBrand(int id) {
        Optional<Brand> brandOptional = repo.findById(id);
        if (brandOptional.isEmpty()) {
            return false;
        }
        for(Product product : brandOptional.get().getProducts()) {
            product.setBrand(null);
        }
        repo.delete(brandOptional.get());
        return true;
    }

    @Override
    public long countBrands() {
        return brandRepository.count();
    }
}

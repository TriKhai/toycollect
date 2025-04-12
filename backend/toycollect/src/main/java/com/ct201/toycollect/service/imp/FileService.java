package com.ct201.toycollect.service.imp;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    String createNameFile(MultipartFile file);
    boolean saveProduct(MultipartFile file, String fileName);
    boolean saveAvatar(MultipartFile file, String fileName);
    boolean deleteProductFile(String fileName);
    boolean deleteAvatarFile(String fileName);
    Resource loadFile(String fileName);

}

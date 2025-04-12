package com.ct201.toycollect.service;

import com.ct201.toycollect.service.imp.FileService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class FileServiceImp implements FileService {

    @Value("${fileUpload.rootPath}")
    private String rootPath;

    private Path pathProduct;
    private Path pathAvatar;

    public void init() {
        System.out.println("rootPath " + rootPath);
        System.out.println("root " + pathProduct);
        try {
            pathProduct = Paths.get(rootPath, "products");
            pathAvatar = Paths.get(rootPath, "avatars");
            if (!Files.exists(pathProduct)) {
                Files.createDirectories(pathProduct);
            }
            if (!Files.exists(pathAvatar)) {
                Files.createDirectories(pathAvatar);
            }
            System.out.println("root" + pathProduct);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public String createNameFile(MultipartFile file) {
        String originalFileName = file.getOriginalFilename();
        System.out.println("originalFileName" + originalFileName);
        if (originalFileName == null) {
            throw new RuntimeException("File name is null");
        }

        String timestamp = DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss").format(LocalDateTime.now());
        String newFileName = timestamp + "_" + originalFileName;
        System.out.println("newFileName" + newFileName);
        return newFileName;
    }

    // -- Save file
    @Override
    public boolean saveProduct(MultipartFile file, String fileName) {
        try {
            init();
            Files.copy(file.getInputStream(), pathProduct.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);
            return true;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean saveAvatar(MultipartFile file, String fileName) {
        try {
            init();
            Files.copy(file.getInputStream(), pathAvatar.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);
            return true;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean deleteProductFile(String fileName) {
        if(fileName == null || fileName.isEmpty()) {
            throw new RuntimeException("File name is empty");
        }
        try {
            init();
            Path path = pathProduct.resolve(fileName);
            return Files.deleteIfExists(path);
        } catch (Exception e) {
            System.out.println(e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean deleteAvatarFile(String fileName) {
        if(fileName == null || fileName.isEmpty()) {
            throw new RuntimeException("File name is empty");
        }
        try {
            init();
            Path path = pathAvatar.resolve(fileName);
            return Files.deleteIfExists(path);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // Cần load khi nếu ảnh hay file lưu ngoài static
    // Nếu đã lưu ở static thì chỉ cần call api kiểu: http://localhost:8080/uploads/products/20250209_031516_alime.jpg
    @Override
    public Resource loadFile(String fileName) {
        try {
            init();
            Path filePath = pathProduct.resolve(fileName);
            System.out.println("filePath" + filePath);
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists() || resource.isReadable()) {
                return resource;
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return null;
    }
}

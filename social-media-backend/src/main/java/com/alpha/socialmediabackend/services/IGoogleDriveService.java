package com.alpha.socialmediabackend.services;

import org.springframework.web.multipart.MultipartFile;

public interface IGoogleDriveService {
    public String uploadFile(MultipartFile file, String filePath);
}

package com.alpha.socialmediabackend.controllers;

import com.alpha.socialmediabackend.modules.PostInfo;
import com.alpha.socialmediabackend.repostiories.RepoPostInfo;
import com.alpha.socialmediabackend.services.GoogleDriveService;
import com.alpha.socialmediabackend.services.IGoogleDriveService;
import com.alpha.socialmediabackend.services.ImageCreatorService;
import com.alpha.socialmediabackend.utils.ByteArrayMultipartFile;
import com.google.api.services.drive.model.File;
import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {
    @Autowired
    public RepoPostInfo repoPostInfo;
    @Autowired
    public ImageCreatorService imageCreator;
    @Autowired
    public IGoogleDriveService iGoogleDriveService;
    private static final Logger log = LoggerFactory.getLogger(PostController.class);
    @PostMapping("/post")
    public PostInfo createPost(@RequestBody PostInfo postInfoDTO)
    {
        String url = "https://graph.facebook.com/v18.0/133391023193991/photos";
        try {
            // Specify the URL and request method

            String accessToken = "EAAyZC4SOzgCIBOZCupMWnBZCv1QUklemKAmdKmdykFTkSsgKzHKvPkNIMDtqGdVTU9rNIh00pmjdn7tXcnB4CQGdrgE4kZCbEd92JsCddbVKMCVnHRwEJzP070dVeQVWxfaoxTn9ppS0SiiwyP0NGFK7eA4nGwSRBN4ZAMmz9h5SZBA5eUhn5fZAvAxp4HGI9sZD";
            String message = postInfoDTO.getVacancyTitle();
            System.out.println(message);
            URL obj = new URL(url);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();

            // Set the request method to POST
            con.setRequestMethod("POST");

            // Image Creation
            BufferedImage image = imageCreator.createImage(postInfoDTO.getVacancyTitle(), postInfoDTO.getVacancyNumber(), postInfoDTO.getMinEligibility(), postInfoDTO.getLocation(), postInfoDTO.getLastDateToApply());

            // Convert BufferedImage to a byte array
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(image, "png", baos);
            byte[] imageBytes = baos.toByteArray();

            // Create a custom MultipartFile
            ByteArrayMultipartFile multipartFile = new ByteArrayMultipartFile("imageFile", "image.png", "image/png", imageBytes);

//            String fileLink = iGoogleDriveService.uploadFile(multipartFile,"/joborbitz");
            String fileLink = "https://www.denofgeek.com/wp-content/uploads/2022/05/Leged-of-Zelda-Link.jpg";
            System.out.println(fileLink);
            // Set request headers
            con.setRequestProperty("User-Agent", "Mozilla/5.0");
            con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");

            // Construct the POST data
            String postData = "message=" + message + "&url=" + fileLink + "&access_token=" + accessToken;

            // Enable input and output streams
            con.setDoOutput(true);

            // Write POST data to the connection
            try (DataOutputStream wr = new DataOutputStream(con.getOutputStream())) {
                wr.writeBytes(postData);
                wr.flush();
            }

            // Get the response code and response data
            int responseCode = con.getResponseCode();
            System.out.println("Response Code: " + responseCode);

            // Read the response from the server
            try (BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()))) {
                String inputLine;
                StringBuilder response = new StringBuilder();

                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }

                // Print the response
                System.out.println(response.toString());
            }
        } catch (Exception e) {
            log.error("error", e);
        }

        return postInfoDTO;
    }
}

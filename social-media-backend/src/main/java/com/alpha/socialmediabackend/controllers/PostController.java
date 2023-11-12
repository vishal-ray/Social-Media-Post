package com.alpha.socialmediabackend.controllers;

import com.alpha.socialmediabackend.dto.PostInfoDTO;
import com.alpha.socialmediabackend.dto.PostRequest;
import com.alpha.socialmediabackend.modules.PostInfo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {


    private static final Logger log = LoggerFactory.getLogger(PostController.class);
    @PostMapping("/post")
    public PostInfoDTO createPost(@RequestBody PostRequest postRequest)
    {
//        long instagramPageId = 17841462543910398;
        String facebookUrl = "https://graph.facebook.com/v18.0/133391023193991/photos";
        String instagramUrl = "https://graph.facebook.com/v18.0/17841462543910398/media";
        PostInfoDTO formData = postRequest.getFormData();
        String imageUrl = postRequest.getImageUrl();
        try {
            // Specify the URL and request method
            System.out.println(imageUrl);
            String accessToken = "EAAyZC4SOzgCIBOZCupMWnBZCv1QUklemKAmdKmdykFTkSsgKzHKvPkNIMDtqGdVTU9rNIh00pmjdn7tXcnB4CQGdrgE4kZCbEd92JsCddbVKMCVnHRwEJzP070dVeQVWxfaoxTn9ppS0SiiwyP0NGFK7eA4nGwSRBN4ZAMmz9h5SZBA5eUhn5fZAvAxp4HGI9sZD";
            String facebookMessage = formData.getJobDescription() + "\nApply Link : " + formData.getApplyLink() +"\nNotification Link : " + formData.getNotificationLink() + "\n  #jobvacancy #joborbitz #jobsingovernment #jobs #jobseeker #jobsearch";
            System.out.println(facebookMessage);
            URL facebookObj = new URL(facebookUrl);
            HttpURLConnection facebookConnection = (HttpURLConnection) facebookObj.openConnection();

            // Set the request method to POST
            facebookConnection.setRequestMethod("POST");
//            System.out.println(imageUrl);
            // Set request headers
            facebookConnection.setRequestProperty("User-Agent", "Mozilla/5.0");
            facebookConnection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");

            // Construct the POST data
            String facebookPostData = "message=" + facebookMessage + "&url=" + imageUrl + "&access_token=" + accessToken;

            // Enable input and output streams
            facebookConnection.setDoOutput(true);

            // Write POST data to the connection
            try (DataOutputStream wr = new DataOutputStream(facebookConnection.getOutputStream())) {
                wr.writeBytes(facebookPostData);
                wr.flush();
            }

            // Get the response code and response data
            int responseCode = facebookConnection.getResponseCode();
            System.out.println("Response Code: " + responseCode);

            // Read the response from the server
            try (BufferedReader in = new BufferedReader(new InputStreamReader(facebookConnection.getInputStream()))) {
                String inputLine;
                StringBuilder response = new StringBuilder();

                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }

                // Print the response
                System.out.println(response.toString());
            }

            // Instagram Post
            String instagramCaption = formData.getJobDescription() + "\nApply Link : " + formData.getApplyLink() +"\nNotification Link : " + formData.getNotificationLink() + "\n  #jobvacancy #joborbitz #jobsingovernment #jobs #jobseeker #jobsearch";
            System.out.println(instagramCaption);
            URL instagramObj = new URL(instagramUrl);
            HttpURLConnection instagramConnection = (HttpURLConnection) instagramObj.openConnection();

            // Set the request method to POST
            instagramConnection.setRequestMethod("POST");
//            System.out.println(imageUrl);
            // Set request headers
            instagramConnection.setRequestProperty("User-Agent", "Mozilla/5.0");
            instagramConnection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");

            // Construct the POST data
            String instagramPostData = "image_url=" + imageUrl + "&caption=" + instagramCaption + "&access_token=" + accessToken;

            // Enable input and output streams
            instagramConnection.setDoOutput(true);

            // Write POST data to the connection
            try (DataOutputStream wr = new DataOutputStream(instagramConnection.getOutputStream())) {
                wr.writeBytes(instagramPostData);
                wr.flush();
            }

            // Get the response code and response data
            int responseCodeInstagram = instagramConnection.getResponseCode();
            System.out.println(instagramConnection.getInputStream());
            System.out.println("Response Code: " + responseCodeInstagram);
            // Read the response from the server
            try (BufferedReader in = new BufferedReader(new InputStreamReader(instagramConnection.getInputStream()))) {
                String inputLine;
                StringBuilder response = new StringBuilder();

                while ((inputLine = in.readLine()) != null) {
//                    System.out.println(inputLine.sta);
                    response.append(inputLine);
                    ;
                }

                // Print the response
                System.out.println(response.toString());
            }

            String instagramPostUrl = "https://graph.facebook.com/v18.0/17841462543910398/media_publish";
            URL instagramPostObj = new URL(instagramPostUrl);
            HttpURLConnection instagramPostConnection = (HttpURLConnection) instagramPostObj.openConnection();

            // Set the request method to POST
            instagramPostConnection.setRequestMethod("POST");
//            System.out.println(imageUrl);
            // Set request headers
            instagramPostConnection.setRequestProperty("User-Agent", "Mozilla/5.0");
            instagramPostConnection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");

            // Construct the POST data
            String instagramPostPostData = "creation_id=" + responseCodeInstagram + "&access_token=" + accessToken;

            // Enable input and output streams
            instagramPostConnection.setDoOutput(true);

            // Write POST data to the connection
            try (DataOutputStream wr = new DataOutputStream(instagramPostConnection.getOutputStream())) {
                wr.writeBytes(instagramPostPostData);
                wr.flush();
            }

            // Get the response code and response data
            int responseCodePostInstagram = instagramPostConnection.getResponseCode();
            System.out.println("Response Code: " + responseCodePostInstagram);

            // Read the response from the server
            try (BufferedReader in = new BufferedReader(new InputStreamReader(instagramPostConnection.getInputStream()))) {
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

        return formData;
    }
}

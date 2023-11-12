package com.alpha.socialmediabackend.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostRequest {
    private PostInfoDTO formData;
    private String imageUrl;
}

package com.alpha.socialmediabackend.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostInfoDTO {
    private String vacancyTitle;
    private Long vacancyNumber;
    private String minEligibility;
    private String location;
    private Date lastDateToApply;
    private String jobDescription;
    private String notificationLink;
    private String applyLink;
}

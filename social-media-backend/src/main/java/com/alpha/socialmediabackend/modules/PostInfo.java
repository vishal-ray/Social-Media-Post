package com.alpha.socialmediabackend.modules;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "post_info")
public class PostInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String vacancyTitle;
    private Long vacancyNumber;
    private String minEligibility;
    private String location;
    private Date lastDateToApply;
    private String jobDescription;
    private String notificationLink;
    private String applyLink;
}
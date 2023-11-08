package com.alpha.socialmediabackend.services;

import java.awt.image.BufferedImage;
import java.util.Date;

public interface IImageCreatorService {
    public BufferedImage createImage(String vacancyTitle, Long vacancyNumber, String minEligibility, String location, Date lastDateToApply);
}

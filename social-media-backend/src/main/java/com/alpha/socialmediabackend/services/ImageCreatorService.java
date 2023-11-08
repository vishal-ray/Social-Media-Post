package com.alpha.socialmediabackend.services;

import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.Date;



@Service
public class ImageCreatorService implements IImageCreatorService{

    public BufferedImage createImage(String vacancyTitle, Long vacancyNumber, String minEligibility, String location, Date lastDateToApply) {
        int width = 800; // Image width in pixels
        int height = 400; // Image height in pixels
        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        try {

            // Create a BufferedImage for the job description

            Graphics2D g2d = image.createGraphics();

            // Set background color to white
            g2d.setColor(Color.WHITE);
            g2d.fillRect(0, 0, width, height);

            // Set text color to dark cornflower blue
            g2d.setColor(new Color(25, 25, 112)); // Dark Cornflower Blue

            // Set default font style
            Font defaultFont = new Font("Arial", Font.PLAIN, 24);
            g2d.setFont(defaultFont);

            // Define the job description lines
            String[] jobDescription = {
                    "Vacancy : " +vacancyTitle,
                    "No of vacancies: "+ vacancyNumber,
                    "" +minEligibility,
                    ""+ location,
                    "Last date to apply: "+ lastDateToApply
            };

            int x = 50; // X-coordinate for the text
            int y = 100; // Starting Y-coordinate for the first line

            // Draw each line of text with different styles
            for (String line : jobDescription) {
                if (line.startsWith("Vacancy : ") || line.startsWith("No of vacancies:") || line.startsWith("Last date to apply:")) {
                    // Apply bold font style to specific lines
                    Font boldFont = new Font("Arial", Font.BOLD, 24);
                    g2d.setFont(boldFont);
                } else {
                    // Reset the style for other lines
                    g2d.setFont(defaultFont);
                }
                g2d.drawString(line, x, y);
                y += 40; // Adjust the Y-coordinate for the next line
            }

            // Dispose of the graphics object
            g2d.dispose();

            // Load the watermark image
            BufferedImage watermarkImage = ImageIO.read(new File("/home/vishal_ray/social-media-backend/src/main/java/com/alpha/socialmediabackend/images/watermark.png"));

            // Create a new BufferedImage for the final image with watermark
            BufferedImage finalImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);

            // Get the Graphics2D object for the final image
            Graphics2D g2dFinal = finalImage.createGraphics();

            // Draw the job description image
            g2dFinal.drawImage(image, 0, 0, null);

            // Draw the watermark image
            g2dFinal.drawImage(watermarkImage, width - 200, height - 50, null);

            // Dispose of the final graphics object
            g2dFinal.dispose();



            // Save the final image with watermark to a file
            File outputImage = new File("custom_job_post_with_watermark.png");
            ImageIO.write(finalImage, "png", outputImage);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return image;
    }

    public byte[] createImage2(String vacancyTitle, Long vacancyNumber, String minEligibility, String location, Date lastDateToApply){
        String htmlContent = "<html><head><title>My HTML Page</title></head><body><h1>Hello, Aspose.HTML!</h1></body></html>";

        // Initialize HTMLDocument
        com.aspose.html.HTMLDocument document = new HTMLDocument(htmlContent, null);

        // Set rendering options
        ImageRenderingOptions options = new ImageRenderingOptions();
        options.setImageFormat(ImageFormat.getPng());

        // Initialize rendering engine
        ImageRenderingEngine renderingEngine = new ImageRenderingEngine(options);

        // Render HTML as an image
        byte[] imageBytes = HtmlRenderer.renderToImage(document, renderingEngine);
    }
}

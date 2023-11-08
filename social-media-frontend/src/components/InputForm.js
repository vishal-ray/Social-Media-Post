import React, { useState } from "react";
import axios from "axios";
import * as htmlToImage from "html-to-image";
import background from "../Logo Blue for insta or facebook.png";
import AWS from './AwsConfig'

function VacancyForm() {
  const [formData, setFormData] = useState({
    vacancyTitle: "",
    vacancyNumber: "",
    minEligibility: "",
    location: "",
    lastDateToApply: "",
    payscale: "",
    jobDescription: "",
    notificationLink: "",
    applyLink: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpload = () => {
    if (selectedFile) {
      const s3 = new AWS.S3();

      const params = {
        Bucket: 'social-media-images-bt',
        Key: selectedFile.name,
        Body: selectedFile,
      };

      s3.upload(params, (err, data) => {
        if (err) {
          console.error('Error uploading file:', err);
        } else {
          console.log('File uploaded successfully:', data.Location);
        }
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // let {vacancyTitle, vacancyNumber, minEligibility, location, lastDateToApply, jobDescription, notificationLink, applyLink} = data;
    console.log(formData);
    handleUpload();
    axios
      .post("http://127.0.0.1:8080/post", formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Handle form submission here
  };

  const preview = (e) => {
    let node = document.getElementById("image");
    node.style.backgroundImage = `url(${background})`;
    htmlToImage
      .toPng(node)
      .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
    
        img.onload = () => {
          // Set the canvas dimensions to match the image dimensions
          canvas.width = img.width;
          canvas.height = img.height;
    
          // Draw the image onto the canvas
          ctx.drawImage(img, 0, 0);
    
          // Convert the canvas content to a blob
          canvas.toBlob((blob) => {
            // Create a File object from the blob
            const file = new File([blob], 'image.png'); 
            setSelectedFile(file);
          })}

        
        // document.body.appendChild(img);
        console.log(img)
        node.style.backgroundImage = "";
        document.getElementById("previewImage").innerHTML = ""
        document.getElementById("previewImage").appendChild(img)
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  return (
    <>
      <div className="container" style={{ marginTop: 30, marginBottom: 30 }}>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div>
            <div
              id="image"
              style={{
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "1080px",
                width: "1080px",
                position: "relative", // Add this to make positioning easier
              }}
            >
              <div
                id="background-overlay"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.90)", // Add opacity here (0.5 for 50% opacity)
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              ></div>
              <p
                id="vacancyTitle"
                value={formData.vacancyTitle}
                style={{
                  // color: "#2A679C",
                  fontSize: "42px",
                  position: "relative", // Add this to ensure text appears above the overlay
                }}
              >
                {formData.vacancyTitle}
              </p>
              <b
                id="vacancyNumber"
                value={formData.vacancyNumber}
                style={{
                  // color: "#2A679C",
                  fontSize: "66px",
                  position: "relative",
                }}
              >
                {formData.vacancyNumber} Vacancies
              </b>
              <p
                id="minEligibility"
                value={formData.minEligibility}
                style={{
                  // color: "#2A679C",
                  fontSize: "30px",
                  position: "relative",
                }}
              >
                {formData.minEligibility}
              </p>
              <b
                id="payscale"
                value={formData.payscale}
                style={{
                  // color: "#2A679C",
                  fontSize: "30px",
                  position: "relative",
                }}
              >
                PayScale : {formData.payscale}
              </b>
              <p
                id="location"
                value={formData.location}
                style={{
                  // color: "#2A679C",
                  fontSize: "36px",
                  position: "relative",
                }}
              >
                {formData.location}
              </p>
              <p
                id="lastDateToApply"
                value={formData.lastDateToApply}
                style={{
                  // color: "#2A679C",
                  fontSize: "30px",
                  position: "relative",
                }}
              >
                Last Date To Apply : {formData.lastDateToApply}
              </p>
            </div>
            </div>
            {/* <div
              id="image"
              style={{
                backgroundColor: "transparent",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "480px",
                width: "480px",
              }}
            >
              <p
                id="vacancyTitle"
                value={formData.vacancyTitle}
                style={{ color: "#2A679C", fontSize: "42px" }}
              > */}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Vacancy Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="vacancyTitle"
                  value={formData.vacancyTitle}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Vacancy Number</label>
                <input
                  type="number"
                  className="form-control"
                  name="vacancyNumber"
                  value={formData.vacancyNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Minimum Eligibility</label>
                <input
                  type="text"
                  className="form-control"
                  name="minEligibility"
                  value={formData.minEligibility}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Last Date to Apply</label>
                <input
                  type="date"
                  className="form-control"
                  name="lastDateToApply"
                  value={formData.lastDateToApply}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>PayScale</label>
                <input
                  type="text"
                  className="form-control"
                  name="payscale"
                  value={formData.payscale}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Job Description</label>
                <textarea
                  className="form-control"
                  rows="4"
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Notification Link</label>
                <input
                  type="text"
                  className="form-control"
                  name="notificationLink"
                  value={formData.notificationLink}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Apply Link</label>
                <input
                  type="text"
                  className="form-control"
                  name="applyLink"
                  value={formData.applyLink}
                  onChange={handleChange}
                />
              </div>

              <button onClick={preview} className="btn btn-primary">
                Preview
              </button>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <div id ="previewImage"></div>
    </>
  );
}

export default VacancyForm;

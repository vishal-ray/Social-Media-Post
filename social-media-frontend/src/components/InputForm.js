import React, { useState } from "react";
import axios from "axios";
import * as htmlToImage from "html-to-image";
import background from "../Logo Blue for insta or facebook.png";
import AWS from './AwsConfig'
import "../style.css"
import { format } from 'date-fns';


function VacancyForm() {
  const [formData, setFormData] = useState({
    vacancyTitle: "",
    vacancyNumber: "",
    minEligibility: "",
    location: "",
    lastDateToApply: '2023-12-31',
    payscale: "",
    jobDescription: "",
    notificationLink: "",
    applyLink: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

    const handleUpload = async () => {
      return new Promise((resolve, reject) => {

    if (selectedFile) {
      const s3 = new AWS.S3();

      const folderPath = 'images/';
      const params = {
        Bucket: 'social-media-images-bt',
        Key: folderPath + selectedFile.name,
        Body: selectedFile,
      };

        s3.upload(params, (err, data) => {
        console.log(params)
        if (err) {
          console.error('Error uploading file:', err);
  
          // Log specific details of the error
          console.error('Error Code:', err.code);
          console.error('Error Message:', err.message);
          console.error('HTTP Status Code:', err.statusCode);
  
          // Handle different types of errors
          if (err.code === 'AccessDenied') {
            console.error('Access denied. Check your AWS credentials and permissions.');
          } else if (err.code === 'NoSuchBucket') {
            console.error('The specified bucket does not exist.');
          } // Add more conditions based on potential error types
  
        } else {
          console.log('File uploaded successfully:', data.Location);
          resolve(data.Location);
        }
      });
    }
  })
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // let {vacancyTitle, vacancyNumber, minEligibility, location, lastDateToApply, jobDescription, notificationLink, applyLink} = data;
    console.log(formData);
    // await handleUpload()
    const imageUrl = await handleUpload()
    
    console.log(typeof imageUrl)
    axios
      .post("http://127.0.0.1:8080/post", {
        formData: formData,
        imageUrl: imageUrl,
      })
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
            let r = (Math.random() + 1).toString(36).substring(7);
            r = r +".png"
            const file = new File([blob], r); 
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
          <div className="col-md-6">
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
                height: "720px",
                width: "720px",
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
              <p style={{color:"red"}}
                className="text-color">
                This is a test Post. This information is incorrect.
              </p>
              <b
                id="vacancyTitle"
                className="text-color"
                value={formData.vacancyTitle}
              >
                {formData.vacancyTitle}
              </b>
              <p
                id="vacancyNumber"
                className="text-color"
                value={formData.vacancyNumber}
              >
                Number of vacancies: {formData.vacancyNumber}
              </p>
              <p
                id="minEligibility"
                className="text-color"
                value={formData.minEligibility}
              >
                Minimum eligibility: {formData.minEligibility}
              </p>
              <p
                id="payscale"
                className="text-color"
                value={formData.payscale}
              >
                Payscale: {formData.payscale}
              </p>
              <p
                id="location"
                className="text-color"
                value={formData.location}
              >
                Job location: {formData.location}
              </p>
              <p
                id="lastDateToApply"
                className="text-color"
                // value={format(new Date(formData.lastDateToApply), 'dd-MM-yyyy', { awareOfUnicodeTokens: true })}
              >
                Last date to apply: {format(new Date(formData.lastDateToApply), 'dd-MM-yyyy', { awareOfUnicodeTokens: true })}
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
      <div id ="previewImage"></div>
    </>
  );

//   return (
//     <div className="container" style={{ marginTop: 30, marginBottom: 30, display: 'flex' }}>
//       {/* Left Side - Form */}
//       <div className="col-md-6">
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Vacancy Title</label>
//             <input
//               type="text"
//               className="form-control"
//               name="vacancyTitle"
//               value={formData.vacancyTitle}
//               onChange={handleChange}
//               required
//             />
//           </div>
  
//           <div className="form-group">
//             <label>Vacancy Number</label>
//             <input
//               type="number"
//               className="form-control"
//               name="vacancyNumber"
//               value={formData.vacancyNumber}
//               onChange={handleChange}
//               required
//             />
//           </div>
  
//           <div className="form-group">
//             <label>Minimum Eligibility</label>
//             <input
//               type="text"
//               className="form-control"
//               name="minEligibility"
//               value={formData.minEligibility}
//               onChange={handleChange}
//               required
//             />
//           </div>
  
//           <div className="form-group">
//             <label>Location</label>
//             <input
//               type="text"
//               className="form-control"
//               name="location"
//               value={formData.location}
//               onChange={handleChange}
//               required
//             />
//           </div>
  
//           <div className="form-group">
//             <label>Last Date to Apply</label>
//             <input
//               type="date"
//               className="form-control"
//               name="lastDateToApply"
//               value={formData.lastDateToApply}
//               onChange={handleChange}
//               required
//             />
//           </div>
  
//           <div className="form-group">
//             <label>PayScale</label>
//             <input
//               type="text"
//               className="form-control"
//               name="payscale"
//               value={formData.payscale}
//               onChange={handleChange}
//               required
//             />
//           </div>
  
//           <div className="form-group">
//             <label>Job Description</label>
//             <textarea
//               className="form-control"
//               rows="4"
//               name="jobDescription"
//               value={formData.jobDescription}
//               onChange={handleChange}
//               required
//             />
//           </div>
  
//           <div className="form-group">
//             <label>Notification Link</label>
//             <input
//               type="text"
//               className="form-control"
//               name="notificationLink"
//               value={formData.notificationLink}
//               onChange={handleChange}
//             />
//           </div>
  
//           <div className="form-group">
//             <label>Apply Link</label>
//             <input
//               type="text"
//               className="form-control"
//               name="applyLink"
//               value={formData.applyLink}
//               onChange={handleChange}
//             />
//           </div>
  
//           <button onClick={preview} className="btn btn-primary">
//             Preview
//           </button>
  
//           <button type="submit" className="btn btn-primary">
//             Submit
//           </button>
//         </form>
//       </div>
  
//       {/* Top-Right Side - Live Preview */}
// <div className="col-md-3" style={{ marginTop: 30, width: 100, height: 100 }}>
//   <div
//     id="image"
//     style={{
//       backgroundImage: `url(${background})`,
//       backgroundSize: "cover",
//       backgroundRepeat: "no-repeat",
//       backgroundPosition: "center",
//       backgroundAttachment: "fixed",
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//       height: "540px",
//       width: "540px",
//       position: "relative",
//     }}
//   >
//     <p
//       id="vacancyTitle"
//       value={formData.vacancyTitle}
//       style={{
//         fontSize: "60px",
//         position: "relative",
//       }}
//     >
//       {formData.vacancyTitle}
//     </p>
//     <b
//       id="vacancyNumber"
//       value={formData.vacancyNumber}
//       style={{
//         fontSize: "86px",
//         position: "relative",
//       }}
//     >
//       {formData.vacancyNumber} Vacancies
//     </b>
//     <p
//       id="minEligibility"
//       value={formData.minEligibility}
//       style={{
//         fontSize: "60px",
//         position: "relative",
//       }}
//     >
//       {formData.minEligibility}
//     </p>
//     <b
//       id="payscale"
//       value={formData.payscale}
//       style={{
//         fontSize: "70px",
//         position: "relative",
//       }}
//     >
//       PayScale : {formData.payscale}
//     </b>
//     <p
//       id="location"
//       value={formData.location}
//       style={{
//         fontSize: "60px",
//         position: "relative",
//       }}
//     >
//       {formData.location}
//     </p>
//     <p
//       id="lastDateToApply"
//       value={formData.lastDateToApply}
//       style={{
//         fontSize: "60px",
//         position: "relative",
//       }}
//     >
//       Last Date To Apply : {formData.lastDateToApply}
//     </p>
//     {/* Add other content as needed */}
//   </div>
// </div>

  
//       {/* Bottom-Right Side - Image Created on Preview */}
//       <div className="col-md-3" >
//         <div id="previewImage"></div>
//       </div>
//     </div>
//   );
  
}

export default VacancyForm;

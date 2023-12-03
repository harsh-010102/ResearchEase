// import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

// function Home() {
//   const [uploadedFile, setUploadedFile] = useState(null);

//   const onDrop = (acceptedFiles) => {
//     // Assuming you have a server endpoint to sign and handle the S3 upload
//     // Replace 'your-s3-upload-url' with your actual server endpoint.
//     const uploadUrl = "your-s3-upload-url";

//     const formData = new FormData();
//     formData.append("file", acceptedFiles[0]);

//     axios
//       .post(uploadUrl, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       })
//       .then((response) => {
//         // Handle successful upload
//         setUploadedFile(response.data.url);
//       })
//       .catch((error) => {
//         // Handle upload error
//         console.error("Upload error: ", error);
//       });
//   };

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: "image/*", // Limit to image files or adjust to your needs
//   });

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">S3 File Upload Dashboard</h1>
//       <div className="mb-4">
//         <div
//           {...getRootProps()}
//           className="p-4 border border-dashed border-gray-400 rounded-lg cursor-pointer"
//         >
//           <input {...getInputProps()} />
//           <p>Drag & drop a file here, or click to select a file</p>
//         </div>
//       </div>
//       {uploadedFile && (
//         <div className="mb-4">
//           <p>File uploaded: {uploadedFile}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Home;

import AWS from "aws-sdk";
import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);

  const uploadFile = async () => {
    const S3_BUCKET = "ssdproject";

    const REGION = "ap-south-1";

    // S3 Credentials
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_SECRET_KEY,
    });
    
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    // Files Parameters

    const params = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
      ContentType: "application/pdf",
    };


    var upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        console.log(
          "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
        );
      })
      .promise();

    await upload.then((data, err) => {
      var url = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
      console.log(url);
      console.log(data);
      alert("File uploaded successfully.");
    });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setFile(file);
  };
  return (
    <div className="App">
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadFile}>Upload</button>
      </div>
    </div>
  );
}

export default App;

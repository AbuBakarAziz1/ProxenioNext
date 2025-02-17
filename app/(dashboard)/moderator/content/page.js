"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function Content() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null); // State for video preview URL

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);

      // Generate a preview URL for the video
      const fileUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(fileUrl);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "video/*",
  });

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);

    try {
      const response = await fetch("/api/upload-video", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Upload successful!");

        // Reset the state after successful upload
        setFile(null);
        setPreviewUrl(null);
      } else {
        alert("Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="row">
      <div className="col-md-12">
        {/* Dropzone for file selection (hidden when previewUrl exists) */}
        {!previewUrl && (
          <div
            {...getRootProps()}
            className="dropzone card d-flex justify-content-center align-items-center bg-lightgray"
            style={{ height: "400px", border: "2px dashed lightgray", cursor: "pointer" }}
          >
            <input {...getInputProps()} />
            <p>Drag & drop a video here, or click to select a video</p>
          </div>
        )}

        {/* Video Preview (shown when previewUrl exists) */}
        {previewUrl && (
          <div className="mt-3">
            <video controls width="100%" height={400} src={previewUrl}>
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {/* Upload Button (shown when previewUrl exists) */}
        {previewUrl && (
          <div className="d-flex gap-2 mt-3">
            <button
              className="btn btn-danger"
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Video"}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setPreviewUrl(null); // Clear the preview
                setFile(null); // Clear the selected file
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
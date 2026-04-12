import React, { useState, useRef } from 'react';
import { Camera, User, Upload, X } from 'lucide-react';

const ProfilePictureUpload = ({ onImageChange, initialImage = null, className = '' }) => {
  const [imagePreview, setImagePreview] = useState(initialImage);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setImagePreview(imageUrl);
        onImageChange(file, imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageChange(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageChange(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    onImageChange(null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <div className="relative">
        {/* Profile Picture Circle */}
        <div
          className={`profile-upload-container group w-24 h-24 rounded-full ${
            isDragging 
              ? 'profile-upload-dropzone dragging' 
              : imagePreview 
                ? 'border-4 border-gray-200 hover:border-primary-400' 
                : 'profile-upload-dropzone'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          {imagePreview ? (
            <>
              <img
                src={imagePreview}
                alt="Profile preview"
                className="profile-picture-preview"
              />
              {/* Overlay on hover */}
              <div className="profile-upload-overlay">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              {isDragging ? (
                <Upload className="w-8 h-8 text-primary-500" />
              ) : (
                <User className="w-8 h-8 text-gray-400 group-hover:text-primary-500 transition-colors" />
              )}
            </div>
          )}
        </div>

        {/* Remove button */}
        {imagePreview && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveImage();
            }}
            className="remove-picture-btn"
          >
            <X className="w-3 h-3" />
          </button>
        )}

        {/* Camera icon overlay for empty state */}
        {!imagePreview && (
          <div className="upload-icon-badge">
            <Camera className="w-3 h-3 text-white" />
          </div>
        )}
      </div>

      {/* Upload Instructions */}
      <div className="text-center">
        <p className="text-sm font-medium text-gray-700">
          {imagePreview ? 'Change photo' : 'Add profile photo'}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Click or drag to upload • JPG, PNG up to 5MB
        </p>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default ProfilePictureUpload;
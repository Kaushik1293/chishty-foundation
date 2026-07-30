"use client";

import React, { useCallback, useState } from "react";
import { uploadFile } from "@/app/(asgard)/asgard/upload";
import { UploadCloud, Loader2, X, Image as ImageIcon } from "lucide-react";

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  className?: string;
  previewBgColor?: string;
}

export default function ImageUploader({ label, value, onChange, placeholder = "Drag and drop an image, or click to browse", className = "", previewBgColor }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleUpload(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      await handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = async (file: File) => {
    // Only accept images
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await uploadFile(formData);
      if (res.success && res.url) {
        onChange(res.url);
      } else {
        alert(res.error || "Failed to upload image");
      }
    } catch (err: any) {
      alert("Error uploading file: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
  };

  return (
    <div className={`space-y-1 ${className}`}>
      <label className="text-xs font-semibold text-dark-green">
        {label}
      </label>
      
      <div 
        className={`relative border-2 border-dashed rounded-xl transition-colors ${isDragging ? "border-dark-yellow bg-dark-yellow/10" : "border-stroke bg-white hover:border-dark-yellow hover:bg-beige/50"}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          onChange={handleChange}
          disabled={isUploading}
        />
        
        <div className="p-4 flex flex-col items-center justify-center min-h-[120px] text-center">
          {isUploading ? (
            <div className="flex flex-col items-center justify-center text-dark-green/60">
              <Loader2 className="w-8 h-8 animate-spin text-dark-yellow mb-2" />
              <span className="text-xs font-medium">Uploading image...</span>
            </div>
          ) : value ? (
            <div className="w-full relative z-20 group">
              <div className="mt-2 p-2 rounded-xl border border-stroke flex items-center gap-3 bg-beige/50">
                <img
                  src={value}
                  alt="Preview"
                  className={`w-12 h-12 object-contain rounded-lg p-1 border border-stroke ${!previewBgColor ? 'bg-white' : ''}`}
                  style={{ backgroundColor: previewBgColor }}
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
                <span className="text-[11px] text-dark-green/70 flex-1 text-left truncate">{value.split('/').pop()}</span>
                <button 
                  onClick={clearImage}
                  className="p-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                  title="Remove image"
                  type="button"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pointer-events-none">
              <div className="w-10 h-10 rounded-full bg-dark-green/5 text-dark-green flex items-center justify-center mb-2 group-hover:bg-dark-green/10 transition-colors">
                <UploadCloud className="w-5 h-5 text-dark-yellow" />
              </div>
              <p className="text-xs font-semibold text-dark-green">{placeholder}</p>
              <p className="text-[10px] text-dark-green/50 mt-1">Supports PNG, JPG, JPEG, WEBP, GIF</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

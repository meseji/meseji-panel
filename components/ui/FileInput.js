import { useState } from 'react';

const FileInput = ({ 
  acceptedTypes = ['image/png', 'image/jpeg', 'application/pdf'], 
  maxSizeKB = 15360, // 15MB
  minAspectRatio = 1, // square
  maxAspectRatio = 2, // rectangle
  maxWidth = 2000, // max width in pixels
  maxHeight = 2000, // max height in pixels
  size = 'md', // sm, md, lg for different size variants
  onFileChange // optional callback for handling file change externally
}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [file, setFile] = useState(null);

  const validateFile = (file) => {
    if (!acceptedTypes.includes(file.type)) {
      return 'Unsupported file type.';
    }
    const fileSizeKB = file.size / 1024;
    if (fileSizeKB > maxSizeKB) {
      return `File is too large. Max size is ${maxSizeKB} KB.`;
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const aspectRatio = img.width / img.height;
      if (aspectRatio < minAspectRatio || aspectRatio > maxAspectRatio) {
        setErrorMessage(`Aspect ratio must be between ${minAspectRatio} and ${maxAspectRatio}.`);
        return;
      }
      if (img.width > maxWidth || img.height > maxHeight) {
        setErrorMessage(`Max dimensions are ${maxWidth}px width and ${maxHeight}px height.`);
        return;
      }
      setFile(file);
      setErrorMessage('');
      if (onFileChange) {
        onFileChange(file);
      }
    };

    return null;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const validationError = validateFile(selectedFile);
    if (validationError) {
      setErrorMessage(validationError);
      setFile(null);
    }
  };

  // Responsive size classes
  const sizeClasses = {
    sm: 'w-20 h-7 text-xs',
    md: 'w-28 h-9 text-sm',
    lg: 'w-36 h-11 text-md',
  };

  return (
    <div className="w-full py-9 bg-gray-50 rounded-2xl border border-gray-300 gap-3 grid border-dashed">
      <div className="grid gap-1">
        <svg className="mx-auto" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* SVG content */}
        </svg>
        <h2 className="text-center text-gray-400 text-xs leading-4">
          PNG, JPG, or PDF, smaller than {maxSizeKB / 1024} MB
        </h2>
      </div>
      <div className="grid gap-2">
        <h4 className="text-center text-gray-900 text-sm font-medium leading-snug">
          Drag and Drop your file here or
        </h4>
        <div className="flex items-center justify-center">
          <label>
            <input type="file" hidden onChange={handleFileChange} />
            <div className={`flex ${sizeClasses[size]} px-2 flex-col bg-indigo-600 rounded-full shadow text-white font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none`}>
              Choose File
            </div>
          </label>
        </div>
        {file && <p className="text-center text-green-500 text-xs">File ready: {file.name}</p>}
        {errorMessage && <p className="text-center text-red-500 text-xs">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default FileInput;

import { useState } from "react";

interface UseDragAndDropProps {
  onDrop: (files: FileList) => void;
}

const useDragAndDrop = ({ onDrop }: UseDragAndDropProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files.length > 0) {
      onDrop(e.dataTransfer.files);
    }
  };

  return { isDragging, handleDragOver, handleDragLeave, handleDrop };
};

export default useDragAndDrop;

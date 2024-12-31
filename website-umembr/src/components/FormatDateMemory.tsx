import React from 'react';

interface FormatDateMemoryProps {
  createdDate: string;
}

const FormatDateMemory: React.FC<FormatDateMemoryProps> = ({ createdDate }) => {
  const formatDate = (createdDate: string): string => {
    const now = new Date();
    const date = new Date(createdDate);
    
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = now.getMonth() - date.getMonth() + (12 * (now.getFullYear() - date.getFullYear()));
    const diffInYears = now.getFullYear() - date.getFullYear();

    // Less than 1 minute ago
    if (diffInSeconds < 60) {
      return diffInSeconds === 1 ? '1 second ago' : `${diffInSeconds} seconds ago`;
    }

    // Less than 1 hour ago
    if (diffInMinutes < 60) {
      return diffInMinutes === 1 ? '1 minute ago' : `${diffInMinutes} minutes ago`;
    }

    // Less than 1 day ago
    if (diffInHours < 24) {
      return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`;
    }

    // Yesterday
    if (diffInDays === 1) {
      return 'Yesterday';
    }

    // Within the past month
    if (diffInDays < 31) {
      return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}`;
    }

    // More than 1 month ago but within the same year
   if (diffInMonths < 12) {
      return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
    }

    // More than 1 year ago
    return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
  };

  return <span>{formatDate(createdDate)}</span>;
};

export default FormatDateMemory;

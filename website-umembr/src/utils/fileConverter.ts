
export const fileConverter = async (file: File): Promise<File | null> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (event) => {
      img.src = event?.target?.result as string;
    };

    img.onload = () => {
      const MAX_WIDTH = 1920;
      const MAX_HEIGHT = 1080;
      let width = img.width;
      let height = img.height;

      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        const widthRatio = MAX_WIDTH / width;
        const heightRatio = MAX_HEIGHT / height;
        const minRatio = Math.min(widthRatio, heightRatio);

        width = Math.round(width * minRatio);
        height = Math.round(height * minRatio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        if (blob) {
          const webpFile = new File([blob], file.name.replace(/\.[^.]+$/, ".webp"), { type: 'image/webp' });
          resolve(webpFile);
        } else {
          reject(new Error("Conversion to WebP failed"));
        }
      }, 'image/webp');
    };

    img.onerror = () => {
      reject(new Error("Failed to load the image"));
    };

    reader.onerror = () => {
      reject(new Error("Failed to read the file"));
    };

    reader.readAsDataURL(file);
  });
};
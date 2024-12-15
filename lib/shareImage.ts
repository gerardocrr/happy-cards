const uploadToCloudinary = async (imageBlob: Blob) => {
  const formData = new FormData();
  formData.append("file", imageBlob);
  formData.append("upload_preset", "happy-cards");

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    return data.public_id;
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

export const shareToFacebook = async (
  canvasRef: React.RefObject<HTMLCanvasElement>
) => {
  const canvas = canvasRef.current;
  if (!canvas) {
    console.error("Canvas is null");
    return;
  }
  canvas.toBlob(async (blob) => {
    if (blob) {
      const url = encodeURIComponent(
        "https://happy-cards.vercel.app/image/" +
          (await uploadToCloudinary(blob))
      );
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        "_blank"
      );
    } else {
      console.error("Failed to create blob from canvas");
    }
  }, "image/webp");
};

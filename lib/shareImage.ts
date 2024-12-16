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

export const saveToLocalStorage = (name: string, gift: string) => {
  localStorage.setItem("name", name);
  localStorage.setItem("gift", gift);
};

export const readLocalStorage = (name: string, gift: string) => {
  const nameLS = localStorage.getItem("name");
  const giftLS = localStorage.getItem("gift");

  if (nameLS === name && giftLS === gift) {
    console.log("Los datos ya existen");
    return true;
  } else {
    console.log("Los datos no existesn");
    return false;
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

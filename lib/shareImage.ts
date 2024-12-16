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

const saveToLocalStorage = (name: string, gift: string, id: string) => {
  localStorage.setItem("name", name);
  localStorage.setItem("gift", gift);
  localStorage.setItem("public_id", id);
};

const uploadAndShare = async (
  name: string,
  gift: string,
  canvasRef: React.RefObject<HTMLCanvasElement>
) => {
  const canvas = canvasRef.current;
  if (!canvas) {
    console.error("Canvas is null");
    return;
  }
  canvas.toBlob(async (blob) => {
    if (blob) {
      const id = await uploadToCloudinary(blob);
      const url = encodeURIComponent(
        `https://happy-cards.vercel.app/image/${id}`
      );
      saveToLocalStorage(name, gift, id);
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        "_blank"
      );
    } else {
      console.error("Failed to create blob from canvas");
    }
  }, "image/webp");
};

const onlyShare = (id: string) => {
  const url = encodeURIComponent(`https://happy-cards.vercel.app/image/${id}`);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
};

export const handleShareCard = (
  name: string,
  gift: string,
  canvasRef: React.RefObject<HTMLCanvasElement>
) => {
  const nameLS = localStorage.getItem("name");
  const giftLS = localStorage.getItem("gift");
  const public_id = localStorage.getItem("public_id");

  if (nameLS === name && giftLS === gift) {
    if (public_id) {
      onlyShare(public_id);
    } else {
      console.error("public_id is null");
    }
  } else {
    uploadAndShare(name, gift, canvasRef);
  }
};

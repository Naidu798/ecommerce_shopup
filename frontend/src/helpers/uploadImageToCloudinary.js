const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNARY_NAME}/image/upload`;

const uploadImageToCloudinary = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "Ecommerce_products");

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  return res.json();
};

export default uploadImageToCloudinary;

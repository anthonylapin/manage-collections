import axios from "axios";

export async function uploadFileToGoogleStorage(
  file: Blob | string | undefined
) {
  if (!file) {
    return "";
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post("/api/googlecloud/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    if (err.response.status === 500) {
      console.log("There was a problem with a server.");
    } else {
      console.log(err.response.data.message);
    }
  }
}

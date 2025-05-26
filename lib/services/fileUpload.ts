import axios from "axios";
import api from "./api";

export const uploadFile = async (
  file: File,
  jobId: string,
  fileType: string,
) => {
  const response = await api.post(`/common/generate-s3-url/${fileType}`, {
    fileName: file.name,
    jobId,
  });
  const s3Url = response.data.data;
  const storageName = `${fileType}/${s3Url.split(`${fileType}/`)[1].split("?")[0]}`;
  await axios.put(s3Url, file, {
    headers: {
      "Content-Type": file.type,
    },
  });
  return { fileName: file.name, storageName };
};

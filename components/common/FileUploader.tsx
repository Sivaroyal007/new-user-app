"use client";

import { useFileUpload } from "@/lib/hooks/query";
import { useRef, useState } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { useToast } from "../ui/use-toast";

interface FileUploaderProps {
  handleFileData: (fileData: { fileName: string; storageName: string }) => void;
  jobId: string;
  fileType: string;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  handleFileData,
  jobId,
  fileType,
  isLoading,
  setIsLoading,
}) => {
  const [showUpload, setShowUpload] = useState(true);
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  // const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const { mutate: uploadFile } = useFileUpload(jobId, fileType, {
    onSuccess: (data: any) => {
      handleFileData(data);
      setShowUpload(false);
      setIsLoading(false);
    },
  });

  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const fileUploaded = event.target.files?.[0];
  //   if (fileUploaded) {
  //     uploadFile(fileUploaded);
  //   }
  // };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = event.target.files?.[0];
    if (fileUploaded) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "application/pdf",
        // "text/plain",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(fileUploaded.type)) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Only JPEG, PNG, PDF, DOC, and DOCX files are allowed.",
        });
        return;
      }

      if (fileUploaded.size > maxSizeInBytes) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "File size should be less than 5MB.",
        });
        return;
      }
      setIsLoading(true);
      uploadFile(fileUploaded);

      if (hiddenFileInput.current) {
        hiddenFileInput.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    setShowUpload(true);
    handleFileData({ fileName: "", storageName: "" });
  };

  return (
    <>
      {showUpload ? (
        <button
          type="button"
          className="button-upload flex w-[120px] cursor-pointer items-center justify-around gap-[4px] rounded-[8px]  bg-primary p-[8px] text-[14px] text-white"
          onClick={handleClick}
        >
          <HiOutlineUpload />
          Upload
        </button>
      ) : (
        <button
          className="flex w-[120px] cursor-pointer items-center justify-around gap-[4px] rounded-[8px] border-2 border-[#FF0000] p-[8px] text-[14px] font-[500] text-[#FF0000]"
          onClick={handleRemove}
        >
          {/* <IoMdClose /> */}
          <span>Remove</span>
        </button>
      )}

      <input
        type="file"
        onChange={handleChange}
        ref={hiddenFileInput}
        style={{ display: "none" }}
        accept=".jpeg, .jpg, .png, .pdf, .doc, .docx"
      />
    </>
  );
};

export default FileUploader;

import React from "react";
import Dropzone from "react-dropzone";

type FileUploaderProps = {
  setFile: (file: File) => void;
  file: File | null;
  error: boolean;
};
const FileUploader = ({ setFile, file, error }: FileUploaderProps) => {
  async function dropFileHandler(files, rejectedFiles) {
    setFile(files[0]);
  }
  let maxSize = 5e6;
  return (
    <Dropzone
      onDrop={(acceptedFiles, rejectedFiles) =>
        dropFileHandler(acceptedFiles, rejectedFiles)
      }
      maxSize={maxSize}
      multiple={false}
      accept="image/*"
    >
      {({ getRootProps, getInputProps }) => (
        <section>
          <div
            className={`p-4 border border-dashed text-center ${
              file?.name
                ? "border-emerald-500"
                : error
                ? "border-red-500"
                : "border-blueExtend/50"
            }`}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {!file?.name ? (
              <p className="text-blueExtend font-bold">
                Upload user's photo (required)
              </p>
            ) : (
              <p className="text-blueExtend font-bold">{file.name}</p>
            )}
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default FileUploader;

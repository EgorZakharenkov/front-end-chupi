import React from "react";
import styles from "./InputFile.module.scss";

type Props = {
  setImageSrc: (s: string) => void;
  setSelectedFile: (selected: File) => void;
};
const InputFile: React.FC<Props> = ({ setImageSrc, setSelectedFile }) => {
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImageSrc(URL.createObjectURL(file));
    }
  };

  return (
    <div className={styles.fileInputContainer}>
      <label htmlFor="fileInput" className={styles.fileLabel}>
        <span>Выбрать картинку</span>
      </label>
      <input
        onChange={handleFileChange}
        type="file"
        id="fileInput"
        className={styles.fileInput}
      />
    </div>
  );
};

export default InputFile;

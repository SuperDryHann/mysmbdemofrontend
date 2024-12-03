import React, { useContext } from "react";
import KnowledgeBaseContext from "../../KnowledgeBaseContext";
import { KnowledgeBaseFile } from "../../KnowledgeBaseInterface";
import { Button } from "@mui/material";
import "./AddFileButton.scss";

const AddFileButton: React.FC = () => {
  const { setUploadFiles, setFiles } = useContext(KnowledgeBaseContext);

  const handleFileUpload = (event: any) => {
    setUploadFiles((prevUploadFiles) => [
      ...(prevUploadFiles || []),
      ...event.target.files,
    ]);

    // Add to files state with added status
    const addedFiles = [...event.target.files].map(
      (file: KnowledgeBaseFile) => ({
        name: file.name,
        status: "added",
      })
    );

    setFiles((prevFiles) => [...(prevFiles || []), ...addedFiles]);
  };

  return (
    <Button
      component="label"
      size="small"
      sx={{
        color: "var(--text1-color)",
        background: "var(--component3-color)",
        fontWeight: "bold",
        fontStyle: "italic",
        fontSize: "12px",
        paddingLeft: 2,
        paddingRight: 2,
        mr: 2,
      }}
    >
      Add Files
      <input type="file" hidden onChange={handleFileUpload} multiple />
    </Button>
  );
};

export default AddFileButton;

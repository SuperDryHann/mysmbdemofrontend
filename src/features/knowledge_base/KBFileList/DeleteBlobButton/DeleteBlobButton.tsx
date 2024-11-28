import React, { FC, useContext } from "react";
import { KnowledgeBaseFile } from "../../KnowledgeBaseInterface";
import KnowledgeBaseContext from "../../KnowledgeBaseContext";
import { IconButton } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { iKBFile } from "../../KnowledgeBaseInterface";

const DeleteBlobButton: FC<iKBFile> = ({ file }) => {
  const { setFiles } = useContext(KnowledgeBaseContext);

  const handleDelete = async (currentFile: KnowledgeBaseFile) => {
    // Remove files state with removed status
    setFiles((prevFiles) =>
      prevFiles?.map((file) => ({
        ...file,
        status: file.name === currentFile.name ? "removed" : file.status,
      }))
    );
  };

  return (
    <IconButton onClick={() => handleDelete(file)} size="large">
      <DeleteRoundedIcon
        sx={{ fontSize: "var(--icon-size-small)", color: "var(--text1-color)" }}
      />
    </IconButton>
  );
};

export default DeleteBlobButton;

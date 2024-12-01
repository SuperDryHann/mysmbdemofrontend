import React, { FC, useContext } from "react";
import "./DeleteUploadButton.scss";
import { KnowledgeBaseFile } from "../../KnowledgeBaseInterface";
import KnowledgeBaseContext from "../../KnowledgeBaseContext";
import { iKBFile } from "../../KnowledgeBaseInterface";
import { IconButton } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const DeleteUploadButton: FC<iKBFile> = ({ file }) => {
  const { setFiles, setUploadFiles } = useContext(KnowledgeBaseContext);

  const handleDelete = async (currentFile: KnowledgeBaseFile) => {
    setUploadFiles((prevFiles) =>
      prevFiles?.filter((file) => file.name !== currentFile.name)
    );
    setFiles((prevFiles) =>
      prevFiles?.filter((file) => file.name !== currentFile.name)
    );
  };

  return (
    <IconButton onClick={() => handleDelete(file)} size="large">
      <DeleteRoundedIcon
        sx={{ fontSize: "var(--icon-size-small)", color: "var(--yes-color)" }}
      />
    </IconButton>
  );
};

export default DeleteUploadButton;

import React, { FC, useContext } from "react";
import { KnowledgeBaseFile } from "../../KnowledgeBaseInterface";
import KnowledgeBaseContext from "../../KnowledgeBaseContext";
import { IconButton } from "@mui/material";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import { iKBFile } from "../../KnowledgeBaseInterface";

const UndoButton: FC<iKBFile> = ({ file }) => {
  const { setFiles } = useContext(KnowledgeBaseContext);

  const handleDelete = async (currentFile: KnowledgeBaseFile) => {
    // Remove files state with removed status
    setFiles((prevFiles) =>
      prevFiles?.map((file) => ({
        ...file,
        status: file.name === currentFile.name ? "" : file.status,
      }))
    );
  };

  return (
    <IconButton onClick={() => handleDelete(file)} size="large">
      <ReplayRoundedIcon
        sx={{ fontSize: "var(--icon-size-small)", color: "var(--no-color)" }}
      />
    </IconButton>
  );
};

export default UndoButton;

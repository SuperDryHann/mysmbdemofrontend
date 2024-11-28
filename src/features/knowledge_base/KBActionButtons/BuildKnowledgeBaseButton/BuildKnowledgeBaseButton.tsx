import React, { FC, useContext } from "react";
import GlobalContext from "../../../global/GlobalContext";
import KnowledgeBaseContext from "../../KnowledgeBaseContext";
import { Button } from "@mui/material";
import useAxiosToBackend from "../../../auth/useAxiosToBackend";

const BuildKnowledgeBaseButton: FC = () => {
  const { chatCase } = useContext(GlobalContext);

  const {
    files,
    uploadFiles,
    refresh,
    setRefresh,
    setIndexerStatus,
    setUploadFiles,
  } = useContext(KnowledgeBaseContext);

  const axiosToBackend = useAxiosToBackend();

  const handleClick = async (event: any) => {
    // Set indxer status
    setIndexerStatus({ status: "running" });

    // Empty upload files
    setUploadFiles([]);

    // tag metadata (is_deleted) for "removed" files
    await axiosToBackend.post(
      "/knowledgebase/tag_delete_file/",
      files
        ?.filter((file) => file.status === "removed")
        .map((file) => file.name),
      { headers: { "Content-Type": "application/json", Case: chatCase } }
    );

    // Upload files to blob storage
    await axiosToBackend.post("/knowledgebase/upload/", uploadFiles, {
      headers: {
        "Content-Type": "multipart/form-data",
        Case: chatCase,
      },
    });

    // Creat & run index
    await axiosToBackend.get("/knowledgebase/create_or_run_index/", {
      headers: {
        "Content-Type": "application/json",
        Case: chatCase,
      },
    });

    setRefresh(!refresh);
  };

  return (
    <Button
      onClick={handleClick}
      size="small"
      component="label"
      sx={{
        color: "var(--text1-color)",
        background: "var(--component3-color)",
        fontWeight: "bold",
        fontStyle: "italic",
        fontSize: "12px",
        paddingLeft: 2,
        paddingRight: 2,
      }}
    >
      Build Knowledge Base
    </Button>
  );
};

export default BuildKnowledgeBaseButton;

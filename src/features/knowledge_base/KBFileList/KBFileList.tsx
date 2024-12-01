import React, { useContext, useEffect } from "react";
import "./KBFileList.scss";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import KnowledgeBaseContext from "../KnowledgeBaseContext";
import GlobalContext from "../../global/GlobalContext";
import useAxiosToBackend from "../../auth/useAxiosToBackend";
import { KnowledgeBaseFile } from "../KnowledgeBaseInterface";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import DeleteBlobButton from "./DeleteBlobButton/DeleteBlobButton";
import DeleteUploadButton from "./DeleteUploadButton/DeleteUploadButton";
import UndoButton from "./UndoButton/UndoButton";

const KBFileList: React.FC = () => {
  const { files, setFiles, setSelectedFile, refresh } =
    useContext(KnowledgeBaseContext);

  const { chatCase } = useContext(GlobalContext);

  const axiosToBackend = useAxiosToBackend();

  const handleItemClick = (currentFile: KnowledgeBaseFile) => {
    setSelectedFile(currentFile);
  };

  useEffect(() => {
    async function getBlobs() {
      const response = await axiosToBackend.get(
        "/knowledgebase/get_blob_info/",
        { headers: { "Content-Type": "application/json", Case: chatCase } }
      );
      setFiles(response.data);
    }
    getBlobs();
  }, [refresh]);

  const colorByStatus = (status: any) => {
    if (status === "added") return "var(--yes-color)";
    if (status === "removed") return "var(--no-color)";
    return "black";
  };

  const iconByStatus = (status: any) => {
    if (status === "added")
      return (
        <AddCircleOutlineRoundedIcon
          sx={{ fontSize: "var(--icon-size-small)", color: "var(--yes-color)" }}
        />
      );
    if (status === "removed")
      return (
        <RemoveCircleOutlineRoundedIcon
          sx={{ fontSize: "var(--icon-size-small)", color: "var(--no-color)" }}
        />
      );
    return (
      <ArticleOutlinedIcon
        sx={{ fontSize: "var(--icon-size-small)", color: "var(--text1-color)" }}
      />
    );
  };

  const secondButtonByStatus = (status: any, file: KnowledgeBaseFile) => {
    if (status === "added") return <DeleteUploadButton file={file} />;
    if (status === "removed") return <UndoButton file={file} />;
    return <DeleteBlobButton file={file} />;
  };

  return (
    <List dense sx={{ width: "100%", bgcolor: "transparent" }}>
      {files?.map((x, index) => {
        const labelId = `${index}`;
        return (
          <ListItem
            key={index}
            secondaryAction={secondButtonByStatus(x.status, x)}
            disablePadding
          >
            <ListItemButton
              onClick={() => handleItemClick(x)}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <ListItemAvatar
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  m: 0,
                }}
              >
                {iconByStatus(x.status)}
              </ListItemAvatar>
              <ListItemText
                id={labelId}
                primary={x.name}
                secondary={null}
                primaryTypographyProps={{
                  sx: {
                    color: colorByStatus(x.status),
                    fontSize: "14px",
                  },
                }}
                secondaryTypographyProps={{
                  sx: {
                    color: "var(--primary-color)",
                    fontSize: "14px",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default KBFileList;

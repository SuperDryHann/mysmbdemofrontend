import { FC, useContext } from "react";
import "./DataSourceView.scss";
import ReactMarkdown from "react-markdown";
import ChatContext from "../ChatContext";
import { Drawer } from "@mui/material";

// This is sidebar component before and change the file name into DataSourceView
const DataSourceView: FC = () => {
  const { isSidebarOpen, setIsSidebarOpen, currentReferenceContent } =
    useContext(ChatContext);

  const toggleDrawer = (open: boolean) => (event: React.MouseEvent) => {
    setIsSidebarOpen(open);
  };

  return (
    <Drawer
      anchor="right"
      open={isSidebarOpen}
      onClose={toggleDrawer(false)}
      sx={{
        "& .MuiDrawer-paper": {
          boxShadow: "none", // Removes the shadow
        },
      }}
    >
      {/* Drawer content goes here */}
      <div
        style={{
          width: 500,
          padding: 40,
          fontSize: "12px",
        }}
      >
        <h2 style={{ color: "var(--component3-color" }}>Source</h2>
        <ReactMarkdown>{currentReferenceContent}</ReactMarkdown>
      </div>
    </Drawer>
  );
};

export default DataSourceView;

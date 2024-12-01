import { FC, useContext } from "react";
import "./AppHeader.scss";
import { Typography, Tooltip, IconButton } from "@mui/material";
import GlobalContext from "../../global/GlobalContext";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";

const AppHeader: FC = () => {
  const { worksheet, setWorksheet } = useContext(GlobalContext);
  const clickKnowledgeBase = async () => {
    switch (worksheet) {
      case "bi_chat":
        setWorksheet("bi_knowledge_base");
        break;
      case "company_chat":
        setWorksheet("company_knowledge_base");
        break;
      case "customer_service_chat":
        setWorksheet("customer_service_knowledge_base");
        break;
    }
  };
  return (
    <header className="appbar">
      <Tooltip
        title={
          <Typography sx={{ fontSize: "12px" }}>{"Knowledge Base"}</Typography>
        }
        placement="right"
      >
        <IconButton onClick={clickKnowledgeBase}>
          {/* <FolderRoundedIcon
            sx={{
              color: worksheet.includes("knowledge_base")
                ? "var(--component3-color)"
                : "var(--primary-color)",
              fontSize: "var(--icon-size)",
            }}
          /> */}
          <i className="material-icons" style={{fontSize: "var(--icon-size)"}}>folder</i>
        </IconButton>
      </Tooltip>
    </header>
  );
};

export default AppHeader;

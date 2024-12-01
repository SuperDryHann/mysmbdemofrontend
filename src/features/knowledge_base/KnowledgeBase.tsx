import React, { useEffect } from "react";
import { useContext } from "react";
import KnowledgeBaseContext from "./KnowledgeBaseContext";
import "../global/Global.scss";
import useAxiosToBackend from "../auth/useAxiosToBackend";
import "./KnowledgeBase.scss";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";
import KBActionButtons from "./KBActionButtons/KBActionButtons";
import KBFileList from "./KBFileList/KBFileList";

const KnowledgeBase: React.FC = () => {
  const {
    indexerStatus,
    setIndexerStatus,
    knowledgeBaseLoading,
    setKnowledgeBaseLoading,
    refresh,
  } = useContext(KnowledgeBaseContext);

  const axiosToBackend = useAxiosToBackend();

  useEffect(() => {
    let intervalId: any;

    async function getKnowledgeBaseStatus() {
      const response = await axiosToBackend.get(
        "/knowledgebase/get_knowledge_base_status/",
        {
          headers: { "Content-Type": "application/json", Case: "organisation" },
        }
      );

      // Convert last_updated to a Date object
      const lastUpdatedDate = new Date(response.data[0].last_updated);
      const now = new Date();

      // Calculate the difference in milliseconds
      const diffInMs = now.getTime() - lastUpdatedDate.getTime();

      // Calculate the difference in days, hours, and minutes
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
      const diffInHours = Math.floor(
        (diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const diffInMinutes = Math.floor(
        (diffInMs % (1000 * 60 * 60)) / (1000 * 60)
      );

      // Set the indexer status
      const status = {
        status: response.data[0].status,
        last_updated: response.data[0].last_updated,
        time_difference: `${diffInDays} days, ${diffInHours} hours, ${diffInMinutes} minutes`,
      };

      setIndexerStatus(status);

      setKnowledgeBaseLoading(false);

      // If status is 'completed', stop the interval
      if (
        response.data[0].status === "completed" ||
        response.data[0].status === null
      ) {
        clearInterval(intervalId);
      }
    }

    // Start polling every 5 seconds
    intervalId = setInterval(getKnowledgeBaseStatus, 2000);

    // Cleanup: clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, [refresh]);

  return (
    <div className="knowledgebase">
      <div className="document">
        <div className="header">
          <h3
            style={{
              marginLeft: "20px",
              fontWeight: "bolds",
              fontSize: "25px",
            }}
          >
            Knowledge Base
          </h3>
          <h5
            style={{
              fontWeight: "bold",
              fontStyle: "italic",
              fontSize: "12px",
              color: "var(--text2-color)",
              marginRight: "20px",
            }}
          >
            {indexerStatus?.status === "completed"
              ? `Your knowledge base has been upadated ( ${indexerStatus.time_difference} ago ).`
              : ""}
          </h5>
        </div>
        <div className="item-list">
          <KBFileList />
        </div>
      </div>

      <KBActionButtons />

      <Backdrop
        sx={{
          color: "#fff",
          zIndex: 10,
          position: "absolute",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
        }}
        open={indexerStatus?.status === "running" || knowledgeBaseLoading}
      >
        <CircularProgress sx={{ color: "var(--component3-color)" }} />
        {indexerStatus?.status === "running" ? (
          <Typography
            sx={{
              ml: 2,
              color: "black",
            }}
          >
            Building Knowledge Base...
          </Typography>
        ) : null}
      </Backdrop>
    </div>
  );
};

export default KnowledgeBase;

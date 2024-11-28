import React from "react";
import "./KBActionButtons.css";
import AddFileButton from "./AddFileButton/AddFileButton";
import BuildKnowledgeBaseButton from "./BuildKnowledgeBaseButton/BuildKnowledgeBaseButton";

// Entire chat component
const KBActionButtons: React.FC = () => {
  return (
    <div className="upload-buttons">
      <AddFileButton />
      <BuildKnowledgeBaseButton />
    </div>
  );
};

export default KBActionButtons;

import { FC, useContext } from "react";
import ChatContext from "../../ChatContext";
interface iReferenceButton {
  index: number;
  referenceTitle: string;
  referenceContent: string;
}
const ReferenceButton: FC<iReferenceButton> = ({
  index,
  referenceTitle,
  referenceContent,
}) => {
  const { setIsSidebarOpen, setCurrentReferenceContent } =
    useContext(ChatContext);

  const toggleDrawer = (open: boolean) => (event: React.MouseEvent) => {
    setIsSidebarOpen(open);
    setCurrentReferenceContent(referenceContent);
  };

  return (
    <div>
      {/* Transparent Button */}
      <button className="reference-button" onClick={toggleDrawer(true)}>
        <sup>{index}</sup> {referenceTitle}
      </button>
    </div>
  );
};

export default ReferenceButton;

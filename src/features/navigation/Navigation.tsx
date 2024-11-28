import { useContext, ReactNode } from "react";
import GlobalContext from "../global/GlobalContext";
import QuestionMarkRoundedIcon from "@mui/icons-material/QuestionMarkRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import "../global/Global.css";
import "./Navigation.css";

import { iDrawerNav } from "../../components/AHDrawer/AHDrawer";
import AHDrawer from "../../components/AHDrawer/AHDrawer";

import AHAppHeader from "../../components/AHAppHeader/AHAppHeader";

export function Navigation({ children }: { children: ReactNode }) {
  const { worksheet, setWorksheet, setChatCase } = useContext(GlobalContext);

  // const clickBIChat = async () => {
  //   setWorksheet("bi_chat");
  // };

  const clickCompanyChat = () => {
    setWorksheet("company_chat");
    setChatCase("organisation");
  };

  const clickCustomerServiceChat = () => {
    setWorksheet("customer_service_chat");
    setChatCase("customerservice");
  };

  // const clickEmailClassifier = () => {
  //   setWorksheet("email_classifier");
  // };

  // const clickNavigationLog= () => {
  //   setWorksheet('log');
  //   console.log('log')
  // };

  const navigationMap = [
    // {
    //   title: 'Ask Hannah',
    //   icon: EmailRoundedIcon,
    //   onclick: clickEmailClassifier,
    //   iconColor: worksheet === 'email_classifier' ? 'var(--component3-color)' : 'var(--primary-color)',
    // },
    // {
    //   title: 'Ask mySMB',
    //   icon: AssessmentRoundedIcon,
    //   onclick: clickBIChat,
    //   iconColor: worksheet === 'bi_chat' ? 'var(--component3-color)' : 'var(--primary-color)',
    // },
    {
      title: "Ask myCompany",
      icon: ApartmentRoundedIcon,
      onclick: clickCompanyChat,
      iconColor:
        worksheet === "company_chat" || worksheet === "company_knowledge_base"
          ? "var(--component3-color)"
          : "var(--primary-color)",
    },
    {
      title: "Ask mySMB",
      icon: QuestionMarkRoundedIcon,
      onclick: clickCustomerServiceChat,
      iconColor:
        worksheet === "customer_service_chat" ||
        worksheet === "customer_service_knowledge_base"
          ? "var(--component3-color)"
          : "var(--primary-color)",
    },
  ] as iDrawerNav[];

  return (
    <div className="navigation">
      {/* AppBar */}
      <AHAppHeader />

      {/* Side Navigation */}
      <header className="sidebar-header"></header>

      {/* drawer side bar */}
      <AHDrawer navigationMap={navigationMap} />

      {/* Main Content */}
      <main className="content">{children}</main>
    </div>
  );
}

export default Navigation;

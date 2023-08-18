import { Paper, Tab } from "@mui/material";
import TabPanel from "components/layout/TabPanel";
import Tabs from "components/layout/Tabs";
import SwipeableViews from "lib/SwipeableViews";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { storage } from "utils/storage";
import BuyChat from "./buy/BuyChat";
import SellChat from "./sell/SellChat";
const AppBarChat: FC<{}> = ({}) => {
  const { t } = useTranslation("chat");
  const startTab = storage.getChatTab();

  const [activeIndex, setActiveIndex] = useState(startTab);
  const { id } = useParams();
  const handleTabChange = (index: number) => {
    setActiveIndex(index);
  };
  useEffect(() => {
    storage.setChatTab(activeIndex);
  }, [activeIndex]);
  return (
    <>
      <Paper>
        <Tabs
          sx={{
            bgcolor: "#fff",
            width: { xs: 1, md: 1 },
            px: { md: id ? 1 : "30%" },
            mx: "auto",
          }}
          value={activeIndex}
          onChange={(_, index) => handleTabChange(index)}
        >
          <Tab label={t("myPurchases")} />
          <Tab label={t("mySales")} />
        </Tabs>
      </Paper>
      <SwipeableViews index={activeIndex} onChangeIndex={handleTabChange}>
        <TabPanel activeIndex={activeIndex} index={0}>
          <BuyChat />
        </TabPanel>
        <TabPanel activeIndex={activeIndex} index={1}>
          <SellChat />
        </TabPanel>
      </SwipeableViews>
    </>
  );
};
export default AppBarChat;

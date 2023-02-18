import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import Card from "../UI/Card";

import styles from "./GrossaryTab.module.css";
import { Tab } from "@mui/material";
import { capitalizeWords } from "../Util/UtilityMethod";
import GrossaryTabItemList from "./GrossaryTabItemList";
import CartContext from "../context/CartContext";

export default function GrossaryTab() {
  const [currentTab, setCurrentTab] = React.useState({ value: "", label: "" });

  const cntx = React.useContext(CartContext);

  let uniqueCatigories = [];

  const finalListItems = cntx.finalItemList;

  uniqueCatigories = Array.from(
    new Set(finalListItems.map((item) => item.catigory))
  );

  let currentTabValues = null;

  const handleChange = (event: React.SyntheticEvent, number) => {
    currentTabValues = { value: number, label: uniqueCatigories[number] };
    setCurrentTab(currentTabValues);
  };

  return (
    <section className={styles.tab}>
      <Card>
        <Box
          sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: "background.paper" }}
        >
          <Tabs
            value={+currentTab.value}
            onChange={handleChange}
            variant="scrollable"
            orientation="horizontal"
            aria-label="scrollable auto tabs example"
          >
            {uniqueCatigories.map((catigory) => {
              const catigoryDescription = capitalizeWords(catigory);
              return (
                <Tab key={catigory} label={catigoryDescription} />
              );
            })}
          </Tabs>
        </Box>
        <GrossaryTabItemList
          key={currentTab.value}
          value={currentTab.value}
          index={currentTab.value}
          selectedcatigory={
            uniqueCatigories[currentTab.value] == null
              ? uniqueCatigories[0]
              : uniqueCatigories[currentTab.value]
          }
        />
      </Card>
    </section>
  );
}

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import Card from "../UI/Card";

import styles from "./GrossaryTab.module.css";
import { Tab } from "@mui/material";
import GrossaryTabItemList from "./GrossaryTabItemList";
import CartContext from "../context/CartContext";

export default function GrossaryTab() {
  const [currentTab, setCurrentTab] = React.useState({ value: "", label: "" });

  const cntx = React.useContext(CartContext);

  const finalListItems = cntx.finalItemList;

  let currentTabValues = null;

  const handleChange = (event: React.SyntheticEvent, number) => {
    currentTabValues = { value: number, label: finalListItems[number] };
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
            // variant="scrollable"
            orientation="horizontal"
            aria-label="scrollable auto tabs example"
          >
            {finalListItems.map((catigoryList) => {              
              return (
                <Tab key={catigoryList.catigory} label={catigoryList.catigory} />
              );
            })}
          </Tabs>
        </Box>
        <GrossaryTabItemList
          value={currentTab.value=== "" ? 0 : currentTab.value}
          index={currentTab.value=== "" ? 0 : currentTab.value}
          selectedcatigorydata={
            finalListItems[currentTab.value] == null
              ? finalListItems[0]
              : finalListItems[currentTab.value]
          }
        />
      </Card>
    </section>
  );
}

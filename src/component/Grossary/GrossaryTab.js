import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import Card from "../UI/Card";
import { Tab } from "@mui/material";
import GrossaryTabItemList from "./GrossaryTabItemList";
import CartContext from "../context/CartContext";
import AddNewItem from "../AddNewGrossaryItem/AddNewItem";

import styles from "./GrossaryTab.module.css";
import Button from "../UI/Button";
import { formatLoadedList } from "../Util/UtilityMethod";

export default function GrossaryTab() {
  const [currentTab, setCurrentTab] = React.useState({ value: "", label: "" });
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [baseGrossaryItem, setBaseGrossaryItem] = React.useState([]);
  const cntx = React.useContext(CartContext);

  let currentTabValues = null;

  const handleShowAddFormButton = () => {
    setShowAddForm(!showAddForm);
  };

  const handleChange = (event: React.SyntheticEvent, number) => {
    currentTabValues = { value: number, label: baseGrossaryItem[number] };
    setCurrentTab(currentTabValues);
  };

  const fetchGrossaryHandler = React.useCallback(async () => {
    setIsLoading(true);
    // setError(null);
    try {
      const response = await fetch(
        "https://grossary-app-28792-default-rtdb.asia-southeast1.firebasedatabase.app/BaseItems.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      console.log(data);
      const loadedData = [];
      for (const key in data) {
        console.log(key);
        console.log(data[key]);
        loadedData.push({
          itemId: data[key].itemId,
          itemName: data[key].itemName,
          img: data[key].img,
          isBaseItem: true,
          catigory: data[key].catigory,
          defaultQuantity: +data[key].defaultQuantity,
          defaultUnitQuantity: data[key].defaultUnitQuantity,
          price: +data[key].price,
        });
      }
      console.log(loadedData);
      const formatedList = formatLoadedList(loadedData);
      console.log(formatedList);
      setBaseGrossaryItem(formatedList);

      // setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  React.useEffect(() => {
    fetchGrossaryHandler();
  }, [fetchGrossaryHandler]);

  return (
    <section className={styles.tab}>
      <Card className={styles.addItemWrapper}>
        {showAddForm ? (
          <AddNewItem onHideForm={handleShowAddFormButton} onRefresh={fetchGrossaryHandler}/>
        ) : (
          <Button type="button" onClick={handleShowAddFormButton}>
            Add New Item
          </Button>
        )}
      </Card>
      <Card>
        {baseGrossaryItem.length === 0 ? (
          <p>No Item in List.</p>
        ) : (
          <>
            <Box
              sx={{
                maxWidth: { xs: 320, sm: 480 },
                bgcolor: "background.paper",
              }}
            >
              <Tabs
                value={+currentTab.value}
                onChange={handleChange}
                // variant="scrollable"
                orientation="horizontal"
                aria-label="scrollable auto tabs example"
              >
                {baseGrossaryItem.map((catigoryList) => {
                  return (
                    <Tab
                      key={catigoryList.catigory}
                      label={catigoryList.catigory}
                    />
                  );
                })}
              </Tabs>
            </Box>
            <GrossaryTabItemList
              value={currentTab.value === "" ? 0 : currentTab.value}
              index={currentTab.value === "" ? 0 : currentTab.value}
              selectedcatigorydata={
                baseGrossaryItem[currentTab.value] == null
                  ? baseGrossaryItem[0]
                  : baseGrossaryItem[currentTab.value]
              }
            />
          </>
        )}
      </Card>
    </section>
  );
}

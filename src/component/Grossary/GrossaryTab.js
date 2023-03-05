import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import Card from "../UI/Card";
import { Tab } from "@mui/material";
import GrossaryTabItemList from "./GrossaryTabItemList";

import styles from "./GrossaryTab.module.css";
import Button from "../UI/Button";
import { formatLoadedList } from "../Util/UtilityMethod";
import useDatabase from "../hooks/usedatabase";
import { useEffect, useState } from "react";
import AddNewItem from "../AddNewGrossaryItem/AddNewItem";

export default function GrossaryTab() {
  const { isLoading, error, fetchTasks } = useDatabase();
  const [currentTab, setCurrentTab] = useState({ value: "", label: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  const [baseGrossaryItem, setBaseGrossaryItem] = useState([]);
  const [isRefreshRequired, setIsRefreshRequired] = useState(false);

  let currentTabValues = null;

  const handleShowAddFormButton = () => {
    setShowAddForm(!showAddForm);
  };

  const handleChange = (event: React.SyntheticEvent, number) => {
    currentTabValues = { value: number, label: baseGrossaryItem[number] };
    setCurrentTab(currentTabValues);
  };

  useEffect(() => {
    const applyData = (data) => {
      const loadedData = [];
      for (const key in data) {
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
      const formattedItemList = formatLoadedList(loadedData);
      setBaseGrossaryItem(formattedItemList);
    };
    fetchTasks(
      {
        url: "https://grossary-app-28792-default-rtdb.asia-southeast1.firebasedatabase.app/BaseItems.json",
      },
      applyData
    );
    setIsRefreshRequired(false)
  }, [fetchTasks, isRefreshRequired]);
  let content = "";
  if (error) {
    content = <button onClick={fetchTasks}>Try again</button>;
  }

  if (isLoading) {
    content = <p>"Loading tasks..."</p>;
  }

  const taskAddHandler = (newItemAdded) => {
    setIsRefreshRequired(true)
  };

  return (
    <section className={styles.tab}>
      {error || isLoading ? (
        content
      ) : (
        <>
          <Card className={styles.addItemWrapper}>
            {showAddForm ? (
              <AddNewItem
                onHideForm={handleShowAddFormButton}
                onAddTask={taskAddHandler}
              />
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
                    // maxWidth: { xs: 320, sm: 480 },
                    bgcolor: "background.paper",
                  }}
                >
                  <Tabs
                    value={+currentTab.value}
                    onChange={handleChange}
                    variant="scrollable"
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
        </>
      )}
    </section>
  );
}

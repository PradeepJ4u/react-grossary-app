import GrossaryTabItemList from "./GrossaryTabItemList";

import styles from "./GrossaryTab.module.css";
import Button from "../UI/Button";
import { formatLoadedList } from "../Util/UtilityMethod";
import useDatabase from "../hooks/usedatabase";
import { useEffect, useState } from "react";
import AddNewItem from "../AddNewGrossaryItem/AddNewItem";
import { useDispatch, useSelector } from "react-redux";
import { uiAction } from "../../store/ui";
import GrossaryItemTabHeader from "./GrossaryItemTabHeader";
import { baseItemsAction } from "../../store/baseItemSlice";

export default function GrossaryTab() {
  const { isLoading, error, fetchTasks } = useDatabase();
  const [isRefreshRequired, setIsRefreshRequired] = useState(false);
  const dispatch = useDispatch();
  const showAddForm = useSelector((state) => state.ui.showAddItem);
  const currentTabValue = useSelector((state) => state.currentTab.value);
  const baseGrossaryItem = useSelector((state) => state.baseItem.baseItems);

  const handleShowAddFormButton = () => {
    dispatch(uiAction.toggleAddItem());
  };

  useEffect(() => {
    let itemCount = 0
    const applyData = (data) => {
      const loadedData = [];
      for (const key in data) {
        itemCount++
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
      dispatch(baseItemsAction.replaceBaseItems({baseItems:formattedItemList, totalItems: itemCount}))
    };
    fetchTasks(
      {
        url: "https://grossary-app-28792-default-rtdb.asia-southeast1.firebasedatabase.app/BaseItems.json",
      },
      applyData
    );
    setIsRefreshRequired(false);
  }, [fetchTasks, isRefreshRequired, dispatch]);
  let content = "";
  if (error) {
    content = <button onClick={fetchTasks}>Try again</button>;
  }

  if (isLoading) {
    content = <p>"Loading tasks..."</p>;
  }

  const taskAddHandler = () => {
    setIsRefreshRequired(true);
  };

  return (
    <section className={styles.tab}>
      {error || isLoading ? (
        content
      ) : (
        <>
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
          {baseGrossaryItem.length === 0 ? (
            <p>No Item in List.</p>
          ) : (
            <>
              <GrossaryItemTabHeader baseItemList={baseGrossaryItem} />
              <GrossaryTabItemList
                value={currentTabValue === "" ? 0 : currentTabValue}
                index={currentTabValue === "" ? 0 : currentTabValue}
                selectedcatigorydata={
                  baseGrossaryItem[currentTabValue] == null
                    ? baseGrossaryItem[0]
                    : baseGrossaryItem[currentTabValue]
                }
              />
            </>
          )}
        </>
      )}
    </section>
  );
}

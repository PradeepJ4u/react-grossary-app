import { Box } from "@mui/material";
import { FINAL_DATA_LIST } from "../Util/Constants";
import GrossaryTabItemData from "./GrossaryItem/GrossaryTabItemData";
import styles from "./GrossaryTabItemList.module.css";

function GrossaryTabItemList(props) {
  const { children, value, index, ...other } = props;

  const currentTabDataList = FINAL_DATA_LIST.filter(
    (item) => item.catigory === props.selectedcatigory
  );
  
  return (
    <div
      key={props.value}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <ul className={styles["available-list"]}>
            {currentTabDataList.map((item) => {
              return (
                <GrossaryTabItemData key={item.itemId} item={item} />
              );
            })}
          </ul>
        </Box>
      )}
    </div>
  );
}
export default GrossaryTabItemList;

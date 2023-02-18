import { Box } from "@mui/material";
import GrossaryTabItemData from "./GrossaryItem/GrossaryTabItemData";
import styles from "./GrossaryTabItemList.module.css";

function GrossaryTabItemList(props) {
  const { children, value, index, ...other } = props;
  const currentTabDataList = props.selectedcatigorydata.catigoryItemList
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
                <GrossaryTabItemData key={item.itemId} item={item} itemCatigory={props.selectedcatigorydata.catigory}/>
              );
            })}
          </ul>
        </Box>
      )}
    </div>
  );
}
export default GrossaryTabItemList;

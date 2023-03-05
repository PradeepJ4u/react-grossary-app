import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { currentTabAction } from "../../store/selectedTabSlice";

function GrossaryItemTabHeader(props) {
  const baseGrossaryItem = props.baseItemList;
  const dispatch = useDispatch();
  const currentTabValue = useSelector((state) => state.currentTab.value);


  const handleChange = (event: React.SyntheticEvent, number) => {
    dispatch(
      currentTabAction.updateCurrentTab({
        value: number,
        label: baseGrossaryItem[number],
      })
    );
  };

  return (
    <Box
      sx={{
        // maxWidth: { xs: 320, sm: 480 },
        bgcolor: "background.paper",
      }}
    >
      <Tabs
        value={+currentTabValue}
        onChange={handleChange}
        variant="scrollable"
        orientation="horizontal"
        aria-label="scrollable auto tabs example"
      >
        {baseGrossaryItem.map((catigoryList) => {
          return (
            <Tab key={catigoryList.catigory} label={catigoryList.catigory} />
          );
        })}
      </Tabs>
    </Box>
  );
}

export default GrossaryItemTabHeader;

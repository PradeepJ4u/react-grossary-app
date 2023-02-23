export const formatLoadedList = (loadedData) => {
  console.log();
  const cuttentLoadedList = loadedData;
  const formatList = [];
  console.log(cuttentLoadedList.length);
  for (let i = 0; i < cuttentLoadedList.length; i++) {
    const existingFinalListItemIndex = formatList.findIndex(
      (item) => item.catigory === cuttentLoadedList[i].catigory
    );
    const existingfinalListItem = formatList[existingFinalListItemIndex];
    console.log(existingfinalListItem);
    if (existingfinalListItem) {
      const formatElement = {
        catigory: existingfinalListItem.catigory,
        catigoryItemList: [
          ...existingfinalListItem.catigoryItemList,
          {
            itemId: cuttentLoadedList[i].itemId,
            itemName: cuttentLoadedList[i].itemName,
            img: cuttentLoadedList[i].img,
            isBaseItem: true,
            defaultQuantity: cuttentLoadedList[i].defaultQuantity,
            defaultUnitQuantity: cuttentLoadedList[i].defaultUnitQuantity,
            price: cuttentLoadedList[i].price,
          },
        ],
      };
      formatList[existingFinalListItemIndex] = formatElement;
    } else {
      const formatElement = {
        catigory: cuttentLoadedList[i].catigory,
        catigoryItemList: [
          {
            itemId: cuttentLoadedList[i].itemId,
            itemName: cuttentLoadedList[i].itemName,
            img: cuttentLoadedList[i].img,
            isBaseItem: true,
            defaultQuantity: cuttentLoadedList[i].defaultQuantity,
            defaultUnitQuantity: cuttentLoadedList[i].defaultUnitQuantity,
            price: cuttentLoadedList[i].price,
          },
        ],
      };
      console.log(formatElement);
      formatList.push(formatElement);
    }
  }
  return formatList;
};

export const formatLoadedList = (loadedData) => {
  const cuttentLoadedList = loadedData;
  const formatList = [];
  for (let i = 0; i < cuttentLoadedList.length; i++) {
    const existingFinalListItemIndex = formatList.findIndex(
      (item) => item.catigory === cuttentLoadedList[i].catigory
    );
    const existingfinalListItem = formatList[existingFinalListItemIndex];
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
      formatList.push(formatElement);
    }
  }
  return formatList;
};

export const getSystemDate = () =>{
  var today = new Date();
  var dd = today.getDate();
  
  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();
  if(dd<10) 
  {
      dd='0'+dd;
  } 
  
  if(mm<10) 
  {
      mm='0'+mm;
  } 
  today = mm+'/'+dd+'/'+yyyy;
  console.log(today);
  return today
}

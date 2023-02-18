const Users = [
  {
    userId: 1,
    userFirstName: "Pradeep",
    userLastName: "Joshi",
    roles: ["admin", "user"],
    previousOrders: [
      {
        billDate: "01/01/2023",
        billAmount: "Rs. 254.00",
        listItems: [{ item: {}, orderedQuantity: 2 }],
      },
    ],
    customItems: [
      {
        catigory: "Snacks",
        catigoryItemList: [
          {
            itemId: 101,
            itemName: "Nice Time",
            img: "",
            isBaseItem: false,
            defaultQuantity: 1,
            defaultUnitQuantity: "pc",
            price: 150.0,
          },
          {
            itemId: 102,
            itemName: "Britania Rusk",
            img: "",
            isBaseItem: false,
            defaultQuantity: 1,
            defaultUnitQuantity: "pc",
            price: 150.0,
          },
        ],
      },
      {catigory: "Snacks",
      catigoryItemList: [
      {
        itemId: 103,
        itemName: "Mong Daal",
        img: "",
        isBaseItem: true,
        defaultQuantity: 500,
        defaultUnitQuantity: "grms",
        price: 90.0,
      },
      {
        itemId: 104,
        itemName: "Mix Daal",
        img: "",
        isBaseItem: true,
        defaultQuantity: 500,
        defaultUnitQuantity: "grms",
        price: 100,
      }
    ],
  },
];

const BaseItemList = [
  {
    catigory: "Grains",
    catigoryItemList: [
      {
        itemId: 1,
        itemName: "Mong Daal",
        img: "",
        isBaseItem: true,
        defaultQuantity: 500,
        defaultUnitQuantity: "grms",
        price: 100,
      },
      {
        itemId: 2,
        itemName: "Channa Daal",
        img: "",
        isBaseItem: true,

        defaultQuantity: 500,
        defaultUnitQuantity: "grms",
        price: 90.0,
      },
      {
        itemId: 6,
        itemName: "Rajma",
        img: "",
        isBaseItem: true,
        defaultQuantity: 500,
        defaultUnitQuantity: "grms",
        price: 100,
      },
      {
        itemId: 7,
        itemName: "Kala Daal",
        img: "",
        isBaseItem: true,
        defaultQuantity: 500,
        defaultUnitQuantity: "grms",
        price: 90.0,
      },
      {
        itemId: 8,
        itemName: "Arhar Daal",
        img: "",
        isBaseItem: true,
        defaultQuantity: 500,
        defaultUnitQuantity: "grms",
        price: 100,
      },
     
      {
        itemId: 11,
        itemName: "Safed Chola",
        img: "",
        isBaseItem: true,
        defaultQuantity: 500,
        defaultUnitQuantity: "grms",
        price: 90.0,
      },
    ],
  },
  {
    catigory: "Daily Esentials",
    catigoryItemList: [
      {
        itemId: 3,
        itemName: "Sugar",
        img: "",
        isBaseItem: true,

        defaultQuantity: 500,
        defaultUnitQuantity: "grms",
        price: 110.0,
      },
      {
        itemId: 4,
        itemName: "Tooth Paste",
        img: "",
        isBaseItem: true,
        defaultQuantity: 1,
        defaultUnitQuantity: "pc",
        price: 150.0,
      },
    ],
  },
  {
    catigory: "Cosmatic",
    catigoryItemList: [
      {
        itemId: 5,
        itemName: "Nivya Cream",
        img: "",
        isBaseItem: true,
        defaultQuantity: 1,
        defaultUnitQuantity: "pc",
        price: 150.0,
      },
    ],
  },
];
export const CNTX_USER = Users[0];
for (let i=0; i < BaseItemList.length ; i++){
  for (let j=0; j < CNTX_USER.customItems.length ; j++){
    console.log(BaseItemList[i].catigory);
    console.log(CNTX_USER.customItems[j].catigory)
    if (BaseItemList[i].catigory.toUpperCase() === CNTX_USER.customItems[j].catigory.toUpperCase()){
      BaseItemList[i].catigoryItemList = BaseItemList[i].catigoryItemList.concat(CNTX_USER.customItems.catigoryItem)}
  }
}
console.log(BaseItemList);

export const FINAL_DATA_LIST = BaseItemList.concat(CNTX_USER.customItems);

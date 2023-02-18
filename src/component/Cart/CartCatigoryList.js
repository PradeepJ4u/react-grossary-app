{catigoryItem.catigoryItemList.map(
    item => {return(<CartItem
      key={item.itemId}
      name={item.itemName}
      price={item.price}
      amount={item.defaultQuantity}
      onAddItem={addItemToCart.bind(null, item)}
      onRemoveItem={removeItemToCart.bind(null, item.itemId)}
    />)})}
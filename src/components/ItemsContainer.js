import './ItemsContainer.css';
export default function ItemsContainer({ items, onItemsChange, onReset,totalItems }) {
    const handleItemCountChange = (index, newCount) => {
        const updatedItems = items.map((item, _index) => {
            if (_index === index)
                return {
                    ...item,
                    qty: newCount
                };
            else return item;
        });
        onItemsChange(updatedItems);
    }
    const handleItemDelete = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1)
        onItemsChange(updatedItems);
    }

    const handleReset = () => {
        onReset();
    }
    return (
        <div className='items-container'>
            <div className="item head">
                <div>Items({totalItems})</div>
                <div>Qty</div>
                <div>Price</div>
            </div>
            {
                items.length ?
                    items.map((item, index) => (
                        <div className="item" key={index}>
                            <div className="item-description">
                                <div className="item-image"><img src={item.img_url} /></div>
                                <div className="item-name">{item.name}</div>
                                <button onClick={() => handleItemDelete(index)}>X</button>
                            </div>
                            <div className="item-qty">
                                <button disabled={item.qty === 0} onClick={() => handleItemCountChange(index, Number(item.qty) - 1)}>-</button>
                                <input
                                    className="item-qty-input"
                                    type="number"
                                    value={item.qty}
                                    min={0}
                                    onChange={(event) => handleItemCountChange(index, event.target.value)}
                                />
                                <button onClick={() => handleItemCountChange(index, Number(item.qty) + 1)}>+</button>
                            </div>
                            <div className="item-price">${item.price}</div>
                        </div>
                    ))
                    : <button onClick={handleReset}>Reset Cart</button>
            }
        </div>
    );
}
import ItemsContainer from "./ItemsContainer";
import PriceContainer from "./PriceContainer";
import './CartContainer.css';
import { useEffect, useState } from "react";
import initialItems from '../data.json';

const cartKey = 'cart';

const getIntialCartState = () => {
    const cachedItems = JSON.parse(localStorage.getItem(cartKey));
    if(cachedItems && cachedItems.length)
        return cachedItems;
    return initialItems.map(item => ({
        ...item,
        qty: 1
    }))
}
const getTotalSelectedItems = (items) => {
    let count = 0;
    items.forEach(item => {
        count += item.qty;
    })
    return count;
}

const getTotalPrice = (items) => {
    let price = 0;
    items.forEach(item => {
        price += (item.qty * item.price);
    })
    return price;
}

const getTotalDiscount = (items) => {
    let discount = 0;
    items.forEach(item => {
        discount += (item.qty * item.price) * item.discount / 100;
    })
    return discount;
}

const getTypeDiscount = (items) => {
    let discount = 0;
    items.forEach(item => {
        if (item.type === "fiction")
            discount += (item.qty * item.price) * 0.15; // provide extra 15% discount
    })
    return discount;
}
export default function CartContainer() {
    const [selectedItems, setSelectedItems] = useState(getIntialCartState());
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [typeDiscount, setTypeDiscount] = useState(0);
    const [orderTotal, setOrderTotal] = useState(0);

    useEffect(() => {
        setOrderTotal(totalPrice - totalDiscount - typeDiscount)
    }, [totalPrice, totalDiscount, typeDiscount]);

    useEffect(() => {
        localStorage.setItem(cartKey, JSON.stringify(selectedItems));
        setTotalItems(getTotalSelectedItems(selectedItems));
        setTotalPrice(getTotalPrice(selectedItems));
        setTotalDiscount(getTotalDiscount(selectedItems));
        setTypeDiscount(getTypeDiscount(selectedItems));
    }, [selectedItems]);

    const resetCart = () => {
        setSelectedItems(getIntialCartState())
    }
    const handleItemsChange = (modifiedItems) => {
        setSelectedItems(modifiedItems)
    }
    return (
        <div className='cart-container-wrapper'>
            <h2>Order Summary</h2>
            <div className='cart-container'>
                <ItemsContainer
                    items={selectedItems}
                    onItemsChange={handleItemsChange}
                    onReset={resetCart}
                    totalItems={totalItems}
                />
                <PriceContainer
                    totalPrice={totalPrice}
                    totalItems={totalItems}
                    totalDiscount={totalDiscount}
                    typeDiscount={typeDiscount}
                    orderTotal={orderTotal}
                />
            </div>
        </div>
    );
}
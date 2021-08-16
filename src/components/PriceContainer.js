import './PriceContainer.css';

export default function PriceContainer({
    totalPrice,
    totalItems,
    totalDiscount,
    typeDiscount,
    orderTotal
}) {
    return (
        <div className='price-container'>
            <div className='inner-container'>
                <div className="title"><b>Total</b></div>
                <div>Total Items({totalItems}): ${totalPrice}</div>
                <div>Total Discount: -${totalDiscount}</div>
                <div>Type Discount: -${typeDiscount}</div>
                <div className="total">Order Total: -${orderTotal}</div>
            </div>
        </div>
    );
}
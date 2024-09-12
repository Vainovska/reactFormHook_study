import { CartListItemType } from "./slice";
type CartItemType = CartListItemType & {
  onRemove: () => void;
  onAmountChange: (newAmount: number) => void;
};
export const CartItem: React.FC<CartItemType> = ({
  id,
  title,
  amount,
  onAmountChange,
  onRemove,
}) => {
  return (
    <div className="card-item">
      <div className="card-item__title">
        (id {id}) {title}
      </div>
      <div className="card-item__block">
        <div className="card-item__block">
          <button onClick={() => onAmountChange(amount - 1)}>-</button>
          {amount}
          <button onClick={() => onAmountChange(amount + 1)}>+</button>
        </div>
        <button onClick={() => onRemove()}>X</button>
      </div>
    </div>
  );
};

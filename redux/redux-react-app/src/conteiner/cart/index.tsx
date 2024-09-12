import { Fragment } from "react/jsx-runtime";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { RootState } from "../../Store";
import { CartItem } from "./item";
import { remove, updateAmount } from "./slice";
export function CartList() {
  const list = useSelector((state: RootState) => state.cart.list);
  const dispatch = useDispatch();
  return (
    <div className="list">
      <div className="list__title">Card</div>
      <div className="list__content">
        {list.map((item) => (
          <Fragment key={item.id}>
            <CartItem
              {...item}
              onAmountChange={(amount) =>
                dispatch(updateAmount({ amount, id: item.id }))
              }
              onRemove={() => dispatch(remove({ id: item.id }))}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

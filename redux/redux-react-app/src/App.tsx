import React from "react";

import "./App.css";
import { Counter } from "./conteiner/counter";
import { add } from "./conteiner/cart/slice";
import { CartList } from "./conteiner/cart";
import { useDispatch } from "react-redux";
const App: React.FC<{}> = () => {
  const dispatch = useDispatch();
  return (
    <div className="App">
      <header className="App-header">
        <Counter />
        <input
          placeholder="App to card"
          onBlur={(e) => dispatch(add({ title: e.target.value }))}
        />
        <CartList />
      </header>
    </div>
  );
};

export default App;

import React from "react";
import "./App.css";
import Contact from "./container/contact";

const App: React.FC<{}> = () => {
  const [name, setName] = React.useState("Test");
  React.useEffect(() => {
    setTimeout(() => setName("Ivan"), 5000);
  }, []);
  return (
    <div>
      <Contact name={name} />
    </div>
  );
};

export default App;

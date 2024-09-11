import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Items from "./components/Items";
import Catagores from "./components/Categories";
import ShowFullItem from "./components/showFullItem";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      currentItems: [],
      items: [
        {
          id: 1,
          title: "Chair grey",
          img: "chair-grey.png",
          desc: "Our Craftsman power desks are as useful as they are beautiful.",
          category: "chairs",
          price: "20.00",
        },
        {
          id: 2,
          title: "Table",
          img: "table.png",
          desc: "NEW MODERN full wood dining table",
          category: "tables",
          price: "80.00",
        },
        {
          id: 3,
          title: "Sofa",
          img: "sofa.png",
          desc: "this sofa is a perfect combination of function and comfort.",
          category: "sofas",
          price: "150.00",
        },
        {
          id: 4,
          title: "Table",
          img: "table.png",
          desc: "NEW MODERN full wood dining table",
          category: "tables",
          price: "80.00",
        },
        {
          id: 5,
          title: "Chair grey",
          img: "chair-grey.png",
          desc: "Our Craftsman power desks are as useful as they are beautiful.",
          category: "chairs",
          price: "20.00",
        },
        {
          id: 6,
          title: "Sofa",
          img: "sofa.png",
          desc: "this sofa is a perfect combination of function and comfort.",
          category: "sofas",
          price: "150.00",
        },
      ],
      showfullItem: false,
      fullItem: {},
    };
    this.state.currentItems = this.state.items;
    this.addToOrder = this.addToOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.chooseCategory = this.chooseCategory.bind(this);
    this.onShowItem = this.onShowItem.bind(this);
  }
  render() {
    return (
      <div className="wrapper">
        <Header orders={this.state.orders} onDelete={this.deleteOrder} />
        <Catagores chooseCategory={this.chooseCategory} />
        <Items
          onShowItem={this.onShowItem}
          items={this.state.currentItems}
          onAdd={this.addToOrder}
        />
        {this.state.showfullItem && (
          <ShowFullItem
            onAdd={this.addToOrder}
            onShowItem={this.onShowItem}
            item={this.state.fullItem}
          />
        )}
        <Footer />
      </div>
    );
  }
  onShowItem(item) {
    this.setState({ fullItem: item });
    this.setState({ showfullItem: !this.state.showfullItem });
  }
  chooseCategory(category) {
    if (category === "all") {
      this.setState({ currentItems: this.state.items });
      return;
    }
    this.setState({
      currentItems: this.state.items.filter((el) => el.category === category),
    });
  }
  deleteOrder(id) {
    this.setState({ orders: this.state.orders.filter((el) => el.id !== id) });
  }
  addToOrder(item) {
    let isInArray = false;
    this.state.orders.forEach((el) => {
      if (el.id === item.id) isInArray = true;
    });
    if (!isInArray) this.setState({ orders: [...this.state.orders, item] });
  }
}
export default App;

import React, { Component } from "react";
import Item from "./Item";

export class Items extends Component {
  render() {
    return (
      <main>
        {this.props.items.map((e) => (
          <Item
            onShowItem={this.props.onShowItem}
            key={e.id}
            item={e}
            onAdd={this.props.onAdd}
          />
        ))}
      </main>
    );
  }
}

export default Items;

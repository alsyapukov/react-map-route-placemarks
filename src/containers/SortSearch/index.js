import React, { Component } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import SearchItem from '../SearchItem'

const SortableItem = SortableElement(
  ({ value, item }) => 
    <SearchItem 
      value={value} 
      item={item}
    />
);

const SortableList = SortableContainer(({ items }) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem 
          key={`item-${index}`} 
          item={index} 
          index={index} 
          value={value} 
          remove={(index) => remove(index)}
        />
      ))}
    </ul>
  );
});

class SortSearch extends Component {
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.props.sort(
      arrayMove(this.props.items, oldIndex, newIndex)
    );
  };

  removeSearchItem = (e) => {
    console.log(e.target.id)
    if(e.target.id) {
      this.props.removeSearchItem(
        Number(e.target.id.replace('search-item-', ''))
      );
    }
  }

  render() {
    return (
      <SortableList 
        items={this.props.items} 
        onSortEnd={this.onSortEnd} 
        shouldCancelStart={this.removeSearchItem}
      />
    )
  }
}

export default SortSearch;

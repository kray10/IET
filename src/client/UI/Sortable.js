import React, {Component} from 'react';
import {render} from 'react-dom';
import {sortableContainer, sortableElement, arrayMove} from 'react-sortable-hoc';
// import arrayMove from 'array-move';

const SortableItem = sortableElement(({value}) => <li>{value}</li>);

const SortableContainer = sortableContainer(({children}) => {
  return <ul>{children}</ul>;
});

export class Sortable extends Component {
  state = {
    // items: [1, 2, 3, 4],
  };

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({items}) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };

  render() {
    const {items} = this.state;

    return (
      <SortableContainer onSortEnd={this.onSortEnd}>
        {items.map((entry, index) => (
          <SortableItem key={`item-${index}`} index={index} value={entry.TaskType.value} />
        ))}
      </SortableContainer>
    );
  }
}
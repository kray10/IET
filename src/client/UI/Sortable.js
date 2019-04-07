import React, {Component} from 'react';
import {render} from 'react-dom';
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';

const SortableItem = sortableElement(({value}) => <li>{value}</li>);

const SortableContainer = sortableContainer(({children}) => {
  return <ul>{children}</ul>;
});

export class Sortable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };

    this.onSortEnd = this.onSortEnd.bind(this);
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    // this.setState(({items}) => ({
    //   items: arrayMove(items, oldIndex, newIndex),
    // }));
    // const tempItems = arrayMove(this.state.items, oldIndex, newIndex);
    // this.setState({items: tempItems})
    var removed = this.state.items.splice(oldIndex, -1);
    var newList = this.state.items.splice(newIndex, 0, removed);
    this.setState({items: newList})
  };

  render() {
    // const {items} = this.state;

    return (
      <SortableContainer onSortEnd={this.onSortEnd}>
        {this.props.items.map((entry, index) => (
          <SortableItem key={`item-${entry.index}`} index={index} value={entry.TaskType} />
        ))}
      </SortableContainer>
    );
  }
}
import { useState } from 'react';
import Item from './Item';

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClear,
}) {
  const [sortby, setSortby] = useState('input');

  let sortedItems;

  if (sortby === 'input') sortedItems = items;
  if (sortby === 'description')
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortby === 'packed')
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map(item => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            key={item.id}
            onToggleItem={onToggleItem}
          ></Item>
        ))}
      </ul>
      <div className="actions">
        <select value={sortby} onChange={e => setSortby(e.target.value)}>
          <option value="input"> Sort by input order</option>
          <option value="description"> Sort by description</option>
          <option value="packed"> Sort by packed status</option>
        </select>
        <button onClick={onClear}>Clear list</button>
      </div>
    </div>
  );
}

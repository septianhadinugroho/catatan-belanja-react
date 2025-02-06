import { useState } from "react";

const groceryItems = [
  {
    id: 1,
    name: 'Tas Ransel',
    quantity: 9,
    checked: false,
  },
  {
    id: 2,
    name: 'Kopi Bubuk',
    quantity: 2,
    checked: true,
  },
  {
    id: 3,
    name: 'Gula Pasir',
    quantity: 5,
    checked: false,
  },
];

export default function App() {
  const [items, setItems] = useState(groceryItems);

  function handleAddItem(item) {
    setItems([...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) => items.map((item) => item.id === id ? {...item, checked: !item.checked} : item));
  }

  function handleClearItems() {
    setItems([]);
  }

  return (
    <div className="app">
    <Header />
    <Form onAddItem={ handleAddItem } />
    <GroceryList items={ items } onDeleteItem={ handleDeleteItem } onToggleItem={ handleToggleItem } onClearItems={ handleClearItems } />
    <Footer items={ items } />
  </div>
  );
}

function Header() {
  return <h1>Catatan Belanjaku 📝</h1>
}

function Form({ onAddItem }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    
    if (!name || !quantity) {
      alert(!name ? "Nama barang harus diisi!" : "Jumlah barang harus diisi!");
      return;
    }

    const newItem = { name, quantity, checked: false, id: Date.now() };
    onAddItem(newItem);

    console.log(newItem);

    setName('');
    setQuantity('');
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
    <h3>Hari ini belanja apa kita?</h3>
    <div>
      <input type="number"  placeholder="Jumlah" value={ quantity } onChange={(e) => setQuantity(e.target.value === "" ? "" : Number(e.target.value))} />
      <input type="text" placeholder="Nama barang..." value={ name } onChange={(e) => setName(e.target.value)} />
    </div>
    <button>Tambah</button>
  </form>
  )
}

function GroceryList({ items, onDeleteItem, onToggleItem, onClearItems }) {
  const [sortBy, setSortBy] = useState('input')

  let sortedItems;

  switch(sortBy) {
    case 'name':
      sortedItems = items.slice().sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'checked':
      sortedItems = items.slice().sort((b, a) => a.checked - b.checked);
      break;
    default:
      sortedItems = items;
      break;
  }

  return (
    <>
      <div className="list">
        <ul>
          {sortedItems.map((item) => (
            <Item item={ item } key={ item.id } onDeleteItem={ onDeleteItem } onToggleItem={ onToggleItem } />
          ))}
        </ul>
      </div>
      <div className="actions">
        <select value={ sortBy } onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Urutkan berdasarkan urutan input</option>
          <option value="name">Urutkan berdasarkan nama barang</option>
          <option value="checked">Urutkan berdasarkan ceklis</option>
        </select>
        <button onClick={ onClearItems }>Bersihkan Daftar</button>
      </div>
    </>
  )
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li key={ item.id }>
      <input type="checkbox" checked={ item.checked } onChange={() => onToggleItem(item.id)} />
      <span style={ item.checked ?  { textDecoration: 'line-through' } : {}}>
        { item.quantity } { item.name }
      </span>
      <button onClick={() => onDeleteItem(item.id)}>&times;</button>
    </li>
  )
}

function Footer({ items }) {
  if(items.length === 0) return <footer className="stats">Daftar belanjaan masih kosong!</footer>

  const totalItems = items.length;
  const checkedItems = items.filter((item) => item.checked).length;
  const percentage = Math.round((checkedItems / totalItems) * 100);

  return <footer className="stats">Ada {totalItems} barang di daftar belanjaan, {checkedItems} barang sudah dibeli ({percentage}%)</footer>
}
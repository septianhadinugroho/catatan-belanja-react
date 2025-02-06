import { useState } from "react";

const groceryItems = [
  {
    id: 1,
    name: 'Kopi Bubuk',
    quantity: 2,
    checked: true,
  },
  {
    id: 2,
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

  return (
    <div className="app">
    <Header />
    <Form onAddItem={ handleAddItem } />
    <GroceryList items={ items } onDeleteItem={ handleDeleteItem } />
    <Footer />
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
      <input type="text" placeholder="nama barang..." value={ name } onChange={(e) => setName(e.target.value)} />
    </div>
    <button>Tambah</button>
  </form>
  )
}

function GroceryList({ items, onDeleteItem }) {
  return (
    <>
      <div className="list">
        <ul>
          {items.map((item) => (
            <Item item={ item } key={ item.id } onDeleteItem={ onDeleteItem } />
          ))}
        </ul>
      </div>
      <div className="actions">
        <select>
          <option value="input">Urutkan berdasarkan urutan input</option>
          <option value="name">Urutkan berdasarkan nama barang</option>
          <option value="checked">Urutkan berdasarkan ceklis</option>
        </select>
        <button>Bersihkan Daftar</button>
      </div>
    </>
  )
}

function Item({ item, onDeleteItem }) {
  return (
    <li key={ item.id }>
      <input type="checkbox" />
      <span style={ item.checked ?  { textDecoration: 'line-through' } : {}}>
        { item.quantity } { item.name }
      </span>
      <button onClick={() => onDeleteItem(item.id)}>&times;</button>
    </li>
  )
}

function Footer() {
  return <footer className="stats">Ada 10 barang di daftar belanjaan, 5 barang sudah dibeli (50%)</footer>
}
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
  {
    id: 3,
    name: 'Air Mineral',
    quantity: 3,
    checked: false,
  },
];

export default function App() {
  const [items, setItems] = useState(groceryItems);

  function handleAddItem(item) {
    setItems([...items, item]);
  }

  return (
    <div className="app">
    <Header />
    <Form onAddItem={ handleAddItem } />
    <GroceryList items={ items } />
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
      <input type="number"  placeholder="Jumlah" value={quantity} onChange={(e) => setQuantity(e.target.value === "" ? "" : Number(e.target.value))} />
      <input type="text" placeholder="nama barang..." value={name} onChange={(e) => setName(e.target.value)} />
    </div>
    <button>Tambah</button>
  </form>
  )
}

function GroceryList({ items }) {
  return (
    <>
      <div className="list">
        <ul>
          {items.map((item) => (
            <Item item={item} key={item.id} />
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

function Item({ item }) {
  return (
    <li key={item.id}>
      <input type="checkbox" />
      <span style={ item.checked ?  { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.name}
      </span>
      <button>&times;</button>
    </li>
  )
}

function Footer() {
  return <footer className="stats">Ada 10 barang di daftar belanjaan, 5 barang sudah dibeli (50%)</footer>
}
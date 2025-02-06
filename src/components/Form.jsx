import { useState } from "react";

export default function Form({ onAddItem }) {
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
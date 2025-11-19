import React, { useState } from 'react';
import Button from '../common/Button';

const SaleForm = ({ products, onCreateSale }) => {
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [items, setItems] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const productOptions = products.filter((p) => p.quantity > 0);

  const addItem = () => {
    if (!selectedProductId) return;
    const product = products.find((p) => p._id === selectedProductId);
    const qty = Number(quantity) || 1;

    if (qty > product.quantity) {
      alert(`Not enough stock. Available: ${product.quantity}`);
      return;
    }

    setItems((prev) => [
      ...prev,
      { productId: product._id, name: product.name, quantity: qty }
    ]);
    setSelectedProductId('');
    setQuantity('1');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) {
      alert('Add at least one item to the sale.');
      return;
    }

    setSubmitting(true);
    try {
      await onCreateSale(items);
      setItems([]);
    } catch (err) {
      console.error('Create sale error:', err);
      alert(err?.response?.data?.message || 'Failed to create sale');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card">
      <div className="page-subtitle">Record a New Sale</div>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-row">
          <div className="form-field">
            <label>Product</label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
            >
              <option value="">Select product</option>
              {productOptions.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name} (Stock: {p.quantity})
                </option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label>Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>
        <Button type="button" variant="secondary" onClick={addItem}>
          Add Item
        </Button>

        {items.length > 0 && (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                </tr>
              </thead>
              <tbody>
                {items.map((i, idx) => (
                  <tr key={idx}>
                    <td>{i.name}</td>
                    <td>{i.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Button type="submit" disabled={submitting}>
          {submitting ? 'Saving Sale...' : 'Save Sale'}
        </Button>
      </form>
    </div>
  );
};

export default SaleForm;

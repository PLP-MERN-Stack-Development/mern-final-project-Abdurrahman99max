import React, { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';

const ProductForm = ({ onCreated }) => {
  const [form, setForm] = useState({
    name: '',
    category: '',
    costPrice: '',
    sellingPrice: '',
    quantity: '',
    lowStock: '5',
    supplier: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onCreated({
        ...form,
        costPrice: Number(form.costPrice),
        sellingPrice: Number(form.sellingPrice),
        quantity: Number(form.quantity),
        lowStock: Number(form.lowStock)
      });
      setForm({
        name: '',
        category: '',
        costPrice: '',
        sellingPrice: '',
        quantity: '',
        lowStock: '5',
        supplier: ''
      });
    } catch (err) {
      console.error('Create product error:', err);
      alert(err?.response?.data?.message || 'Failed to create product');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card">
      <div className="page-subtitle">Add New Product</div>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-row">
          <Input
            label="Name"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            required
          />
          <Input
            label="Category"
            value={form.category}
            onChange={(e) => update('category', e.target.value)}
          />
        </div>
        <div className="form-row">
          <Input
            label="Cost Price"
            type="number"
            value={form.costPrice}
            onChange={(e) => update('costPrice', e.target.value)}
            required
          />
          <Input
            label="Selling Price"
            type="number"
            value={form.sellingPrice}
            onChange={(e) => update('sellingPrice', e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <Input
            label="Quantity"
            type="number"
            value={form.quantity}
            onChange={(e) => update('quantity', e.target.value)}
            required
          />
          <Input
            label="Low Stock Threshold"
            type="number"
            value={form.lowStock}
            onChange={(e) => update('lowStock', e.target.value)}
          />
        </div>
        <Input
          label="Supplier (optional)"
          value={form.supplier}
          onChange={(e) => update('supplier', e.target.value)}
        />
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : 'Save Product'}
        </Button>
      </form>
    </div>
  );
};

export default ProductForm;

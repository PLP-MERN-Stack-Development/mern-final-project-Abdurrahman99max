import React from 'react';

const SalesTable = ({ sales }) => {
  return (
    <div className="table-wrapper card">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Items</th>
            <th>Total</th>
            <th>Profit</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
          {sales.length === 0 && (
            <tr>
              <td colSpan={5}>No sales yet.</td>
            </tr>
          )}
          {sales.map((s) => (
            <tr key={s._id}>
              <td>{new Date(s.createdAt).toLocaleString()}</td>
              <td>{s.items.length}</td>
              <td>{s.total}</td>
              <td>{s.profit}</td>
              <td>{s.paymentMethod}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;

// Client/src/pages/SettingsPage.jsx
import React from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../hooks/useAuth";

function SettingsPage() {
  const { user } = useAuth() || {};
  const name = user?.name || "—";
  const email = user?.email || "—";
  const role = user?.role || "owner";

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-slate-50">Settings</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage your profile and store configuration.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-700/70 bg-slate-900/80 p-6 shadow-lg shadow-black/40 max-w-xl">
          <h2 className="text-sm font-semibold text-slate-100 mb-4">Profile</h2>
          <div className="space-y-2 text-sm text-slate-200">
            <p>
              <span className="text-slate-400">Name:&nbsp;</span>
              {name}
            </p>
            <p>
              <span className="text-slate-400">Email:&nbsp;</span>
              {email}
            </p>
            <p>
              <span className="text-slate-400">Role:&nbsp;</span>
              {role}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-dashed border-slate-700/70 bg-slate-900/40 p-4 text-xs text-slate-400 max-w-xl">
          <p className="font-semibold text-slate-200 mb-1">
            Coming soon for your capstone:
          </p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Store details (name, logo, branches)</li>
            <li>User roles (manager, cashier, owner)</li>
            <li>Notification preferences</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export default SettingsPage;

// Client/src/components/auth/AuthLayout.jsx
import React from "react";
import OfflineBanner from "../layout/OfflineBanner";

function AuthLayout({ children }) {
  return (
    <div className="auth-layout-root">
      <div className="auth-card">
        {/* Custom flex layout controlled via index.css */}
        <div className="auth-inner">
          {/* Left side – hero */}
          <div className="auth-hero">
            <OfflineBanner />
          </div>

          {/* Right side – form */}
          <div className="auth-form">
            <div className="auth-form-inner">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;

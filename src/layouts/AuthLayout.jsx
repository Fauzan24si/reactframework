const authLayoutStyles = `
  .auth-layout {
    display: flex;
    min-height: 100vh;
    font-family: 'Poppins', sans-serif;
  }

  /* Left side - branding panel */
  .auth-brand {
    flex: 1;
    background: linear-gradient(135deg, #054C73 0%, #032d45 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 40px;
    position: relative;
    overflow: hidden;
  }

  .auth-brand::before {
    content: '';
    position: absolute;
    top: -120px;
    right: -120px;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: rgba(255,255,255,0.04);
  }

  .auth-brand::after {
    content: '';
    position: absolute;
    bottom: -80px;
    left: -80px;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background: rgba(184,142,47,0.1);
  }

  .auth-brand-content {
    position: relative;
    z-index: 1;
    text-align: center;
    max-width: 400px;
  }

  .auth-brand-icon {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 28px;
    backdrop-filter: blur(8px);
  }

  .auth-brand-icon span {
    font-size: 28px;
    color: #fff;
    font-weight: 800;
    line-height: 1;
  }

  .auth-brand h1 {
    font-size: 30px;
    font-weight: 700;
    color: #fff;
    margin: 0 0 12px;
    letter-spacing: -0.5px;
  }

  .auth-brand p {
    font-size: 15px;
    color: rgba(255,255,255,0.6);
    margin: 0 0 40px;
    line-height: 1.6;
  }

  .auth-brand-features {
    display: flex;
    flex-direction: column;
    gap: 16px;
    text-align: left;
  }

  .auth-feature {
    display: flex;
    align-items: center;
    gap: 12px;
    color: rgba(255,255,255,0.8);
    font-size: 14px;
    font-weight: 500;
  }

  .auth-feature-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #B88E2F;
    flex-shrink: 0;
  }

  /* Right side - form area */
  .auth-form-area {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    background: #F4F5F7;
  }

  .auth-form-wrapper {
    width: 100%;
    max-width: 420px;
  }

  /* Responsive */
  @media (max-width: 900px) {
    .auth-brand {
      display: none;
    }
    .auth-form-area {
      padding: 24px;
    }
  }
`;

import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <>
      <style>{authLayoutStyles}</style>
      <div className="auth-layout">
        {/* Left branding panel */}
        <div className="auth-brand">
          <div className="auth-brand-content">
            <h1>Furniture Admin</h1>
            <p>Manage your furniture store with ease. Track orders, inventory, and customers all in one place.</p>
            <div className="auth-brand-features">
              <div className="auth-feature">
                <span className="auth-feature-dot"></span>
                <span>Real-time order tracking</span>
              </div>
              <div className="auth-feature">
                <span className="auth-feature-dot"></span>
                <span>Inventory management</span>
              </div>
              <div className="auth-feature">
                <span className="auth-feature-dot"></span>
                <span>Sales analytics & reports</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right form area */}
        <div className="auth-form-area">
          <div className="auth-form-wrapper">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;


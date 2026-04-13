import { FaThLarge, FaList, FaHeadphonesAlt, FaPlus } from "react-icons/fa";

export default function Sidebar() {
    return (
        <div id="sidebar">
            {/* Logo */}
            <div id="sidebar-logo">
                <span id="logo-title">
                    Sapi Restaurant <b id="logo-dot"></b>
                </span>
                <span id="logo-subtitle">Modern Admin Dashboard</span>
            </div>

            {/* List Menu */}
            <div id="sidebar-menu">
                <ul id="menu-list">
                    <li>
                        <div id="menu-1">
                            <FaThLarge />
                            <span>Dashboard</span>
                        </div>
                    </li>
                    <li>
                        <div id="menu-2">
                            <FaList />
                            <span>Orders</span>
                        </div>
                    </li>
                    <li>
                        <div id="menu-3">
                            <FaHeadphonesAlt />
                            <span>Customers</span>
                        </div>
                    </li>
                </ul>
            </div>

            {/* Footer */}
            <div id="sidebar-footer">
                <div id="footer-card">
                    <div id="footer-text">
                        <span>Please organize your menus through button below!</span>
                        <div id="add-menu-button">
                            <FaPlus style={{ fontSize: '0.7em' }} /> <span>Add Menus</span>
                        </div>
                    </div>
                    <img id="footer-avatar" src="/img/wahyu.png" alt="Footer avatar" />
                </div>
                <span id="footer-brand">Sedap Restaurant Admin Dashboard</span>
                <p id="footer-copyright">&copy; 2025 All Right Reserved</p>
            </div>
        </div>
    );
}

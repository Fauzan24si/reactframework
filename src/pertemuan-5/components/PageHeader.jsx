import React from 'react';

export default function PageHeader({ title = "Dashboard", subtitle = "Home / Detail", actionLabel = "Add Button" }) {
    // Memecah string subtitle berdasarkan " / "
    const subtitleParts = subtitle.split(" / ");

    return (
        <div id="pageheader-container">
            <div id="pageheader-left">
                {/* Improvisasi 3.1: Props Dinamis Judul */}
                <span id="page-title">
                    {title}
                </span>
                
                {/* Improvisasi 3.2: Breadcrumb Dinamis */}
                <div id="breadcrumb-links">
                    {subtitleParts.map((part, index) => (
                        <React.Fragment key={index}>
                            <span id={index === 0 ? "breadcrumb-home" : "breadcrumb-current"}>
                                {part}
                            </span>
                            {index < subtitleParts.length - 1 && (
                                <span id="breadcrumb-separator">/</span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
            
            <div id="action-button">
                {/* Improvisasi 3.3: Interactive Action Button Trigger */}
                <button 
                    id="add-button"
                    onClick={() => alert(`Aksi Tombol Dinamis: ${actionLabel}`)}
                    className="hover:scale-105 active:scale-95 transition-all duration-200"
                >
	                {actionLabel}
	            </button>
            </div>
        </div>
    );
}

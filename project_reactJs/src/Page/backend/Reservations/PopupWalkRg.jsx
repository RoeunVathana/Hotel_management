import "./style/PopupWalkRg.css";

const PopupWalkRg = ({ onClose}) => {
    return (
        <>
            <div>
                <div className="popup-walkin-overlay" onClick={onClose}>
                    <div className="popup-walkin-modal" onClick={(e) => e.stopPropagation()}>

                        {/* ================= HEADER ================= */}
                        <div className="popup-walkin-header">
                            <div className="popup-walkin-header-left">
                                <div className="popup-walkin-header-icon">▣</div>

                                <div>
                                    <h2>New Guest Reservation</h2>
                                    <span>Direct booking creation & folio initialization</span>
                                </div>
                            </div>

                            <button type="button" className="popup-walkin-close" onClick={onClose}>
                                ×
                            </button>
                        </div>

                        {/* ================= BODY ================= */}
                        <div className="popup-walkin-body">

                            {/* Guest Information */}
                            <div className="popup-walkin-section">

                                <div className="popup-walkin-section-title">
                                    <span>♙</span>
                                    Guest Information

                                    <div className="popup-walkin-guest-tabs">
                                        <button className="popup-walkin-active-tab">＋ New Guest</button>
                                        <button>Existing Guest</button>
                                    </div>
                                </div>

                                <div className="popup-walkin-grid popup-walkin-guest-grid">
                                    <input
                                        type="text"
                                        placeholder="Full Name *"
                                    />

                                    <input
                                        type="text"
                                        placeholder="Phone Number *"
                                    />

                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                    />
                                </div>

                            </div>

                            {/* Stay Dates */}
                            <div className="popup-walkin-section">

                                <div className="popup-walkin-section-title">
                                    Stay Dates & Occupancy
                                </div>

                                <div className="popup-walkin-grid popup-walkin-four-grid">

                                    <div className="popup-walkin-input-group">
                                        <label>Check-In</label>
                                        <input type="date" defaultValue="2026-08-19" />
                                    </div>

                                    <div className="popup-walkin-input-group">
                                        <label>Check-Out</label>
                                        <input type="date" defaultValue="2026-08-22" />
                                    </div>

                                    <div className="popup-walkin-input-group">
                                        <label>Adults</label>
                                        <select defaultValue="2">
                                            <option value="1">1 Adult</option>
                                            <option value="2">2 Adults</option>
                                            <option value="3">3 Adults</option>
                                            <option value="4">4 Adults</option>
                                        </select>
                                    </div>

                                    <div className="popup-walkin-input-group">
                                        <label>Booking Channel</label>
                                        <select defaultValue="Direct / Front Desk">
                                            <option>Direct / Front Desk</option>
                                            <option>Website</option>
                                            <option>Booking.com</option>
                                            <option>Agoda</option>
                                            <option>Walk-in</option>
                                        </select>
                                    </div>

                                </div>

                            </div>

                            {/* Room */}
                            <div className="popup-walkin-section">

                                <div className="popup-walkin-section-title">
                                    Select Room Category & Room Number
                                </div>

                                <div className="popup-walkin-room-types">

                                    <button className="popup-walkin-room-card">
                                        <strong>Standard Single</strong>
                                        <span>៛3,200.00/nt</span>
                                    </button>

                                    <button className="popup-walkin-room-card popup-walkin-room-card-selected">
                                        <strong>Deluxe Double</strong>
                                        <span>៛4,500.00/nt</span>
                                    </button>

                                    <button className="popup-walkin-room-card">
                                        <strong>Executive Suite</strong>
                                        <span>៛7,500.00/nt</span>
                                    </button>

                                    <button className="popup-walkin-room-card">
                                        <strong>Presidential Suite</strong>
                                        <span>៛16,000.00/nt</span>
                                    </button>

                                </div>

                                <div className="popup-walkin-input-group popup-walkin-room-select">
                                    <label>Assigned Available Room</label>

                                    <select defaultValue="Room #109 - Floor 1 (Available)">
                                        <option>Room #109 - Floor 1 (Available)</option>
                                        <option>Room #110 - Floor 1 (Available)</option>
                                        <option>Room #201 - Floor 2 (Available)</option>
                                        <option>Room #202 - Floor 2 (Available)</option>
                                    </select>
                                </div>

                            </div>

                            {/* Add-ons */}
                            <div className="popup-walkin-section">

                                <div className="popup-walkin-section-title">
                                    Add-on Services
                                </div>

                                <div className="popup-walkin-addons">

                                    <label className="popup-walkin-addon-card">
                                        <input type="checkbox" defaultChecked />

                                        <div>
                                            <strong>Daily Gourmet Breakfast</strong>
                                            <span>៛450.00 (3 days)</span>
                                        </div>
                                    </label>

                                    <label className="popup-walkin-addon-card">
                                        <input type="checkbox" />

                                        <div>
                                            <strong>Airport Chauffeur Transfer</strong>
                                            <span>៛2,500.00 (Mercedes Sedan)</span>
                                        </div>
                                    </label>

                                </div>

                            </div>

                            {/* ================= PRICE SUMMARY ================= */}
                            <div className="popup-walkin-price-summary">

                                <div className="popup-walkin-price-row">
                                    <span>3 Nights × ៛4,500.00:</span>
                                    <strong>៛13,500.00</strong>
                                </div>

                                <div className="popup-walkin-price-row">
                                    <span>Breakfast Add-on:</span>
                                    <strong>៛2,700.00</strong>
                                </div>

                                <div className="popup-walkin-price-row">
                                    <span>GST / Taxes (18%):</span>
                                    <strong>៛2,916.00</strong>
                                </div>

                                <div className="popup-walkin-price-divider"></div>

                                <div className="popup-walkin-grand-total">
                                    <span>Grand Total:</span>
                                    <strong>៛19,116.00</strong>
                                </div>

                                <div className="popup-walkin-deposit-row">
                                    <span>Advance Deposit Paid Now:</span>

                                    <div className="popup-walkin-deposit-input">
                                        <span>៛</span>
                                        <input
                                            type="number"
                                            defaultValue="5000"
                                        />
                                    </div>
                                </div>

                            </div>

                            {/* Confirm */}
                            <button className="popup-walkin-confirm-button">
                                <span>✓</span>
                                Confirm Reservation & Issue Smart Key
                            </button>

                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </>
    );
};

export default PopupWalkRg;
import "./style/PopupWalkRg.css";

const PopupWalkRg = ({ onClose }) => {
    return (
        <>
            <div>
                <div className="walkin-overlay" onClick={onClose}>
                    <div className="walkin-modal" onClick={(e) => e.stopPropagation()}>

                        {/* ================= HEADER ================= */}
                        <div className="walkin-header">
                            <div className="walkin-header-left">
                                <div className="walkin-header-icon">▣</div>

                                <div>
                                    <h2>New Guest Reservation</h2>
                                    <span>Direct booking creation & folio initialization</span>
                                </div>
                            </div>

                            <button type="button" className="walkin-close" onClick={onClose}>
                                ×
                            </button>
                        </div>

                        {/* ================= BODY ================= */}
                        <div className="walkin-body">

                            {/* Guest Information */}
                            <div className="walkin-section">

                                <div className="walkin-section-title">
                                    <span>♙</span>
                                    Guest Information

                                    <div className="guest-tabs">
                                        <button className="active-tab">＋ New Guest</button>
                                        <button>Existing Guest</button>
                                    </div>
                                </div>

                                <div className="walkin-grid guest-grid">
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
                            <div className="walkin-section">

                                <div className="walkin-section-title">
                                    Stay Dates & Occupancy
                                </div>

                                <div className="walkin-grid four-grid">

                                    <div className="input-group">
                                        <label>Check-In</label>
                                        <input type="date" defaultValue="2026-08-19" />
                                    </div>

                                    <div className="input-group">
                                        <label>Check-Out</label>
                                        <input type="date" defaultValue="2026-08-22" />
                                    </div>

                                    <div className="input-group">
                                        <label>Adults</label>
                                        <select defaultValue="2">
                                            <option value="1">1 Adult</option>
                                            <option value="2">2 Adults</option>
                                            <option value="3">3 Adults</option>
                                            <option value="4">4 Adults</option>
                                        </select>
                                    </div>

                                    <div className="input-group">
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
                            <div className="walkin-section">

                                <div className="walkin-section-title">
                                    Select Room Category & Room Number
                                </div>

                                <div className="room-types">

                                    <button className="room-card">
                                        <strong>Standard Single</strong>
                                        <span>៛3,200.00/nt</span>
                                    </button>

                                    <button className="room-card selected">
                                        <strong>Deluxe Double</strong>
                                        <span>៛4,500.00/nt</span>
                                    </button>

                                    <button className="room-card">
                                        <strong>Executive Suite</strong>
                                        <span>៛7,500.00/nt</span>
                                    </button>

                                    <button className="room-card">
                                        <strong>Presidential Suite</strong>
                                        <span>៛16,000.00/nt</span>
                                    </button>

                                </div>

                                <div className="input-group room-select">
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
                            <div className="walkin-section">

                                <div className="walkin-section-title">
                                    Add-on Services
                                </div>

                                <div className="addons">

                                    <label className="addon-card">
                                        <input type="checkbox" defaultChecked />

                                        <div>
                                            <strong>Daily Gourmet Breakfast</strong>
                                            <span>៛450.00 (3 days)</span>
                                        </div>
                                    </label>

                                    <label className="addon-card">
                                        <input type="checkbox" />

                                        <div>
                                            <strong>Airport Chauffeur Transfer</strong>
                                            <span>៛2,500.00 (Mercedes Sedan)</span>
                                        </div>
                                    </label>

                                </div>

                            </div>

                            {/* ================= PRICE SUMMARY ================= */}
                            <div className="price-summary">

                                <div className="price-row">
                                    <span>3 Nights × ៛4,500.00:</span>
                                    <strong>៛13,500.00</strong>
                                </div>

                                <div className="price-row">
                                    <span>Breakfast Add-on:</span>
                                    <strong>៛2,700.00</strong>
                                </div>

                                <div className="price-row">
                                    <span>GST / Taxes (18%):</span>
                                    <strong>៛2,916.00</strong>
                                </div>

                                <div className="price-divider"></div>

                                <div className="grand-total">
                                    <span>Grand Total:</span>
                                    <strong>៛19,116.00</strong>
                                </div>

                                <div className="deposit-row">
                                    <span>Advance Deposit Paid Now:</span>

                                    <div className="deposit-input">
                                        <span>៛</span>
                                        <input
                                            type="number"
                                            defaultValue="5000"
                                        />
                                    </div>
                                </div>

                            </div>

                            {/* Confirm */}
                            <button className="confirm-button">
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
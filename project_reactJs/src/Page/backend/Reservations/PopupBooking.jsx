import "./style/PopupBooking.css";

const PopupBooking = ({ onClose }) => {
    const handleOverlayClick = () => {
        if (onClose) onClose();
    };

    return (
        <div className="popup-booking-overlay" onClick={handleOverlayClick}>
            <div className="popup-booking" onClick={(e) => e.stopPropagation()}>

                {/* ================= HEADER ================= */}
                <div className="invoice-header">
                    <div className="invoice-title">
                        <span className="invoice-icon">▣</span>
                        Guest Folio & Tax Invoice #BK-1003
                    </div>

                    <div className="invoice-header-actions">
                        <button className="print-btn">
                            🖨 Print Invoice
                        </button>

                        <button type="button" className="close-btn" onClick={onClose}>
                            ×
                        </button>
                    </div>
                </div>

                {/* ================= BODY ================= */}
                <div className="invoice-body">

                    {/* Hotel Information */}
                    <div className="hotel-section">

                        <div className="hotel-info">
                            <div className="hotel-name-row">
                                <div className="hotel-logo">
                                    🏨
                                </div>

                                <div>
                                    <h2>HotelPro Grand Palace & Spa</h2>
                                    <p>Luxury Hospitality & Convention Center</p>
                                </div>
                            </div>

                            <div className="hotel-contact">
                                42 Heritage Boulevard, Central Avenue
                            </div>

                            <div className="hotel-contact">
                                GSTIN: 07AAAA0000A1Z5 | Phone: +91 (11) 4567-8900
                            </div>
                        </div>

                        <div className="tax-info">
                            <div className="tax-label">
                                TAX INVOICE
                            </div>

                            <strong>INV-BK-1003</strong>

                            <span>Date: 9/14/2026</span>
                        </div>

                    </div>

                    <div className="divider"></div>

                    {/* ================= GUEST DETAILS ================= */}
                    <div className="guest-details">

                        {/* Billed To */}
                        <div className="billed-to">
                            <label>BILLED TO:</label>

                            <h3>Sarah Jenkins</h3>

                            <p>+1 (415) 890-2341</p>
                            <p>sarah.j@travelworld.com</p>
                        </div>

                        {/* Stay Particulars */}
                        <div className="stay-particulars">
                            <label>STAY PARTICULARS:</label>

                            <div className="stay-row">
                                <span>Room:</span>
                                <strong>#104 (Deluxe Double)</strong>
                            </div>

                            <div className="stay-row">
                                <span>Check-In:</span>
                                <strong>2026-08-19</strong>
                            </div>

                            <div className="stay-row">
                                <span>Check-Out:</span>
                                <strong>2026-08-23 (4 nights)</strong>
                            </div>

                            <div className="stay-row">
                                <span>Guests:</span>
                                <strong>2 Adults, 0 Children</strong>
                            </div>
                        </div>

                    </div>

                    {/* ================= PAYMENT TABLE ================= */}
                    <div className="payment-table">

                        <div className="table-header">
                            <div>Date</div>
                            <div>Description</div>
                            <div>Category</div>
                            <div>Amount</div>
                        </div>

                        <div className="table-row">
                            <div className="payment-date">
                                2026-08-14
                            </div>

                            <div>
                                OTA Booking Advance Deposit
                            </div>

                            <div>
                                <span className="category-badge">
                                    Payment
                                </span>
                            </div>

                            <div className="payment-amount">
                                -₹5,000.00
                            </div>
                        </div>

                    </div>

                    {/* ================= TOTAL ================= */}
                    <div className="invoice-total">

                        <div className="total-row">
                            <span>Subtotal / Charges:</span>
                            <strong>₹0.00</strong>
                        </div>

                        <div className="total-row payment-received">
                            <span>Total Payments Received:</span>
                            <strong>-₹5,000.00</strong>
                        </div>

                        <div className="total-line"></div>

                        <div className="balance-row">
                            <span>Balance Due:</span>
                            <strong>₹0.00</strong>
                        </div>

                    </div>

                    {/* ================= FOOTER ================= */}
                    <div className="invoice-footer">

                        <span>
                            Thank you for choosing HotelPro Grand Palace.
                            Have a pleasant stay!
                        </span>

                        <span>
                            Computer Generated Invoice • Authorized Signatory
                        </span>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default PopupBooking;
import React, { useState } from "react";
import "./payment.css";

const Payment = () => {
  const [activeTab, setActiveTab] = useState("khqr"); // 'khqr' | 'card' | 'cash'
  const [changeOption, setChangeOption] = useState("exact");

  return (
    <div className="payment-page">
      <div className="payment-modal_page">
        {/* Top Header Status Bar */}
        <div className="modal_page-header">
          <div className="header1-left">
            <span className="shield-icon">🔒</span>
            <span className="session-text">Secure Session #NX-8042-KH</span>
            <span className="status-badge">● Bakong Core v2.4 Active</span>
          </div>
          <div className="header1-right">
            <span className="licensed-text">✓ Central Bank of Cambodia Licensed</span>
            <button className="close-btn">×</button>
          </div>
        </div>

        {/* Main Body */}
        <div className="modal_page-body">
          {/* Left Column: Order Summary */}
          <div className="left-panel1">
            <div className="merchant-info">
              <div className="merchant-logo">⚛</div>
              <div className="merchant-details">
                <h3>QuantumPay <span className="verified-check">✓</span></h3>
                <p>ID: #QP-84920 • Official Merchant</p>
              </div>
              <span className="badge-testnet">TESTNET & PROD</span>
            </div>

            <div className="amount-card">
              <p className="amount-label">AMOUNT DUE TO PAY</p>
              <h1 className="amount-val">$128.50 <span>USD</span></h1>
              <p className="khr-val">៛526,850 KHR (Govt. Rate 4,100)</p>
            </div>

            <div className="order-breakdown">
              <p className="breakdown-title">ORDER BREAKDOWN</p>
              <div className="item-row main-item">
                <span>✓ Quantum Pro Plan Subscription<br /><small>Annual Billing • 10 Seat Licenses</small></span>
                <span className="price">$120.00</span>
              </div>
              <div className="item-row">
                <span>Cambodia Value Added Tax (VAT 10%)</span>
                <span className="price">$12.00</span>
              </div>
              <div className="item-row rebate">
                <span>Bakong Instant Settlement Rebate</span>
                <span className="price">-$3.50</span>
              </div>

              <hr />

              <div className="meta-row">
                <span>Account Recipient</span>
                <span className="val">dev-billing@nexus.io</span>
              </div>
              <div className="meta-row">
                <span>Payment Reference</span>
                <span className="val">QNT-2025-0841</span>
              </div>
            </div>

            <div className="compliance-box">
              <div className="comp-title">Central Bank KHQR Standardized</div>
              <p>Direct NBC (National Bank of Cambodia) clearing gateway. Zero processing fee.</p>
            </div>

            <div className="left-footer">
              <span>🔒 256-Bit TLS End-to-End</span>
              <span>PCI-DSS Level 1</span>
            </div>
          </div>

          {/* Right Column: Payment Options */}
          <div className="right-panel1">
            {/* Tabs */}
            <div className="tab-bar1">
              <button 
                className={`tab-btn1 ${activeTab === "khqr" ? "active" : ""}`} 
                onClick={() => setActiveTab("khqr")}
              >
                🔴 KHQR (Scan to Pay)
              </button>
              <button 
                className={`tab-btn1 ${activeTab === "card" ? "active" : ""}`} 
                onClick={() => setActiveTab("card")}
              >
                💳 Visa / Mastercard
              </button>
              <button 
                className={`tab-btn ${activeTab === "cash" ? "active" : ""}`} 
                onClick={() => setActiveTab("cash")}
              >
                💵 Cash on Hand
              </button>
            </div>

            {/* TAB 1: KHQR */}
            {activeTab === "khqr" && (
              <div className="tab-content khqr-view">
                <div className="status-banner">
                  <span>● Bakong Live Feed - Listening</span>
                  <span>⏱ Expires in: 04:24</span>
                </div>

                <div className="khqr-card">
                  <div className="khqr-header">
                    <span className="kh-tag">KH KHQR</span>
                    <div className="currency-pills">
                      <span>BAKONG</span>
                      <span className="currency-active">$ USD</span>
                    </div>
                  </div>
                  <div className="qr-box">
                    <p className="merchant-name">QUANTUMPAY CAMBODIA TECHNOLOGIES</p>
                    <div className="qr-image">
                      <div className="qr-center-logo">KH</div>
                    </div>
                    <p className="qr-price">$128.50 USD / ៛526,850 KHR</p>
                  </div>
                  <div className="qr-progress-bar"></div>
                </div>

                <div className="awaiting-box">
                  <span className="pulse-icon">📡</span>
                  <div>
                    <strong>Awaiting confirmation</strong>
                    <p>Auto-detects as soon as you scan & authorize</p>
                  </div>
                </div>

                <div className="action-buttons">
                  <button className="sec-btn">📥 Save QR Image</button>
                  <button className="sec-btn">📋 Copy Pay Link</button>
                </div>

                <div className="banks-footer">
                  <p>SCAN WITH ANY BAKONG-ENABLED MOBILE BANKING APP</p>
                  <div className="bank-names">
                    <span>ABA Bank</span>
                    <span>Wing Bank</span>
                    <span>ACLEDA Bank</span>
                    <span>Canadia Bank</span>
                    <span>TrueMoney</span>
                    <span className="more">+50 More</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CREDIT / DEBIT CARD */}
            {activeTab === "card" && (
              <div className="tab-content card-view">
                <div className="credit-card-preview">
                  <div className="card-top">
                    <span>📶 NEXUS DEBIT / CREDIT</span>
                    <span className="card-brand">VISA</span>
                  </div>
                  <div className="card-number">•••• •••• •••• ••••</div>
                  <div className="card-bottom">
                    <div>
                      <small>CARDHOLDER</small>
                      <p>YOUR NAME</p>
                    </div>
                    <div>
                      <small>EXPIRES</small>
                      <p>MM/YY</p>
                    </div>
                  </div>
                </div>

                <form className="card-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="card-form-group">
                    <label>Cardholder Full Name</label>
                    <input type="text" placeholder="e.g. Alex Morgan" />
                  </div>

                  <div className="card-form-group">
                    <label>Card Number</label>
                    <div className="input-with-icon">
                      <input type="text" placeholder="4000 0000 0000 0000" />
                      <span className="brand-badge">VISA</span>
                    </div>
                  </div>

                  <div className="card-form-row">
                    <div className="card-form-group">
                      <label>Expiration Date</label>
                      <input type="text" placeholder="MM/YY" />
                    </div>
                    <div className="card-form-group">
                      <label>Security Code</label>
                      <input type="password" placeholder="123" />
                    </div>
                  </div>

                  <div className="toggle-row">
                    <div>
                      <strong>Save card for 1-Click payments</strong>
                      <p>Tokenized safely under NBC and Visa standards</p>
                    </div>
                    <input type="checkbox" className="toggle-switch" defaultChecked />
                  </div>

                  <button className="card-submit-btn">
                    🔒 Pay $128.50 with Visa
                  </button>
                </form>
              </div>
            )}

            {/* TAB 3: CASH ON HAND */}
            {activeTab === "cash" && (
              <div className="tab-content cash-view">
                <div className="cash-banner">
                  <span className="cash-icon">💵</span>
                  <div>
                    <strong>Pay with Cash on Delivery / Cash on Hand</strong>
                    <p>Pay securely with physical cash upon package handover or in-person service completion.</p>
                  </div>
                </div>

                <div className="cash-details-card">
                  <div className="cash-amount-header">
                    <div>
                      <small>EXACT CASH PAYABLE</small>
                      <h2>$128.50 <small>USD</small> <span className="or">or</span> ៛526,850 <small>KHR</small></h2>
                    </div>
                    <span className="accepted-badge">USD & KHR Accepted</span>
                  </div>

                  <p className="change-label">Will you need change? (e.g. paying with $100 or $50 notes)</p>
                  <div className="pill-group">
                    <button className={changeOption === 'exact' ? 'pill pill-active' : 'pill'} onClick={() => setChangeOption('exact')}>Exact Amount</button>
                    <button className={changeOption === '150' ? 'pill pill-active' : 'pill'} onClick={() => setChangeOption('150')}>Need change for $150</button>
                    <button className={changeOption === '200' ? 'pill pill-active' : 'pill'} onClick={() => setChangeOption('200')}>Need change for $200</button>
                    <button className={changeOption === 'other' ? 'pill pill-active' : 'pill'} onClick={() => setChangeOption('other')}>Other amount</button>
                  </div>
                </div>

                <form className="cash-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="cash-form-row">
                    <div className="cash-form-group">
                      <label>Recipient Full Name</label>
                      <input type="text" defaultValue="Sokha Vathanak" />
                    </div>
                    <div className="cash-form-group">
                      <label>Phone Number</label>
                      <input type="text" defaultValue="+855 92 841 029" />
                    </div>
                  </div>

                  <div className="cash-form-group">
                    <label>Delivery / Handover Address</label>
                    <input type="text" defaultValue="Tower 2, Floor 8, Vattanac Capital, Phnom Penh" />
                  </div>

                  <div className="cash-form-group">
                    <label>Special Delivery Instruction</label>
                    <input type="text" defaultValue="Call upon arrival, notify front desk for cash collection" />
                  </div>

                  <div className="guarantee-box">
                    <span className="check-icon">✓</span>
                    <p><strong>Verified Handover Guarantee:</strong> Receipt with official merchant stamp provided upon cash handover. Both USD and KHR accepted at official NBC rate (1 USD = 4,100 KHR).</p>
                  </div>

                  <button className="cash-submit-btn">
                    💎 Confirm Order with Cash on Hand ($128.50)
                  </button>
                </form>
              </div>
            )}

            {/* Bottom Footer Actions */}
            <div className="right-footer">
              <button className="cancel-link">Cancel transaction</button>
              <span className="shield-tag">● NexusPay Tokenized Shield</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Tag
} from 'lucide-react';

/* =========================================================================
   SAMPLE CART DATA
   ========================================================================= */

const INITIAL_CART_ITEMS = [
  {
    id: 'canvas-32q',
    name: 'cradle. Canvas 32Q Curved Gaming Monitor',
    specs: '31.5" QHD • 240Hz Fast-IPS • 1500R Arc • Matte Black',
    price: 549.99,
    quantity: 1,
    image: '/images/product_monitor_front.jpg',
    inStock: true,
  },
  {
    id: 'q9-flow',
    name: 'cradle. Q9 Series Dual-Chamber Mid-Tower Case',
    specs: 'Q9 Flow Edition • High Airflow Perforated Top • All-Black',
    price: 139.99,
    quantity: 1,
    image: '/images/q9_hero.jpg',
    inStock: true,
  },
];

export function Cart() {
  const [items, setItems] = useState(INITIAL_CART_ITEMS);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [checkoutNotice, setCheckoutNotice] = useState(false);

  // Update item quantity
  const updateQuantity = (id, delta) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Remove single item
  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 0 ? 0 : 0; // Free shipping
  const total = Math.max(0, subtotal - discount + shipping);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'CRADLE10' || promoCode.trim().length > 0) {
      setPromoApplied(true);
    }
  };

  const handleProceedToCheckout = () => {
    setCheckoutNotice(true);
    setTimeout(() => setCheckoutNotice(false), 4000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#111111] antialiased">
      <Header />

      {/* Floating Checkout Toast Notice */}
      {checkoutNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111111] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200 border border-neutral-800">
          <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Check size={16} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-xs font-bold">Checkout Initialized</p>
            <p className="text-[11px] text-neutral-400">
              Connecting to secure payment gateway...
            </p>
          </div>
        </div>
      )}

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-6 pb-20">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <Link to="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="font-semibold text-neutral-900">Shopping Bag</span>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-black transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Page Title & Count */}
        <div className="pb-6 mb-8 border-b border-neutral-200">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#111111]">
            Shopping Bag
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            {items.length === 0
              ? 'Your bag is currently empty.'
              : `Review ${items.reduce((s, i) => s + i.quantity, 0)} item${
                  items.reduce((s, i) => s + i.quantity, 0) !== 1 ? 's' : ''
                } in your cart.`}
          </p>
        </div>

        {/* Main Content Layout */}
        {items.length === 0 ? (
          /* Empty Bag State */
          <div className="py-20 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4 text-neutral-400">
              <ShoppingBag size={28} strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-bold text-[#111111] mb-2">Your shopping bag is empty</h2>
            <p className="text-xs sm:text-sm text-neutral-500 mb-6 leading-relaxed">
              Explore our line of curved gaming monitors, dual-chamber PC cases, and custom hardware.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-colors shadow-sm"
            >
              <span>Explore Products</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          /* 2-Column Responsive Cart Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Items List (8 Cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="divide-y divide-neutral-200 border-y border-neutral-200">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 transition-colors"
                  >
                    {/* Item Thumbnail & Details */}
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#F6F6F4] rounded-xl border border-neutral-200/70 p-2 flex items-center justify-center shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm sm:text-base font-bold text-[#111111] truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs text-neutral-500 mt-0.5 line-clamp-1">{item.specs}</p>
                        <span className="inline-block mt-2 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                          In Stock
                        </span>
                      </div>
                    </div>

                    {/* Quantity Selector, Price, and Remove Button */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-neutral-100">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-neutral-200 rounded-xl bg-white px-2 h-10 shrink-0">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                          className="w-7 h-7 flex items-center justify-center text-neutral-500 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed font-bold"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-black">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 flex items-center justify-center text-neutral-500 hover:text-black font-bold"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Total Item Price */}
                      <div className="text-right min-w-[90px]">
                        <span className="text-sm sm:text-base font-black text-[#111111] block">
                          US${(item.price * item.quantity).toFixed(2)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[11px] text-neutral-400 block">
                            US${item.price.toFixed(2)} each
                          </span>
                        )}
                      </div>

                      {/* Delete Item */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-neutral-400 hover:text-red-600 transition-colors rounded-lg hover:bg-neutral-50"
                        title="Remove item"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-4 text-xs text-neutral-500">
                <button
                  type="button"
                  onClick={() => setItems([])}
                  className="hover:text-black underline underline-offset-2 transition-colors"
                >
                  Clear Bag
                </button>
                <Link to="/" className="hover:text-black font-medium transition-colors">
                  ← Add more items
                </Link>
              </div>
            </div>

            {/* Right Column: Order Summary (4 Cols) */}
            <div className="lg:col-span-4">
              <div className="bg-[#F6F6F4] p-6 sm:p-7 rounded-2xl border border-neutral-200/60 space-y-6">
                <h2 className="text-lg font-bold text-[#111111]">Order Summary</h2>

                {/* Subtotals & Lines */}
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#111111]">
                      US${subtotal.toFixed(2)}
                    </span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Promo Discount (10%)</span>
                      <span>-US${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-neutral-600">
                    <span>Estimated Shipping</span>
                    <span className="font-semibold text-emerald-700">FREE</span>
                  </div>

                  <div className="flex justify-between text-neutral-600">
                    <span>Estimated Tax</span>
                    <span className="text-neutral-400">Calculated at checkout</span>
                  </div>

                  <div className="pt-3 border-t border-neutral-200/80 flex items-baseline justify-between">
                    <div>
                      <span className="text-sm font-bold text-[#111111] block">Total</span>
                      <span className="text-[11px] text-neutral-500">Including all applicable taxes</span>
                    </div>
                    <span className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
                      US${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="pt-1">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                      />
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Promo code (e.g. CRADLE10)"
                        disabled={promoApplied}
                        className="w-full pl-9 pr-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs focus:outline-none focus:border-black uppercase placeholder:normal-case transition-colors"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={promoApplied || !promoCode.trim()}
                      className="px-4 py-2 bg-neutral-900 text-white text-xs font-bold rounded-xl hover:bg-black disabled:opacity-40 transition-colors"
                    >
                      {promoApplied ? 'Applied' : 'Apply'}
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-[11px] text-emerald-700 font-semibold mt-1.5">
                      ✓ 10% promo discount applied!
                    </p>
                  )}
                </form>

                {/* Primary Checkout CTA */}
                <button
                  type="button"
                  onClick={handleProceedToCheckout}
                  className="w-full py-4 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={14} />
                </button>

                {/* Trust Badges */}
                <div className="pt-4 border-t border-neutral-200/60 space-y-2.5 text-xs text-neutral-600">
                  <div className="flex items-center gap-2.5">
                    <Truck size={14} className="text-black shrink-0" />
                    <span>Free 2-Day Air Shipping</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck size={14} className="text-black shrink-0" />
                    <span>3-Year Hardware Warranty</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <RotateCcw size={14} className="text-black shrink-0" />
                    <span>30-Day Money-Back Guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Cart;

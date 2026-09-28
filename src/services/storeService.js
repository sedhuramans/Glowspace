import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_CUSTOMERS,
  INITIAL_ORDERS,
  INITIAL_REVIEWS,
  INITIAL_SETTINGS
} from '../data/initialData.js';

class StoreService {
  constructor() {
    this.listeners = new Map();
    this.initStorage();
  }

  initStorage() {
    if (!localStorage.getItem('glw_products')) {
      localStorage.setItem('glw_products', JSON.stringify(INITIAL_PRODUCTS));
    }
    if (!localStorage.getItem('glw_categories')) {
      localStorage.setItem('glw_categories', JSON.stringify(INITIAL_CATEGORIES));
    }
    if (!localStorage.getItem('glw_customers')) {
      localStorage.setItem('glw_customers', JSON.stringify(INITIAL_CUSTOMERS));
    }
    if (!localStorage.getItem('glw_orders')) {
      localStorage.setItem('glw_orders', JSON.stringify(INITIAL_ORDERS));
    }
    if (!localStorage.getItem('glw_reviews')) {
      localStorage.setItem('glw_reviews', JSON.stringify(INITIAL_REVIEWS));
    }
    if (!localStorage.getItem('glw_settings')) {
      localStorage.setItem('glw_settings', JSON.stringify(INITIAL_SETTINGS));
    }
    if (!localStorage.getItem('glw_cart')) {
      localStorage.setItem('glw_cart', JSON.stringify([]));
    }
    if (!localStorage.getItem('glw_wishlist')) {
      localStorage.setItem('glw_wishlist', JSON.stringify(['prod-001', 'prod-006']));
    }
    if (!localStorage.getItem('glw_applied_coupon')) {
      localStorage.setItem('glw_applied_coupon', JSON.stringify(null));
    }
    if (!localStorage.getItem('glw_customer_auth')) {
      // Default to logged-in demo customer for smooth immediate checkout/profile experience
      localStorage.setItem('glw_customer_auth', JSON.stringify(INITIAL_CUSTOMERS[0]));
    }
  }

  // --- PUB/SUB ---
  subscribe(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
    return () => {
      const arr = this.listeners.get(event).filter(cb => cb !== callback);
      this.listeners.set(event, arr);
    };
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(cb => cb(data));
    }
    if (this.listeners.has('*')) {
      this.listeners.get('*').forEach(cb => cb({ event, data }));
    }
  }

  // --- PRODUCTS ---
  getProducts() {
    try {
      return JSON.parse(localStorage.getItem('glw_products')) || [];
    } catch {
      return INITIAL_PRODUCTS;
    }
  }

  getProductById(id) {
    return this.getProducts().find(p => p.id === id || p.sku === id);
  }

  addProduct(productData) {
    const products = this.getProducts();
    const newProduct = {
      id: 'prod-' + Date.now().toString(36),
      sku: productData.sku || `GLW-${Math.floor(1000 + Math.random() * 9000)}`,
      name: productData.name,
      subtitle: productData.subtitle || '',
      category: productData.category || 'face-care',
      categoryName: this.getCategoryName(productData.category),
      price: Number(productData.price) || 0,
      originalPrice: Number(productData.originalPrice) || Number(productData.price) || 0,
      costPrice: Number(productData.costPrice) || Math.round(Number(productData.price) * 0.35),
      stock: Number(productData.stock) || 0,
      minStockThreshold: Number(productData.minStockThreshold) || 10,
      rating: 5.0,
      reviewCount: 0,
      isBestSeller: Boolean(productData.isBestSeller),
      isNew: true,
      image: productData.image || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
      gallery: [productData.image || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop'],
      description: productData.description || 'Premium gentle dermatological formulation by Glowspace.',
      ingredients: productData.ingredients || 'Aqua, Glycerin, Botanical Extracts, Panthenol, Hyaluronic Acid.',
      howToUse: productData.howToUse || 'Apply morning and night onto cleansed skin.',
      benefits: productData.benefits || 'Restores hydration and natural skin radiance.',
      suitableFor: productData.suitableFor || 'All skin types.',
      unitsSold: 0
    };

    products.unshift(newProduct);
    localStorage.setItem('glw_products', JSON.stringify(products));
    this.emit('products:changed', products);
    return newProduct;
  }

  updateProduct(id, updateData) {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = {
        ...products[index],
        ...updateData,
        price: Number(updateData.price ?? products[index].price),
        originalPrice: Number(updateData.originalPrice ?? products[index].originalPrice),
        costPrice: Number(updateData.costPrice ?? products[index].costPrice),
        stock: Number(updateData.stock ?? products[index].stock),
        categoryName: updateData.category ? this.getCategoryName(updateData.category) : products[index].categoryName
      };
      localStorage.setItem('glw_products', JSON.stringify(products));
      this.emit('products:changed', products);
      return products[index];
    }
    return null;
  }

  deleteProduct(id) {
    let products = this.getProducts();
    products = products.filter(p => p.id !== id);
    localStorage.setItem('glw_products', JSON.stringify(products));
    this.emit('products:changed', products);
    return true;
  }

  updateStock(id, newStock) {
    return this.updateProduct(id, { stock: Math.max(0, Number(newStock)) });
  }

  // --- CATEGORIES ---
  getCategories() {
    try {
      return JSON.parse(localStorage.getItem('glw_categories')) || [];
    } catch {
      return INITIAL_CATEGORIES;
    }
  }

  getCategoryName(catId) {
    const cat = this.getCategories().find(c => c.id === catId || c.slug === catId);
    return cat ? cat.name : 'Face Care';
  }

  // --- CART ---
  getCart() {
    try {
      return JSON.parse(localStorage.getItem('glw_cart')) || [];
    } catch {
      return [];
    }
  }

  addToCart(productId, quantity = 1) {
    const product = this.getProductById(productId);
    if (!product) return false;

    let cart = this.getCart();
    const existing = cart.find(item => item.productId === productId);

    if (existing) {
      existing.quantity = Math.min(product.stock, existing.quantity + quantity);
    } else {
      cart.push({
        productId: product.id,
        name: product.name,
        subtitle: product.subtitle,
        price: product.price,
        originalPrice: product.originalPrice,
        costPrice: product.costPrice,
        image: product.image,
        category: product.category,
        quantity: Math.min(product.stock, quantity)
      });
    }

    localStorage.setItem('glw_cart', JSON.stringify(cart));
    this.emit('cart:changed', cart);
    return true;
  }

  updateCartQuantity(productId, quantity) {
    let cart = this.getCart();
    const product = this.getProductById(productId);
    const maxStock = product ? product.stock : 99;

    if (quantity <= 0) {
      cart = cart.filter(item => item.productId !== productId);
    } else {
      const item = cart.find(i => i.productId === productId);
      if (item) {
        item.quantity = Math.min(maxStock, quantity);
      }
    }

    localStorage.setItem('glw_cart', JSON.stringify(cart));
    this.emit('cart:changed', cart);
  }

  removeFromCart(productId) {
    let cart = this.getCart();
    cart = cart.filter(item => item.productId !== productId);
    localStorage.setItem('glw_cart', JSON.stringify(cart));
    this.emit('cart:changed', cart);
  }

  clearCart() {
    localStorage.setItem('glw_cart', JSON.stringify([]));
    localStorage.setItem('glw_applied_coupon', JSON.stringify(null));
    this.emit('cart:changed', []);
  }

  getAppliedCoupon() {
    try {
      return JSON.parse(localStorage.getItem('glw_applied_coupon')) || null;
    } catch {
      return null;
    }
  }

  applyCoupon(code) {
    const cleanCode = code.trim().toUpperCase();
    const settings = this.getSettings();
    const coupon = settings.coupons.find(c => c.code.toUpperCase() === cleanCode);
    
    if (!coupon) {
      return { success: false, message: 'Invalid coupon code. Try GLOW10 or WELCOME20' };
    }

    const subtotal = this.getCart().reduce((sum, i) => sum + (i.price * i.quantity), 0);
    if (subtotal < coupon.minSpend) {
      return { success: false, message: `Coupon requires a minimum order of ₹${coupon.minSpend}` };
    }

    localStorage.setItem('glw_applied_coupon', JSON.stringify(coupon));
    this.emit('cart:changed', this.getCart());
    return { success: true, message: `Coupon ${coupon.code} applied successfully!` };
  }

  removeCoupon() {
    localStorage.setItem('glw_applied_coupon', JSON.stringify(null));
    this.emit('cart:changed', this.getCart());
  }

  getCartSummary() {
    const cart = this.getCart();
    const settings = this.getSettings();
    const coupon = this.getAppliedCoupon();

    const itemCount = cart.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    const totalCost = cart.reduce((sum, i) => sum + (i.costPrice * i.quantity), 0);

    let discount = 0;
    if (coupon) {
      if (coupon.discountPercent) {
        discount = Math.round((subtotal * coupon.discountPercent) / 100);
      }
    }

    let shipping = 0;
    if (subtotal > 0) {
      if (coupon && coupon.freeShipping) {
        shipping = 0;
      } else if (subtotal >= settings.freeShippingThreshold) {
        shipping = 0;
      } else {
        shipping = settings.shippingFee;
      }
    }

    const tax = Math.round(((subtotal - discount) * settings.taxRate) / 100);
    const grandTotal = Math.max(0, subtotal - discount + shipping + tax);

    return {
      itemCount,
      subtotal,
      discount,
      shipping,
      tax,
      grandTotal,
      totalCost,
      freeShippingThreshold: settings.freeShippingThreshold,
      remainingForFreeShipping: Math.max(0, settings.freeShippingThreshold - subtotal),
      appliedCoupon: coupon
    };
  }

  // --- WISHLIST ---
  getWishlist() {
    try {
      return JSON.parse(localStorage.getItem('glw_wishlist')) || [];
    } catch {
      return [];
    }
  }

  isInWishlist(productId) {
    return this.getWishlist().includes(productId);
  }

  toggleWishlist(productId) {
    let wishlist = this.getWishlist();
    let isAdded = false;
    if (wishlist.includes(productId)) {
      wishlist = wishlist.filter(id => id !== productId);
      isAdded = false;
    } else {
      wishlist.push(productId);
      isAdded = true;
    }
    localStorage.setItem('glw_wishlist', JSON.stringify(wishlist));
    this.emit('wishlist:changed', wishlist);
    return isAdded;
  }

  // --- ORDERS ---
  getOrders() {
    try {
      return JSON.parse(localStorage.getItem('glw_orders')) || [];
    } catch {
      return INITIAL_ORDERS;
    }
  }

  getOrderById(id) {
    return this.getOrders().find(o => o.id === id || o.orderNumber === id);
  }

  placeOrder(orderData) {
    const orders = this.getOrders();
    const products = this.getProducts();
    const currentCustomer = this.getCurrentCustomer();

    const orderId = `GLW-${Math.floor(1000 + Math.random() * 9000)}`;
    const trackingId = `TRK-${Math.floor(100000 + Math.random() * 900000)}`;

    const items = orderData.items || this.getCart();
    if (!items || items.length === 0) {
      throw new Error('Cannot place an empty order');
    }

    const subtotal = items.reduce((s, i) => s + (i.price * i.quantity), 0);
    const totalCost = items.reduce((s, i) => s + ((i.costPrice || (i.price * 0.35)) * i.quantity), 0);
    const discount = orderData.discount || 0;
    const shipping = orderData.shipping || 0;
    const tax = orderData.tax || Math.round(((subtotal - discount) * 5) / 100);
    const totalAmount = subtotal - discount + shipping + tax;
    const profit = totalAmount - totalCost - Math.round(totalAmount * 0.05); // 5% handling overhead

    const newOrder = {
      id: orderId,
      orderNumber: orderId,
      customerId: currentCustomer ? currentCustomer.id : 'cust-guest',
      customerName: orderData.customerInfo.fullName,
      customerEmail: orderData.customerInfo.email,
      customerPhone: orderData.customerInfo.phone,
      date: new Date().toISOString(),
      items: items.map(item => ({
        id: item.productId || item.id,
        name: item.name,
        price: item.price,
        costPrice: item.costPrice || Math.round(item.price * 0.35),
        quantity: item.quantity,
        image: item.image
      })),
      subtotal,
      discount,
      shipping,
      tax,
      totalAmount,
      totalCost,
      profit,
      paymentMethod: orderData.paymentMethod || 'UPI',
      paymentStatus: orderData.paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
      orderStatus: 'Confirmed',
      shippingAddress: orderData.shippingAddress,
      trackingNumber: trackingId
    };

    // 1. Decrement Inventory & Increment unitsSold
    items.forEach(item => {
      const prodId = item.productId || item.id;
      const pIndex = products.findIndex(p => p.id === prodId);
      if (pIndex !== -1) {
        products[pIndex].stock = Math.max(0, products[pIndex].stock - item.quantity);
        products[pIndex].unitsSold = (products[pIndex].unitsSold || 0) + item.quantity;
      }
    });
    localStorage.setItem('glw_products', JSON.stringify(products));

    // 2. Add Order to Storage
    orders.unshift(newOrder);
    localStorage.setItem('glw_orders', JSON.stringify(orders));

    // 3. Update or Add Customer Record
    this.recordCustomerOrder(newOrder);

    // 4. Clear cart
    this.clearCart();

    this.emit('orders:changed', orders);
    this.emit('products:changed', products);
    return newOrder;
  }

  recordCustomerOrder(order) {
    let customers = this.getCustomers();
    let customer = customers.find(c => c.email.toLowerCase() === order.customerEmail.toLowerCase());

    if (customer) {
      customer.totalOrders = (customer.totalOrders || 0) + 1;
      customer.totalSpent = (customer.totalSpent || 0) + order.totalAmount;
      customer.status = 'Active';
      customer.address = order.shippingAddress;
    } else {
      customer = {
        id: 'cust-' + Date.now().toString(36),
        name: order.customerName,
        email: order.customerEmail,
        phone: order.customerPhone,
        joinedDate: new Date().toISOString().split('T')[0],
        totalOrders: 1,
        totalSpent: order.totalAmount,
        status: 'Active',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
        address: order.shippingAddress
      };
      customers.push(customer);
    }

    localStorage.setItem('glw_customers', JSON.stringify(customers));
    this.emit('customers:changed', customers);
  }

  updateOrderStatus(orderId, newStatus) {
    const orders = this.getOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index !== -1) {
      orders[index].orderStatus = newStatus;
      if (newStatus === 'Delivered') {
        orders[index].paymentStatus = 'Paid';
      }
      localStorage.setItem('glw_orders', JSON.stringify(orders));
      this.emit('orders:changed', orders);
      return orders[index];
    }
    return null;
  }

  getCustomerOrders(customerEmailOrId) {
    const orders = this.getOrders();
    return orders.filter(o => 
      o.customerId === customerEmailOrId || 
      o.customerEmail.toLowerCase() === (customerEmailOrId || '').toLowerCase()
    );
  }

  // --- CUSTOMERS ---
  getCustomers() {
    try {
      return JSON.parse(localStorage.getItem('glw_customers')) || [];
    } catch {
      return INITIAL_CUSTOMERS;
    }
  }

  getCustomerById(id) {
    return this.getCustomers().find(c => c.id === id);
  }

  updateCustomerProfile(updateData) {
    let current = this.getCurrentCustomer();
    if (!current) return null;

    let customers = this.getCustomers();
    const index = customers.findIndex(c => c.id === current.id || c.email === current.email);

    const updated = {
      ...current,
      ...updateData
    };

    if (index !== -1) {
      customers[index] = { ...customers[index], ...updated };
      localStorage.setItem('glw_customers', JSON.stringify(customers));
    }

    localStorage.setItem('glw_customer_auth', JSON.stringify(updated));
    this.emit('auth:customer', updated);
    return updated;
  }

  // --- AUTH ---
  getCurrentCustomer() {
    try {
      return JSON.parse(localStorage.getItem('glw_customer_auth')) || null;
    } catch {
      return null;
    }
  }

  customerLogin(email, password) {
    const customers = this.getCustomers();
    const customer = customers.find(c => c.email.toLowerCase() === email.toLowerCase());
    
    const userToLogin = customer || {
      id: 'cust-' + Date.now().toString(36),
      name: email.split('@')[0].replace('.', ' '),
      email: email,
      phone: '+91 98765 00000',
      joinedDate: new Date().toISOString().split('T')[0],
      totalOrders: 0,
      totalSpent: 0,
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
    };

    localStorage.setItem('glw_customer_auth', JSON.stringify(userToLogin));
    this.emit('auth:customer', userToLogin);
    return { success: true, user: userToLogin };
  }

  customerRegister(data) {
    let customers = this.getCustomers();
    const newCustomer = {
      id: 'cust-' + Date.now().toString(36),
      name: data.name,
      email: data.email,
      phone: data.phone || '+91 98765 00000',
      joinedDate: new Date().toISOString().split('T')[0],
      totalOrders: 0,
      totalSpent: 0,
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      address: {
        street: data.street || '',
        city: data.city || '',
        state: data.state || '',
        pincode: data.pincode || ''
      }
    };

    customers.push(newCustomer);
    localStorage.setItem('glw_customers', JSON.stringify(customers));
    localStorage.setItem('glw_customer_auth', JSON.stringify(newCustomer));
    this.emit('auth:customer', newCustomer);
    return { success: true, user: newCustomer };
  }

  customerLogout() {
    localStorage.removeItem('glw_customer_auth');
    this.emit('auth:customer', null);
  }

  isAdminAuthenticated() {
    return localStorage.getItem('glw_admin_auth') === 'true';
  }

  adminLogin(email, password) {
    // Demo admin credentials or bypass for presentation
    if ((email === 'admin@glowspace.in' || email === 'admin@glowspace.com' || email.includes('admin')) && (password === 'admin123' || password === 'admin' || password.length >= 4)) {
      localStorage.setItem('glw_admin_auth', 'true');
      this.emit('auth:admin', true);
      return { success: true };
    }
    // Allow demo 1-click fallback
    localStorage.setItem('glw_admin_auth', 'true');
    this.emit('auth:admin', true);
    return { success: true };
  }

  adminLogout() {
    localStorage.removeItem('glw_admin_auth');
    this.emit('auth:admin', false);
  }

  // --- REVIEWS ---
  getReviews() {
    try {
      return JSON.parse(localStorage.getItem('glw_reviews')) || [];
    } catch {
      return INITIAL_REVIEWS;
    }
  }

  getProductReviews(productId) {
    return this.getReviews().filter(r => r.productId === productId);
  }

  addReview(reviewData) {
    const reviews = this.getReviews();
    const newReview = {
      id: 'rev-' + Date.now().toString(36),
      productId: reviewData.productId,
      author: reviewData.author || 'Skincare Enthusiast',
      rating: Number(reviewData.rating) || 5,
      date: new Date().toISOString().split('T')[0],
      verified: true,
      title: reviewData.title || 'Wonderful skincare addition',
      comment: reviewData.comment
    };

    reviews.unshift(newReview);
    localStorage.setItem('glw_reviews', JSON.stringify(reviews));

    // Update product rating and review count
    const products = this.getProducts();
    const prod = products.find(p => p.id === reviewData.productId);
    if (prod) {
      const prodReviews = reviews.filter(r => r.productId === prod.id);
      const avg = prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length;
      prod.rating = Number(avg.toFixed(1));
      prod.reviewCount = prodReviews.length;
      localStorage.setItem('glw_products', JSON.stringify(products));
    }

    this.emit('reviews:changed', reviews);
    this.emit('products:changed', products);
    return newReview;
  }

  // --- SETTINGS ---
  getSettings() {
    try {
      return JSON.parse(localStorage.getItem('glw_settings')) || INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  }

  updateSettings(newSettings) {
    const updated = { ...this.getSettings(), ...newSettings };
    localStorage.setItem('glw_settings', JSON.stringify(updated));
    this.emit('settings:changed', updated);
    return updated;
  }

  resetDemoDatabase() {
    localStorage.setItem('glw_products', JSON.stringify(INITIAL_PRODUCTS));
    localStorage.setItem('glw_categories', JSON.stringify(INITIAL_CATEGORIES));
    localStorage.setItem('glw_customers', JSON.stringify(INITIAL_CUSTOMERS));
    localStorage.setItem('glw_orders', JSON.stringify(INITIAL_ORDERS));
    localStorage.setItem('glw_reviews', JSON.stringify(INITIAL_REVIEWS));
    localStorage.setItem('glw_settings', JSON.stringify(INITIAL_SETTINGS));
    localStorage.setItem('glw_cart', JSON.stringify([]));
    localStorage.setItem('glw_wishlist', JSON.stringify(['prod-001', 'prod-006']));
    localStorage.setItem('glw_customer_auth', JSON.stringify(INITIAL_CUSTOMERS[0]));
    this.emit('*', { event: 'reset' });
  }

  // ==========================================
  // DYNAMIC ANALYTICS & OWNER DASHBOARD ENGINE
  // ==========================================

  getKPIs(timeframe = 'all') {
    const orders = this.getOrders();
    const products = this.getProducts();
    const customers = this.getCustomers();

    // 1. Total Sales & Revenue (Completed & Active Orders)
    const validOrders = orders.filter(o => o.orderStatus !== 'Cancelled');
    const totalRevenue = validOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const totalCost = validOrders.reduce((sum, o) => sum + (o.totalCost || (o.totalAmount * 0.38)), 0);
    const totalProfit = validOrders.reduce((sum, o) => sum + (o.profit || (o.totalAmount - (o.totalCost || (o.totalAmount * 0.38)))), 0);

    // 2. Counts
    const totalOrdersCount = orders.length;
    const totalCustomersCount = customers.length;
    const totalProductsCount = products.length;

    // 3. Low Stock Count
    const lowStockProducts = products.filter(p => p.stock <= (p.minStockThreshold || 10));
    const pendingOrders = orders.filter(o => o.orderStatus === 'Pending' || o.orderStatus === 'Processing');

    // 4. AOV
    const averageOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;

    return {
      totalSales: totalRevenue,
      totalRevenue: totalRevenue,
      totalProfit: totalProfit,
      profitMargin: totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : 0,
      totalOrders: totalOrdersCount,
      totalCustomers: totalCustomersCount,
      totalProducts: totalProductsCount,
      lowStockCount: lowStockProducts.length,
      lowStockProducts: lowStockProducts,
      pendingOrdersCount: pendingOrders.length,
      pendingOrders: pendingOrders,
      averageOrderValue,
      growthRates: {
        sales: '+18.4%',
        revenue: '+18.4%',
        profit: '+22.6%',
        orders: '+14.2%',
        customers: '+12.5%'
      }
    };
  }

  getMonthlySalesData(year = 2026) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Baseline realistic curve + real aggregated orders
    const baseSales = [18400, 21500, 24800, 22600, 28900, 26400, 31200, 33500, 38350, 29000, 34000, 42000];
    const baseProfit = [6400, 7500, 8900, 7800, 10200, 9300, 11400, 12100, 14220, 10500, 12200, 15800];

    const orders = this.getOrders();
    
    // Aggregate real orders by month
    const monthlySales = [...baseSales];
    const monthlyCost = [];
    const monthlyProfit = [...baseProfit];

    months.forEach((month, idx) => {
      // Find orders in this month
      const monthOrders = orders.filter(o => {
        const d = new Date(o.date);
        return d.getMonth() === idx;
      });

      if (monthOrders.length > 0) {
        const orderRev = monthOrders.reduce((s, o) => s + (o.orderStatus !== 'Cancelled' ? o.totalAmount : 0), 0);
        const orderProf = monthOrders.reduce((s, o) => s + (o.orderStatus !== 'Cancelled' ? o.profit : 0), 0);
        monthlySales[idx] = Math.max(monthlySales[idx], orderRev * 3); // Scaled for aesthetic macro dashboard
        monthlyProfit[idx] = Math.max(monthlyProfit[idx], orderProf * 3);
      }

      monthlyCost[idx] = Math.round(monthlySales[idx] - monthlyProfit[idx]);
    });

    return {
      labels: months,
      sales: monthlySales,
      revenue: monthlySales,
      cost: monthlyCost,
      profit: monthlyProfit
    };
  }

  getOrderStatusBreakdown() {
    const orders = this.getOrders();
    const counts = {
      Delivered: 0,
      Shipped: 0,
      Processing: 0,
      Pending: 0,
      Cancelled: 0,
      Returned: 0
    };

    orders.forEach(o => {
      const status = o.orderStatus || 'Pending';
      if (counts[status] !== undefined) {
        counts[status]++;
      } else {
        counts.Pending++;
      }
    });

    return counts;
  }

  getTopSellingProducts(limit = 6) {
    const products = this.getProducts();
    const sorted = [...products].sort((a, b) => (b.unitsSold || 0) - (a.unitsSold || 0));
    return sorted.slice(0, limit).map((p, index) => ({
      rank: index + 1,
      ...p,
      revenueGenerated: (p.unitsSold || 0) * p.price,
      profitGenerated: (p.unitsSold || 0) * (p.price - p.costPrice)
    }));
  }

  getRevenueProfitAnalysis(timeframe = '30D') {
    const kpis = this.getKPIs();
    const revenue = kpis.totalRevenue;
    const cost = kpis.totalSales - kpis.totalProfit;
    const profit = kpis.totalProfit;
    const margin = kpis.profitMargin;

    // Expenses breakdown
    const expenses = [
      { name: 'Formulation & Raw Ingredients', amount: Math.round(cost * 0.65), percentage: 65, color: '#cf9592' },
      { name: 'Eco-Friendly Glass & Packaging', amount: Math.round(cost * 0.15), percentage: 15, color: '#deb4b1' },
      { name: 'Cold-Chain Logistics & Delivery', amount: Math.round(cost * 0.12), percentage: 12, color: '#b87774' },
      { name: 'Dermatological QA & Testing', amount: Math.round(cost * 0.08), percentage: 8, color: '#985957' }
    ];

    // Category profitability
    const products = this.getProducts();
    const categories = this.getCategories();
    const categoryBreakdown = categories.map(cat => {
      const catProducts = products.filter(p => p.category === cat.id);
      const catUnits = catProducts.reduce((s, p) => s + (p.unitsSold || 0), 0);
      const catRev = catProducts.reduce((s, p) => s + ((p.unitsSold || 0) * p.price), 0);
      const catCost = catProducts.reduce((s, p) => s + ((p.unitsSold || 0) * p.costPrice), 0);
      const catProfit = catRev - catCost;
      const catMargin = catRev > 0 ? ((catProfit / catRev) * 100).toFixed(1) : 0;

      return {
        id: cat.id,
        name: cat.name,
        unitsSold: catUnits,
        revenue: catRev,
        profit: catProfit,
        margin: catMargin
      };
    });

    return {
      revenue,
      cost,
      profit,
      margin,
      expenses,
      categoryBreakdown
    };
  }

  generateReport(filters = {}) {
    let orders = this.getOrders();
    const { startDate, endDate, category, status, search } = filters;

    if (startDate) {
      orders = orders.filter(o => new Date(o.date) >= new Date(startDate));
    }
    if (endDate) {
      orders = orders.filter(o => new Date(o.date) <= new Date(endDate + 'T23:59:59'));
    }
    if (status && status !== 'all') {
      orders = orders.filter(o => o.orderStatus === status);
    }
    if (search) {
      const q = search.toLowerCase();
      orders = orders.filter(o => 
        o.id.toLowerCase().includes(q) || 
        o.customerName.toLowerCase().includes(q) || 
        o.customerEmail.toLowerCase().includes(q)
      );
    }

    const totalSales = orders.reduce((s, o) => s + o.totalAmount, 0);
    const totalCost = orders.reduce((s, o) => s + o.totalCost, 0);
    const totalProfit = orders.reduce((s, o) => s + o.profit, 0);
    const totalOrders = orders.length;
    const aov = totalOrders > 0 ? Math.round(totalSales / totalOrders) : 0;

    return {
      orders,
      summary: {
        totalSales,
        totalRevenue: totalSales,
        totalCost,
        totalProfit,
        totalOrders,
        averageOrderValue: aov,
        profitMargin: totalSales > 0 ? ((totalProfit / totalSales) * 100).toFixed(1) : 0
      }
    };
  }

  generateCSV(orders) {
    const headers = ['Order ID', 'Date', 'Customer Name', 'Customer Email', 'Items Count', 'Payment Method', 'Payment Status', 'Order Status', 'Total (INR)', 'Cost (INR)', 'Profit (INR)'];
    const rows = orders.map(o => [
      `"${o.id}"`,
      `"${new Date(o.date).toLocaleDateString()}"`,
      `"${o.customerName.replace(/"/g, '""')}"`,
      `"${o.customerEmail}"`,
      o.items.reduce((s, i) => s + i.quantity, 0),
      `"${o.paymentMethod}"`,
      `"${o.paymentStatus}"`,
      `"${o.orderStatus}"`,
      o.totalAmount,
      o.totalCost,
      o.profit
    ]);

    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  }
}

export const store = new StoreService();

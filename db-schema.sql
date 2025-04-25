-- Create tables for Lumina e-commerce

-- Users table
CREATE TABLE IF NOT EXISTS "User" (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  email_verified TIMESTAMP,
  password TEXT NOT NULL,
  image TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE IF NOT EXISTS "Category" (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS "Product" (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  category_id TEXT NOT NULL REFERENCES "Category"(id),
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  in_stock BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Product Images table
CREATE TABLE IF NOT EXISTS "ProductImage" (
  id TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  product_id TEXT NOT NULL REFERENCES "Product"(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS "Order" (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES "User"(id),
  total DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  shipping_address_id TEXT NOT NULL REFERENCES "Address"(id),
  billing_address_id TEXT NOT NULL REFERENCES "Address"(id),
  payment_intent_id TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Order Items table
CREATE TABLE IF NOT EXISTS "OrderItem" (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL REFERENCES "Order"(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL REFERENCES "Product"(id),
  name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  quantity INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Addresses table
CREATE TABLE IF NOT EXISTS "Address" (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  address1 TEXT NOT NULL,
  address2 TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  country TEXT NOT NULL,
  phone TEXT,
  is_default BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Wishlist table
CREATE TABLE IF NOT EXISTS "Wishlist" (
  id TEXT PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Wishlist Items table
CREATE TABLE IF NOT EXISTS "WishlistItem" (
  id TEXT PRIMARY KEY,
  wishlist_id TEXT NOT NULL REFERENCES "Wishlist"(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL REFERENCES "Product"(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS "Product_category_id_idx" ON "Product"(category_id);
CREATE INDEX IF NOT EXISTS "ProductImage_product_id_idx" ON "ProductImage"(product_id);
CREATE INDEX IF NOT EXISTS "Order_user_id_idx" ON "Order"(user_id);
CREATE INDEX IF NOT EXISTS "Order_shipping_address_id_idx" ON "Order"(shipping_address_id);
CREATE INDEX IF NOT EXISTS "Order_billing_address_id_idx" ON "Order"(billing_address_id);
CREATE INDEX IF NOT EXISTS "OrderItem_order_id_idx" ON "OrderItem"(order_id);
CREATE INDEX IF NOT EXISTS "OrderItem_product_id_idx" ON "OrderItem"(product_id);
CREATE INDEX IF NOT EXISTS "Address_user_id_idx" ON "Address"(user_id);
CREATE INDEX IF NOT EXISTS "WishlistItem_wishlist_id_idx" ON "WishlistItem"(wishlist_id);
CREATE INDEX IF NOT EXISTS "WishlistItem_product_id_idx" ON "WishlistItem"(product_id);

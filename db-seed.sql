-- Seed data for Lumina e-commerce

-- Insert categories
INSERT INTO "Category" (id, name, slug, description, image_url)
VALUES
  ('cat_men', 'Men', 'men', 'Men''s clothing and accessories', '/placeholder.svg?height=300&width=400'),
  ('cat_women', 'Women', 'women', 'Women''s clothing and accessories', '/placeholder.svg?height=300&width=400'),
  ('cat_accessories', 'Accessories', 'accessories', 'Fashion accessories for all', '/placeholder.svg?height=300&width=400'),
  ('cat_winter', 'Winter', 'winter', 'Winter collection to keep you warm and stylish', '/placeholder.svg?height=300&width=400'),
  ('cat_sale', 'Sale', 'sale', 'Discounted items at great prices', '/placeholder.svg?height=300&width=400')
ON CONFLICT (id) DO NOTHING;

-- Insert products
INSERT INTO "Product" (id, name, description, price, original_price, category_id, featured, in_stock)
VALUES
  ('prod_001', 'Reflective Running Jogging Jacket', 'Stay visible and stylish with our reflective running jacket. Perfect for early morning or evening jogs.', 350.00, 400.00, 'cat_winter', TRUE, TRUE),
  ('prod_002', 'Vibrant Yellow Puffer Jacket', 'Make a statement with this bold yellow puffer jacket. Warm, comfortable, and eye-catching.', 450.00, NULL, 'cat_winter', TRUE, TRUE),
  ('prod_003', 'Classic White T-Shirt', 'A wardrobe essential. Our classic white tee is made from premium cotton for ultimate comfort.', 35.00, 45.00, 'cat_men', TRUE, TRUE),
  ('prod_004', 'Slim Fit Black Jeans', 'These versatile black jeans offer both style and comfort for everyday wear.', 85.00, NULL, 'cat_men', TRUE, TRUE),
  ('prod_005', 'Floral Summer Dress', 'A beautiful floral dress perfect for summer days and special occasions.', 120.00, 150.00, 'cat_women', TRUE, TRUE),
  ('prod_006', 'Leather Crossbody Bag', 'A stylish and practical leather crossbody bag for your everyday essentials.', 95.00, 120.00, 'cat_accessories', TRUE, TRUE),
  ('prod_007', 'Winter Wool Beanie', 'Keep warm with our soft wool beanie, perfect for cold winter days.', 25.00, 35.00, 'cat_winter', FALSE, TRUE),
  ('prod_008', 'Oversized Knit Sweater', 'Cozy up in this oversized knit sweater, ideal for layering in colder months.', 75.00, NULL, 'cat_women', FALSE, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Insert product images
INSERT INTO "ProductImage" (id, url, product_id)
VALUES
  ('img_001', '/placeholder.svg?height=600&width=600', 'prod_001'),
  ('img_002', '/placeholder.svg?height=600&width=600', 'prod_001'),
  ('img_003', '/placeholder.svg?height=600&width=600', 'prod_001'),
  ('img_004', '/placeholder.svg?height=600&width=600', 'prod_002'),
  ('img_005', '/placeholder.svg?height=600&width=600', 'prod_002'),
  ('img_006', '/placeholder.svg?height=600&width=600', 'prod_003'),
  ('img_007', '/placeholder.svg?height=600&width=600', 'prod_004'),
  ('img_008', '/placeholder.svg?height=600&width=600', 'prod_005'),
  ('img_009', '/placeholder.svg?height=600&width=600', 'prod_006'),
  ('img_010', '/placeholder.svg?height=600&width=600', 'prod_007'),
  ('img_011', '/placeholder.svg?height=600&width=600', 'prod_008')
ON CONFLICT (id) DO NOTHING;

-- Insert a test user (password: password123)
INSERT INTO "User" (id, name, email, password)
VALUES
  ('user_1', 'Test User', 'test@example.com', '$2b$10$zPMYuUJYjYZJ9FdQAjvDxOQgkBG.K5Y5MHhQz.6TDaZPHUkRnIJSa')
ON CONFLICT (id) DO NOTHING;

-- Insert a wishlist for the test user
INSERT INTO "Wishlist" (id, user_id)
VALUES
  ('wish_1', 'user_1')
ON CONFLICT (id) DO NOTHING;

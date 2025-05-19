
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firebase_uid VARCHAR(128) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE building_types (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE buildings (
  id SERIAL PRIMARY KEY,
  image VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  type_id INTEGER REFERENCES building_types(id) ON DELETE SET NULL ON UPDATE CASCADE,
  price DECIMAL(12, 2) NOT NULL,
  beds INTEGER CHECK (beds IS NULL OR beds >= 0),
  floors INTEGER CHECK (floors IS NULL OR floors >= 0),
  bathrooms INTEGER CHECK (bathrooms IS NULL OR bathrooms >= 0),
  status VARCHAR(255),
  size DECIMAL(10, 2) NOT NULL,
  direction VARCHAR(255) NOT NULL,
  sale BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_buildings_price ON buildings(price);
CREATE INDEX idx_buildings_sale ON buildings(sale);
CREATE INDEX idx_buildings_type_id ON buildings(type_id);

CREATE TABLE periods (
  id   SERIAL PRIMARY KEY,
  code VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE period_translations (
  period_id INTEGER NOT NULL
    REFERENCES periods(id) ON DELETE CASCADE,
  locale    VARCHAR(10) NOT NULL,
  label     VARCHAR(100) NOT NULL,
  PRIMARY KEY (period_id, locale)
);

CREATE TABLE revenue_stats (
  id        SERIAL PRIMARY KEY,
  period_id INTEGER NOT NULL REFERENCES periods(id) ON DELETE RESTRICT,
  sales     INTEGER NOT NULL,
  revenue   INTEGER NOT NULL
);

CREATE TABLE sales_stats (
  id         SERIAL PRIMARY KEY,
  period_id  INTEGER NOT NULL REFERENCES periods(id) ON DELETE RESTRICT,
  channel    VARCHAR(100) NOT NULL,
  value      INTEGER NOT NULL
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    image_url VARCHAR(255),
    date DATE,
    name VARCHAR(100),
    price DECIMAL(10, 2),
    type VARCHAR(20) CHECK (type IN ('Rent', 'Sell')),
    status VARCHAR(20) CHECK (status IN ('Paid', 'Unpaid'))
);

INSERT INTO users (firebase_uid, email, password, role) VALUES
  ('firebase_uid_1', 'user1@example.com', 'password1', 'admin'),
  ('firebase_uid_2', 'user2@example.com', 'password2', 'user'),
  ('firebase_uid_3', 'user3@example.com', 'password3', 'user');

INSERT INTO building_types (name) VALUES
  ('Casa'),
  ('Apartamento'),
  ('Oficina'),
  ('Local');

INSERT INTO buildings (image, name, type_id, price, beds, bathrooms, floors, status, size, direction, sale) VALUES
  ('https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747164731/carrusel2-dept3_oasflw.jpg', 'Edificio Central', 2, 1200000, NULL, NULL, 4, 'En Construcción', 100, 'Bv. Oroño 2500 Rosario', TRUE),
  ('https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747164731/carrusel2-dept2_hrzrbb.jpg', 'Depto Familiar', 1, 850000, 3, 2, NULL, NULL, 75, 'Córdoba 1200 Rosario', FALSE),
  ('https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747164729/carrusel2-dept4_sey0vk.jpg', 'Edificio Torre Norte', 2, 1500000, NULL, NULL, 6, 'Terminado', 200, 'Pellegrini 3300 Rosario', TRUE),
  ('https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747164730/carrusel-dept_bavglx.jpg', 'Monoambiente Centro', 1, 700000, 1, 1, NULL, NULL, 40, 'San Luis 800 Rosario', FALSE),
  ('https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747164730/carrusel-dept2_dtnxjg.jpg', 'Edificio Sur', 2, 1300000, NULL, NULL, 5, 'En Construcción', 180, 'Mendoza 2300 Rosario', TRUE),
  ('https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747164655/carrusel2-dept_xztfij.jpg', 'Depto Moderno', 1, 900000, 2, 1, NULL, NULL, 60, 'Italia 1500 Rosario', FALSE),
  ('https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747164898/dop1713_2_ubxbjx.jpg', 'Edificio Vista Río', 2, 2000000, NULL, NULL, 7, 'Terminado', 220, 'Francia 500 Rosario', TRUE),
  ('https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747164962/casa-aislada-campo_1303-23773_mid22x.avif', 'Casa de Campo', 1, 750000, 2, 1, NULL, NULL, 55, 'Mitre 200 Rosario', TRUE),
  ('https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747165028/Dropbox_Casa-G-07_1-min-e1599178281741_wm8aad.jpg', 'Soft House', 1, 2500000, NULL, NULL, 10, 'En Construcción', 300, 'Alberdi 1900 Rosario', FALSE),
  ('https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747165065/PLANO-DE-CASA-12x20-09-at-1.47.35-PM_uzrtwp.png', 'Casa Moderna', 1, 1100000, 2, 2, NULL, NULL, 80, 'Callao 1400 Rosario', TRUE),
  ('https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747165296/casas-modernas-1-1920x1130_woo8q6.jpg', 'Casa Moderna', 2, 1800000, NULL, NULL, 8, 'Terminado', 240, 'Maipú 1000 Rosario', FALSE),
  ('https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747165660/deptos_oxt9yv.webp', 'Depto Loft', 2, 790000, 1, 1, NULL, NULL, 45, 'Rioja 700 Rosario', TRUE),
  ('https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747165400/edificio-comercial_wj2dlq.jpg', 'Edificio Comercial', 3, 1400000, NULL, NULL, 5, 'En Construcción', 170, 'Vera Mujica 2100 Rosario', FALSE),
  ('https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747165762/alquiler-pisos-sin-intermediarios_y6ovuy.webp', 'Depto Pareja', 1, 820000, 1, 1, NULL, NULL, 50, 'Mitre 1100 Rosario', TRUE),
  ('https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747165801/depto-alquiler_natt06.jpg', 'Depto Económico', 2, 1600000, NULL, NULL, 4, 'Terminado', 190, 'Laprida 600 Rosario', TRUE),
  ('https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747166460/diseno-interiores_gqplwo.jpg', 'Edificio Comercial', 4, 680000, 1, 1, NULL, NULL, 38, 'Buenos Aires 400 Rosario', FALSE),
  ('https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747166524/IMG-4715_k3pyae.webp', 'Local Comercial', 2, 1700000, NULL, NULL, 6, 'En Construcción', 210, 'Italia 100 Rosario', TRUE),
  ('https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747166615/local-comercial-villa-carlos-paz-02_fhlose.webp', 'Locales de Venta', 1, 980000, 2, 1, NULL, NULL, 65, 'San Martín 900 Rosario', FALSE),
  ('https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747166673/c3e36ed94f551eb8dcb41d282d824e04_jskojx.jpg', 'Brejas Birras', 2, 2100000, NULL, NULL, 9, 'Terminado', 270, 'Rivadavia 1800 Rosario', TRUE),
  ('https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747166758/1971983616_odltyr.webp', 'Depto Norte', 2, 890000, 2, 1, NULL, NULL, 60, 'Urquiza 1200 Rosario', TRUE),
  ('https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747166759/1945793957_kknlmy.webp', 'Edificio Smart', 2, 970000, 3, 2, NULL, NULL, 70, 'Uriburu 900 Rosario', TRUE),
  ('https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747166759/1961082598_nf5en8.webp', 'Edificio Familiar', 2, 1750000, NULL, NULL, 6, 'En Construcción', 200, 'Brown 1800 Rosario', FALSE);

INSERT INTO periods (code) VALUES
  ('monthly'),
  ('yearly'),
  ('weekly');

INSERT INTO period_translations (period_id, locale, label) VALUES
  ( (SELECT id FROM periods WHERE code = 'monthly'), 'en', 'Monthly' ),
  ( (SELECT id FROM periods WHERE code = 'monthly'), 'es', 'Mensual' ),
  ( (SELECT id FROM periods WHERE code = 'yearly' ), 'en', 'Yearly'  ),
  ( (SELECT id FROM periods WHERE code = 'yearly' ), 'es', 'Anual'   );

INSERT INTO revenue_stats (period_id, sales, revenue) VALUES
  ((SELECT id FROM periods WHERE code='monthly'), 20,  50),
  ((SELECT id FROM periods WHERE code='monthly'), 100, 140),
  ((SELECT id FROM periods WHERE code='monthly'), 50,  70),
  ((SELECT id FROM periods WHERE code='monthly'), 120, 180),
  ((SELECT id FROM periods WHERE code='monthly'), 80,  100),
  ((SELECT id FROM periods WHERE code='monthly'), 140, 230),
  ((SELECT id FROM periods WHERE code='monthly'), 60,  130),
  ((SELECT id FROM periods WHERE code='monthly'), 130, 250),
  ((SELECT id FROM periods WHERE code='monthly'), 70,  120),
  ((SELECT id FROM periods WHERE code='monthly'), 160, 280),
  ((SELECT id FROM periods WHERE code='monthly'), 90,  160),
  ((SELECT id FROM periods WHERE code='monthly'), 110, 220);

INSERT INTO revenue_stats (period_id, sales, revenue) VALUES
  ((SELECT id FROM periods WHERE code='yearly'),  0,   0),
  ((SELECT id FROM periods WHERE code='yearly'),  45,  100),
  ((SELECT id FROM periods WHERE code='yearly'),  10,   40),
  ((SELECT id FROM periods WHERE code='yearly'),  75,  110),
  ((SELECT id FROM periods WHERE code='yearly'),  35,   60),
  ((SELECT id FROM periods WHERE code='yearly'),  94,  140),
  ((SELECT id FROM periods WHERE code='yearly'),  30,   55),
  ((SELECT id FROM periods WHERE code='yearly'), 115,  130),
  ((SELECT id FROM periods WHERE code='yearly'),  30,   65),
  ((SELECT id FROM periods WHERE code='yearly'), 105,  180),
  ((SELECT id FROM periods WHERE code='yearly'),  65,   75),
  ((SELECT id FROM periods WHERE code='yearly'), 110,  115);

INSERT INTO sales_stats (period_id, channel, value) VALUES
  ((SELECT id FROM periods WHERE code = 'monthly'), 'Via Website', 50),
  ((SELECT id FROM periods WHERE code = 'monthly'), 'Via Team Member', 12),
  ((SELECT id FROM periods WHERE code = 'monthly'), 'Via Agents', 6),
  ((SELECT id FROM periods WHERE code = 'monthly'), 'Via Social Media', 15),
  ((SELECT id FROM periods WHERE code = 'monthly'), 'Via Digital Marketing', 12),
  ((SELECT id FROM periods WHERE code = 'monthly'), 'Via Others', 5);

INSERT INTO sales_stats (period_id, channel, value) VALUES
  ((SELECT id FROM periods WHERE code = 'weekly'), 'Via Website', 60),
  ((SELECT id FROM periods WHERE code = 'weekly'), 'Via Team Member', 10),
  ((SELECT id FROM periods WHERE code = 'weekly'), 'Via Agents', 8),
  ((SELECT id FROM periods WHERE code = 'weekly'), 'Via Social Media', 12),
  ((SELECT id FROM periods WHERE code = 'weekly'), 'Via Digital Marketing', 7),
  ((SELECT id FROM periods WHERE code = 'weekly'), 'Via Others', 3);

INSERT INTO sales_stats (period_id, channel, value) VALUES
  ((SELECT id FROM periods WHERE code = 'yearly'), 'Via Website', 45),
  ((SELECT id FROM periods WHERE code = 'yearly'), 'Via Team Member', 15),
  ((SELECT id FROM periods WHERE code = 'yearly'), 'Via Agents', 10),
  ((SELECT id FROM periods WHERE code = 'yearly'), 'Via Social Media', 18),
  ((SELECT id FROM periods WHERE code = 'yearly'), 'Via Digital Marketing', 8),
  ((SELECT id FROM periods WHERE code = 'yearly'), 'Via Others', 4);

INSERT INTO transactions (image_url, date, name, price, type, status) VALUES
  ('https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747680228/house-1_zsml7u.jpg', '2023-08-10', 'Mr. Rocky', 12450.00, 'Rent', 'Paid'),
  ('https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747680228/house-2_g6bon9.jpg', '2023-08-10', 'Mr. Cristino', 12450.00, 'Sell', 'Unpaid'),
  ('https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747680228/house-3_ndj383.jpg', '2023-08-10', 'Mr. Jack', 12450.00, 'Sell', 'Paid'),
  ('https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747680228/house-4_tuhayu.jpg', '2023-08-10', 'Ms. Cally', 12450.00, 'Sell', 'Unpaid'),
  ('https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747680228/house-5_hwysfs.jpg', '2023-08-10', 'Ms. Cristina', 12450.00, 'Rent', 'Unpaid');
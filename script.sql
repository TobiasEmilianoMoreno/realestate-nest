USE real_estate;

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

INSERT INTO users (firebase_uid, email, password, role)
VALUES
  ('firebase_uid_1', 'user1@example.com', 'password1', 'admin'),
  ('firebase_uid_2', 'user2@example.com', 'password2', 'user'),
  ('firebase_uid_3', 'user3@example.com', 'password3', 'user');

INSERT INTO building_types (name) VALUES
  ('Casa'),
  ('Apartamento'),
  ('Oficina'),
  ('Local');


INSERT INTO buildings (image, name, type_id, price, beds, bathrooms, floors, status, size, direction, sale)
VALUES
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
h
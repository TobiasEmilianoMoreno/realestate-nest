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
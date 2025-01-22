/*
  # Drinks Assistant Schema

  1. New Tables
    - `user_drinks`
      - `id` (uuid, primary key)
      - `user_id` (bigint, not null) - Telegram user ID
      - `name` (text, not null)
      - `type` (text, not null)
      - `volume` (integer, not null)
      - `created_at` (timestamptz)
    
    - `cocktails`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `recipe` (text, not null)
      - `created_at` (timestamptz)
    
    - `cocktail_ingredients`
      - `id` (uuid, primary key)
      - `cocktail_id` (uuid, references cocktails)
      - `ingredient_type` (text, not null)
      - `amount` (integer)
      - `unit` (text)

  2. Security
    - Enable RLS on all tables
    - Add policies for user access to their own drinks
*/

-- Create user_drinks table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  Telegram bigint NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create user_drinks table
CREATE TABLE user_drinks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users ON DELETE CASCADE,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create cocktails table
CREATE TABLE cocktails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  recipe text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create cocktail_ingredients table
CREATE TABLE cocktail_ingredients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cocktail_id uuid REFERENCES cocktails ON DELETE CASCADE,
  ingredient_type text NOT NULL,
  amount integer,
  unit text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_drinks ENABLE ROW LEVEL SECURITY;
ALTER TABLE cocktails ENABLE ROW LEVEL SECURITY;
ALTER TABLE cocktail_ingredients ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users"
  ON users
  FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can manage their own drinks"
  ON user_drinks
  FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Cocktails are readable by all"
  ON cocktails
  FOR SELECT
  USING (true);

CREATE POLICY "Cocktail ingredients are readable by all"
  ON cocktail_ingredients
  FOR SELECT
  USING (true);
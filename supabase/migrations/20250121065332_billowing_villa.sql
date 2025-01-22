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
  user_telegram bigint REFERENCES users ON DELETE CASCADE,
  name text NOT NULL,
  type text NOT NULL,
  isAlcoholic bool NOT NULL
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
CREATE POLICY "Users policy"
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
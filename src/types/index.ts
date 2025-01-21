export interface Drink {
  id: string;
  name: string;
  ingredients: string[];
  recipe: string;
}

export interface UserInventory {
  userId: number;
  items: string[];
}

export interface Cocktail {
  id: string;
  name: string;
  requiredIngredients: string[];
  instructions: string;
  image?: string;
}

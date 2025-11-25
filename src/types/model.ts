export type Category = "cars" | "bikes" | "houses" | "animals";

export interface Model3D {
  id: string;
  name: string;
  description: string;
  category: Category;
  price?: string;
  specs?: string[];
  modelPath?: string; // Path to GLB/GLTF file
  thumbnail?: string;
}

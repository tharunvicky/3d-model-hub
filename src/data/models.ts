import { Model3D } from "@/types/model";

// Sample data - in production, this would come from a backend/database
export const models: Model3D[] = [
  // Cars
  {
    id: "car-1",
    name: "Luxury Sports Car",
    description: "High-performance luxury sports car with aerodynamic design",
    category: "cars",
    price: "$125,000",
    specs: ["V8 Engine", "0-60 in 3.2s", "Top Speed 200mph"],
  },
  {
    id: "car-2",
    name: "Electric Sedan",
    description: "Modern electric sedan with advanced autopilot features",
    category: "cars",
    price: "$85,000",
    specs: ["400+ miles range", "Autopilot", "5-star safety"],
  },
  {
    id: "car-3",
    name: "Classic Muscle Car",
    description: "Restored vintage muscle car with modern internals",
    category: "cars",
    price: "$95,000",
    specs: ["V8 Engine", "Manual Transmission", "Classic Design"],
  },
  
  // Bikes
  {
    id: "bike-1",
    name: "Sport Motorcycle",
    description: "High-speed racing motorcycle with carbon fiber body",
    category: "bikes",
    price: "$18,500",
    specs: ["1000cc Engine", "Top Speed 186mph", "Lightweight Frame"],
  },
  {
    id: "bike-2",
    name: "Cruiser Bike",
    description: "Comfortable cruiser for long-distance rides",
    category: "bikes",
    price: "$15,000",
    specs: ["750cc Engine", "Comfortable Seating", "Chrome Finish"],
  },
  {
    id: "bike-3",
    name: "Adventure Touring",
    description: "All-terrain adventure motorcycle for any road",
    category: "bikes",
    price: "$22,000",
    specs: ["1200cc Engine", "Off-road Capable", "Advanced Electronics"],
  },
  
  // Houses
  {
    id: "house-1",
    name: "Modern Villa",
    description: "Contemporary villa with smart home features",
    category: "houses",
    price: "$2.5M",
    specs: ["5 Bedrooms", "Pool & Garden", "Smart Home"],
  },
  {
    id: "house-2",
    name: "Beach House",
    description: "Stunning oceanfront property with panoramic views",
    category: "houses",
    price: "$3.2M",
    specs: ["4 Bedrooms", "Ocean View", "Private Beach Access"],
  },
  {
    id: "house-3",
    name: "Mountain Cabin",
    description: "Cozy mountain retreat with rustic charm",
    category: "houses",
    price: "$850K",
    specs: ["3 Bedrooms", "Fireplace", "Scenic Views"],
  },
  
  // Animals
  {
    id: "animal-1",
    name: "Eagle",
    description: "Majestic eagle in flight with detailed feathers",
    category: "animals",
    specs: ["Wingspan: 7ft", "Habitat: Mountains", "Diet: Carnivore"],
  },
  {
    id: "animal-2",
    name: "Lion",
    description: "King of the jungle with realistic fur texture",
    category: "animals",
    specs: ["Weight: 420lbs", "Habitat: Savanna", "Social Structure: Pride"],
  },
  {
    id: "animal-3",
    name: "Dolphin",
    description: "Intelligent marine mammal with smooth skin",
    category: "animals",
    specs: ["Length: 8ft", "Habitat: Ocean", "Diet: Fish"],
  },
];

export const categories = [
  {
    id: "cars",
    name: "Cars",
    description: "Explore luxury and sports vehicles",
    icon: "🚗",
  },
  {
    id: "bikes",
    name: "Bikes",
    description: "Discover high-performance motorcycles",
    icon: "🏍️",
  },
  {
    id: "houses",
    name: "House Plans",
    description: "Browse architectural masterpieces",
    icon: "🏠",
  },
  {
    id: "animals",
    name: "Animals",
    description: "View realistic wildlife models",
    icon: "🦁",
  },
];

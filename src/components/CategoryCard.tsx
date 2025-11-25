import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const CategoryCard = ({ id, name, description, icon }: CategoryCardProps) => {
  return (
    <Link to={`/category/${id}`}>
      <Card className="group relative overflow-hidden border-border bg-card/50 backdrop-blur-xl hover:border-primary transition-all duration-300 hover:shadow-glow animate-fade-in cursor-pointer">
        <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative p-8 flex flex-col items-center text-center space-y-4">
          <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-muted-foreground group-hover:text-foreground transition-colors">
            {description}
          </p>
        </div>
      </Card>
    </Link>
  );
};

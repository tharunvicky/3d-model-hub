import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Model3D } from "@/types/model";

interface ModelCardProps {
  model: Model3D;
}

export const ModelCard = ({ model }: ModelCardProps) => {
  return (
    <Link to={`/viewer/${model.id}`}>
      <Card className="group relative overflow-hidden border-border bg-card/50 backdrop-blur-xl hover:border-primary transition-all duration-300 hover:shadow-glow cursor-pointer">
        <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Placeholder for 3D preview - in production, this would be a canvas preview */}
        <div className="relative h-48 bg-secondary/50 flex items-center justify-center">
          <div className="text-6xl opacity-50 group-hover:opacity-100 transition-opacity">
            {model.category === "cars" && "🚗"}
            {model.category === "bikes" && "🏍️"}
            {model.category === "houses" && "🏠"}
            {model.category === "animals" && "🦁"}
          </div>
        </div>
        
        <div className="relative p-6">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
            {model.name}
          </h3>
          <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors mb-4">
            {model.description}
          </p>
          {model.price && (
            <p className="text-lg font-bold text-primary">{model.price}</p>
          )}
        </div>
      </Card>
    </Link>
  );
};

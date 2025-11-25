import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ModelCard } from "@/components/ModelCard";
import { SearchBar } from "@/components/SearchBar";
import { models, categories } from "@/data/models";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchQuery, setSearchQuery] = useState("");

  const category = categories.find((c) => c.id === categoryId);
  const categoryModels = models.filter((m) => m.category === categoryId);
  
  const filteredModels = categoryModels.filter((model) =>
    model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Category Not Found</h1>
          <Link to="/">
            <Button>Go Back Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8 space-y-6">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-accent bg-clip-text text-transparent mb-2">
                {category.name}
              </h1>
              <p className="text-muted-foreground text-lg">{category.description}</p>
            </div>
            
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={`Search ${category.name.toLowerCase()}...`}
            />
          </div>
        </div>

        {/* Models Grid */}
        {filteredModels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModels.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No models found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;

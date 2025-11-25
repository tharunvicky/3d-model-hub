import { useParams, Link } from "react-router-dom";
import { ThreeViewer } from "@/components/ThreeViewer";
import { models } from "@/data/models";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Viewer = () => {
  const { modelId } = useParams<{ modelId: string }>();
  const model = models.find((m) => m.id === modelId);

  if (!model) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Model Not Found</h1>
          <Link to="/">
            <Button>Go Back Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-6">
        <Link to={`/category/${model.category}`}>
          <Button variant="ghost" className="gap-2 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to {model.category}
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-180px)]">
          {/* 3D Viewer */}
          <div className="lg:col-span-3">
            <Card className="h-full border-border bg-card/50 backdrop-blur-xl overflow-hidden">
              <div className="h-full p-2">
                <ThreeViewer modelId={model.id} modelCategory={model.category} />
              </div>
            </Card>
            <p className="text-sm text-muted-foreground mt-2 text-center">
              Click and drag to rotate • Scroll to zoom
            </p>
          </div>

          {/* Info Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-full border-border bg-card/50 backdrop-blur-xl p-6 space-y-6 overflow-y-auto">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Info className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-bold text-foreground">Model Info</h2>
                </div>
                <Separator className="mb-4" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{model.name}</h3>
                <p className="text-muted-foreground">{model.description}</p>
              </div>

              {model.price && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Price</p>
                  <p className="text-2xl font-bold text-primary">{model.price}</p>
                </div>
              )}

              {model.specs && model.specs.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-3">Specifications</p>
                  <ul className="space-y-2">
                    {model.specs.map((spec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-foreground">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4">
                <Button className="w-full bg-gradient-accent hover:opacity-90 transition-opacity">
                  Contact for Details
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewer;

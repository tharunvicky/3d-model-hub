import { CategoryCard } from "@/components/CategoryCard";
import { categories } from "@/data/models";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-20" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-neon-glow-secondary/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto relative z-10">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-accent bg-clip-text text-transparent">
              Explore 3D Models
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Immersive 3D showcase featuring cars, bikes, architectural designs, and wildlife
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={category.id}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CategoryCard {...category} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4 animate-slide-up">
              <div className="text-4xl">🎨</div>
              <h3 className="text-xl font-bold text-foreground">High Quality</h3>
              <p className="text-muted-foreground">
                Detailed 3D models with realistic textures and lighting
              </p>
            </div>
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="text-4xl">⚡</div>
              <h3 className="text-xl font-bold text-foreground">Interactive</h3>
              <p className="text-muted-foreground">
                Rotate, zoom, and explore every angle of each model
              </p>
            </div>
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <div className="text-4xl">📱</div>
              <h3 className="text-xl font-bold text-foreground">Responsive</h3>
              <p className="text-muted-foreground">
                Seamless experience across desktop, tablet, and mobile
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

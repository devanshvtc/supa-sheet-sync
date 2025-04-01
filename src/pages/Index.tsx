
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Left side with text */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-900 to-teal-500 flex items-center justify-center p-8 md:p-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
            Key Relationship Tracker
          </h1>
        </div>
        
        {/* Right side with image */}
        <div className="w-full md:w-1/2 bg-cover bg-center" style={{ 
          backgroundImage: "url('/lovable-uploads/59c50db4-30bd-4aae-8141-c834786714cd.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <div className="w-full h-full flex items-end justify-end p-8">
            <Link to="/form">
              <Button size="lg" className="group bg-blue-600 hover:bg-blue-700">
                Start Tracking
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

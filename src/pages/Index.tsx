
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Left side with slanted gradient and text */}
        <div className="w-full md:w-1/2 relative overflow-hidden flex items-center justify-center p-8 md:p-16">
          {/* Slanted gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#153567] via-[#2c5296] to-[#0080b9] transform -skew-x-12 origin-top-right"></div>
          
          {/* Content positioned above the gradient */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white relative z-10">
            Key Relationship Tracker
          </h1>
        </div>
        
        {/* Right side with image */}
        <div className="w-full md:w-1/2 relative overflow-hidden">
          <img 
            src="https://www.westconcomstor.com/content/dam/wcgcom/Global/CorpSite/main/short-header-partner-success.jpg"
            alt="Key Relationship Tracker" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 right-0 p-8">
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

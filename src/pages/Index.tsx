
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-4 text-primary">Data Collection Form</h1>
        <p className="text-xl text-gray-600 mb-8">
          A simple form connected to Supabase and Google Sheets for real-time data synchronization
        </p>
        
        <Link to="/form">
          <Button size="lg" className="group">
            Go to Form
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;

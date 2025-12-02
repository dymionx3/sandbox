import CompanyFooter from "@/components/CompanyFooter";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 via-indigo-200 to-fuchsia-100 dark:from-gray-950 dark:via-indigo-900 dark:to-fuchsia-900 text-foreground p-4">
      <div className="text-center p-8 bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-2xl border-2 border-indigo-300 dark:border-fuchsia-700 max-w-lg w-full transform transition-transform duration-300 hover:scale-[1.01]">
        <h1 className="text-5xl font-extrabold mb-4 text-indigo-700 dark:text-fuchsia-300 leading-tight drop-shadow">
          Welcome to Your Learning Journey
        </h1>
        <p className="text-lg text-indigo-900 dark:text-fuchsia-200 mb-8 font-medium">
          Dive into <span className="text-fuchsia-600 dark:text-fuchsia-300 font-bold">interactive courses</span> and master new skills with ease.
        </p>
        <Link to="/html-course">
          <Button
            size="lg"
            className="text-lg px-10 py-6 rounded-full shadow-lg bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white hover:from-fuchsia-500 hover:to-indigo-500 transition-all duration-300 font-bold"
          >
            Start HTML Course
          </Button>
        </Link>
      </div>
      <CompanyFooter />
    </div>
  );
};

export default Index;
"use client";
import React, { useState } from "react";
import { Exercise } from "@/data/htmlCourseData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const ExerciseComponent: React.FC<{ exercise: Exercise }> = ({ exercise }) => {
  const [userCode, setUserCode] = useState(exercise.starterCode);
  const [showSolution, setShowSolution] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Code copied to clipboard!");
  };

  return (
    <Card className="w-full mt-8 border-2 border-indigo-400 dark:border-fuchsia-700 rounded-2xl shadow-lg bg-gradient-to-br from-white via-indigo-50 to-fuchsia-50 dark:from-gray-900 dark:via-indigo-950 dark:to-fuchsia-950">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-indigo-700 dark:text-fuchsia-200">
          Exercise: {exercise.title}
        </CardTitle>
        <CardDescription className="text-indigo-900 dark:text-fuchsia-200 mt-2">
          {exercise.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-medium mb-3 text-fuchsia-700 dark:text-fuchsia-300">Your Code:</h3>
        <div className="relative">
          <textarea
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            className="w-full h-48 p-4 text-sm font-mono bg-gray-100 dark:bg-gray-800 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-fuchsia-500"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-indigo-400 dark:text-fuchsia-300 hover:text-indigo-700 dark:hover:text-fuchsia-100"
            onClick={() => copyToClipboard(userCode)}
          >
            <Copy className="h-4 w-4" />
            <span className="sr-only">Copy your code</span>
          </Button>
        </div>
        <Button
          onClick={() => setShowSolution(!showSolution)}
          className="mt-6 w-full md:w-auto bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white font-bold"
        >
          {showSolution ? "Hide Solution" : "Show Solution"}
        </Button>
        {showSolution && (
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-fuchsia-300">Solution:</h3>
            <div className="relative">
              <SyntaxHighlighter language="html" style={dracula} className="rounded-md p-4 text-sm overflow-auto">
                {exercise.solutionCode}
              </SyntaxHighlighter>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-fuchsia-400 dark:text-fuchsia-300 hover:text-fuchsia-700 dark:hover:text-fuchsia-100"
                onClick={() => copyToClipboard(exercise.solutionCode)}
              >
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy solution code</span>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExerciseComponent;
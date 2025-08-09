import React from "react";
import { Link } from "react-router-dom";
import { htmlCourse, Chapter } from "@/data/htmlCourseData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CourseLayout from "@/components/CourseLayout";

const HtmlCoursePage: React.FC = () => {
  return (
    <CourseLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-indigo-700 dark:text-fuchsia-300 drop-shadow">
          {htmlCourse.title}
        </h1>
        <p className="text-lg md:text-xl text-indigo-900 dark:text-fuchsia-200 mb-10 text-center max-w-3xl mx-auto font-medium">
          {htmlCourse.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {htmlCourse.chapters.map((chapter: Chapter) => (
            <Card
              key={chapter.id}
              className="flex flex-col h-full transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] border-2 border-indigo-200 dark:border-fuchsia-700 rounded-2xl bg-gradient-to-br from-white via-indigo-50 to-fuchsia-50 dark:from-gray-900 dark:via-indigo-950 dark:to-fuchsia-950"
            >
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-indigo-700 dark:text-fuchsia-200">{chapter.title}</CardTitle>
                <CardDescription className="text-indigo-900 dark:text-fuchsia-200 mt-2">{chapter.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow pt-4">
                <h3 className="font-semibold mb-3 text-lg text-fuchsia-700 dark:text-fuchsia-300">Lessons:</h3>
                <ul className="list-disc list-inside space-y-2 text-indigo-900 dark:text-fuchsia-200">
                  {chapter.lessons.map((lesson) => (
                    <li key={lesson.id}>
                      <Link
                        to={`/html-course/chapter/${chapter.id}/lesson/${lesson.id}`}
                        className="text-fuchsia-600 dark:text-fuchsia-300 hover:underline hover:text-indigo-700 dark:hover:text-fuchsia-100 font-semibold transition-colors duration-200"
                      >
                        {lesson.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </CourseLayout>
  );
};

export default HtmlCoursePage;
import React from "react";
import { useParams, Link } from "react-router-dom";
import { htmlCourse, Chapter, Lesson } from "@/data/htmlCourseData";
import CourseLayout from "@/components/CourseLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const HtmlChapterPage: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const chapter: Chapter | undefined = htmlCourse.chapters.find((c) => c.id === chapterId);

  if (!chapter) {
    return (
      <CourseLayout>
        <div className="text-center py-10">
          <h1 className="text-3xl font-bold text-fuchsia-700 dark:text-fuchsia-300">Chapter Not Found</h1>
          <p className="text-indigo-900 dark:text-fuchsia-200 mt-2">The chapter you are looking for does not exist.</p>
          <Link to="/html-course">
            <Button className="mt-6 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-bold">
              Back to Course Overview
            </Button>
          </Link>
        </div>
      </CourseLayout>
    );
  }

  return (
    <CourseLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-indigo-700 dark:text-fuchsia-300">{chapter.title}</h1>
        <p className="text-lg text-indigo-900 dark:text-fuchsia-200 mb-8">{chapter.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {chapter.lessons.map((lesson: Lesson) => (
            <Card
              key={lesson.id}
              className="transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] border-2 border-fuchsia-200 dark:border-fuchsia-700 rounded-2xl bg-gradient-to-br from-white via-fuchsia-50 to-indigo-50 dark:from-gray-900 dark:via-fuchsia-950 dark:to-indigo-950"
            >
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-fuchsia-700 dark:text-fuchsia-200">{lesson.title}</CardTitle>
                <CardDescription className="text-indigo-900 dark:text-fuchsia-200 mt-2">
                  {lesson.content.substring(0, 150)}...
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <Link
                  to={`/html-course/chapter/${chapter.id}/lesson/${lesson.id}`}
                >
                  <Button variant="outline" className="w-full border-fuchsia-400 text-fuchsia-700 dark:text-fuchsia-200 font-bold hover:bg-fuchsia-100 dark:hover:bg-fuchsia-800">
                    Start Lesson
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </CourseLayout>
  );
};

export default HtmlChapterPage;
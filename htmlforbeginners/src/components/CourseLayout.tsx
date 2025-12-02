import React from "react";
import { Link, useParams } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { htmlCourse, Chapter, Lesson } from "@/data/htmlCourseData";
import { cn } from "@/lib/utils";

interface CourseLayoutProps {
  children: React.ReactNode;
}

const CourseLayout: React.FC<CourseLayoutProps> = ({ children }) => {
  const { chapterId, lessonId } = useParams<{ chapterId?: string; lessonId?: string }>();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-fuchsia-50 to-white dark:from-gray-950 dark:via-indigo-950 dark:to-fuchsia-950">
      {/* Sidebar for larger screens */}
      <aside className="hidden md:block w-64 border-r bg-gradient-to-b from-indigo-200 via-fuchsia-100 to-white dark:from-gray-900 dark:via-indigo-900 dark:to-fuchsia-900 text-sidebar-foreground p-4 shadow-lg">
        <h2 className="text-2xl font-extrabold mb-6 text-indigo-700 dark:text-fuchsia-300 tracking-tight">HTML Course</h2>
        <nav className="space-y-3">
          {htmlCourse.chapters.map((chapter: Chapter) => (
            <div key={chapter.id}>
              <h3 className="font-semibold text-indigo-800 dark:text-fuchsia-200 mb-2">
                <Link
                  to={`/html-course/chapter/${chapter.id}`}
                  className={cn(
                    "block py-2 px-3 rounded-lg transition-colors duration-200 font-semibold",
                    "hover:bg-fuchsia-100 hover:text-fuchsia-700 dark:hover:bg-fuchsia-800 dark:hover:text-fuchsia-100",
                    chapterId === chapter.id &&
                      "bg-gradient-to-r from-indigo-400 to-fuchsia-400 text-white shadow font-bold"
                  )}
                >
                  {chapter.title}
                </Link>
              </h3>
              <ul className="ml-4 space-y-1">
                {chapter.lessons.map((lesson: Lesson) => (
                  <li key={lesson.id}>
                    <Link
                      to={`/html-course/chapter/${chapter.id}/lesson/${lesson.id}`}
                      className={cn(
                        "block py-1.5 px-2 text-sm rounded-md transition-colors duration-200",
                        "hover:bg-indigo-100 hover:text-indigo-700 dark:hover:bg-fuchsia-800 dark:hover:text-fuchsia-100",
                        lessonId === lesson.id &&
                          "bg-gradient-to-r from-fuchsia-400 to-indigo-400 text-white font-semibold"
                      )}
                    >
                      {lesson.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main content area */}
      <main className="flex-1 flex flex-col">
        {/* Mobile Header with Sheet Trigger */}
        <header className="md:hidden flex items-center justify-between p-4 border-b bg-gradient-to-r from-indigo-200 to-fuchsia-200 dark:from-gray-900 dark:to-fuchsia-900 text-card-foreground shadow-md">
          <h1 className="text-xl font-bold text-indigo-700 dark:text-fuchsia-200">HTML Course</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="border-indigo-400 dark:border-fuchsia-600">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-4 bg-gradient-to-b from-indigo-100 via-fuchsia-50 to-white dark:from-gray-900 dark:via-indigo-900 dark:to-fuchsia-900 text-sidebar-foreground">
              <h2 className="text-xl font-bold mb-4 text-indigo-700 dark:text-fuchsia-200">HTML Course</h2>
              <nav className="space-y-2">
                {htmlCourse.chapters.map((chapter: Chapter) => (
                  <div key={chapter.id}>
                    <h3 className="font-medium text-indigo-800 dark:text-fuchsia-200 mb-1">
                      <Link
                        to={`/html-course/chapter/${chapter.id}`}
                        className={cn(
                          "block py-1 px-2 rounded-md hover:bg-fuchsia-100 hover:text-fuchsia-700 dark:hover:bg-fuchsia-800 dark:hover:text-fuchsia-100",
                          chapterId === chapter.id &&
                            "bg-gradient-to-r from-indigo-400 to-fuchsia-400 text-white font-bold"
                        )}
                      >
                        {chapter.title}
                      </Link>
                    </h3>
                    <ul className="ml-4 space-y-1">
                      {chapter.lessons.map((lesson: Lesson) => (
                        <li key={lesson.id}>
                          <Link
                            to={`/html-course/chapter/${chapter.id}/lesson/${lesson.id}`}
                            className={cn(
                              "block py-1 px-2 text-sm rounded-md hover:bg-indigo-100 hover:text-indigo-700 dark:hover:bg-fuchsia-800 dark:hover:text-fuchsia-100",
                              lessonId === lesson.id &&
                                "bg-gradient-to-r from-fuchsia-400 to-indigo-400 text-white font-semibold"
                            )}
                          >
                            {lesson.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </header>

        <div className="flex-1 p-6 md:p-8 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default CourseLayout;
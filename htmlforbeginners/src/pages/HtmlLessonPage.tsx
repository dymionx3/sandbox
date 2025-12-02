import React from "react";
import { useParams, Link } from "react-router-dom";
import { htmlCourse, Chapter, Lesson } from "@/data/htmlCourseData";
import CourseLayout from "@/components/CourseLayout";
import LessonContent from "@/components/LessonContent";
import QuizComponent from "@/components/QuizComponent";
import ExerciseComponent from "@/components/ExerciseComponent";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const HtmlLessonPage: React.FC = () => {
  const { chapterId, lessonId } = useParams<{ chapterId: string; lessonId: string }>();

  const chapter: Chapter | undefined = htmlCourse.chapters.find((c) => c.id === chapterId);
  const lesson: Lesson | undefined = chapter?.lessons.find((l) => l.id === lessonId);

  if (!chapter || !lesson) {
    return (
      <CourseLayout>
        <div className="text-center py-10">
          <h1 className="text-3xl font-bold text-fuchsia-700 dark:text-fuchsia-300">Lesson Not Found</h1>
          <p className="text-indigo-900 dark:text-fuchsia-200 mt-2">The lesson you are looking for does not exist.</p>
          <Link to="/html-course">
            <Button className="mt-6 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-bold">
              Back to Course Overview
            </Button>
          </Link>
        </div>
      </CourseLayout>
    );
  }

  const currentLessonIndex = chapter.lessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentLessonIndex > 0 ? chapter.lessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < chapter.lessons.length - 1 ? chapter.lessons[currentLessonIndex + 1] : null;

  const getNextChapterLink = () => {
    const currentChapterIndex = htmlCourse.chapters.findIndex((c) => c.id === chapterId);
    if (currentChapterIndex < htmlCourse.chapters.length - 1) {
      const nextChapter = htmlCourse.chapters[currentChapterIndex + 1];
      return `/html-course/chapter/${nextChapter.id}/lesson/${nextChapter.lessons[0].id}`;
    }
    return null;
  };

  const nextChapterLink = !nextLesson ? getNextChapterLink() : null;

  return (
    <CourseLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-fuchsia-700 dark:text-fuchsia-300">{lesson.title}</h1>
        <p className="text-lg text-indigo-900 dark:text-fuchsia-200 mb-6">From <span className="font-bold text-indigo-700 dark:text-fuchsia-300">{chapter.title}</span></p>

        <div className="bg-white/90 dark:bg-gray-900/90 p-6 rounded-2xl shadow-lg border-2 border-fuchsia-200 dark:border-fuchsia-700">
          <LessonContent content={lesson.content} />
        </div>

        {lesson.quiz && lesson.quiz.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-fuchsia-300">Quiz Time!</h2>
            <QuizComponent questions={lesson.quiz} />
          </div>
        )}

        {lesson.exercise && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4 text-fuchsia-700 dark:text-fuchsia-300">Exercise</h2>
            <ExerciseComponent exercise={lesson.exercise} />
          </div>
        )}

        <Separator className="my-10" />

        <div className="flex justify-between items-center mt-6">
          {prevLesson ? (
            <Link to={`/html-course/chapter/${chapterId}/lesson/${prevLesson.id}`}>
              <Button variant="outline" className="border-indigo-400 text-indigo-700 dark:text-fuchsia-200 font-bold hover:bg-indigo-100 dark:hover:bg-fuchsia-800">
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous Lesson
              </Button>
            </Link>
          ) : (
            <div /> // Placeholder to keep spacing
          )}

          {nextLesson ? (
            <Link to={`/html-course/chapter/${chapterId}/lesson/${nextLesson.id}`}>
              <Button className="bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white font-bold">
                Next Lesson <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          ) : nextChapterLink ? (
            <Link to={nextChapterLink}>
              <Button className="bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white font-bold">
                Next Chapter <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Link to="/html-course">
              <Button className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-bold">
                Back to Course Overview
              </Button>
            </Link>
          )}
        </div>
      </div>
    </CourseLayout>
  );
};

export default HtmlLessonPage;
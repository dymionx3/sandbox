export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Exercise {
  title: string;
  description: string;
  starterCode: string;
  solutionCode: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string; // Markdown or plain text
  quiz?: QuizQuestion[];
  exercise?: Exercise;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  chapters: Chapter[];
}

export const htmlCourse: Course = {
  id: "html-for-beginners",
  title: "HTML for Beginners",
  description: "Learn the fundamentals of HTML to build your first web pages.",
  chapters: [
    {
      id: "introduction",
      title: "Chapter 1: Introduction to HTML",
      description: "What is HTML and how does it work?",
      lessons: [
        {
          id: "what-is-html",
          title: "Lesson 1.1: What is HTML?",
          content: `
HTML stands for HyperText Markup Language. It's the standard markup language for creating web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.

Web browsers receive HTML documents from a web server or from local storage and render them into multimedia web pages. HTML elements are the building blocks of HTML pages. With HTML, you can create headings, paragraphs, lists, links, images, and much more.
          `,
          quiz: [
            {
              question: "What does HTML stand for?",
              options: ["HyperText Markup Language", "High-Level Text Management", "Hyperlink and Text Markup", "Home Tool Markup Language"],
              correctAnswer: "HyperText Markup Language",
            },
            {
              question: "What is the primary purpose of HTML?",
              options: ["Styling web pages", "Adding interactivity to web pages", "Structuring content on web pages", "Managing server-side logic"],
              correctAnswer: "Structuring content on web pages",
            },
          ],
        },
        {
          id: "basic-structure",
          title: "Lesson 1.2: Basic HTML Document Structure",
          content: `
Every HTML document has a basic structure. It starts with a doctype declaration, followed by the \`<html>\` element, which contains the \`<head>\` and \`<body>\` elements.

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First HTML Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first paragraph.</p>
</body>
</html>
\`\`\`
          `,
          exercise: {
            title: "Create Your First HTML Page",
            description: "Create a simple HTML page with a title and a heading.",
            starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Page Title</title>
</head>
<body>
  <!-- Add your heading here -->
</body>
</html>`,
            solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Awesome Page</title>
</head>
<body>
  <h1>Welcome to My Page!</h1>
</body>
</html>`,
          },
        },
      ],
    },
    {
      id: "text-formatting",
      title: "Chapter 2: Text Formatting",
      description: "Learn how to format text using various HTML tags.",
      lessons: [
        {
          id: "headings-paragraphs",
          title: "Lesson 2.1: Headings and Paragraphs",
          content: `
HTML provides six levels of headings, from \`<h1>\` (most important) to \`<h6>\` (least important). Paragraphs are defined by the \`<p>\` tag.

\`\`\`html
<h1>This is a Heading 1</h1>
<h2>This is a Heading 2</h2>
<p>This is a paragraph of text. It can contain multiple sentences.</p>
<p>Another paragraph.</p>
\`\`\`
          `,
          exercise: {
            title: "Practice Headings and Paragraphs",
            description: "Create an HTML snippet with an h3 heading and two paragraphs.",
            starterCode: `<!-- Add your h3 heading and two paragraphs here -->`,
            solutionCode: `<h3>My Subtitle</h3>
<p>This is the first paragraph of my content.</p>
<p>And this is the second paragraph, providing more details.</p>`,
          },
        },
        {
          id: "bold-italic",
          title: "Lesson 2.2: Bold and Italic Text",
          content: `
You can make text **bold** using the \`<strong>\` tag or \`<b>\` tag, and *italic* using the \`<em>\` tag or \`<i>\` tag.

\`\`\`html
<p>This is <strong>important text</strong>.</p>
<p>This is <em>emphasized text</em>.</p>
\`\`\`
          `,
          quiz: [
            {
              question: "Which tag is used to indicate strong importance?",
              options: ["<b>", "<i>", "<strong>", "<em>"],
              correctAnswer: "<strong>",
            },
          ],
        },
      ],
    },
    {
      id: "links-images",
      title: "Chapter 3: Links and Images",
      description: "Learn how to add links and images to your web pages.",
      lessons: [
        {
          id: "hyperlinks",
          title: "Lesson 3.1: Hyperlinks",
          content: `
Hyperlinks are created using the \`<a>\` tag. The \`href\` attribute specifies the URL.

\`\`\`html
<a href="https://www.example.com">Visit Example.com</a>
\`\`\`
          `,
          exercise: {
            title: "Create a Link",
            description: "Add a link to your favorite website.",
            starterCode: `<!-- Add your link here -->`,
            solutionCode: `<a href="https://www.mvelectronix.com" target="_blank">Visit M.V. Electronix</a>`,
          },
        },
        {
          id: "images",
          title: "Lesson 3.2: Images",
          content: `
Images use the \`<img>\` tag with \`src\` and \`alt\` attributes.

\`\`\`html
<img src="https://via.placeholder.com/150" alt="Placeholder" />
\`\`\`
          `,
          quiz: [
            {
              question: "Which attribute sets the image source?",
              options: ["link", "src", "href", "alt"],
              correctAnswer: "src",
            },
          ],
        },
      ],
    },
    {
      id: "lists-tables",
      title: "Chapter 4: Lists and Tables",
      description: "Create ordered/unordered lists and data tables.",
      lessons: [
        {
          id: "unordered-ordered-lists",
          title: "Lesson 4.1: Unordered & Ordered Lists",
          content: `
Use \`<ul>\` and \`<ol>\` with \`<li>\`.

\`\`\`html
<ul><li>Item 1</li><li>Item 2</li></ul>
\`\`\`
          `,
          exercise: {
            title: "Build a Grocery List",
            description: "Create an unordered list of three items.",
            starterCode: `<!-- Your list -->`,
            solutionCode: `<ul><li>Milk</li><li>Bread</li><li>Eggs</li></ul>`,
          },
        },
        {
          id: "html-tables",
          title: "Lesson 4.2: HTML Tables",
          content: `
Tables use \`<table>\`, \`<tr>\`, \`<th>\`, \`<td>\`.

\`\`\`html
<table><tr><th>Name</th><th>Age</th></tr></table>
\`\`\`
          `,
          quiz: [
            {
              question: "Which tag is a table header cell?",
              options: ["<td>", "<th>", "<tr>", "<table>"],
              correctAnswer: "<th>",
            },
          ],
        },
      ],
    },
    {
      id: "forms-inputs",
      title: "Chapter 5: Forms & Inputs",
      description: "Collect user input with forms.",
      lessons: [
        {
          id: "form-structure",
          title: "Lesson 5.1: Form Structure",
          content: `
Forms use \`<form>\` with \`action\` and \`method\`.

\`\`\`html
<form action="/submit" method="post"></form>
\`\`\`
          `,
          exercise: {
            title: "Create a Login Form",
            description: "Build a form with username & password.",
            starterCode: `<!-- Your form -->`,
            solutionCode: `<form action="/login" method="post"><input type="text" /><input type="password" /><button>Login</button></form>`,
          },
        },
        {
          id: "common-input-types",
          title: "Lesson 5.2: Input Types", 
          content: `
Examples: text, email, checkbox.

\`\`\`html
<input type="email" />
\`\`\`
          `,
          quiz: [
            {
              question: "Which type is best for emails?",
              options: ["text", "email", "url", "tel"],
              correctAnswer: "email",
            },
          ],
        },
      ],
    },
    {
      id: "semantic-html",
      title: "Chapter 6: Semantic HTML",
      description: "Use semantic tags for structure & accessibility.",
      lessons: [
        {
          id: "semantic-elements",
          title: "Lesson 6.1: Semantic Elements",
          content: `
Tags: \`<main>\`, \`<section>\`, \`<article>\`, \`<footer>\`.

\`\`\`html
<main><article>Content</article></main>
\`\`\`
          `,
          quiz: [
            {
              question: "Which tag wraps main content?",
              options: ["<div>", "<section>", "<main>", "<article>"],
              correctAnswer: "<main>",
            },
          ],
        },
      ],
    },
    {
      id: "final-exam",
      title: "Chapter 7: Final Exam",
      description: "Test your knowledge with a comprehensive exam.",
      lessons: [
        {
          id: "final-exam",
          title: "Lesson 7.1: Final Exam",
          content: `
Answer these questions to complete your exam.
          `,
          quiz: [
            { question: "What tag defines a paragraph?", options: ["<p>", "<div>", "<span>", "<para>"], correctAnswer: "<p>" },
            { question: "Which element holds metadata?", options: ["<body>", "<meta>", "<head>", "<header>"], correctAnswer: "<head>" },
            { question: "How do you create a list item?", options: ["<li>", "<list>", "<item>", "<ul>"], correctAnswer: "<li>" },
            { question: "Which attribute opens links in new tab?", options: ["new", "target", "href", "rel"], correctAnswer: "target" },
            { question: "What tag is for table rows?", options: ["<tr>", "<td>", "<th>", "<table>"], correctAnswer: "<tr>" },
          ],
        },
      ],
    },
    {
      id: "final-project",
      title: "Chapter 8: Final Project",
      description: "Build a complete web page to showcase your skills.",
      lessons: [
        {
          id: "final-project",
          title: "Lesson 8.1: Final Project",
          content: `
Create a personal portfolio page with header, nav, main content, and footer.
          `,
          exercise: {
            title: "Portfolio Page",
            description: "Use all HTML knowledge to build a portfolio layout.",
            starterCode: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><title>Portfolio</title></head>
<body>
  <!-- Your header, nav, main, footer here -->
</body>
</html>`,
            solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>My Portfolio</title>
</head>
<body>
  <header><h1>My Portfolio</h1></header>
  <nav><ul><li><a href="#">Home</a></li></ul></nav>
  <main>
    <section><h2>About Me</h2><p>Details...</p></section>
  </main>
  <footer><p>© 2024 My Name</p></footer>
</body>
</html>`,
          },
        },
      ],
    },
  ],
};
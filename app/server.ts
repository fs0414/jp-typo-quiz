import { Hono } from 'hono'
import { serveStatic } from 'hono/deno'
import { QuizPage } from './pages/QuizPage.tsx'

const app = new Hono()

// Static files
app.use('/static/*', serveStatic({ root: './' }))
app.use('/assets/*', serveStatic({ root: './dist' }))

// Routes
app.get('/', (c) => {
  const typoQuizzes = [
    { id: 1, typo: "エオbgいrhのび", correct: "ruby", category: "プログラミング言語", difficulty: "初級" },
    { id: 2, typo: "ぱとん", correct: "python", category: "プログラミング言語", difficulty: "初級" },
    { id: 4, typo: "こんそぇ", correct: "console", category: "プログラミング", difficulty: "初級" },
    { id: 5, typo: "れあct", correct: "react", category: "フレームワーク", difficulty: "初級" },
    { id: 6, typo: "tyぺ", correct: "type", category: "プログラミング", difficulty: "初級" },
    { id: 7, typo: "cぁss", correct: "class", category: "プログラミング", difficulty: "初級" },
    { id: 8, typo: "いんぽrt", correct: "import", category: "プログラミング", difficulty: "初級" },
    { id: 9, typo: "ありゃy", correct: "array", category: "プログラミング", difficulty: "中級" },
  ];

  return c.html(QuizPage({ quizzes: typoQuizzes }))
})

// API Routes
app.get('/api/:name', (c) => {
  const name = c.req.param('name')
  return c.text(`Hello, ${name.charAt(0).toUpperCase() + name.slice(1)}!`)
})

Deno.serve({ port: 8000 }, app.fetch)

export default app

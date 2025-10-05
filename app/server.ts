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
    { id: 1, typo: "るby", correct: "ruby" },
    { id: 2, typo: "ぱとん", correct: "python" },
    { id: 3, typo: "こんそぇ", correct: "console" },
    { id: 4, typo: "れあct", correct: "react" },
    { id: 5, typo: "tyぺ", correct: "type" },
    { id: 6, typo: "cぁss", correct: "class" },
    { id: 7, typo: "ありゃy", correct: "array" },
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

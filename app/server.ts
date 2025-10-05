import { Hono } from 'hono'
import { serveStatic } from 'hono/deno'
import { QuizPage } from './pages/QuizPage.tsx'

const app = new Hono()

// Deno KV functions
async function initQuizData() {
  const kv = await Deno.openKv();
  
  // Check if data already exists
  const existingData = await kv.get(["quizzes", "count"]);
  if (existingData.value !== null) {
    return; // Data already initialized
  }
  
  // Initialize with mock data
  const initialQuizzes = [
    { id: 1, typo: "るby", correct: "ruby" },
    { id: 2, typo: "ぱとん", correct: "python" },
    { id: 3, typo: "こんそぇ", correct: "console" },
    { id: 4, typo: "れあct", correct: "react" },
    { id: 5, typo: "tyぺ", correct: "type" },
    { id: 6, typo: "cぁss", correct: "class" },
    { id: 7, typo: "ありゃy", correct: "array" },
  ];
  
  // Store each quiz and the count
  for (const quiz of initialQuizzes) {
    await kv.set(["quizzes", quiz.id], quiz);
  }
  await kv.set(["quizzes", "count"], initialQuizzes.length);
  
  kv.close();
}

async function getAllQuizzes() {
  const kv = await Deno.openKv();
  const count = await kv.get(["quizzes", "count"]);
  
  if (count.value === null) {
    kv.close();
    return [];
  }
  
  const quizzes = [];
  for (let i = 1; i <= count.value; i++) {
    const quiz = await kv.get(["quizzes", i]);
    if (quiz.value) {
      quizzes.push(quiz.value);
    }
  }
  
  kv.close();
  return quizzes;
}

// Initialize data on startup
await initQuizData();

// HonoX renderer middleware

// HonoX static files (built assets)
app.use('/assets/*', serveStatic({ root: './dist' }))
app.use('/static/*', serveStatic({ root: './' }))

// Routes
app.get('/', async (c) => {
  const typoQuizzes = await getAllQuizzes();
  return c.render(QuizPage({ quizzes: typoQuizzes }))
})

// API Routes
app.get('/api/:name', (c) => {
  const name = c.req.param('name')
  return c.text(`Hello, ${name.charAt(0).toUpperCase() + name.slice(1)}!`)
})

Deno.serve({ port: 8000 }, app.fetch)

export default app

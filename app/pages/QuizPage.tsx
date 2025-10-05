import { FC } from 'hono/jsx'
import { Layout } from '../components/Layout.tsx'
import { Header } from '../components/Header.tsx'
import { QuizCard } from '../components/QuizCard.tsx'
import { QuizModal } from '../components/QuizModal.tsx'
import { QuizScript } from '../components/QuizScript.tsx'

interface TypoQuiz {
  id: number
  typo: string
  correct: string
  category: string
  difficulty: string
}

interface QuizPageProps {
  quizzes: TypoQuiz[]
}

export const QuizPage = ({quizzes}: QuizPageProps) => {
  return (
    <Layout title="日本語タイポクイズ">
      <Header />
      <main class="container mx-auto p-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map(quiz => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </main>
      <QuizModal />
      <QuizScript />
    </Layout>
  )
}

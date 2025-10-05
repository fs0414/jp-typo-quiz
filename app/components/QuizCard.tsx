import { jsx } from 'hono/jsx'

interface TypoQuiz {
  id: number
  typo: string
  correct: string
}

interface QuizCardProps {
  quiz: TypoQuiz
}

export const QuizCard = ({ quiz }: QuizCardProps) => {
  return (
    <div 
      class="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer quiz-card" 
      onclick={`openModal(${quiz.id}, '${quiz.typo}', '${quiz.correct}')`}
    >
      <div class="text-center mb-4">
        <div class="text-2xl font-bold text-gray-800 mb-2 font-mono bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
          {quiz.typo}
        </div>
        <p class="text-gray-600 text-sm">この「タイポ」の正しい英単語は？</p>
      </div>
      <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
        解答する
      </button>
    </div>
  )
}
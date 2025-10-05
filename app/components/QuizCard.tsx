import { jsx } from 'hono/jsx'

interface TypoQuiz {
  id: number
  typo: string
  correct: string
  category: string
  difficulty: string
}

interface QuizCardProps {
  quiz: TypoQuiz
}

export const QuizCard = ({ quiz }: QuizCardProps) => {
  return (
    <div 
      class="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer quiz-card" 
      onclick={`openModal(${quiz.id}, '${quiz.typo}', '${quiz.correct}', '${quiz.category}', '${quiz.difficulty}')`}
    >
      <div class="flex justify-between items-start mb-4">
        <span class="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {quiz.category}
        </span>
        <span class={`px-2 py-1 rounded text-xs font-medium ${
          quiz.difficulty === '初級' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {quiz.difficulty}
        </span>
      </div>
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
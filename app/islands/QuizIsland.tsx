import { useState } from 'hono/jsx'

interface TypoQuiz {
  id: number
  typo: string
  correct: string
}

interface QuizIslandProps {
  quizzes: TypoQuiz[]
}

export default function QuizIsland({ quizzes }: QuizIslandProps) {
  const [selectedQuiz, setSelectedQuiz] = useState<TypoQuiz | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const openModal = (quiz: TypoQuiz) => {
    setSelectedQuiz(quiz)
    setUserAnswer('')
    setShowResult(false)
  }

  const closeModal = () => {
    setSelectedQuiz(null)
    setUserAnswer('')
    setShowResult(false)
  }

  const checkAnswer = () => {
    if (!selectedQuiz) return
    
    const correct = userAnswer.trim().toLowerCase() === selectedQuiz.correct.toLowerCase()
    setIsCorrect(correct)
    setShowResult(true)
  }

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter' && !showResult) {
      checkAnswer()
    }
    if (e.key === 'Escape') {
      if (showResult) {
        setShowResult(false)
      } else {
        closeModal()
      }
    }
  }

  return (
    <div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map(quiz => (
          <div 
            key={quiz.id}
            class="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer" 
            onClick={(e: any) => {
              e.preventDefault();
              openModal(quiz);
            }}
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
        ))}
      </div>

      {/* 解答モーダル */}
      {selectedQuiz && !showResult && (
        <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div class="bg-white rounded-xl p-8 m-4 max-w-md w-full transform transition-all">
            <div class="text-center">
              <h2 class="text-2xl font-bold text-gray-800 mb-4">クイズに挑戦！</h2>
              <div class="mb-6">
                <p class="text-gray-600 mb-2">この「タイポ」の正しい英単語を入力してください</p>
                <div class="text-3xl font-bold text-blue-600 font-mono bg-blue-50 p-4 rounded-lg border-2 border-dashed border-blue-300 mb-4">
                  {selectedQuiz.typo}
                </div>
                <input 
                  type="text" 
                  class="w-full p-3 border-2 border-gray-300 rounded-lg text-center text-xl font-mono focus:border-blue-500 focus:outline-none"
                  placeholder="正解を入力..."
                  value={userAnswer}
                  onInput={(e: any) => setUserAnswer(e.target.value)}
                  onKeyPress={handleKeyPress}
                  autoFocus
                />
              </div>
              <div class="flex gap-3">
                <button 
                  onClick={closeModal} 
                  class="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition-colors"
                >
                  キャンセル
                </button>
                <button 
                  onClick={checkAnswer} 
                  class="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  解答する
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 結果モーダル */}
      {showResult && selectedQuiz && (
        <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div class="bg-white rounded-xl p-8 m-4 max-w-md w-full transform transition-all">
            <div class="text-center">
              <div class="text-6xl mb-4">{isCorrect ? '🎉' : '😅'}</div>
              <h2 class={`text-2xl font-bold mb-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {isCorrect ? '正解！' : '不正解...'}
              </h2>
              <div class="mb-6">
                {isCorrect ? (
                  <div>
                    <p class="text-green-600 font-semibold mb-2">すばらしい！</p>
                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p class="text-gray-700">
                        <span class="font-mono font-bold">{selectedQuiz.typo}</span> → 
                        <span class="font-mono font-bold text-green-600"> {selectedQuiz.correct}</span>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p class="text-red-600 font-semibold mb-2">惜しい！正解は...</p>
                    <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p class="text-gray-700">
                        <span class="font-mono font-bold">{selectedQuiz.typo}</span> → 
                        <span class="font-mono font-bold text-red-600"> {selectedQuiz.correct}</span>
                      </p>
                      <p class="text-sm text-gray-600 mt-2">
                        あなたの答え: <span class="font-mono">{userAnswer}</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <button 
                onClick={closeModal} 
                class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                次の問題へ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

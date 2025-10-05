import { jsx } from 'hono/jsx'

export const QuizModal = () => {
  return (
    <>
      {/* 解答モーダル */}
      <div id="quizModal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50 flex items-center justify-center">
        <div class="bg-white rounded-xl p-8 m-4 max-w-md w-full transform transition-all">
          <div class="text-center">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">クイズに挑戦！</h2>
            <div class="mb-6">
              <p class="text-gray-600 mb-2">この「タイポ」の正しい英単語を入力してください</p>
              <div id="modalTypo" class="text-3xl font-bold text-blue-600 font-mono bg-blue-50 p-4 rounded-lg border-2 border-dashed border-blue-300 mb-4">
              </div>
              <input 
                type="text" 
                id="answerInput" 
                class="w-full p-3 border-2 border-gray-300 rounded-lg text-center text-xl font-mono focus:border-blue-500 focus:outline-none"
                placeholder="正解を入力..."
              />
            </div>
            <div class="flex gap-3">
              <button onclick="closeModal()" class="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition-colors">
                キャンセル
              </button>
              <button onclick="checkAnswer()" class="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                解答する
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 結果モーダル */}
      <div id="resultModal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50 flex items-center justify-center">
        <div class="bg-white rounded-xl p-8 m-4 max-w-md w-full transform transition-all">
          <div class="text-center">
            <div id="resultIcon" class="text-6xl mb-4"></div>
            <h2 id="resultTitle" class="text-2xl font-bold mb-4"></h2>
            <div id="resultContent" class="mb-6"></div>
            <button onclick="closeResultModal()" class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              次の問題へ
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

import { Hono } from 'hono'
import { serveStatic } from 'hono/deno'
import { Context } from "node:vm";

const app = new Hono()

// Static files
app.use('/static/*', serveStatic({ root: './' }))
app.use('/assets/*', serveStatic({ root: './dist' }))

// Routes
app.get('/', (c) => {
  const typoQuizzes = [
    { id: 1, typo: "るby", correct: "ruby", category: "プログラミング言語", difficulty: "初級" },
    { id: 2, typo: "ぱとん", correct: "python", category: "プログラミング言語", difficulty: "初級" },
    { id: 3, typo: "ふんcちおん", correct: "function", category: "プログラミング", difficulty: "中級" },
    { id: 4, typo: "こんそぇ", correct: "console", category: "プログラミング", difficulty: "初級" },
    { id: 5, typo: "れあct", correct: "react", category: "フレームワーク", difficulty: "初級" },
    { id: 6, typo: "tyぺ", correct: "type", category: "プログラミング", difficulty: "初級" },
    { id: 7, typo: "cぁss", correct: "class", category: "プログラミング", difficulty: "初級" },
  ];

  return c.html(`
    <!DOCTYPE html>
    <html lang="ja">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>日本語タイポクイズ</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body>
      <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <header class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 shadow-lg">
          <div class="container mx-auto">
            <h1 class="text-4xl font-bold text-center mb-2">日本語タイポクイズ</h1>
            <p class="text-center text-blue-100">
              日本語入力のまま英単語を打ってしまった「タイポ」を正しく入力しよう！
            </p>
          </div>
        </header>
        <main class="container mx-auto p-8">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${typoQuizzes.map(quiz => `
              <div class="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer quiz-card" onclick="openModal(${quiz.id}, '${quiz.typo}', '${quiz.correct}', '${quiz.category}', '${quiz.difficulty}')">
                <div class="flex justify-between items-start mb-4">
                  <span class="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">${quiz.category}</span>
                  <span class="px-2 py-1 rounded text-xs font-medium ${quiz.difficulty === '初級' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">${quiz.difficulty}</span>
                </div>
                <div class="text-center mb-4">
                  <div class="text-2xl font-bold text-gray-800 mb-2 font-mono bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
                    ${quiz.typo}
                  </div>
                  <p class="text-gray-600 text-sm">この「タイポ」の正しい英単語は？</p>
                </div>
                <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                  解答する
                </button>
              </div>
            `).join('')}
          </div>
        </main>

        <!-- モーダル -->
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

        <!-- 結果モーダル -->
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

        <script>
          let currentQuiz = null;

          function openModal(id, typo, correct, category, difficulty) {
            currentQuiz = { id, typo, correct, category, difficulty };
            document.getElementById('modalTypo').textContent = typo;
            document.getElementById('answerInput').value = '';
            document.getElementById('quizModal').classList.remove('hidden');
            document.getElementById('answerInput').focus();
          }

          function closeModal() {
            document.getElementById('quizModal').classList.add('hidden');
            currentQuiz = null;
          }

          function closeResultModal() {
            document.getElementById('resultModal').classList.add('hidden');
          }

          function checkAnswer() {
            const userAnswer = document.getElementById('answerInput').value.trim().toLowerCase();
            const correctAnswer = currentQuiz.correct.toLowerCase();
            
            closeModal();
            
            const resultIcon = document.getElementById('resultIcon');
            const resultTitle = document.getElementById('resultTitle');
            const resultContent = document.getElementById('resultContent');

            if (userAnswer === correctAnswer) {
              resultIcon.textContent = '🎉';
              resultTitle.textContent = '正解！';
              resultTitle.className = 'text-2xl font-bold mb-4 text-green-600';
              resultContent.innerHTML = \`
                <p class="text-green-600 font-semibold mb-2">すばらしい！</p>
                <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p class="text-gray-700"><span class="font-mono font-bold">\${currentQuiz.typo}</span> → <span class="font-mono font-bold text-green-600">\${currentQuiz.correct}</span></p>
                  <p class="text-sm text-gray-600 mt-2">カテゴリ: \${currentQuiz.category}</p>
                </div>
              \`;
            } else {
              resultIcon.textContent = '😅';
              resultTitle.textContent = '不正解...';
              resultTitle.className = 'text-2xl font-bold mb-4 text-red-600';
              resultContent.innerHTML = \`
                <p class="text-red-600 font-semibold mb-2">惜しい！正解は...</p>
                <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p class="text-gray-700"><span class="font-mono font-bold">\${currentQuiz.typo}</span> → <span class="font-mono font-bold text-red-600">\${currentQuiz.correct}</span></p>
                  <p class="text-sm text-gray-600 mt-2">あなたの答え: <span class="font-mono">\${userAnswer}</span></p>
                  <p class="text-sm text-gray-600">カテゴリ: \${currentQuiz.category}</p>
                </div>
              \`;
            }

            document.getElementById('resultModal').classList.remove('hidden');
          }

          // Enterキーで解答
          document.getElementById('answerInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
              checkAnswer();
            }
          });

          // ESCキーでモーダルを閉じる
          document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
              if (!document.getElementById('quizModal').classList.contains('hidden')) {
                closeModal();
              }
              if (!document.getElementById('resultModal').classList.contains('hidden')) {
                closeResultModal();
              }
            }
          });
        </script>
      </div>
    </body>
    </html>
  `)
})

// API Routes
app.get('/api/:name', (c: Context) => {
  const name = c.req.param('name')
  return c.text(`Hello, ${name.charAt(0).toUpperCase() + name.slice(1)}!`)
})

if (import.meta.main) {
  Deno.serve({ port: 8000 }, app.fetch)
}

export default app

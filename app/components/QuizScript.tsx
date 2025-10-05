import { jsx } from 'hono/jsx'

export const QuizScript = () => {
  return (
    <script dangerouslySetInnerHTML={{
      __html: `
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
      `
    }} />
  )
}
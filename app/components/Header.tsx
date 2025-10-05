import { jsx } from 'hono/jsx'

export const Header = () => {
  return (
    <header class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 shadow-lg">
      <div class="container mx-auto">
        <h1 class="text-4xl font-bold text-center mb-2">日本語タイポクイズ</h1>
        <p class="text-center text-blue-100">
          日本語入力のまま英単語を打ってしまった「タイポ」を正しく入力しよう！
        </p>
      </div>
    </header>
  )
}
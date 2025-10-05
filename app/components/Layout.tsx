import { jsx } from 'hono/jsx'

interface LayoutProps {
  title: string
  children: any
}

export const Layout = ({ title, children }: LayoutProps) => {
  return (
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          {children}
        </div>
      </body>
    </html>
  )
}
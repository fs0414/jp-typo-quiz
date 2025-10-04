import { Head } from "fresh/runtime";
import { define } from "../utils.ts";

export default define.page(function Home() {
  const mockData = [
    { id: 1, title: "Item 1", content: "Content for item 1" },
    { id: 2, title: "Item 2", content: "Content for item 2" },
    { id: 3, title: "Item 3", content: "Content for item 3" },
    { id: 4, title: "Item 4", content: "Content for item 4" },
    { id: 5, title: "Item 5", content: "Content for item 5" },
    { id: 6, title: "Item 6", content: "Content for item 6" },
    { id: 7, title: "Item 7", content: "Content for item 7" },
    { id: 8, title: "Item 8", content: "Content for item 8" },
    { id: 9, title: "Item 9", content: "Content for item 9" },
  ];

  return (
    <div class="min-h-screen bg-white">
      <Head>
        <title>Simple UI Mock</title>
      </Head>
      
      <header class="bg-orange-500 text-white p-6">
        <h1 class="text-3xl font-bold text-center">UI Mock</h1>
      </header>

      <main class="container mx-auto p-8">
        <div class="grid grid-cols-3 gap-6">
          {mockData.map((item) => (
            <div 
              key={item.id} 
              class="bg-white border-2 border-orange-400 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <h2 class="text-xl font-semibold text-orange-600 mb-2">
                {item.title}
              </h2>
              <p class="text-gray-700">{item.content}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
});

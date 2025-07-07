export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Prototyping Boilerplate
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-8">
            Next.js 14+ starter template with app router, shadcn/ui, typesafe env, icons and configs setup.
          </p>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Ready to prototype your next idea?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              This boilerplate provides everything you need to quickly start building modern web applications. 
              It includes TypeScript, Tailwind CSS, shadcn/ui components, and much more.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Features</h3>
                <ul className="text-slate-600 dark:text-slate-400 space-y-1">
                  <li>• Next.js 14+ with App Router</li>
                  <li>• TypeScript & Tailwind CSS</li>
                  <li>• shadcn/ui components</li>
                  <li>• Typesafe environment variables</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Getting Started</h3>
                <ul className="text-slate-600 dark:text-slate-400 space-y-1">
                  <li>• Clone the repository</li>
                  <li>• Run <code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">npm install</code></li>
                  <li>• Copy .env.example to .env.local</li>
                  <li>• Start developing with <code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">npm run dev</code></li>
                </ul>
              </div>
            </div>
          </div>
          <p className="text-slate-500 dark:text-slate-500">
            Ready to use - jump right into development
          </p>
        </div>
      </div>
    </div>
  )
}

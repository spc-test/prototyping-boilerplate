export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
            Welcome to the Prototyping Boilerplate
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A Next.js 14+ starter template with app router, shadcn/ui, typesafe env, icons and configs setup. 
            Ready to use - jump right into development.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="text-lg font-semibold mb-2">Modern Stack</h3>
              <p className="text-sm text-muted-foreground">
                Built with Next.js 14, TypeScript, and Tailwind CSS for a modern development experience.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="text-lg font-semibold mb-2">UI Components</h3>
              <p className="text-sm text-muted-foreground">
                Includes shadcn/ui components with Radix UI primitives and beautiful styling.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="text-lg font-semibold mb-2">Type Safety</h3>
              <p className="text-sm text-muted-foreground">
                Typesafe environment variables, configs, and icons for reliable development.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <p className="text-sm text-muted-foreground">
              Start building your next prototype with this production-ready template.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

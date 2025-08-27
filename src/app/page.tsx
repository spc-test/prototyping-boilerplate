import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div>
          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            Next.js Prototyping Boilerplate
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A modern starter template with Next.js 14+, TypeScript, Tailwind CSS, 
            and shadcn/ui components to accelerate your development workflow.
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-8 shadow-lg border border-slate-200">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">
            What's Included
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-slate-700">Next.js 14+ with App Router</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-slate-700">TypeScript Configuration</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-slate-700">Tailwind CSS Styling</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-slate-700">shadcn/ui Components</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-slate-700">SEO Optimized</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-slate-700">Type-safe Environment</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-slate-700">Prettier Configuration</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-slate-700">Production Ready</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 space-x-4">
            <Button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2">
              Get Started
            </Button>
            <Button variant="outline" className="px-6 py-2">
              View Documentation
            </Button>
          </div>
        </div>
        
        <div className="text-slate-500 text-sm">
          <p>Ready to build your next project with modern tools and best practices.</p>
        </div>
      </div>
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Button>Click me</Button>
      <ModeToggle />
    </div>
  )
}

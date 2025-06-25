import VioletBlock from '@/components/VioletBlock';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ scrollBehavior: 'auto', overflowAnchor: 'none' }}>
      <div className="flex items-center justify-center" style={{ minHeight: '200px', contain: 'layout' }}>
        <VioletBlock />
      </div>
    </div>
  )
}

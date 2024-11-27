import { Image } from 'lucide-react'

export default function PictureSection() {
  return (
    <div className="bg-white p-2 rounded-lg shadow-lg border-2 border-blue-200 hover:border-blue-400 transition-all h-full">
      <div className="h-full w-full overflow-hidden rounded-md">
        <img 
          src="/images/water10.jfif" 
          alt="Water Department"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}
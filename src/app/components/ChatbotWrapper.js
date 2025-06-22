'use client'

import dynamic from 'next/dynamic'

// Explicitly import with extension for Linux compatibility
const Chatbot = dynamic(() => import('./Chatbot'), {
  ssr: false,
  loading: () => (
    <div className="fixed bottom-4 right-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
      <div className="animate-pulse text-white">...</div>
    </div>
  )
})

export default function ChatbotWrapper() {
  return <Chatbot />
}
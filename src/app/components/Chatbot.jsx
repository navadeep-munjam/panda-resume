'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessages(prev => [...prev, data]);
    } catch (error) {
      console.error('Fetch error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I encountered an error. Please try again later."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Close chatbot when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const chatbotElement = document.querySelector('.chatbot-container');
      if (isOpen && chatbotElement && !chatbotElement.contains(event.target)) {
          setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 chatbot-container`}>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col ${
              isOpen ? 'w-[90vw] h-[70vh] sm:w-96 sm:h-[500px]' : 'w-16 h-16'
            }`}
          >
            {/* Header */}
            <motion.div 
              className="bg-blue-600 text-white p-3 sm:p-4 rounded-t-lg flex justify-between items-center cursor-pointer"
              onClick={() => setIsOpen(false)}
              whileHover={{ backgroundColor: '#2563eb' }}
            >
              <h3 className="font-semibold text-sm sm:text-base">Ask About Navadeep</h3>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </motion.div>

            {/* Messages */}
            <div className="flex-1 p-3 sm:p-4 overflow-y-auto">
              {messages.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center text-gray-500 mt-6 sm:mt-10"
                >
                  <p>Ask about Navadeep's projects...</p>
                  <ul className="mt-2 text-xs sm:text-sm space-y-1">
                    <motion.li 
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >• Projects (GO Compiler, Emotion Analysis)</motion.li>
                    <motion.li 
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >• Technical Skills</motion.li>
                    <motion.li 
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >• Education</motion.li>
                  </ul>
                </motion.div>
              ) : (
                <AnimatePresence>
                  {messages.map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`mb-3 p-3 rounded-lg max-w-[80%] text-sm sm:text-base ${
                        m.role === 'user' 
                          ? 'ml-auto bg-blue-600 text-white' 
                          : 'mr-auto bg-gray-100 text-gray-800'
                      }`}
                    >
                      {m.content}
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mr-auto bg-gray-100 text-gray-800 p-3 rounded-lg max-w-[80%]"
                >
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <motion.form 
              onSubmit={handleSubmit} 
              className="p-3 sm:p-4 border-t"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white text-xs sm:text-sm"
                  disabled={isLoading}
                />
                <motion.button
                  type="submit"
                  disabled={!input || isLoading}
                  className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg disabled:bg-gray-400 text-xs sm:text-sm"
                  whileHover={{ scale: !input || isLoading ? 1 : 1.05 }}
                  whileTap={{ scale: !input || isLoading ? 1 : 0.95 }}
                >
                  Send
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
        ) : (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ 
              scale: [1, 1.05, 1],
              transition: { repeat: Infinity, duration: 2 }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

// 'use client';
// import { useState, useRef, useEffect } from 'react';

// export default function Chatbot() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim() || isLoading) return;

//     // Add user message
//     const userMessage = { role: 'user', content: input };
//     setMessages(prev => [...prev, userMessage]);
//     setInput('');
//     setIsLoading(true);

//     try {
//       const response = await fetch('/api/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ messages: [...messages, userMessage] })
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       setMessages(prev => [...prev, data]);
//     } catch (error) {
//       console.error('Fetch error:', error);
//       setMessages(prev => [...prev, {
//         role: 'assistant',
//         content: "Sorry, I encountered an error. Please try again later."
//       }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Auto-scroll to bottom
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   return (
//     <div className={`fixed bottom-6 right-6 transition-all duration-300 ${isOpen ? 'w-96 h-[500px]' : 'w-16 h-16'}`}>
//       {isOpen ? (
//         <div className="bg-white rounded-lg shadow-xl border border-gray-200 h-full flex flex-col">
//           {/* Header */}
//           <div 
//             className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center cursor-pointer"
//             onClick={() => setIsOpen(false)}
//           >
//             <h3 className="font-semibold">Ask About Navadeep</h3>
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
//             </svg>
//           </div>

//           {/* Messages */}
//           <div className="flex-1 p-4 overflow-y-auto">
//             {messages.length === 0 ? (
//               <div className="text-center text-gray-500 mt-10">
//                 <p> <div>Ask about Navadeep{"'"}s projects...</div>

//                 </p>
//                 <ul className="mt-2 text-sm">
//                   <li>• Projects (GO Compiler, Emotion Analysis)</li>
//                   <li>• Technical Skills</li>
//                   <li>• Education</li>
//                 </ul>
//               </div>
//             ) : (
//               messages.map((m, i) => (
//                 <div 
//                   key={i} 
//                   className={`mb-3 p-3 rounded-lg max-w-[80%] ${
//                     m.role === 'user' 
//                       ? 'ml-auto bg-blue-600 text-white' 
//                       : 'mr-auto bg-gray-100 text-gray-800'
//                   }`}
//                 >
//                   {m.content}
//                 </div>
//               ))
//             )}
//             {isLoading && (
//               <div className="mr-auto bg-gray-100 text-gray-800 p-3 rounded-lg max-w-[80%]">
//                 <div className="flex space-x-2">
//                   <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
//                   <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                   <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
//                 </div>
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input Form */}
//           <form onSubmit={handleSubmit} className="p-4 border-t">
//             <div className="flex gap-2">
//                 <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Type your question..."
//                 className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white" // Added text-gray-800 and bg-white
//                 disabled={isLoading}
//                 />

//               <button
//                 type="submit"
//                 disabled={!input || isLoading}
//                 className="bg-blue-600 text-white px-4 rounded-lg disabled:bg-gray-400"
//               >
//                 Send
//               </button>
//             </div>
//           </form>
//         </div>
//       ) : (
//         <button
//           onClick={() => setIsOpen(true)}
//           className="w-16 h-16 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
//           </svg>
//         </button>
//       )}
//     </div>
//   );
// }
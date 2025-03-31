'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message with typing animation
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
      
      // Simulate typing effect for the bot response
      const botResponse = { role: 'assistant', content: '' };
      setMessages(prev => [...prev, botResponse]);
      
      // Type out the response character by character
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < data.content.length) {
          botResponse.content = data.content.substring(0, i + 1);
          setMessages(prev => [...prev.slice(0, -1), {...botResponse}]);
          i++;
        } else {
          clearInterval(typingInterval);
          setIsLoading(false);
        }
      }, 20);
      
    } catch (error) {
      console.error('Fetch error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I encountered an error. Please try again later."
      }]);
      setIsLoading(false);
    }
  };

  // Auto-scroll to bottom and focus input when opening
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

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

  // Sample questions
  const sampleQuestions = [
    "Tell me about Navadeep's GO Compiler project",
    "What technical skills does Navadeep have?",
    "Explain the Emotion Analysis project",
    "What's Navadeep's educational background?"
  ];

  return (
    <div className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 chatbot-container`}>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden ${
              isOpen ? 'w-[90vw] h-[70vh] sm:w-96 sm:h-[500px]' : 'w-16 h-16'
            }`}
          >
            {/* Header with gradient */}
            <motion.div 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-t-2xl flex justify-between items-center"
              whileHover={{ background: 'linear-gradient(to right, #2563eb, #4f46e5)' }}
            >
              <div className="flex items-center space-x-2">
                <motion.div 
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    transition: { duration: 0.5, repeat: Infinity, repeatDelay: 3 }
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                </motion.div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base">Navadeep Assistant</h3>
                  <p className="text-xs opacity-80">Ask me anything</p>
                </div>
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1 rounded-full hover:bg-white/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </motion.div>

            {/* Messages area */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {messages.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col items-center justify-center h-full"
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </motion.div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">How can I help you today?</h3>
                  <p className="text-sm text-gray-500 mb-6 text-center">Ask about Navadeep's projects, skills, or experience</p>
                  
                  <div className="grid grid-cols-1 gap-2 w-full max-w-xs">
                    {sampleQuestions.map((question, i) => (
                      <motion.button
                        key={i}
                        onClick={() => {
                          setInput(question);
                          inputRef.current?.focus();
                        }}
                        className="text-xs sm:text-sm text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors shadow-sm"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        {question}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence>
                    {messages.map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`p-3 rounded-2xl max-w-[85%] text-sm sm:text-base ${
                            m.role === 'user' 
                              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none' 
                              : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                          }`}
                        >
                          {m.content}
                          {m.role === 'assistant' && i === messages.length - 1 && !isLoading && (
                            <motion.div 
                              className="text-xs text-gray-400 mt-1 flex justify-end"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.5 }}
                            >
                              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white border border-gray-200 text-gray-800 p-3 rounded-2xl rounded-bl-none shadow-sm">
                        <div className="flex space-x-1.5">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input Form with floating effect */}
            <motion.div 
              className="p-3 bg-white border-t border-gray-200"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <form onSubmit={handleSubmit} className="flex gap-2">
                <motion.div className="flex-1 relative" whileHover={{ y: -2 }}>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your question..."
                    className="w-full p-3 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 bg-white text-sm shadow-sm"
                    disabled={isLoading}
                  />
                  {input && (
                    <motion.button
                      type="button"
                      onClick={() => setInput('')}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  )}
                </motion.div>
                <motion.button
                  type="submit"
                  disabled={!input || isLoading}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                  whileHover={{ scale: !input || isLoading ? 1 : 1.05 }}
                  whileTap={{ scale: !input || isLoading ? 1 : 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        ) : (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-xl flex items-center justify-center text-white hover:shadow-2xl transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ 
              y: [0, -5, 0],
              boxShadow: [
                '0 10px 15px -3px rgba(59, 130, 246, 0.3), 0 4px 6px -2px rgba(59, 130, 246, 0.1)',
                '0 20px 25px -5px rgba(59, 130, 246, 0.3), 0 10px 10px -5px rgba(59, 130, 246, 0.1)',
                '0 10px 15px -3px rgba(59, 130, 246, 0.3), 0 4px 6px -2px rgba(59, 130, 246, 0.1)'
              ],
              transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" }
            }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                transition: { repeat: Infinity, duration: 2 }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </motion.div>
            <motion.div 
              className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-xs"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-white">!</span>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}


// 'use client';
// import { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

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

//   // Close chatbot when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       const chatbotElement = document.querySelector('.chatbot-container');
//       if (isOpen && chatbotElement && !chatbotElement.contains(event.target)) {
//           setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [isOpen]);

//   return (
//     <div className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 chatbot-container`}>
//       <AnimatePresence>
//         {isOpen ? (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.8, y: 20 }}
//             transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//             className={`bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col ${
//               isOpen ? 'w-[90vw] h-[70vh] sm:w-96 sm:h-[500px]' : 'w-16 h-16'
//             }`}
//           >
//             {/* Header */}
//             <motion.div 
//               className="bg-blue-600 text-white p-3 sm:p-4 rounded-t-lg flex justify-between items-center cursor-pointer"
//               onClick={() => setIsOpen(false)}
//               whileHover={{ backgroundColor: '#2563eb' }}
//             >
//               <h3 className="font-semibold text-sm sm:text-base">Ask About Navadeep</h3>
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
//               </svg>
//             </motion.div>

//             {/* Messages */}
//             <div className="flex-1 p-3 sm:p-4 overflow-y-auto">
//               {messages.length === 0 ? (
//                 <motion.div 
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.2 }}
//                   className="text-center text-gray-500 mt-6 sm:mt-10"
//                 >
//                   <p>Ask about Navadeep's projects...</p>
//                   <ul className="mt-2 text-xs sm:text-sm space-y-1">
//                     <motion.li 
//                       initial={{ x: -10, opacity: 0 }}
//                       animate={{ x: 0, opacity: 1 }}
//                       transition={{ delay: 0.3 }}
//                     >• Projects (GO Compiler, Emotion Analysis)</motion.li>
//                     <motion.li 
//                       initial={{ x: -10, opacity: 0 }}
//                       animate={{ x: 0, opacity: 1 }}
//                       transition={{ delay: 0.4 }}
//                     >• Technical Skills</motion.li>
//                     <motion.li 
//                       initial={{ x: -10, opacity: 0 }}
//                       animate={{ x: 0, opacity: 1 }}
//                       transition={{ delay: 0.5 }}
//                     >• Education</motion.li>
//                   </ul>
//                 </motion.div>
//               ) : (
//                 <AnimatePresence>
//                   {messages.map((m, i) => (
//                     <motion.div
//                       key={i}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.3 }}
//                       className={`mb-3 p-3 rounded-lg max-w-[80%] text-sm sm:text-base ${
//                         m.role === 'user' 
//                           ? 'ml-auto bg-blue-600 text-white' 
//                           : 'mr-auto bg-gray-100 text-gray-800'
//                       }`}
//                     >
//                       {m.content}
//                     </motion.div>
//                   ))}
//                 </AnimatePresence>
//               )}
//               {isLoading && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="mr-auto bg-gray-100 text-gray-800 p-3 rounded-lg max-w-[80%]"
//                 >
//                   <div className="flex space-x-2">
//                     <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
//                     <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                     <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
//                   </div>
//                 </motion.div>
//               )}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Input Form */}
//             <motion.form 
//               onSubmit={handleSubmit} 
//               className="p-3 sm:p-4 border-t"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//             >
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   placeholder="Type your question..."
//                   className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white text-xs sm:text-sm"
//                   disabled={isLoading}
//                 />
//                 <motion.button
//                   type="submit"
//                   disabled={!input || isLoading}
//                   className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg disabled:bg-gray-400 text-xs sm:text-sm"
//                   whileHover={{ scale: !input || isLoading ? 1 : 1.05 }}
//                   whileTap={{ scale: !input || isLoading ? 1 : 0.95 }}
//                 >
//                   Send
//                 </motion.button>
//               </div>
//             </motion.form>
//           </motion.div>
//         ) : (
//           <motion.button
//             onClick={() => setIsOpen(true)}
//             className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             animate={{ 
//               scale: [1, 1.05, 1],
//               transition: { repeat: Infinity, duration: 2 }
//             }}
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
//             </svg>
//           </motion.button>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

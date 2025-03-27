export const runtime = 'edge';
export const maxDuration = 30; // 30 second timeout

export async function POST(req) {
  try {
    const { messages } = await req.json();
    
    const systemPrompt = `
    You are Navadeep's portfolio assistant. Use ONLY these facts:

    # Education
    - IIT Bhilai (2026): BTech in Computer Science
    - Sainik School Rukmapur (2022)

    # Technical Projects
    1. Multimodal Emotion Analysis (2025)
       - Python, PyTorch, Transformers, OpenCV
    2. Mini GO Compiler (2023-24)
       - C, Flex, Bison, AST generation
    3. Terminal Shell (2024)
       - C, Unix System Calls, Makefile

    # Skills
    - Languages: C/C++, Python, JavaScript
    - Web: Next.js, React, MongoDB
    - Tools: Docker, Git, Kubernetes

    Respond concisely in 1-3 sentences. Always mention technologies used.
    Current date: ${new Date().toLocaleDateString()}
    `;

    const response = await fetch('https://api.together.xyz/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.TOGETHER_API_KEY}`
      },
      body: JSON.stringify({
        model: 'mistralai/Mistral-7B-Instruct-v0.1',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.filter(m => m.role && m.content)
        ],
        temperature: 0.3,
        max_tokens: 500,
        top_p: 0.9
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return Response.json(data.choices[0].message);
    
  } catch (error) {
    console.error('Chat API Error:', error);
    return Response.json({
      role: 'assistant',
      content: "I'm currently unavailable. Please contact Navadeep directly at munjamnavadeep123@gmail.com"
    }, { status: 500 });
  }
}

// export const runtime = 'edge';

// export async function POST(req) {
//   try {
//     const { messages } = await req.json();
    
//     // Your complete system prompt
//     const systemPrompt = `
//     You are Navadeep's professional portfolio assistant. Your purpose is to accurately answer questions about Navadeep's education, projects, skills, and achievements using ONLY the following information:

//     # Personal Information
//     - Name: Munjam Navadeep
//     - Phone: +91-8555962023
//     - Personal Email: munjamnavadeep123@gmail.com
//     - Academic Email: munjamn@iitbhilai.ac.in
//     - GitHub: NAVADEEP154

//     # Education
//     - Indian Institute of Technology, Bhilai (Expected Graduation: 2026)
//       - Bachelor of Technology in Computer Science Engineering
//     - Sainik School Rukmapur, Karimnagar (Completed 2022)

//     # Technical Projects

//     ## 1. Multimodal Emotional Cause Pair Extraction (Jan 2025)
//     - Developed deep learning system for extracting emotional cause pairs from multimodal data
//     - Technologies: Python, PyTorch, Hugging Face Transformers, OpenCV

//     ## 2. Mini GO Compiler (Dec 2023 - April 2024)
//     - Compiler for subset of GO language
//     - Technologies: C, Flex, Bison

//     ## 3. Terminal Shell Development (June 2024 - July 2024)
//     - Custom Unix shell implementation
//     - Technologies: C, Unix System Calls, Makefile

//     # Technical Skills
//     - Languages: C, C++, Python, JavaScript, TypeScript
//     - Web: Next.js, React, Express, MongoDB
//     - Tools: Docker, Kubernetes, Git

//     # Achievements
//     - 1st place in Code Cursade Hackathon (2024) at IIT Bhilai

//     Response Guidelines:
//     1. Be concise (1-3 sentences)
//     2. Mention technologies for projects
//     3. Current date: ${new Date().toLocaleDateString()}
//     `;

//     const response = await fetch('https://api.together.xyz/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${process.env.TOGETHER_API_KEY}`
//       },
//       body: JSON.stringify({
//         model: 'mistralai/Mistral-7B-Instruct-v0.1',
//         messages: [
//           {
//             role: 'system',
//             content: systemPrompt
//           },
//           ...messages
//         ],
//         temperature: 0.3,  // Controls randomness (0-1)
//         max_tokens: 500,   // Maximum response length
//         top_p: 0.9,       // Controls diversity (0-1)
//       })
//     });

//     if (!response.ok) {
//       throw new Error(`API request failed with status ${response.status}`);
//     }

//     const data = await response.json();
//     return new Response(JSON.stringify(data.choices[0].message), {
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Chat error:', error);
//     return new Response(JSON.stringify({
//       role: 'assistant',
//       content: "I'm having technical difficulties. Please try again later."
//     }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }
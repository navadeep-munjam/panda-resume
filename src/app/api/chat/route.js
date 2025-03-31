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

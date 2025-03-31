export const runtime = 'edge';
export const maxDuration = 30; // 30 second timeout

export async function POST(req) {
  try {
    const { messages } = await req.json();
    
    const systemPrompt = `
       You are Navadeep's portfolio assistant. Use ONLY these facts:

    # Education
    - Indian Institute of Technology, Bhilai (2022–Present): B.Tech in Computer Science and Engineering
    - Sainik School Rukmapur (2022)

    # Technical Projects
    1. Multimodal Emotional Cause Pair Extraction (2024)
       - Python, PyTorch, Transformers, ResNet-50, OpenCV, Flask, TensorRT, CUDA
       - Developed transformer-based architecture with cross-modal attention
       - Improved F1-score by 12% over baseline
       - Deployed as low-latency REST API with model quantization

    2. Full Stack Blog Platform (2025)
       - Next.js 14, TypeScript, Tailwind CSS, PostgreSQL, Prisma, Clerk
       - Implemented secure authentication and CRUD operations
       - Designed database schema with user relationships

    3. Terminal Shell Development (2024)
       - C, Unix System Programming, Make
       - Implemented 15+ standard commands with custom features
       - Optimized performance through memory management

    4. Mini GO Compiler (2023-24)
       - C, Flex, Bison, Compiler Design
       - Implemented symbol table management and AST generation
       - Supported function recursion with error-handling

    # Skills
    - Languages: C, C++, Python, JavaScript, TypeScript
    - Web: Next.js, React, Express, Tailwind CSS
    - Databases: PostgreSQL, MongoDB, Prisma
    - Tools: Git, Docker, Kubernetes, CUDA
    - Data Analysis: NumPy, Pandas, Matplotlib, Seaborn

    # Achievements
    - 1st place in Code Crusade Hackathon at IIT Bhilai (2024)
    - 3rd place in 3KM Marathon (2021, Timing: 10:47)

    # Extracurricular
    - DesignX Member (2023-24): Designed institutional event posters using Figma/Adobe

    Respond concisely in 2-5 sentences. Always mention technologies used when discussing projects.
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

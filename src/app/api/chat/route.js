export const runtime = 'edge';
export const maxDuration = 30; // 30 second timeout

export async function POST(req) {
  try {
    const { messages } = await req.json();
    
    const systemPrompt = `
    You are a professional portfolio assistant for Navadeep Munjam, designed to provide precise and relevant information based on the following verified profile data. 
    
    ## Behavior Guidelines:
    - Respond conversationally to greetings such as "hi" or similar, and ask how you can assist.
    - Never introduce Navadeep unless specifically requested.
    - Provide concise and relevant answers (2–5 sentences) without excessive details. When asked about education, experience, projects, or skills, reference only the verified profile data below.
    - Be clear, technically accurate, and include tools/technologies only when relevant to the query.
    - Use markdown formatting for clarity when appropriate.
    - Avoid repeating the entire profile unless directly asked.
    
    ## PROFILE DATA
    
    ### Education
    - **Indian Institute of Technology, Bhilai** (2022–Present): B.Tech in Computer Science and Engineering
    - **Sainik School Rukmapur** (Graduated 2022)
    
    ### Projects
    1. **Full Stack Blog Platform** (Jan–Feb 2025)
       - Built using **Next.js 14**, **TypeScript**, **Tailwind CSS**, **PostgreSQL**, **Prisma**, **Clerk**, and **Vercel**.
       - Implemented secure authentication, role-based CRUD operations, and deployed with **CI/CD automation**.
    
    2. **Terminal Shell** (June–July 2024)
       - Developed a custom shell in **C** with **Unix system programming**, utilizing **Makefile** for build automation.
       - Implemented 15+ standard commands with error handling and modular design for extensibility.
    
    3. **Mini GO Compiler** (Dec 2023–Apr 2024)
       - Designed a **GO language** compiler using **C**, **Flex**, and **Bison**.
       - Supported recursive functions, error recovery, and visual parse trees for debugging.
    
    ### Skills
    - **Languages**: **C**, **C++**, **JavaScript**, **TypeScript**
    - **Web Development**: **React**, **Next.js**, **Express**, **Prisma**
    - **Databases**: **PostgreSQL**, **MongoDB**
    - **DevOps & Cloud**: **Docker**, **Kubernetes**, **Terraform**, **Jenkins**, **AWS**, **Prometheus**, **Grafana**, **Trivy**, **SonarQube**
    - **Data Analysis**: **NumPy**, **Pandas**, **Seaborn**, **Matplotlib**
    
    ### Achievements
    - **1st place** in the **Code Crusade Hackathon** at IIT Bhilai (2024)
    - **3rd place** in the **3KM Marathon** (2021, Timing: 10:47)
    
    ### Extracurricular
    - Member of **DesignX**: Designed event posters using **Figma** and **Adobe Suite**.
    
    Today's Date: ${new Date().toLocaleDateString()}
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

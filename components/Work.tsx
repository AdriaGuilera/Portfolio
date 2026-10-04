export default function Work() {
  return (
    <section className="section wrap work" id="work" aria-labelledby="work-title">
      <div className="section__head work__head">
        <h2 className="section__title" id="work-title">Work Experience</h2>
      </div>

      <div className="work__viewport">
        <div className="work__track">

          <article className="work__panel">
            <div className="work__meta">
              <span className="work__period">Apr 2026 - Present</span>
            </div>
            <h3 className="work__role">AI Software Engineer</h3>
            <p className="work__org">Spoki</p>
            <p className="work__desc">Moved all AI inference to EU-resident Gemini on Vertex for GDPR, adding benchmarks so agent quality holds across model updates. Migrated Milvus vector search and built the document ingestion pipeline. Built the platform&apos;s AI assistant, and improved and developed the voice agents on LiveKit, cutting latency from ~1s to 600ms. Created MCP servers and a Skills repository covering the company stack.</p>
            <ul className="work__tech">
              <li>Python</li><li>Go</li><li>Gemini on Vertex</li><li>LangGraph</li><li>Milvus</li><li>RAG</li><li>LiveKit</li><li>MCP</li>
            </ul>
          </article>

          <article className="work__panel">
            <div className="work__meta">
              <span className="work__period">Feb 2024 - Apr 2026</span>
            </div>
            <h3 className="work__role">Junior FullStack Developer</h3>
            <p className="work__org">K·Factor Technologies</p>
            <p className="work__desc">Introduced AI to the company as its sole owner, with no prior AI product. Built multi-tenant AI agents using Python and LangChain ecosystem. Developed and maintained Nest.js backends and Flutter mobile apps. Implemented RAG systems and SQL agents for intelligent document retrieval and database querying using LLMs.</p>
            <ul className="work__tech">
              <li>Python</li><li>LangChain</li><li>Nest.js</li><li>Flutter</li><li>RAG</li><li>SQL Agents</li><li>PostgreSQL</li>
            </ul>
          </article>

          <article className="work__panel">
            <div className="work__meta">
              <span className="work__period">Feb 2025 - Apr 2026</span>
            </div>
            <h3 className="work__role">AI Consulting for SMEs</h3>
            <p className="work__org">Freelance</p>
            <p className="work__desc">Consulting for small and medium companies to integrate AI into workflows. Built HR chatbot on Microsoft Teams with RAG architecture. Developed email management platform with AI-powered sorting. Created document extraction pipeline reducing manual entry by 70%.</p>
            <ul className="work__tech">
              <li>Python</li><li>RAG</li><li>Microsoft Teams</li><li>LLMs</li>
            </ul>
          </article>

        </div>
      </div>
    </section>
  )
}

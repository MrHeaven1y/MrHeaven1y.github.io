import type { LucideIcon } from "lucide-react";
import {
  Archive,
  ArrowDown,
  ArrowUpRight,
  BrainCircuit,
  Boxes,
  Circle,
  Code2,
  Cpu,
  Eye,
  Github,
  Linkedin,
  MessageSquareCode,
  ShieldCheck,
  Sparkles,
  Sprout,
} from "lucide-react";

type Project = {
  title: string;
  number: string;
  kind: string;
  summary: string;
  detail: string;
  stack: string[];
  href: string;
  icon: LucideIcon;
  accent: "amber" | "blue" | "green" | "rose" | "violet" | "ink";
};

const featuredProjects: Project[] = [
  {
    number: "01",
    title: "Adaptive Graph",
    kind: "Interactive ML systems",
    summary: "A neural-network playground powered by a custom C autograd engine compiled to WebAssembly.",
    detail: "Build networks, tune hyperparameters, and watch decision boundaries evolve in real time—locally in the browser, without a model-serving backend.",
    stack: ["C", "WebAssembly", "Emscripten", "JavaScript"],
    href: "https://github.com/MrHeaven1y/adaptive-graph",
    icon: Boxes,
    accent: "blue",
  },
  {
    number: "02",
    title: "Vision Transformer with Online Learning",
    kind: "Production ML architecture",
    summary: "A from-scratch ViT pipeline with distributed training, REST inference, and feedback-driven model updates.",
    detail: "The serving system collects corrections, fine-tunes in the background, and reloads model weights without interrupting inference.",
    stack: ["PyTorch", "DDP", "Flask", "Hugging Face"],
    href: "https://github.com/MrHeaven1y/vision-transformer-from-scratch",
    icon: Eye,
    accent: "amber",
  },
  {
    number: "03",
    title: "C Autograd Engine",
    kind: "Deep learning foundations",
    summary: "A reverse-mode automatic differentiation engine written in plain C.",
    detail: "Implements dynamic computation graphs, broadcast tensor operations, dense layers, and momentum SGD with deliberate ownership and lifecycle management.",
    stack: ["C", "Autodiff", "CMake", "Memory systems"],
    href: "https://github.com/MrHeaven1y/vector-engine-c",
    icon: Cpu,
    accent: "ink",
  },
  {
    number: "04",
    title: "HobbyFi Copilot",
    kind: "Agentic application",
    summary: "An AI-assisted CRM copilot that keeps vendor data and write actions within explicit approval boundaries.",
    detail: "The application protects tenant boundaries, routes writes through approval, and falls back cleanly when an LLM is unavailable.",
    stack: ["FastAPI", "LangGraph", "PostgreSQL", "pgvector"],
    href: "https://github.com/MrHeaven1y/HobbyFi-Demo",
    icon: MessageSquareCode,
    accent: "violet",
  },
  {
    number: "05",
    title: "ADSA",
    kind: "Robust computer vision",
    summary: "A modular architecture for adversarial attack simulation, image segmentation, and reconstruction-based defense.",
    detail: "The pipeline connects SAM and U-Net segmentation with dual autoencoders, CNN attack evaluation, and GAN refinement through a configurable end-to-end orchestrator.",
    stack: ["PyTorch", "SAM", "U-Net", "GANs"],
    href: "https://github.com/MrHeaven1y/ADSA",
    icon: ShieldCheck,
    accent: "rose",
  },
  {
    number: "06",
    title: "SENet Plant Disease Predictor",
    kind: "Computer vision product",
    summary: "An end-to-end crop-disease classifier with channel attention, a FastAPI inference layer, and a responsive upload experience.",
    detail: "The system includes custom Squeeze-and-Excitation blocks, preprocessing, training code, model artifacts, and a full browser client.",
    stack: ["PyTorch", "SENet", "FastAPI", "Computer Vision"],
    href: "https://github.com/MrHeaven1y/se-net-plant-disease",
    icon: Sprout,
    accent: "green",
  },
];

const archiveProjects = [
  { title: "C–WASM Digit Classifier", description: "Pure-C tensor and inference engine packaged as an offline-capable drawing PWA.", href: "https://github.com/MrHeaven1y/c-wasm-digit-classifier", icon: Code2 },
  { title: "Stable Diffusion Image Generation", description: "A lean prompt-to-image workflow with automatic CUDA detection and a CPU fallback.", href: "https://github.com/MrHeaven1y/diffusion-image-gen", icon: Sparkles },
  { title: "ML & DL Project Inventory", description: "A broad body of ML work across vision, forecasting, healthcare, music, and deployment.", href: "https://github.com/MrHeaven1y/ML-DL-projects", icon: BrainCircuit },
  { title: "Euler Circle Visualization", description: "An interactive exploration of the relationship between complex exponentials and trigonometry.", href: "https://github.com/MrHeaven1y/Euler-circle-Visualization", icon: Circle },
  { title: "Web & Utility Archive", description: "Responsive sites, a task manager, and experiments built across the learning process.", href: "https://github.com/MrHeaven1y/misc-project-archive", icon: Archive },
];

const capabilities = [
  { number: "A", title: "Research with evidence", copy: "I care about how a model behaves, not only whether it runs. That means testing, diagnostics, and clear documentation." },
  { number: "B", title: "Systems fundamentals", copy: "I am comfortable working below the abstraction layer—from reverse-mode autodiff and tensors to memory-aware browser inference." },
  { number: "C", title: "Useful by design", copy: "Training, APIs, feedback loops, and interfaces all matter. I build the surrounding pieces so the work can be used and examined." },
];

const disciplines = [
  "AI Systems Engineering",
  "Machine Learning & Deep Learning",
  "Multimodal AI & Research",
  "Backend Engineering & APIs",
  "MLOps & Production AI",
  "Training Infrastructure & Optimization"
];

export default function Home() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="monogram" href="#top" aria-label="Back to top">DM<span>.</span></a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#work">Selected work</a><a href="#experience">Experience</a><a href="#approach">Approach</a><a href="#archive">Archive</a>
        </nav>
        <a className="header-link" href="#connect">Let&apos;s connect <ArrowUpRight aria-hidden="true" /></a>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span /> AI Research Engineer · Systems Engineer</p>
            <h1 id="hero-title">Dibyendu<br /><em>Mukherjee</em></h1>
            <p className="hero-intro">I build AI systems spanning backend engineering, machine learning, deep learning, MLOps, and production AI infrastructure—from low-level training engines to scalable research pipelines that can be tested, deployed, and continuously improved.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">Explore the work <ArrowDown aria-hidden="true" /></a>
              <a className="button button-outline" href="./dibyendu-mukherjee-resume.pdf" target="_blank" rel="noreferrer">View résumé <ArrowUpRight aria-hidden="true" /></a>
              <a className="text-link" href="https://github.com/MrHeaven1y" target="_blank" rel="noreferrer">GitHub profile <ArrowUpRight aria-hidden="true" /></a>
            </div>
          </div>
          <div className="hero-art">
            <div className="art-label art-label-top">RESEARCH / SYSTEMS / PRODUCT</div>
            <div className="art-grid">
              <div className="art-node node-one"><span>01</span><i /></div><div className="art-node node-two"><span>02</span><i /></div><div className="art-node node-three"><span>03</span><i /></div>
              <div className="art-orbit" /><div className="art-core"><BrainCircuit /></div>
            </div>

            <div className="art-label art-label-bottom">BUILDING WITH INTENT <b>—</b> 2026</div>
          </div>
          <div className="hero-footnote"><span>Scroll to inspect</span><b>01 / 05</b></div>
        </section>

        <section className="statement section-frame" id="approach" aria-labelledby="approach-title">
          <div className="section-kicker">01 — Perspective</div>
          <div className="statement-heading">
            <h2 id="approach-title">A good model is only one part of the work. The <em>system around it</em> matters just as much.</h2>
            <p>I enjoy the point where research becomes practical: training it properly, understanding its behavior, and giving people a useful way to work with it.</p>
          </div>
          <div className="capability-grid">
            {capabilities.map((capability) => <article className="capability" key={capability.number}><span>{capability.number}</span><h3>{capability.title}</h3><p>{capability.copy}</p></article>)}
          </div>
        </section>

        <section className="experience section-frame" id="experience" aria-labelledby="experience-title">
          <div className="experience-heading"><div><p className="section-kicker">02 — Experience</p><h2 id="experience-title">Research, systems,<br />and <em>hands-on delivery.</em></h2></div><p>The common thread in my work is simple: learn the problem deeply, build the right technical path, and keep the result grounded in evidence.</p></div>
          <div className="experience-list">
            <article className="experience-item"><p className="experience-period">2026 — Present</p><div><p className="experience-role">Assistant Researcher</p><h3>Private Research LAB</h3></div><ul><li>Researching computer vision, digital watermarking, and deep-learning systems for image-forensics work.</li><li>Building PyTorch experiments, addressing training-stability issues, and validating models through diagnostic tests.</li><li>Documenting research findings for academic publication.</li></ul></article>
            <article className="experience-item"><p className="experience-period">2024 — 2025</p><div><p className="experience-role">Independent Researcher</p><h3>Self-directed</h3></div><ul><li>Built deep-learning and computer-vision implementations from first principles, including a C autograd engine and handwritten digit classifier.</li><li>Designed Vision Transformers, CNNs, and optimization pipelines with PyTorch and TensorFlow.</li><li>Explored transfer learning, reinforcement learning, regularization, and custom SE-Net image classification.</li></ul></article>
            <article className="experience-item"><p className="experience-period">2023</p><div><p className="experience-role">Technical &amp; Strategy Intern</p><h3>One Lab Ventures</h3></div><ul><li>Built automated Python data pipelines that reduced manual collection time by 80%.</li><li>Automated internal reporting and CI/CD workflows, saving 15+ hours of operational work each week.</li><li>Worked across product and engineering to connect technical delivery with business needs.</li></ul></article>
          </div>
        </section>

        <section className="work section-frame" id="work" aria-labelledby="work-title">
          <div className="work-heading"><div><p className="section-kicker">03 — Selected work</p><h2 id="work-title">Selected projects,<br /><em>built hands-on.</em></h2></div><p>These are the systems I have spent time designing, debugging, training, and turning into something people can actually inspect or use.</p></div>
          <div className="project-grid">
            {featuredProjects.map((project) => {
              const Icon = project.icon;
              return <article className={`project-card project-${project.accent}`} key={project.number}>
                <div className="project-topline"><span>{project.number}</span><Icon aria-hidden="true" /></div>
                <div className="project-body"><p className="project-kind">{project.kind}</p><h3>{project.title}</h3><p className="project-summary">{project.summary}</p><p className="project-detail">{project.detail}</p></div>
                <div className="project-bottom"><div className="tag-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div><a href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} on GitHub`}>Read the repository <ArrowUpRight aria-hidden="true" /></a></div>
              </article>;
            })}
          </div>
        </section>

        <section className="discipline-section section-frame" aria-labelledby="discipline-title">
          <p className="section-kicker">04 — Working range</p>
          <div className="discipline-layout"><h2 id="discipline-title">What I work on<br />across <em>the AI stack.</em></h2><div className="discipline-list">{disciplines.map((discipline, index) => <span key={discipline}><b>0{index + 1}</b>{discipline}</span>)}</div></div>
        </section>

        <section className="archive section-frame" id="archive" aria-labelledby="archive-title">
          <div className="archive-heading"><div><p className="section-kicker">05 — More to explore</p><h2 id="archive-title">More projects<br /><em>worth exploring.</em></h2></div><a className="text-link" href="https://github.com/MrHeaven1y?tab=repositories" target="_blank" rel="noreferrer">See all repositories <ArrowUpRight aria-hidden="true" /></a></div>
          <div className="archive-list">
            {archiveProjects.map((project, index) => { const Icon = project.icon; return <a className="archive-item" href={project.href} target="_blank" rel="noreferrer" key={project.title}><span className="archive-number">0{index + 1}</span><Icon aria-hidden="true" /><div><h3>{project.title}</h3><p>{project.description}</p></div><ArrowUpRight className="archive-arrow" aria-hidden="true" /></a>; })}
          </div>
        </section>

        <section className="connect" id="connect" aria-labelledby="connect-title">
          <div className="connect-mark">DM<span>.</span></div><p className="section-kicker">Start a conversation</p><h2 id="connect-title">Have a research or<br /><em>engineering problem?</em></h2><p>I&apos;m interested in designing AI systems, advancing research into practical solutions, and building production-ready products that solve challenging technical problems.</p>
          <div className="connect-actions"><a className="button button-light" href="mailto:dibyendumukherjee916@gmail.com"><ArrowUpRight aria-hidden="true" /> Email me</a><a className="button button-quiet" href="https://www.linkedin.com/in/dibayendu-mukherjee-bb897b267" target="_blank" rel="noreferrer"><Linkedin aria-hidden="true" /> Connect on LinkedIn</a><a className="button button-quiet" href="https://github.com/MrHeaven1y" target="_blank" rel="noreferrer"><Github aria-hidden="true" /> GitHub</a></div>
        </section>
      </main>
      <footer className="site-footer"><p>© 2026 Dibyendu Mukherjee</p><p>AI Research Engineer · Systems Engineer</p><a href="#top">Back to top <ArrowUpRight aria-hidden="true" /></a></footer>
    </div>
  );
}

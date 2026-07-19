export const projects = [
  {
    id: "vector-engine",
    title: "Vector Engine",
    subtitle: "Autograd from scratch in C",
    description:
      "A complete reverse-mode automatic differentiation engine built from scratch in plain C. Supports tensors, dynamic computation graphs, backpropagation, dense layers, SGD with momentum, and model serialization.",
    longDescription:
      "Built an entire deep learning framework from the ground up in C — no dependencies, no libraries. The engine implements scalar-batched reverse-mode autodiff with a dynamic computation graph, supporting operations from basic arithmetic to softmax cross-entropy. Includes Xavier initialization, gradient clipping, and compiles to WebAssembly for browser deployment.",
    techStack: ["C", "CMake", "WebAssembly", "Autodiff", "Computation Graphs"],
    metrics: [
      { label: "Operations", value: "15+" },
      { label: "Binary Size", value: "29KB" },
      { label: "Language", value: "Pure C" },
    ],
    githubUrl: "https://github.com/MrHeaven1y/vector-engine",
    category: "systems",
    featured: true,
    gradient: "from-cyan-500/20 to-blue-600/20",
    icon: "Cpu",
  },
  {
    id: "adaptive-graph",
    title: "Adaptive Graph",
    subtitle: "Neural network playground in the browser",
    description:
      "TensorFlow Playground, rebuilt from the silicon up. A custom C autograd engine powers real-time neural network training and decision boundary visualization, all running in the browser via WebAssembly.",
    longDescription:
      "Recreated the TensorFlow Playground experience using a custom C-based autograd engine compiled to WebAssembly. Users can build neural networks with adjustable architectures, train in real-time, and watch decision boundaries form — all computed locally in the browser with zero server dependency. Features dynamic layer resizing and interactive graph morphing visualization.",
    techStack: ["C", "WebAssembly", "JavaScript", "HTML5 Canvas", "Autograd"],
    metrics: [
      { label: "Engine", value: "Custom C" },
      { label: "Runtime", value: "Browser" },
      { label: "Latency", value: "Real-time" },
    ],
    githubUrl: "https://github.com/MrHeaven1y/adaptive-graph",
    category: "systems",
    featured: true,
    gradient: "from-violet-500/20 to-purple-600/20",
    icon: "Network",
  },
  {
    id: "vision-transformer",
    title: "Vision Transformer",
    subtitle: "ViT from scratch with online learning",
    description:
      "From-scratch Vision Transformer implementation with multi-GPU DDP training, REST API inference, and a zero-downtime online learning system that fine-tunes from user feedback.",
    longDescription:
      "Implemented the complete Vision Transformer architecture from scratch — patch embeddings, multi-head self-attention, positional encoding, and transformer encoder blocks. Trained with PyTorch DDP across multiple GPUs on Mini-ImageNet. The system includes a Flask REST API with a live feedback loop: user corrections trigger background fine-tuning with hot-swapped model weights, enabling continuous improvement without downtime.",
    techStack: ["PyTorch", "DDP", "Flask", "NCCL", "HuggingFace", "REST API"],
    metrics: [
      { label: "Attention Heads", value: "12" },
      { label: "Layers", value: "12" },
      { label: "d_model", value: "768" },
    ],
    githubUrl: "https://github.com/MrHeaven1y/vision-transformer-from-scratch",
    category: "deep-learning",
    featured: true,
    gradient: "from-emerald-500/20 to-teal-600/20",
    icon: "Eye",
  },
  {
    id: "c-wasm-digit-classifier",
    title: "WASM Digit Classifier",
    subtitle: "Neural network running in your browser",
    description:
      "A 4-layer MLP written entirely in C, compiled to WebAssembly for real-time browser inference. Custom tensor library with full backward pass. Ships as a PWA with offline support.",
    longDescription:
      "Built a complete neural network from scratch in C — including a custom tensor library with strided views, reference-counted storage, and automatic differentiation. The trained model weights are baked directly into C arrays and compiled to WebAssembly via Emscripten. The result is a progressive web app where users draw digits and get instant predictions with probability distributions, all running offline in the browser.",
    techStack: ["C", "WebAssembly", "PWA", "Emscripten", "Custom Tensor Lib"],
    metrics: [
      { label: "Accuracy", value: "97%" },
      { label: "Architecture", value: "784→256→128→64→10" },
      { label: "Offline", value: "PWA" },
    ],
    githubUrl: "https://github.com/MrHeaven1y/c-wasm-digit-classifier",
    category: "systems",
    featured: true,
    gradient: "from-orange-500/20 to-amber-600/20",
    icon: "Binary",
  },
  {
    id: "adsa",
    title: "ADSA",
    subtitle: "Adversarial deep steganography",
    description:
      "A 4-stage deep learning pipeline for invisible image watermarking — from segmentation to GAN-based refinement, with adversarial attack simulation for robustness.",
    longDescription:
      "Adversarial Deep Steganography Architecture: a multi-stage pipeline that embeds invisible watermarks into images and extracts them reliably, even under adversarial attacks. Stage 1 segments regions with U-Net/SAM. Stage 2 encodes watermarks via dual autoencoders. Stage 3 trains a CNN extractor against simulated attacks. Stage 4 refines output quality with a GAN discriminator. All stages support multi-GPU DDP training.",
    techStack: ["PyTorch", "DDP", "U-Net", "GANs", "Adversarial Training"],
    metrics: [
      { label: "Stages", value: "4" },
      { label: "Training", value: "Multi-GPU" },
      { label: "Domain", value: "Security" },
    ],
    githubUrl: "https://github.com/MrHeaven1y/ADSA",
    category: "deep-learning",
    featured: true,
    gradient: "from-rose-500/20 to-pink-600/20",
    icon: "Shield",
  },
  {
    id: "se-net-plant-disease",
    title: "SE-Net Plant Disease",
    subtitle: "Full-stack computer vision deployment",
    description:
      "Plant disease classification using custom Squeeze-and-Excitation blocks. 38 disease classes, cloud model hosting on HuggingFace, Flask API with automatic data collection for retraining.",
    longDescription:
      "Built an end-to-end plant disease classification system with custom SE-Net architecture implementing channel attention via squeeze-and-excitation blocks. The model classifies 38 plant diseases from leaf images. Deployed with a Flask REST API, cloud-hosted weights on HuggingFace Hub, and an intelligent data pipeline that automatically collects low-confidence predictions for model retraining.",
    techStack: ["TensorFlow", "Flask", "SE-Net", "HuggingFace Hub", "Docker"],
    metrics: [
      { label: "Accuracy", value: "96.5%" },
      { label: "Classes", value: "38" },
      { label: "Images", value: "87K+" },
    ],
    githubUrl: "https://github.com/MrHeaven1y/se-net-plant-disease",
    category: "computer-vision",
    featured: true,
    gradient: "from-green-500/20 to-lime-600/20",
    icon: "Leaf",
  },
  {
    id: "diffusion-image-gen",
    title: "Diffusion Image Gen",
    subtitle: "Text-to-image generation",
    description:
      "Text-to-image generation pipeline using Stable Diffusion 2.1. Interactive CLI with automatic GPU detection and high-resolution 512×512 output.",
    longDescription:
      "A streamlined text-to-image generation system built on Stable Diffusion 2.1 via HuggingFace Diffusers. Features automatic CUDA detection with CPU fallback, interactive prompt loop, and high-quality 512×512 image generation with configurable inference steps and guidance scale.",
    techStack: ["PyTorch", "HuggingFace Diffusers", "Stable Diffusion", "CUDA"],
    metrics: [
      { label: "Resolution", value: "512×512" },
      { label: "Steps", value: "50" },
      { label: "Model", value: "SD 2.1" },
    ],
    githubUrl: "https://github.com/MrHeaven1y/diffusion-image-gen",
    category: "generative-ai",
    featured: false,
    gradient: "from-fuchsia-500/20 to-pink-600/20",
    icon: "Sparkles",
  },
  {
    id: "ml-dl-projects",
    title: "ML/DL Research",
    subtitle: "Collection of research implementations",
    description:
      "12+ machine learning and deep learning projects spanning music generation, brain tumor classification, and foundational mathematics for ML.",
    longDescription:
      "A comprehensive collection of ML/DL implementations including a WaveNet-inspired Bach chorale generator with dilated causal convolutions, brain tumor CNN classifier with Flask deployment, celebrity image classification, and foundational notebooks covering calculus, linear algebra, and probability for machine learning.",
    techStack: ["PyTorch", "TensorFlow", "scikit-learn", "Flask", "NumPy"],
    metrics: [
      { label: "Projects", value: "12+" },
      { label: "Domains", value: "5+" },
      { label: "Notebooks", value: "20+" },
    ],
    githubUrl: "https://github.com/MrHeaven1y/ML-DL-projects",
    category: "deep-learning",
    featured: false,
    gradient: "from-blue-500/20 to-indigo-600/20",
    icon: "Brain",
  },
  {
    id: "euler-circle",
    title: "Euler Circle Viz",
    subtitle: "Interactive mathematical visualization",
    description:
      "Interactive Euler formula visualizer showing the relationship between trigonometric functions and complex exponentials with adjustable parameters.",
    longDescription:
      "An interactive web application that visualizes Euler's formula e^(iθ) = cos(θ) + i·sin(θ). Features adjustable radius, opacity, angle sliders, clockwise/counter-clockwise rotation animation, and MathJax rendering. Also includes an Electron desktop app variant.",
    techStack: ["HTML5", "CSS3", "JavaScript", "MathJax", "Electron"],
    metrics: [
      { label: "Formula", value: "e^(iθ)" },
      { label: "Platforms", value: "Web + Desktop" },
    ],
    githubUrl: "https://github.com/MrHeaven1y/Euler-circle-Visualization",
    category: "web",
    featured: false,
    gradient: "from-sky-500/20 to-cyan-600/20",
    icon: "Circle",
  },
  {
    id: "misc-projects",
    title: "Project Archive",
    subtitle: "Web applications and utilities",
    description:
      "Obsidian-like note app with graph visualization (React + IndexedDB), responsive gym landing page, and various utility applications.",
    longDescription:
      "A collection including an Obsidian-inspired note-taking app built with React, TypeScript, and IndexedDB featuring wiki-links and vis-network graph visualization, plus a responsive gym landing page and other utility projects.",
    techStack: ["React", "TypeScript", "IndexedDB", "vis-network", "HTML/CSS"],
    metrics: [
      { label: "Apps", value: "5+" },
      { label: "Stack", value: "Full" },
    ],
    githubUrl: "https://github.com/MrHeaven1y/misc-projects-archive",
    category: "web",
    featured: false,
    gradient: "from-slate-500/20 to-zinc-600/20",
    icon: "Archive",
  },
];

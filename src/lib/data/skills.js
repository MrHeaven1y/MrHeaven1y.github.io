export const skills = [
  // Languages
  { name: "C", domain: "languages", connections: ["WebAssembly", "PyTorch", "CUDA"] },
  { name: "Python", domain: "languages", connections: ["PyTorch", "TensorFlow", "Flask", "NumPy"] },
  { name: "TypeScript", domain: "languages", connections: ["React", "Next.js", "Node.js"] },
  { name: "Rust", domain: "languages", connections: ["Systems Programming", "Performance"] },
  { name: "Java", domain: "languages", connections: ["OOP", "Algorithms"] },
  { name: "C++", domain: "languages", connections: ["Systems Programming", "CUDA"] },

  // ML/DL
  { name: "PyTorch", domain: "ml-dl", connections: ["DDP", "CUDA", "Transformers", "GANs", "CNNs"] },
  { name: "TensorFlow", domain: "ml-dl", connections: ["Keras", "SE-Net", "CNNs"] },
  { name: "Transformers", domain: "ml-dl", connections: ["Vision Transformer", "Self-Attention", "PyTorch"] },
  { name: "GANs", domain: "ml-dl", connections: ["Adversarial Training", "PyTorch", "Image Generation"] },
  { name: "CNNs", domain: "ml-dl", connections: ["Computer Vision", "SE-Net", "Image Classification"] },
  { name: "Autodiff", domain: "ml-dl", connections: ["C", "Computation Graphs", "Backpropagation"] },
  { name: "Self-Attention", domain: "ml-dl", connections: ["Transformers", "Vision Transformer"] },
  { name: "Diffusion Models", domain: "ml-dl", connections: ["Image Generation", "PyTorch"] },
  { name: "GNNs", domain: "ml-dl", connections: ["Graph Theory", "PyTorch"] },
  { name: "SE-Net", domain: "ml-dl", connections: ["Channel Attention", "CNNs", "TensorFlow"] },
  { name: "DDP", domain: "ml-dl", connections: ["PyTorch", "Multi-GPU", "NCCL"] },

  // Infrastructure
  { name: "Flask", domain: "infrastructure", connections: ["Python", "REST API", "Deployment"] },
  { name: "Docker", domain: "infrastructure", connections: ["Containerization", "Deployment"] },
  { name: "WebAssembly", domain: "infrastructure", connections: ["C", "Browser", "Emscripten"] },
  { name: "REST API", domain: "infrastructure", connections: ["Flask", "Deployment", "Online Learning"] },
  { name: "HuggingFace", domain: "infrastructure", connections: ["Model Hosting", "Diffusion Models", "Transformers"] },
  { name: "CMake", domain: "infrastructure", connections: ["C", "Build Systems"] },
  { name: "Git", domain: "infrastructure", connections: ["Version Control"] },
  { name: "Linux", domain: "infrastructure", connections: ["Systems Programming", "Docker"] },

  // Systems
  { name: "CUDA", domain: "systems", connections: ["PyTorch", "GPU Computing", "C++"] },
  { name: "NCCL", domain: "systems", connections: ["DDP", "Multi-GPU"] },
  { name: "Emscripten", domain: "systems", connections: ["WebAssembly", "C"] },
  { name: "Memory Management", domain: "systems", connections: ["C", "Systems Programming"] },
  { name: "Computation Graphs", domain: "systems", connections: ["Autodiff", "C", "Backpropagation"] },
];

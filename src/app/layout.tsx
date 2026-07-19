import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dibyendu Mukherjee — AI Research & Systems Engineer",
  description: "AI Research and Systems Engineer building computer-vision research, deep-learning infrastructure, and advanced AI applications—from C autograd engines to production vision transformers.",
  keywords: ["AI Research Engineer", "Machine Learning", "Deep Learning", "Computer Vision", "ML Systems", "PyTorch", "WebAssembly", "Vision Transformer", "Autograd", "Portfolio"],
  authors: [{ name: "Dibyendu Mukherjee" }],
  creator: "Dibyendu Mukherjee",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f3f0e8",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Dibyendu Mukherjee",
              jobTitle: "AI Research Engineer and Systems Engineer",
              sameAs: [
                "https://github.com/MrHeaven1y",
                "https://www.linkedin.com/in/dibayendu-mukherjee-bb897b267",
              ],
              knowsAbout: ["Artificial Intelligence", "Machine Learning", "Deep Learning", "Computer Vision", "ML Systems", "WebAssembly"],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

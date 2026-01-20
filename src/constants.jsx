import { Layers, Code2, Video, Server } from 'lucide-react';
import React from 'react';

export const LINKS = {
  gumroad: "https://gumroad.com/claiproject",
  youtube: "https://www.youtube.com/@IAStreetDreams",
  linkedin: "https://www.linkedin.com/in/jos%C3%A9-alberto-pinilla-564b7b2a5/",
  social: "https://bdsmbefree.com",
  marketplace: "https://clickngo.vercel.app/",
  // URL embebida oficial con el token de sesión si=pwJHZIjw20BosTcj
  aoreanaTrailer: "https://www.youtube.com/embed/urTidlNGRTY?si=pwJHZIjw20BosTcj", 
  twitter: "#",
  facebook: "#",
  instagram: "#"
};

export const SYSTEM_STATUS = [
  { name: "Be Free VPS", status: "Online", uptime: "99.9%", load: "12%" },
  { name: "ClickNGo Edge", status: "Online", uptime: "100%", load: "Optimized" },
  { name: "Video Node", status: "Ready", uptime: "100%", load: "GPU Active" },
  { name: "AI Bridge", status: "Active", uptime: "99.9%", load: "140ms" }
];

export const DEPLOYMENT_LOGS = [
  { time: "20:15:10", msg: "Aoreana Trailer: Streaming buffer optimized.", type: "success" },
  { time: "19:05:22", msg: "Cinema: Video generation pipeline ready.", type: "success" },
  { time: "17:30:12", msg: "Security: OAuth 2.0 PKCE flow verified.", type: "success" }
];

export const TECH_STACK = [
  { 
    category: "Frontend", 
    items: ["React 19", "Vite 7", "Tailwind 4", "Framer Motion"],
    icon: <Layers className="text-blue-500" /> 
  },
  { 
    category: "Backend & IA", 
    items: ["Node.js", "Gemini 2.5", "PostgreSQL", "Socket.io"],
    icon: <Code2 className="text-indigo-500" /> 
  },
  { 
    category: "Cinema Tech", 
    items: ["FFmpeg", "Runway Gen-3", "Suno AI", "Luma Dream"],
    icon: <Video className="text-purple-500" /> 
  },
  { 
    category: "DevOps", 
    items: ["Ubuntu VPS", "Nginx", "SSL/TLS", "Vercel"],
    icon: <Server className="text-slate-400" /> 
  }
];

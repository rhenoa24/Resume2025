import { Component } from '@angular/core';

@Component({
  selector: 'app-resume',
  standalone: false,
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})
export class ResumeComponent {
  protected competenciesTags: string = `
  Avid Learner ||
  Flexibility ||
  Intuitive ||
  Great Attention to Detail ||
  Documentation ||
  Teamwork ||
  Problem Solving ||
  Productivity
  `

  protected CompBullet1: string = `
  Interfaced with the CEO of the company ||
  Interfaced with client(s)
  `

  protected CompBullet2: string = `
  Cloud Computing ||
  Artificial Intelligence (AI) ||
  Software-As-A-Service (SaaS) ||
  Cybersecurity ||
  Progressive Web Development ||
  Mobile Development
  `

  protected CompBullet3: string = `
  Designing ||
  Prototyping ||
  Testing ||
  Support ||
  Technical Documentation ||
  Training
  `

  protected WorkBullet1: string = `
  Collaborating with cross-functional teams, including developers and product managers, to ensure seamless UI integration with backend systems while aligning with key business objectives.
||Creating comprehensive documentation in Confluence, detailing bug fixes and development strategies, to enhance workflow efficiency and support team collaboration.
||Partnering with QA teams to proactively identify, prioritize, and resolve UI-related issues, leading to a measurable improvement in site performance and stability.
||Redesigning business diagrams to enhance clarity and visual impact in marketing presentations, improving overall communication and engagement.
||Spearheaded the end-to-end redesign of the company's website UI, significantly elevating user experience, visual engagement, and site functionality.
||Developed high-fidelity wireframes, interactive mockups, and prototypes using Figma and Balsamiq, leading comprehensive usability testing that informed iterative improvements based on user insights.
||Contributed to the development of a Software as a Service (SaaS) application using Azure cloud computing, tailored for the Cyber Security industry.
  `

  protected WorkBullet2: string = `
  Delivered more than 400 commissioned digital illustrations, showcasing exceptional artistic talent and a proven ability to meet a wide range of client expectations.
||Collaborated with local and international clients to fully understand their vision and requirements, consistently ensuring high satisfaction with the final product.
  `

  protected WorkBullet3: string = `
  Contributed to projects for UTS Philippines Inc., Flake Farmville Corp., and multiple partner companies, supporting both development and creative requirements across teams and regions.
||Spearheaded a modern and visually distinct UI design for the UTS 2.0 Portal, incorporating glassmorphism, dynamic backgrounds, animation sequences, multi-theme support, and consistent UI styling across modules.
||Led the full redesign and reconstruction of the company website—replicating an inaccessible WordPress design and transforming it into a scalable, fully customizable Angular application.
||Assisted backend developers by providing HTML/CSS guidance, quick UI fixes, and support in repetitive SQL tasks to improve team efficiency.
||Adopted and mastered new corporate production tools, including TechSmith Camtasia for polished video editing and TechSmith SnagIt for fast, professional screenshot documentation.
||Created structured wireframes using Balsamiq Wireframes, leveraging component templates to streamline layout planning and communication with stakeholders.
||Used advanced AI upscaling tools (Seedream 4) and image-generation models (Google Nanobanana, Reve , and others via LMArena) to enhance visual assets and improve the quality of marketing materials.
||Expanded expertise in AI-driven voice production, creating custom locally trained voice models using Applio’s RVC (Retrieval-Based Voice Conversion) and experimenting with F5-TTS and E2-TTS for high-quality video voice-overs.
||Utilized Suno AI for music generation to produce custom backing tracks, including themes derived from the official company chime, for demonstration videos.
||Collaborated closely with the Marketing Team, producing a wide range of creative materials such as brochures, promotional videos, ID and uniform designs, logos, letterheads, business cards, investor presentation refinements, and organizational charts.
||Managed the official YouTube channel for content publishing and provided visual recommendations for the company’s Facebook presence.
||Supported external partner companies linked to the CEO, including Falcon Training Services (Selangor, Malaysia), Lautan Tenang Jaya Safety Training (Jakarta, Indonesia), and Oppr.ai (Zuid-Holland, Netherlands)—by producing high-quality presentations, graphics, and video content, enabling collaboration with international teams.
  `

  protected softwareTags: string = `
  Visual Studio ||
  Sourcetree ||
  Github ||
  Confluence ||
  Jira ||
  Microsoft Teams ||
  Discord
  `
}

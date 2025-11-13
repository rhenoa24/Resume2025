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
  To be added...
  `
}

import { Component } from '@angular/core';

interface PortfolioItem {
  title: string;
  category: 'web' | 'motion' | 'illustration';
  description?: string;
  type: 'image' | 'video';
  src: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: false,
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})

export class PortfolioComponent {

  filter: 'all' | 'web' | 'motion' | 'illustration' = 'all';

  items: PortfolioItem[] = [
    { title: 'United Training Services External Website', category: 'web', description: 'Responsive website design.', type: 'image', src: 'portfolio/uts-external.png' },
    { title: 'UTS 2.0 Portal', category: 'web', description: 'Responsive website design.', type: 'image', src: 'portfolio/uts2.png' },
    { title: 'ME-ICT Website', category: 'web', description: 'Responsive website design.', type: 'image', src: 'portfolio/meict.png' },
    //{ title: 'Motion Project 1', category: 'motion', description: 'Animated explainer video.', type: 'video', src: 'assets/videos/motion1.mp4' },
    //{ title: 'Illustration 1', category: 'illustration', description: 'Character illustration.', type: 'image', src: 'assets/images/illustration1.jpg' },
    // Add more items here
  ];

  setFilter(category: 'all' | 'web' | 'motion' | 'illustration') {
    this.filter = category;
  }

  get filteredItems() {
    return this.filter === 'all' ? this.items : this.items.filter(i => i.category === this.filter);
  }

}

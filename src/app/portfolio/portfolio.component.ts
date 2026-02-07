import { Component } from '@angular/core';

type PortfolioCategory =
  | 'web'
  | 'graphics'
  | 'motion'
  | 'illustration';

interface PortfolioItem {
  title: string;
  category: PortfolioCategory;
  description: string;
  type: 'image' | 'video';
  src: string;
}

interface PortfolioFilter {
  label: string;
  value: 'all' | PortfolioCategory;
}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  standalone: false,
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {

  filter: 'all' | PortfolioCategory = 'all';

  filters: PortfolioFilter[] = [
    { label: 'All', value: 'all' },
    { label: 'Web Design', value: 'web' },
    { label: 'Graphic Design', value: 'graphics' },
    { label: 'Motion Graphic', value: 'motion' },
    { label: 'Illustration', value: 'illustration' }
  ];

  items: PortfolioItem[] = [
    {
      title: 'United Training Services External Website',
      category: 'web',
      description: 'Redesigned and developed the official UTS website using Blazor.',
      type: 'image',
      src: 'portfolio/uts-external.png'
    },
    {
      title: 'UTS 2.0 Portal',
      category: 'web',
      description: 'Enterprise Angular SaaS platform focused on asset management.',
      type: 'image',
      src: 'portfolio/uts2.png'
    },
    {
      title: 'ME-ICT Website',
      category: 'web',
      description: 'Modern corporate website designed and built with Angular.',
      type: 'image',
      src: 'portfolio/meict.png'
    },
    {
      title: 'Data Defenders Website',
      category: 'web',
      description: 'Multi-page corporate website developed using Blazor.',
      type: 'image',
      src: 'portfolio/dd.png'
    }
  ];

  setFilter(value: 'all' | PortfolioCategory): void {
    this.filter = value;
  }

  get filteredItems(): PortfolioItem[] {
    if (this.filter === 'all') {
      return this.items;
    }

    return this.items.filter(item => item.category === this.filter);
  }

  trackByTitle(index: number, item: PortfolioItem): string {
    return item.title;
  }
}

import { Component } from '@angular/core';
import { Modal } from 'bootstrap';

type PortfolioCategory =
  | 'web'
  | 'graphics'
  | 'motion'
  | 'illustration';

interface PortfolioItem {
  title: string;
  category: PortfolioCategory;
  description: string;
  link?: string;
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
    //{ label: 'Graphic Design', value: 'graphics' },
    { label: 'Motion Graphic', value: 'motion' },
    //{ label: 'Illustration', value: 'illustration' }
  ];

  items: PortfolioItem[] = [
    {
      title: 'United Training Services External Website',
      category: 'web',
      link: 'https://uts.com.ph/',
      description: 'Redesigned and developed the official UTS website using Blazor.',
      src: 'portfolio/uts-external.png'
    },
    {
      title: 'UTS 2.0 Portal',
      category: 'web',
      link: 'https://uts2-prod-app-service.azurewebsites.net/',
      description: 'Enterprise Angular SaaS platform focused on asset management.',
      src: 'portfolio/uts2.png'
    },
    {
      title: 'ME-ICT Website',
      category: 'web',
      link: 'https://me-ict.com/',
      description: 'Modern corporate website designed and built with Angular.',
      src: 'portfolio/meict.png'
    },
    {
      title: 'Data Defenders Website',
      category: 'web',
      link: 'https://data-defenders.com/',
      description: 'Multi-page corporate website developed using Blazor.',
      src: 'portfolio/dd.png'
    },

    //

    {
      title: 'How to upload certificates through the E-Sea Mobile App',
      category: 'motion',
      description: 'https://youtube.com/watch?v=AM1zNu8hqFw',
      src: 'portfolio/vid-a.jpg'
    },
    {
      title: 'Introducing the E-Sea Mobile App',
      category: 'motion',
      description: 'https://youtube.com/watch?v=N5csRAGKc_0',
      src: 'portfolio/vid-b.jpg'
    },
    {
      title: 'Introduction to UTS Platform',
      category: 'motion',
      description: 'https://youtube.com/watch?v=0Lu6E4aNhMI',
      src: 'portfolio/vid-c.jpg'
    },
    {
      title: 'Training Center Compliance Management Software',
      category: 'motion',
      description: 'https://youtube.com/watch?v=TQdPooUjRfU',
      src: 'portfolio/vid-d.jpg'
    },
    {
      title: 'UTS Promotional Video',
      category: 'motion',
      description: 'https://youtube.com/watch?v=Ah7cQc5t_4M',
      src: 'portfolio/vid-e.jpg'
    },
    {
      title: 'UTS Introduction',
      category: 'motion',
      description: 'https://youtube.com/watch?v=pIPOnw-pqz8',
      src: 'portfolio/vid-f.jpg'
    },
  ];

  setFilter(value: 'all' | PortfolioCategory): void {
    this.filter = value;
    window.setTimeout(() => {
      this.scrollTo();
    })
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


  //=========================================================

  selectedItem: PortfolioItem | null = null;
  private modalInstance?: Modal;

  portfolioClick(item: PortfolioItem): void {
    if (item.category === 'motion') {
      window.open(item.description, '_blank');
      return;
    }
    if (item.category === 'web') {
      window.open(item.link, '_blank');
      return;
    }

    this.selectedItem = item;
    this.openModal();
  }

  openModal(): void {
    const modalElement = document.getElementById('portfolioModal');
    if (!modalElement) return;

    this.modalInstance = new Modal(modalElement);
    this.modalInstance.show();
  }

  // ========================================================================================================================

  protected scrollTo(id: string = 'portfolio') {
    //this.currentScroll = id

    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  // ========================================================================================================================
  //Default dialog size
  protected isModalMaximized: boolean = false;

  protected MaxModal_Toggle(): void {
    this.isModalMaximized = !this.isModalMaximized;
  }

  protected Reset(): void {
    this.isModalMaximized = false;
  }

}

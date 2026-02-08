import { Component, ElementRef, ViewChild } from '@angular/core';
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
  gallery?: string[];
  modalWidth?: string;
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

    //

    {
      title: 'UTS Official Brochures',
      category: 'graphics',
      description: 'Printed brochures given out during events.',
      src: 'portfolio/brochure-1a.png',
      gallery: [
        'portfolio/brochure-1b.png',
        'portfolio/brochure-2a.png',
        'portfolio/brochure-2b.png',
        'portfolio/brochure-3a.png',
        'portfolio/brochure-3b.png',
        'portfolio/brochure-4a.png',
        'portfolio/brochure-4b.png',
      ],
      modalWidth: 'modal-lg'
    },

    {
      title: 'UTS Official Standees',
      category: 'graphics',
      description: 'Printed standees in display during events.',
      src: 'portfolio/poster-1.png',
      gallery: [
        'portfolio/standee-1.png',
        'portfolio/standee-2.png',
        'portfolio/standee-3.png',
        'portfolio/standee-3a.png',
        'portfolio/standee-3b.png',
        'portfolio/irl-2.jpg',
        'portfolio/irl-3.jpg',
        'portfolio/irl-4.jpg',
      ],
      modalWidth: 'modal-m'
    },

    {
      title: 'Flake Farmville Graphic Designs',
      category: 'graphics',
      description: 'Assorted materials requested by the client.',
      src: 'portfolio/card.png',
      gallery: [
        'portfolio/map.png',
        'portfolio/map-2.png',
        'portfolio/farm-1.png',
        'portfolio/farm-2.png',
        'portfolio/farm-4.png',
        'portfolio/farm-5.png',
        'portfolio/farm-6.png',
        'portfolio/farm-7.png',
        'portfolio/farm-8.png',
      ],
      modalWidth: 'modal-lg'
    },

    {
      title: 'Assorted Logo and Merch made under ME-ICT',
      category: 'graphics',
      description: 'Ask and you shall receive... whatever that is.',
      src: 'portfolio/logo-1.png',
      gallery: [
        'portfolio/shirt-1.png',
        'portfolio/shirt-2.png',
        'portfolio/irl-5.gif',
        'portfolio/irl-1.jpeg',
        'portfolio/logo-2.png',
        'portfolio/logo-7.png',
        'portfolio/sign.png',
        'portfolio/merch-1.png',
        'portfolio/merch-2.png',
        'portfolio/merch-3.png',
        'portfolio/logo-3.png',
        'portfolio/logo-4.png',
        'portfolio/logo-5.png',
        'portfolio/logo-6.png',
        'portfolio/shirt-3.png',
        'portfolio/irl-6.jpg',
      ],
      modalWidth: 'modal-lg'
    },

    //

    {
      title: 'DataShield',
      category: 'web',
      description: 'My first UI/UX work experience.',
      src: 'portfolio/dd/banner.png',
      gallery: [
        'portfolio/dd/dashboard-new.png',
        'portfolio/dd/dashboard-new-dark.png',
        'portfolio/dd/admin-new.png',
        'portfolio/dd/admin-new-dark.png',
        'portfolio/dd/map-new.png',
        'portfolio/dd/map-new-dark.png',
        'portfolio/dd/login-new.png',
        'portfolio/dd/login-new-dark.png',
        'portfolio/dd/deviceInsight-new.png',
        'portfolio/dd/deviceInsight-new-dark.png',
        'portfolio/dd/incident-new.png',
        'portfolio/dd/incident-new-dark.png',
        'portfolio/dd/riskRegister-new.png',
        'portfolio/dd/riskRegister-new-dark.png',
      ],
      modalWidth: 'modal-xl'
    },

    {
      title: 'DataShield Changelog',
      category: 'graphics',
      description: 'Dynamic designs based on holidays.',
      src: 'portfolio/dd/changelog.png',
      gallery: [
        'portfolio/dd/xmas.png',
        'portfolio/dd/newYear.png',
        'portfolio/dd/valentines.png',
        'portfolio/dd/mothersDay.png',
        'portfolio/dd/fathersDay.png',
        'portfolio/dd/july4.png',
        'portfolio/dd/thanksgiving.png',
      ],
      modalWidth: 'modal-xl'
    },

    {
      title: 'DataShield Diagrams',
      category: 'graphics',
      description: 'Redesigning oldschool diagrams with a sleek new look.',
      src: 'portfolio/dd/diagrams.png',
      gallery: [
        'portfolio/dd/diagram1.png',
        'portfolio/dd/diagram2.png',
        'portfolio/dd/diagram3.png',
        'portfolio/dd/diagram4.png',
        'portfolio/dd/diagram6.png',
      ],
      modalWidth: 'modal-xl'
    },

    //

    {
      title: 'Portfolio Website 2024',
      category: 'web',
      link: 'https://rhenoa24.github.io/Resume/',
      description: 'My first GitHub Page project.',
      src: 'portfolio/resume-2024.png'
    },

    {
      title: 'Rhenoa24\'s Official Website',
      category: 'web',
      link: 'https://rhenoa24.carrd.co/',
      description: 'Used for art commissions and my artist profile back in the day.',
      src: 'portfolio/carrd.png'
    },

    {
      title: 'Recent Personal Works',
      category: 'illustration',
      description: 'A bunch of fan art over here.',
      src: 'art/banner.png',
      link: 'https://www.pixiv.net/en/users/7158905'
    },


    {
      title: 'Commissioned VTuber Logos',
      category: 'illustration',
      description: 'Designs that show personality.',
      src: 'art/logo-banner.png',
      gallery: [
        'art/logo-a.png',
        'art/logo-b.png',
        'art/logo-c.png',
        'art/logo-d.png',
        'art/logo-e.png',
        'art/logo-f.png',
        'art/logo-g.png',
        'art/logo-h.png',
        'art/logo-i.png',
        'art/logo-j.png',
        'art/logo-k.png',
        'art/logo-l.png',
        'art/logo-m.png',
        'art/logo-n.png',
      ],
      modalWidth: 'modal-lg'
    },

    {
      title: 'Art Commission Showcase',
      category: 'illustration',
      description: 'A small collection of various commissioned work.',
      src: 'art/illust.png',
      link: 'https://rhenoa24-gallery.carrd.co/#illust'
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

  portfolioClick(item: PortfolioItem): void {
    if (item.category === 'motion') {
      window.open(item.description, '_blank');
      return;
    }
    if (item.link) {
      window.open(item.link, '_blank');
      return;
    }


    this.selectedItem = item;
  }

  getModalTarget(item: PortfolioItem): string | null {
    if (item.category === 'motion' || item.link) {
      return null;
    }
    return '#portfolioModal';
  }

  get modalImages(): string[] {
    if (!this.selectedItem) {
      return [];
    }

    const { category, src, gallery } = this.selectedItem;

    if (gallery?.length) {
      return [src, ...gallery];
    }

    return [src];
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

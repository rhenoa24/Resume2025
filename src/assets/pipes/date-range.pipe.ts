import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateRange',
  standalone: false,
})
export class DateRangePipe implements PipeTransform {

  transform(start: Date | string, end?: Date | string | null): string {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();

    const startText = this.formatDate(startDate);
    const endText = end ? this.formatDate(endDate) : 'Present';

    const duration = this.getDuration(startDate, endDate);

    return `${startText} - ${endText} (${duration})`;
  }

  private formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  private getDuration(start: Date, end: Date): string {
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    if (end.getDate() < start.getDate()) {
      months--;
      if (months < 0) {
        years--;
        months += 12;
      }
    }

    const parts: string[] = [];

    if (years > 0) {
      parts.push(`${years} year${years > 1 ? 's' : ''}`);
    }

    if (months > 0) {
      parts.push(`${months} month${months > 1 ? 's' : ''}`);
    }

    //if (years > 0) {
    //  parts.push(`${years}y`);
    //}

    //if (months > 0) {
    //  parts.push(`${months}m`);
    //}

    return parts.length ? parts.join(', ') : 'Less than 1 month';
  }
}

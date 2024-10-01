import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core'
import { ScaledTextService } from './scaled-text.service'
import { ReplaySubject } from 'rxjs'

@Component({
  selector: 'app-scaled-text',
  standalone: true,
  imports: [],
  providers: [ScaledTextService],
  templateUrl: './scaled-text.component.html',
  styleUrl: './scaled-text.component.scss',
})
export class ScaledTextComponent implements OnChanges {
  constructor(private service: ScaledTextService) {}

  @ViewChild('textElement', { static: false }) textElement?: ElementRef

  @Input() text?: string

  viewInitRelay = new ReplaySubject()

  ngAfterViewInit() {
    this.viewInitRelay.next(null)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('text' in changes) {
      // Wait for the element to re-render with the new text before triggering the re-scaling of the font size.
      this.viewInitRelay.subscribe(() => {
        setTimeout(() => {
          this.service.scaleFontSize(this.textElement)
        }, 20)
      })
    }
  }

  onResize() {
    this.service.scaleFontSize(this.textElement)
  }
}

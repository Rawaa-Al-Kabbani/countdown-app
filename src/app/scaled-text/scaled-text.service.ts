import { ElementRef, Injectable } from '@angular/core'

@Injectable()
export class ScaledTextService {
  scaleFontSize(textElement?: ElementRef): any {
    if (!textElement) {
      return
    }
    const { nativeElement } = textElement
    const parent = nativeElement.parentElement.parentElement.parentElement
    const computedFontSize = window.getComputedStyle(nativeElement).fontSize
    const currentFontSize = parseFloat(computedFontSize.substring(0, computedFontSize.length - 2))
    const multiplier = parent.clientWidth / nativeElement.clientWidth
    const newFontSize = Math.floor(multiplier * currentFontSize)
    nativeElement.style.fontSize = `${newFontSize}px`
  }
}

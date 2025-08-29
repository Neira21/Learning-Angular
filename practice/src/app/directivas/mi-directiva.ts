import {
  Directive,
  Input,
  OnInit,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appMiDirectiva]',
  standalone: true,
})
export class MiDirectiva implements OnInit, OnDestroy {
  @Input() appMiDirectiva: 'small' | 'medium' | 'large' = 'small';
  private resizeListener?: () => void;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.updateView();
    this.resizeListener = () => this.updateView();
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy(): void {
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  private updateView(): void {
    const width = window.innerWidth;
    this.viewContainer.clear();

    if (this.shouldShowContent(width)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  private shouldShowContent(width: number): boolean {
    if (this.appMiDirectiva === 'small' && width < 600) return true;
    if (this.appMiDirectiva === 'medium' && width >= 600 && width <= 1024)
      return true;
    if (this.appMiDirectiva === 'large' && width > 1024) return true;
    return false;
  }
}

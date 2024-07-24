import { trigger, state, style, transition, animate } from '@angular/animations';

export const fadeInAnimation = trigger('fadeIn', [
  state('void', style({
    opacity: 0
  })),
  transition(':enter', [
    animate('1s ease-in')
  ])
]);
export const fadeInAnimationForComponent = trigger('fadeInComponents', [
    state('void', style({
      opacity: 0
    })),
    transition(':enter', [
      animate('3s ease-in')
    ])
  ]);
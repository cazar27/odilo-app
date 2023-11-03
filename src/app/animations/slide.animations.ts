import { animate, animateChild, group, query, style, transition, trigger } from "@angular/animations";

export const slideInAnimation =
  trigger('routeAnimations', [
    transition(':increment', slideTo()),
    transition(':decrement', slideTo())
  ]);

function slideTo() {
  return [
    query(':enter',
      [
        style({ opacity: 0, position: 'absolute', left: 'calc( 50% - 20rem )', top: 0})
      ],
      { optional: true }
    ),

    query(':leave',
      [
        style({ opacity: 1 }),
        animate('0.5s', style({ opacity: 0 },))
      ],
      { optional: true }
    ),

    query(':enter',
      [
        style({ opacity: 0, position: 'absolute', left: 'calc( 50% - 20rem )', top: 0 }),
        animate('0.5s', style({ opacity: 1}))
      ],
      { optional: true }
    ),
  ]
}

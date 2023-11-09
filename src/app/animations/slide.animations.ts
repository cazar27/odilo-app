import { animate, query, style, transition, trigger } from "@angular/animations";

export const fadeInAnimation =
  trigger('routeAnimations', [
    transition(':increment', [
      query(':enter',
        [
          style({ opacity: 0 }),
          animate('0.5s', style({ opacity: 1 })),
        ],
        { optional: true }
      ),
    ]),
    transition(':decrement', [
      query(':enter',
        [
          style({ opacity: 0 }),
          animate('0.5s', style({ opacity: 1 })),
        ],
        { optional: true }
      ),
    ]),
  ]);

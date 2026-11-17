# 11. Motion

**11.1 Durations and easing** (Default) [M3-MOTION A]
- Material 3 durations: short 50 to 200ms (small utility transitions; selection controls 200ms), medium 250 to 400ms (moves across a medium area), long 450 to 600ms (large expressive transitions), extra long 700 to 1000ms (rare, ambient, no user input).
- CSS easing: standard `cubic-bezier(0.2, 0, 0, 1)` for small transitions; emphasized decelerate `cubic-bezier(0.05, 0.7, 0.1, 1)` for entering; emphasized accelerate `cubic-bezier(0.3, 0, 0.8, 0.15)` for exiting.
- M3 Expressive components now use spring physics; the duration and easing system still works for transitions but is no longer maintained.

**11.2 Reduced motion and flashing** (Hard: the flashing bullet; Strong: the rest) [APPLE-A11Y A, WCAG-C39 S-AAA, WCAG-2.3.1 S]
- Honour `prefers-reduced-motion` on the web and Reduce Motion on Apple platforms.
- When reduced: fades instead of slides and zooms, springs without bounce, no animated blur or depth, fewer automatic and repetitive animations [APPLE-A11Y A].
- Hard, Level A: nothing flashes more than three times in any one second, in any mode (2.3.1). W3C exempts flashes under its general and red flash thresholds, which depend on the flashing area and luminance and cannot be judged from code: report what flashes faster than that and say the thresholds were not measured. The simple way to pass is not to flash.

# Motion [M3-MOTION]

Durations (ms): short 50, 100, 150, 200; medium 250, 300, 350, 400; long 450, 500, 550, 600; extra long 700, 800, 900, 1000. Examples: selection controls 200 ms standard; FAB to sheet 400 ms emphasized; card to full screen 500 ms emphasized; ambient carousel 1000 ms.

Easing: standard `cubic-bezier(0.2, 0, 0, 1)`; standard decelerate `cubic-bezier(0, 0, 0, 1)`; standard accelerate `cubic-bezier(0.3, 0, 1, 1)`; emphasized decelerate (enter) `cubic-bezier(0.05, 0.7, 0.1, 1)`; emphasized accelerate (exit) `cubic-bezier(0.3, 0, 0.8, 0.15)`; emphasized: no CSS equivalent, use standard.

M3 Expressive components now use spring physics; durations and easing still apply to transitions but are no longer maintained.

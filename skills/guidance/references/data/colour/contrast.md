# Contrast of two colours, by hand [WCAG-1.4.3]

1. Each channel c (0 to 255): v = c / 255; linear = v / 12.92 if v <= 0.04045, else ((v + 0.055) / 1.055) ^ 2.4.
2. Luminance L = 0.2126 R + 0.7152 G + 0.0722 B (linear values).
3. Ratio = (lighter L + 0.05) / (darker L + 0.05). Show the working and round down: 4.499 fails 4.5.

This is arithmetic done by hand: say so when you report ratios, and name the pairs within 0.3 of their threshold so the user can verify those themselves.

Keep the work small: compute each colour's luminance once and keep it in a working table of colours and luminances, then every ratio is one division. A colour used on several surfaces only needs checking against the surface closest to it in luminance: the others have more contrast.

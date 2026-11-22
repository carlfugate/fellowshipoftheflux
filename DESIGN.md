# Fellowship of the Flux

The visual reference is a dog-eared electronics field manual. The homepage introduces the people and the work. The library functions as an index. Articles and organizer information favor uninterrupted reading.

- Use paper (#f4f4f2), near-black ink (#20221e), muted graphite and copper-orange (#ff7446). Use ink text on copper buttons. Use underlined links in prose. Dark mode reverses paper and ink while preserving the copper action color.
- Use the local system sans for headings and body, with a monospace face for technical metadata. Display titles scale from 54 to 104 px, section titles from 32 to 56 px. Body text is at least 16 px, with a reading measure near 68 characters.
- Build from a 4 px spacing unit. The outer margin scales from 20 to 64 px. Center the page inside a 1280 px maximum. Hairline rules separate index entries. Photos retain their documentary color and have visible captions when context adds meaning.
- Give each introduction one filled action. Use a plain underlined link for a secondary action. Use arrows to indicate a destination, a visible underline for the current section, and text labels on controls. Keep focus rings visible, controls at least 44 px tall and body contrast at least 4.5:1.
- Collapse split layouts at 760 px and navigation at 920 px. Stack text before photography on phones. Keep the host action accessible inside the mobile menu. Preserve semantic headings, keyboard access, system theme preference and a manual theme toggle.
- Use short color transitions for hover. Avoid motion on initial paint. Honor reduced motion and let all navigation and content work without external scripts.

## Visual design for lessons and workshops

The repository already has 26 photographs. The homepage uses a close-up to show what the Fellowship does. The largest gap is one click later, when a beginner reaches “Inspect Your Work” and needs to recognize a good joint. Start there.

### What the references show

- Adafruit puts the ideal joint and specific faults in the same troubleshooting guide. That gives a learner a reference for comparison at the moment of inspection. Use this pattern with original examples from the Fellowship bench. [Common Soldering Problems](https://learn.adafruit.com/adafruit-guide-excellent-soldering/common-problems)
- SparkFun isolates individual concepts such as a node, a connected crossing and a disconnected crossing before asking readers to interpret a circuit. For the LED project, use the same component identifiers in the parts list, schematic and assembly instructions so readers can follow one part across all three. [How to Read a Schematic](https://learn.sparkfun.com/tutorials/how-to-read-a-schematic/all)
- W3C pairs a short description of a complex image with an adjacent explanation that conveys its essential information. Give the flasher schematic a readable connection list so readers can follow the circuit with a screen reader or at high zoom. [Complex Images](https://www.w3.org/WAI/tutorials/images/complex/)

### First implementation pass

| Priority and placement | Visual and editorial direction | Acceptance check |
|---|---|---|
| 1 · First lesson, step 5 | Photograph a sound through-hole joint, a bridge and insufficient wetting at the same scale and angle. Put each name beneath its crop. Add one leader line and a sentence describing the visible clue and the next check. | An instructor verifies all three examples under #13. On a phone, each crop stays with its label. A first-time learner can point out the bridge and explain the clue. |
| 2 · Host a workshop, before package comparison | Start with the existing workshop-stations-wide photograph. Check whether a station, instructor position and participant work area are identifiable. If so, pair the photo with a three-item caption keyed to those details. If the frame is too busy, take a new wide shot from the organizer’s viewpoint. | An organizer can identify what arrives and picture how people use the space. Confirm equipment and capacity claims under #8. Keep the inquiry action and package comparison easy to reach. |
| 3 · LED flasher, circuit schematic | Draw an original schematic from the instructor-verified build. Pair it with a top-down photo of that same board. Match identifiers for the timer, LED and timing components across both figures and the parts list. | Under #13, trace each labeled connection against the working board. Provide a full-size view and a text connection list. Check pin numbers and polarity at phone width and in both themes. |

### Production and review

Use the existing documentary photos for people, place and workshop scale. Select photos by inspecting their contents and confirming publication permission. Capture new close-ups when an existing photo cannot show the relevant detail. Keep reference publishers’ images out of the asset bundle unless separately licensed.

Keep captions and keys as selectable HTML. Use a short alt description for each informative image, and identify features with letters or words as well as color. Use responsive WebP for photos and an editable vector source for the schematic. Reserve image dimensions and lazy-load below-the-fold figures. Review a 390 px phone render, a desktop render and the page with images unavailable. Record the instructor or organizer’s feedback and a screenshot in the implementation ticket.

Keep the selected Soft neutral background and copper action color. The first review can be a single finished comparison figure in the first lesson. Use that result to decide how much photography and annotation the remaining lessons need.

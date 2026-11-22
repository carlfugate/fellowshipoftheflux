---
title: "SMD Soldering Basics"
date: 2024-01-01T00:00:00Z
draft: false
description: "Practice surface mount device (SMD) soldering with instructor guidance"
difficulty: "intermediate"
duration: "60 minutes"
tools_required:
  - "Temperature-controlled soldering station, iron and stand"
  - "Safety glasses and task-appropriate fume extraction"
  - "Iron tip selected by the instructor for the task"
  - "Tweezers (fine-tip)"
  - "Magnifying glass or microscope"
materials_required:
  - "SMD practice board"
  - "Components selected by the instructor for the practice board"
  - "Solder selected for the board and components with the instructor"
  - "Flux selected for the board, components and solder"
learning_objectives:
  - "Practice handling and placing instructor-selected SMD components"
  - "Observe or practice instructor-demonstrated soldering techniques"
  - "Follow the approved flux and cleanup instructions for the materials"
  - "Recognize visible concerns and ask for instructor guidance"
prerequisites:
  - "Proficiency with through-hole soldering"
  - "Understanding of component polarity"
  - "Basic knowledge of PCB layouts"
tags: ["tutorial", "soldering", "smd", "surface-mount", "intermediate"]
categories: ["tutorials"]
tutorial_type: "step-by-step"
progress_tracking: true
---

## Overview

Surface Mount Device (SMD) soldering is essential for modern electronics. This tutorial teaches you the techniques needed to work with small components and fine-pitch ICs commonly found in today's circuits.

## Learning Objectives

By the end of this tutorial, you will be able to:
- Handle and place SMD components selected for the exercise
- Practice the demonstrated technique with instructor guidance
- Recognize visible concerns and ask for instructor guidance before rework
- Apply flux effectively for SMD work

## Prerequisites

Before starting this tutorial, you should:
- Be proficient with through-hole soldering
- Understand component orientation and polarity
- Have completed our [Basic Through-Hole Soldering](/learn/tutorials/basic-through-hole-soldering/) tutorial

## Safety Considerations

### Before you begin

- Follow the project, solder and station makers' instructions and your venue's safety procedures. Ask an instructor to confirm the setup before starting.
- Use purpose-designed fume extraction or local exhaust selected for the materials and room; position it as directed by its maker. Do not rely on a room fan as a substitute for source capture.
- Wear eye protection, use the iron's stable stand, and keep food and drinks out of the work area. Avoid touching your face while working and wash your hands with soap and water after soldering. Follow the venue's cleanup and waste procedures. If lead-containing materials are present, follow the instructor's lead-handling instructions.
- Freshly soldered leads and boards can remain hot after the iron is removed. Do not touch them until the instructor confirms they have cooled.
- Review the material safety information and venue cleanup and waste procedures with your instructor.

See [RPI's soldering safety guidance](https://ehs.rpi.edu/lab-research-shop-safety/soldering-safety-guidelines) and the [EPA's lead-exposure precautions for hobbies](https://www.epa.gov/lead/reduce-risk-lead-exposure-home). These general sources do not replace instruction for the specific room and materials.

## Step-by-Step Instructions

### Step 1: Workspace Preparation

Set up your workspace for precision SMD work:

1. **Set up magnification** as recommended by the instructor for the component and board
2. **Optimize lighting** - Bright, shadow-free illumination
3. **Organize components** - Use component trays or tape
4. **Prepare the project-specified flux** according to its maker and instructor
5. **Choose the station setting** with the instructor, using the station, tip, solder and component makers' instructions. Do not assume a single setting works for every combination.
6. **Confirm the board is disconnected from power** before soldering.

**Pro tip:** Good lighting and magnification are crucial for SMD success.

### Step 2: Component Handling Techniques

Learn to handle tiny SMD components safely:

1. **Use tweezers** selected for the components and task
2. **Pick up components** by the body, not the terminations
3. **Practice placement** without solder first
4. **Use component orientation** - note polarity markers and follow the manufacturer and instructor handling instructions for sensitive ICs
5. **Work slowly** - rushing leads to dropped components

**Component sizes:**
- **0805**: 2.0mm × 1.25mm (easiest to start with)
- **0603**: 1.6mm × 0.8mm (intermediate difficulty)
- **0402**: 1.0mm × 0.5mm (advanced)

### Step 3: Pad Preparation and Tinning

Prepare PCB pads for component placement:

1. **Prepare the pads** using only the method approved by the board and material makers and your instructor
2. **Apply thin flux layer** to all pads
3. **Pre-tin one pad** of each component footprint
4. **Use minimal solder** - just enough to coat the pad
5. **Keep iron tip clean** throughout the process

**Why pre-tin?** Pre-tinning one pad allows you to tack the component in place before soldering the second pad.

### Step 4: Component Placement and Tacking

Place and secure your first SMD component:

1. **Heat the pre-tinned pad** with your iron
2. **Slide component into position** using tweezers
3. **Remove iron while holding component** in place
4. **Check alignment** before proceeding
5. **Ask the instructor before adjusting**; do not reheat until directed

**Alignment tips:**
- Component should be centered on pads
- No overhang on either side
- Terminations should contact both pads

### Step 5: Completing the Joint

Solder the remaining termination:

1. **Apply flux** to the unsoldered pad, as specified for the materials
2. **Heat pad and component** simultaneously
3. **Feed solder** to create proper joint
4. **Remove solder first**, then iron
5. **Inspect joint** under magnification
6. **Ask the instructor to check both terminations** and direct any touch-up

If solder does not flow as demonstrated, stop and ask the instructor rather than continuing to heat the joint.

For a first visual check, look for solder that visibly wets the pad and component termination, and check for unintended connections between adjacent pads. Expected appearance depends on the solder alloy, component and board design; do not use gloss alone as a pass/fail test. Follow the instructor's project-specific acceptance criteria.

### Step 6: Drag Soldering Technique

Learn drag soldering for fine-pitch ICs:

This is an instructor-led technique. Follow the process and tip demonstrated for the specific IC and board.

1. **Have the instructor identify the IC pin-one mark and matching board orientation** before placement
2. **Align the leads and have the instructor confirm the placement**
3. **With the instructor's setup and demonstration, tack opposite corner pins** to hold the IC in position
4. **Return the iron to its stand** while the instructor checks alignment
5. **Apply the project-specified flux to the remaining pin row**, then tin the approved tip immediately before the drag pass
6. **With the instructor's demonstration, drag the iron across the remaining pins** using the approved process

Drag soldering can leave bridges or other defects. Inspect each connection under the magnification recommended by the instructor and ask for a check before powering the board.

### Step 7: Cleaning and Inspection

Complete your work with proper finishing:

1. **Clean flux residue only if needed**, using a method approved for the flux, board and components by their makers and your instructor
2. **Inspect all joints** under magnification
3. **Check for bridges** between adjacent pins
4. **Verify component orientation** and placement
5. **Check continuity only as directed by the instructor**, with the board disconnected from power

## Troubleshooting

### Common SMD Problems and Solutions

**Solder Bridges**
- *What to check:* Look for an unintended connection between adjacent pads or leads.
- *Next step:* Keep the board disconnected from power and ask the instructor to assess and direct any repair.

**Tombstoning**
- *What to check:* One end of a component may lift from its pad.
- *Next step:* Ask the instructor to assess it and direct any rework.

**Component Drift**
- *What to check:* A component may no longer align with its pads.
- *Next step:* Ask the instructor to assess it before reheating or repositioning.

**Poor wetting, cracks, or other joint concerns**
- *What to check:* Look for poor visible wetting or a crack; appearance alone cannot establish cause or reliability.
- *Next step:* Ask the instructor to assess the joint and direct any rework.

**Lifted Pads**
- *What to check:* Stop if a copper pad looks loose or separated.
- *Next step:* Keep the board disconnected from power and have the instructor assess it. A jumper repair requires a verified circuit path and experienced direction.

## End the session

Return the iron to its stand, then turn off the station using its instructions and the venue procedure. Let the board and components cool before handling or storing them.

## Advanced Techniques

### Hot Air Soldering

Hot-air work involves additional burn, fire, fume and component-damage risks. Learn and perform it only with an instructor, purpose-built equipment and the approved process for the board and materials.

### Reflow Soldering

Reflow work requires an approved process and equipment selected for the materials and assembly. It is outside this introductory lesson; follow qualified instruction and the manufacturers' process guidance.

## Practice Exercises

1. **Solder 10 resistors** in the package size selected by the instructor for the practice board
2. **Try another component size** only after the instructor approves the board and technique
3. **Practice an SOIC-8 IC** using the instructor-approved method
4. **Attempt finer-pitch packages** only with instructor approval and suitable equipment
5. **Build an instructor-approved simple SMD circuit**

## Next Steps

After mastering SMD basics:
- Try Advanced SMD Techniques
- Build SMD Practice Projects
- Learn about Reflow Soldering
- Explore PCB Design for SMD

## Assessment Questions

Test your SMD knowledge:

1. Why should magnification be selected for the component and board?
2. What should you do before soldering if component alignment or orientation is uncertain?
3. What can visible wetting and an adjacent-pad check tell you, and what can they not establish?
4. Why might one pad be pre-tinned during the demonstrated placement process?
5. What should you do if you see a solder bridge?

Practice these techniques after reviewing the fundamentals in the [through-hole soldering lesson](/learn/tutorials/basic-through-hole-soldering/).

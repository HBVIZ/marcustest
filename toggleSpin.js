export function toggleSpin(object, spinTimeline, updateButtonClass, button, axis = 'x', direction = 1, durationAccel = 0.5, durationDecel = 0.5, durationLoop = 0.5) {
    const isActive = spinTimeline.isActive();
    const isPaused = spinTimeline.paused();
  
    // Sanitize inputs
    if (!['x', 'y', 'z'].includes(axis)) {
      console.warn(`Invalid axis "${axis}" passed to toggleSpin. Defaulting to 'x'.`);
      axis = 'x';
    }
    direction = Math.sign(direction) || 1; // Ensure it's either -1 or 1
  
    const currentRotation = object.rotation[axis];
  
    if (isActive || !isPaused) {
      // Decelerate: rotate a little more then stop
      spinTimeline
        .clear()
        .to(object.rotation, {
          [axis]: currentRotation + direction * Math.PI / 2,
          duration: durationDecel,
          ease: "power1.out",
          onComplete: () => {
            spinTimeline.pause();
            updateButtonClass("idle", button);
          }
        })
        .play();
  
      updateButtonClass("decelerating", button);
  
    } else {
      // Accelerate into seamless infinite spin
      spinTimeline
        .clear()
        .to(object.rotation, {
          [axis]: currentRotation + direction * Math.PI,
          duration: durationAccel,
          ease: "power1.in"
        })
        .to(object.rotation, {
          [axis]: `+=${direction * Math.PI * 2}`,
          duration: durationLoop,
          ease: "linear",
          repeat: -1
        })
        .play();
  
      updateButtonClass("spinning", button);
    }
  }
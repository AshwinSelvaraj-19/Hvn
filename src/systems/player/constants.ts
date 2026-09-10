/**
 * Tunable player + camera constants. All gameplay tuning lives here so
 * the controllers never hard-code numbers.
 */
export const PLAYER = {
  /** Walk speed in units/second. */
  walkSpeed: 4.0,
  /** Sprint speed in units/second (Shift while moving). */
  sprintSpeed: 6.6,
  /** Camera height above the player's feet. */
  eyeHeight: 1.6,
  /** Player collision radius (circle footprint). */
  radius: 0.35,
  /** How fast velocity approaches its target (higher = snappier). */
  acceleration: 10,
  /** Mouse look sensitivity (radians per pixel). */
  mouseSensitivity: 0.003,
  /** Vertical camera orbit limits: min slightly below, max high above. */
  pitchMin: -0.25,
  pitchMax: 1.15,
  /** Starting camera elevation. */
  defaultPitch: 0.22,
  /** Third-person camera orbit distance from the player. */
  cameraDistance: 4.8,
  /** How quickly the follow camera settles (higher = tighter). */
  cameraSmoothing: 6,
  /** Ignore click-to-lock requests within this window after exiting
   *  pointer lock (the browser rejects re-locks issued too quickly). */
  relockCooldownMs: 1500,
} as const
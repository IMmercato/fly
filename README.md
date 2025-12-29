# FLY

A World War II-inspired flight simulator built with Three.js. Take control of a biplane and survive an intense aerial combat scenario while shooting down enemy aircraft and naval vessels. You're accompanied by two wingmen who follow your lead and help keep you in the fight.

## Game Features

- **Realistic Flight Physics**: Experience momentum-based flight with altitude management, stall mechanics, and gravity effects
- **Combat Action**: Engage enemy Corsair fighters and destroy naval ships with your wing-mounted guns
- **AI Opponents**: Enemy aircraft use intercept and circling tactics to take you down
- **Allied Wingmen**: Two friendly aircraft fly in formation with you and provide tactical support
- **Dynamic Environment**: Fly over a realistic water surface with clouds, falling mines, and a starfield backdrop
- **HUD & Radar**: Monitor your speed, altitude, ship hits, and nearby aircraft on the radar display
- **Explosive Combat**: Watch ships and planes explode with particle effects when hit

## Controls

| Control | Action |
|---------|--------|
| **W/S** | Increase/Decrease throttle |
| **Arrow Up/Down** | Pitch (nose up/down) |
| **Arrow Left/Right** | Yaw (turn left/right) |
| **A/D** | Roll (bank left/right) |
| **Spacebar** | Fire guns |

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Setup

1. Clone the repository:
```bash
git clone <your-repository-url>
cd fly
```

2. Install dependencies:
```bash
npm install
```

3. Start the local server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Tips for Survival

- **Maintain altitude**: Flying too low will cause you to crash into the sea
- **Manage your speed**: Too slow and you'll stall; maintain throttle for maneuverability
- **Watch the radar**: Red dots are enemies, cyan dots are your wingmen
- **Avoid mines**: Black cylindrical mines fall from the sky - keep your distance
- **Hit and run**: Don't try to dogfight all enemies at once - use speed to your advantage
- **Target ships**: Rack up ship hits for points by strafing the naval fleet

## Technology Stack

- **Three.js r128**: 3D graphics rendering
- **Express.js**: Simple web server
- **JavaScript**: Game logic and controls
- **CSS3**: UI styling

## License

MIT License - see [LICENSE](LICENSE) file for details

## Credits

Created by Imesh (IMmercato)
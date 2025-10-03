# **App Name**: Mandala Path

## Core Features:

- Puzzle Board: Display a grid/board with concentric rings containing geometric or symbolic segments.
- Ring Rotation: Allow the player to rotate or swap rings to align patterns and symbols using intuitive touch or click gestures.
- Mandala Completion: Each puzzle has a target configuration stored in Firestore. Detect when the current alignment matches the solution and activate the mandala with glowing animation and sound.
- Cultural Insight Generation: After solving a mandala, trigger an API call to an LLM (OpenAI/Vertex AI) to generate a Sanskrit shloka with English meaning or a cultural fact. Cache insights in Firestore for faster retrieval.
- User Authentication: Implement Firebase Authentication to allow users to sign in with Google.
- Progress Saving: Use Firestore to save user progress, unlocked mandalas, and best solve times
- Realtime Leaderboard: Create both global and friends leaderboards sorted by fastest completion time and fewest moves, using Firebase Realtime DB.
- Feedback: Add subtle haptic feedback/vibration on correct ring alignment and soft ambient music with user controls.

## Style Guidelines:

- Primary color: Gold (#D4AF37), representing divinity and enlightenment.
- Background color: Deep indigo (#283593), creating a mystical and immersive atmosphere. Heavily desaturated.
- Accent color: Saffron (#FF6F00), used for interactive elements and highlights to symbolize courage and sacrifice.
- Headline font: 'Playfair', a modern serif with a fashionable and elegant feel.
- Body font: 'PT Sans', a humanist sans-serif that is highly readable.
- Use symbolic icons related to the Pancha Mahabhutas (fire, water, earth, air) and mythic animals.
- Incorporate smooth animations for ring rotations and mandala activations, creating a meditative experience.
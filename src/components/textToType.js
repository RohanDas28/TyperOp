const paragraphs = [
    'In the heart of the bustling city, where dreams meet reality, a young artist paints strokes of hope on the canvas of life.',
    'Amidst the chaos, a lone tree stands tall, symbolizing resilience and the strength to weather life’s storms.',
    'The laughter of children echoes through the narrow streets, a testament to the enduring spirit of joy in simplicity.',
    'As the sun sets, casting a warm glow on the horizon, a community comes together, sharing stories that bridge generations.',
    'In the quiet corners, an old bookstore cradles the wisdom of ages, inviting seekers to lose themselves in the magic of written words.',
    'A small café, with the aroma of freshly brewed coffee, becomes a haven for introspection and the birthplace of friendships.',
    'Through the bustling market, where vendors weave tales of craftsmanship, the pulse of a city beats with the rhythm of shared aspirations.',
    'In the silence of a park, where time slows down, lovers carve promises into the bark of a tree, binding their destinies.',
    'Beyond the skyscrapers, a river flows, carrying with it the whispers of dreams and the reflections of a city that never sleeps.',
    'Underneath the city lights, a street musician plays a melody that resonates with the dreams and desires of those passing by.',
    'In the midst of challenges, the spirit of community prevails, reminding us that together, we can build bridges over the divides.',
    'A garden blooms in the heart of an urban jungle, a living testament to the beauty that can thrive in unexpected places.',
    'Within the pages of a worn-out journal, a poet scribbles verses that capture the essence of human experience and the dance of emotions.',
    'On the walls of a street, vibrant murals tell the stories of a neighborhood, celebrating diversity and the tapestry of cultures.',
    'As night falls, the city skyline transforms into a canvas of lights, each twinkle a symbol of dreams pursued and destinies intertwined.',
    'Beneath the surface, a subway system carries people from different walks of life, connecting their stories in the vast web of urban existence.',
    'In the embrace of a public park, families gather for picnics, weaving memories that will be passed down through generations.',
    'Through the lens of a camera, a photographer captures fleeting moments, freezing time and preserving the soul of the city.',
    'In the heartbeat of a city, where the rhythm of life is felt, there lies a tapestry woven with the threads of countless stories.'
  ];
  
  export const getRandomParagraph = () => {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    return paragraphs[randomIndex];
  };
  
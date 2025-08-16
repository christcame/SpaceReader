

import type { FontOption, BackgroundOption } from './types';

export const DEFAULT_STORY = `Barkley was a golden retriever of impeccable breeding and even more impeccable manners. His days were a rhythmic waltz of morning walks, mid-day naps on a sunbeam, and evenings spent retrieving tennis balls for a boy named Leo. Life was good, filled with the simple pleasures of belly rubs and the smell of roasting chicken. But then, the world shifted. A new baby arrived, and with it, a chaos that Barkley could not understand. The walks grew shorter, the belly rubs ceased, and his prized tennis ball was chewed to a slobbery pulp by a teetotaling infant. One rainy afternoon, a new fence went up, and Barkley, in a moment of puppy-like rebellion, decided to see what was on the other side. He never found his way back. Days turned into weeks. The soft beds and bowls of kibble were replaced by cold alleys and the scrounging for scraps. His golden coat became matted and dirty, and his once-unshakeable optimism faded into a weary pragmatism. He learned to be a survivor. He learned the value of a perfectly timed sprint past a street vendor and the art of looking particularly pathetic to a kind-hearted stranger. But kindness, he found, was a finite resource. One night, shivering beneath a cardboard box, he watched a news report flickering from a laundromat window. It was a story about the city's largest bank, which had just installed a state-of-the-art security system. The anchor described it as "impenetrable." Barkley watched as a sleek, silver vault door was showcased, its hinges as wide as his head. A new thought, both audacious and desperate, began to form in his mind. He spent the next few weeks casing the place. He discovered the janitor’s routine, the precise moment the security guard changed shifts, and the fact that the bank's ventilation system was conveniently located at dog-level. His plan was simple and relied on his most innate skill: retrieving. On the night of the heist, Barkley donned a pair of old thermal socks he had "borrowed" from a clothesline, pulling them over his paws to muffle his movements. He slipped through the ventilation duct, the metallic scent of dust and desperation filling his nostrils. Inside, the bank was a maze of desks and empty cubicles, but Barkley moved with the silent focus of a predator. He located the vault, a massive thing of steel and secrets. The anchor had been right; it was impenetrable. But Barkley's plan wasn't to break in. It was to use the bank's own systems against it. He found the tellers' stations and, with a few well-placed nudges, sent a stack of loose bills fluttering to the floor. The bills, he knew, would trigger the motion sensors he had seen earlier in the week, but not the vault's alarm system. The security camera, however, would still see everything. A few minutes later, the alarm blared. Barkley, his mission complete, trotted back through the vents, a single dollar bill clutched triumphantly in his mouth. He was a retriever, after all. The next morning, the headlines screamed, "Mystery Thief Steals a Single Dollar from the First National Bank." The police, baffled, scoured the building for a clue, finding only a few small, muddy paw prints leading away from the ventilation shaft. Barkley, meanwhile, sat on a sunny park bench, a warm bagel in his paws. He was a bank robber now, a criminal mastermind, and he had learned that the difference between a dog on the street and a dog with a purpose was often just a matter of a few well-chosen moves.`;

export const FONT_OPTIONS: FontOption[] = [
    // Monospace Fonts
    { name: 'Roboto Mono', value: "'Roboto Mono', monospace" },
    { name: 'Space Mono', value: "'Space Mono', monospace" },
    
    // Sans-serif Fonts
    { name: 'Inter', value: "'Inter', sans-serif" },
    { name: 'Open Sans', value: "'Open Sans', sans-serif" },
    { name: 'Lato', value: "'Lato', sans-serif" },
    { name: 'Montserrat', value: "'Montserrat', sans-serif" },
    { name: 'Oswald', value: "'Oswald', sans-serif" },
    { name: 'Source Sans 3', value: "'Source Sans 3', sans-serif" },
    { name: 'Raleway', value: "'Raleway', sans-serif" },
    { name: 'PT Sans', value: "'PT Sans', sans-serif" },

    // Serif Fonts
    { name: 'Merriweather', value: "'Merriweather', serif" },
    { name: 'Playfair Display', value: "'Playfair Display', serif" },
    { name: 'Lora', value: "'Lora', serif" },
    { name: 'Bitter', value: "'Bitter', serif" },
    { name: 'Arvo', value: "'Arvo', serif" },
    { name: 'Crimson Text', value: "'Crimson Text', serif" },
    { name: 'EB Garamond', value: "'EB Garamond', serif" },
    { name: 'Noticia Text', value: "'Noticia Text', serif" },
    { name: 'Alegreya', value: "'Alegreya', serif" },
    { name: 'Domine', value: "'Domine', serif" },
    { name: 'Vollkorn', value: "'Vollkorn', serif" },
    { name: 'Cardo', value: "'Cardo', serif" },


    // Handwritten Fonts
    { name: 'Shadows Into Light', value: "'Shadows Into Light', cursive" },
    { name: 'Architects Daughter', value: "'Architects Daughter', cursive" },
    { name: 'Caveat', value: "'Caveat', cursive" },
    { name: 'Patrick Hand', value: "'Patrick Hand', cursive" },
    { name: 'Indie Flower', value: "'Indie Flower', cursive" },
    { name: 'Gochi Hand', value: "'Gochi Hand', cursive" },
    { name: 'Kalam', value: "'Kalam', cursive" },
    { name: 'Dancing Script', value: "'Dancing Script', cursive" },
];

export const BACKGROUND_OPTIONS: BackgroundOption[] = [
    { name: 'Deep Space', gradient: 'linear-gradient(170deg, #030426 0%, #080D42 50%, #0F0F26 100%)', shadowColor: 'rgba(0, 0, 0, 0.75)' },
    { name: 'Emerald Sea', gradient: 'radial-gradient(circle, #013220, #025940, #038060)', shadowColor: 'rgba(0, 0, 0, 0.75)' },
    { name: 'Cosmic Fusion', gradient: 'linear-gradient(135deg, #1c0f3a, #4a1c59, #87255B, #B42C4B)', shadowColor: 'rgba(0, 0, 0, 0.75)' },
    { name: 'Midnight Dusk', gradient: 'linear-gradient(to top, #2c3e50, #34495e, #2c3e50)', shadowColor: 'rgba(0, 0, 0, 0.75)' },
    { name: 'Sunset Blaze', gradient: 'linear-gradient(45deg, #e67e22, #d35400, #c0392b, #8e44ad)', shadowColor: 'rgba(0, 0, 0, 0.75)' },
    { name: 'Oceanic Wonder', gradient: 'linear-gradient(180deg, #000046, #1CB5E0, #000046)', shadowColor: 'rgba(0, 0, 0, 0.75)' },
];
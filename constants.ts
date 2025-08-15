
import type { FontOption, BackgroundOption } from './types';

export const DEFAULT_STORY = `
The crash left them on an island no map had ever recorded, a sun-bleached expanse of sand and silent palms.
Eleanor, the older sister, clung to a piece of fuselage, while her brother, Finn, stared blankly at the wreckage.
Their shared history was a fragile thing, fractured by years of unspoken resentments and distance.
Now, with no one else to turn to, that distance evaporated, replaced by a suffocating, inescapable intimacy.
Each day was a battle against the elements and against the ghosts of their past.
Finn, once the irresponsible younger brother, became the provider, hunting for meager food and freshwater.
Eleanor, who had always been a protector, found herself relying on him completely, a role reversal that chafed at her pride.
They spoke little, their communication shifting to a silent language of shared survival.
A single glance across the smoky fire conveyed more than a year of conversation had ever managed.
They were two halves of a whole, forged by circumstance, their shared existence on the island blurring the lines of their relationship.
As the weeks turned into months, they became something new and unnamed, their bond a tangled knot of love, dependency, and desperation.
The island was their prison, but it was also their world, and in its solitude, they found a connection that was both beautiful and terrifying.
`;

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
    { name: 'Deep Space', color: '#000000' },
    { name: 'Emerald Sea', color: '#013220' },
    { name: 'Cosmic Fusion', color: '#1c0f3a' },
    { name: 'Midnight Dusk', color: '#2c3e50' },
    { name: 'Sunset Orange', color: '#e67e22' },
    { name: 'Ocean Deep', color: '#000046' },
];

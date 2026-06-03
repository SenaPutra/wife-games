import type { GeneratorDefinition, ItemDefinition, ItemType, RenovationTask, StoryScene } from './gameTypes';

export const itemChains: Record<ItemType, ItemDefinition[]> = {
  coffee: [
    { type: 'coffee', level: 1, name: 'Coffee Bean', icon: '🫘', value: 3 },
    { type: 'coffee', level: 2, name: 'Espresso', icon: '☕', value: 8 },
    { type: 'coffee', level: 3, name: 'Latte', icon: '🥛', value: 18 },
    { type: 'coffee', level: 4, name: 'Fancy Latte', icon: '🌸', value: 40 },
    { type: 'coffee', level: 5, name: 'Royal Coffee', icon: '👑', value: 90 },
  ],
  sandwich: [
    { type: 'sandwich', level: 1, name: 'Bread', icon: '🍞', value: 3 },
    { type: 'sandwich', level: 2, name: 'Toast', icon: '🥖', value: 8 },
    { type: 'sandwich', level: 3, name: 'Sandwich', icon: '🥪', value: 18 },
    { type: 'sandwich', level: 4, name: 'Club Sandwich', icon: '🥗', value: 40 },
    { type: 'sandwich', level: 5, name: 'Deluxe Sandwich', icon: '🍱', value: 90 },
  ],
  dessert: [
    { type: 'dessert', level: 1, name: 'Sugar', icon: '🧂', value: 3 },
    { type: 'dessert', level: 2, name: 'Cookie', icon: '🍪', value: 8 },
    { type: 'dessert', level: 3, name: 'Cake', icon: '🍰', value: 18 },
    { type: 'dessert', level: 4, name: 'Fancy Cake', icon: '🧁', value: 40 },
    { type: 'dessert', level: 5, name: 'Celebration Cake', icon: '🎂', value: 90 },
  ],
  seafood: [
    { type: 'seafood', level: 1, name: 'Fish', icon: '🐟', value: 4 },
    { type: 'seafood', level: 2, name: 'Grilled Fish', icon: '🍢', value: 10 },
    { type: 'seafood', level: 3, name: 'Seafood Plate', icon: '🍤', value: 22 },
    { type: 'seafood', level: 4, name: 'Premium Seafood', icon: '🦞', value: 48 },
    { type: 'seafood', level: 5, name: 'Ocean Feast', icon: '🌊', value: 105 },
  ],
};

export const generators: GeneratorDefinition[] = [
  { id: 'coffeeMachine', name: 'Coffee Machine', icon: '☕', description: 'Brews level 1 coffee items.', outputTypes: ['coffee'] },
  { id: 'bakeryOven', name: 'Bakery Oven', icon: '🔥', description: 'Bakes bread or sweet starters.', outputTypes: ['sandwich', 'dessert'] },
  { id: 'fishCrate', name: 'Fish Crate', icon: '🧊', description: 'Delivers fresh Marina Bay seafood.', outputTypes: ['seafood'] },
];

export const customerPool = [
  { name: 'Poppy', avatar: '🧒' },
  { name: 'Captain Rue', avatar: '🧑‍✈️' },
  { name: 'Aunt Mina', avatar: '👒' },
  { name: 'Festival Scout', avatar: '🎪' },
  { name: 'Dock Artist', avatar: '🎨' },
];

export const renovationTasks: RenovationTask[] = [
  { id: 'signboard', title: 'Fix broken signboard', description: 'Replace the suspiciously snapped cafe sign.', cost: 2, unlocksStoryId: 'scene-sign' },
  { id: 'floor', title: 'Clean cafe floor', description: 'Scrub away sand, syrup, and one dramatic footprint.', cost: 3, unlocksStoryId: 'scene-floor' },
  { id: 'counter', title: 'Repair coffee counter', description: 'Make the counter sturdy enough for gossip and espresso.', cost: 4, unlocksStoryId: 'scene-counter' },
  { id: 'decor', title: 'Add seaside wall decor', description: 'Hang cheerful art over the ominous scratch marks.', cost: 5, unlocksStoryId: 'scene-decor' },
  { id: 'table', title: 'Upgrade outdoor table', description: 'Prepare a festival-ready patio with maximum charm.', cost: 6, unlocksStoryId: 'scene-table' },
];

export const storyScenes: StoryScene[] = [
  {
    id: 'scene-intro',
    title: 'A Very Normal Morning',
    lines: [
      { speaker: 'Maya', text: 'New summer, new cafe, same heroic sleep deprivation.' },
      { speaker: 'Leo', text: 'Your flour delivery arrived. Also, someone wrote “close by Friday” on the invoice.' },
      { speaker: 'Maya', text: 'Cute. My first threat note has stationery.' },
    ],
  },
  {
    id: 'scene-sign',
    title: 'The Sign Points to Trouble',
    requiredTaskId: 'signboard',
    lines: [
      { speaker: 'Uncle Ben', text: 'Wind did not break that sign. Wind has better manners.' },
      { speaker: 'Maya', text: 'So we have sabotage with poor penmanship and upper body strength.' },
      { speaker: 'Leo', text: 'Nora walked by at dawn. Carrying a ladder. For... cardio?' },
    ],
  },
  {
    id: 'scene-floor',
    title: 'Footprints and Fish Tales',
    requiredTaskId: 'floor',
    lines: [
      { speaker: 'Maya', text: 'That boot print smells like sardines and bad decisions.' },
      { speaker: 'Uncle Ben', text: 'Many people smell that way before the festival.' },
      { speaker: 'Leo', text: 'Nora says her cafe has “accidentally” double-booked the judges.' },
    ],
  },
  {
    id: 'scene-counter',
    title: 'Counter Intelligence',
    requiredTaskId: 'counter',
    lines: [
      { speaker: 'Nora', text: 'Darling, unstable counters are terrible for business. Hypothetically.' },
      { speaker: 'Maya', text: 'Hypothetically, so is lurking in my doorway like a designer seagull.' },
      { speaker: 'Leo', text: 'I know too much, so I brought muffins as emotional armor.' },
    ],
  },
  {
    id: 'scene-decor',
    title: 'A Clue Behind the Decor',
    requiredTaskId: 'decor',
    lines: [
      { speaker: 'Maya', text: 'There is a festival map hidden behind this wall hook.' },
      { speaker: 'Uncle Ben', text: 'Marked with every cafe except yours. That is rude cartography.' },
      { speaker: 'Leo', text: 'The sabotage is bigger than brunch. Still mostly brunch, though.' },
    ],
  },
  {
    id: 'scene-table',
    title: 'Festival Eve',
    requiredTaskId: 'table',
    lines: [
      { speaker: 'Maya', text: 'The patio is ready. The mystery gremlin is not invited.' },
      { speaker: 'Nora', text: 'If I wanted you closed, I would use coupons, not crimes.' },
      { speaker: 'Uncle Ben', text: 'Then we find who profits from a quiet harbor.' },
    ],
  },
];

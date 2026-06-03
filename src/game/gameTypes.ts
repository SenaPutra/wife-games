export const BOARD_ROWS = 7;
export const BOARD_COLS = 9;
export const BOARD_SIZE = BOARD_ROWS * BOARD_COLS;
export const MAX_ENERGY = 60;
export const ENERGY_REGEN_MS = 20_000;

export type ItemType = 'coffee' | 'sandwich' | 'dessert' | 'seafood';
export type GeneratorType = 'coffeeMachine' | 'bakeryOven' | 'fishCrate';
export type DesignStyle = 'Cozy' | 'Modern' | 'Tropical';

export interface ItemDefinition {
  type: ItemType;
  level: number;
  name: string;
  icon: string;
  value: number;
}

export interface BoardItem extends ItemDefinition {
  id: string;
  isNew?: boolean;
  isMerging?: boolean;
}

export type BoardCell = BoardItem | null;

export interface GeneratorDefinition {
  id: GeneratorType;
  name: string;
  icon: string;
  description: string;
  outputTypes: ItemType[];
}

export interface OrderRequirement {
  type: ItemType;
  level: number;
  quantity: number;
}

export interface CustomerOrder {
  id: string;
  customerName: string;
  avatar: string;
  requirements: OrderRequirement[];
  coinReward: number;
  starReward: number;
}

export interface RenovationTask {
  id: string;
  title: string;
  description: string;
  cost: number;
  unlocksStoryId?: string;
}

export interface CompletedRenovation {
  taskId: string;
  style: DesignStyle;
}

export interface DialogueLine {
  speaker: string;
  text: string;
}

export interface StoryScene {
  id: string;
  title: string;
  requiredTaskId?: string;
  lines: DialogueLine[];
}

export interface FloatingReward {
  id: string;
  text: string;
  kind: 'coins' | 'stars' | 'energy';
}

export interface GameState {
  board: BoardCell[];
  energy: number;
  coins: number;
  stars: number;
  activeOrders: CustomerOrder[];
  completedRenovations: CompletedRenovation[];
  unlockedStorySceneIds: string[];
  readStorySceneIds: string[];
  soundEnabled: boolean;
  hasSeenTutorial: boolean;
  lastDailyRewardDate?: string;
  lastEnergyUpdate: number;
}

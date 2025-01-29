export interface Task {
    id: string;
    title: string;
    size: number;          // 1-10 scale
    currentGrowth: number;
    plantType: number;     // Visual variation
    variation: number;     // Style variation
    createdAt: number;
}

export interface AppState {
    tasks: Task[];
    currentSelectedTask: Task | null;
    isAnimating: boolean;
}

export interface UserPreferences {
    theme: 'light' | 'dark';
    soundEnabled: boolean;
    hapticFeedback: boolean;
}

export interface StorageStructure {
    tasks: Task[];
    settings?: UserPreferences;
} 
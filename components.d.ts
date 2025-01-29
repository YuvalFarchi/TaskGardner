declare module '../components/Plant' {
    import { Task } from './types';
    interface PlantProps {
        task: Task;
        width: number;
        isSelected: boolean;
        isDeleteMode: boolean;
        onPress: () => void;
    }
    export default function Plant(props: PlantProps): JSX.Element;
}

declare module '../components/WaterButton' {
    interface WaterButtonProps {
        onPress: () => void;
    }
    export default function WaterButton(props: WaterButtonProps): JSX.Element;
}

declare module '../components/DeleteButton' {
    interface DeleteButtonProps {
        isActive: boolean;
        onPress: () => void;
    }
    export default function DeleteButton(props: DeleteButtonProps): JSX.Element;
} 
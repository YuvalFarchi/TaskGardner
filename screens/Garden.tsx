import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Plant from '../components/Plant';
import WaterButton from '../components/WaterButton';
import DeleteButton from '../components/DeleteButton';
import { Task, StorageStructure } from '../types';

export default function Garden() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const navigation = useNavigation();
    const { width } = useWindowDimensions();

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const storedData = await AsyncStorage.getItem('gardenData');
            if (storedData) {
                const data: StorageStructure = JSON.parse(storedData);
                setTasks(data.tasks);
            }
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    };

    const handlePlantPress = (task: Task) => {
        if (isDeleteMode) {
            handleDeleteTask(task);
        } else {
            setSelectedTask(task);
        }
    };

    const handleDeleteTask = async (task: Task) => {
        try {
            const updatedTasks = tasks.filter(t => t.id !== task.id);
            setTasks(updatedTasks);
            await AsyncStorage.setItem('gardenData', JSON.stringify({ tasks: updatedTasks }));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleWater = async () => {
        if (!selectedTask) return;

        try {
            const updatedTasks = tasks.map(task => {
                if (task.id === selectedTask.id) {
                    return {
                        ...task,
                        currentGrowth: Math.min(task.currentGrowth + 1, task.size)
                    };
                }
                return task;
            });

            setTasks(updatedTasks);
            await AsyncStorage.setItem('gardenData', JSON.stringify({ tasks: updatedTasks }));
            setSelectedTask(null);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const calculateGridDimensions = () => {
        const itemWidth = width / 3; // 3 items per row
        return { itemWidth };
    };

    const { itemWidth } = calculateGridDimensions();

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.grid}>
                    {tasks.map(task => (
                        <Plant
                            key={task.id}
                            task={task}
                            width={itemWidth}
                            onPress={() => handlePlantPress(task)}
                            isSelected={selectedTask?.id === task.id}
                            isDeleteMode={isDeleteMode}
                        />
                    ))}
                </View>
            </ScrollView>
            {selectedTask && !isDeleteMode && (
                <WaterButton onPress={handleWater} />
            )}
            <DeleteButton
                isActive={isDeleteMode}
                onPress={() => setIsDeleteMode(!isDeleteMode)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        flexGrow: 1,
        padding: 10,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
}); 
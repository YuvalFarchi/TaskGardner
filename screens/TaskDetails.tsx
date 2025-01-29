import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types';
import Plant from '../components/Plant';
import { RootStackParamList } from '../App';

export default function TaskDetails() {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<RootStackParamList, 'TaskDetails'>>();
    const task = route.params.task;

    if (!task) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Task not found</Text>
            </View>
        );
    }

    const handleDelete = async () => {
        Alert.alert(
            'Delete Task',
            'Are you sure you want to remove this plant?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const storedData = await AsyncStorage.getItem('gardenData');
                            if (storedData) {
                                const data = JSON.parse(storedData);
                                const updatedTasks = data.tasks.filter((t: Task) => t.id !== task.id);
                                await AsyncStorage.setItem('gardenData', JSON.stringify({ ...data, tasks: updatedTasks }));
                                navigation.goBack();
                            }
                        } catch (error) {
                            console.error('Error deleting task:', error);
                            Alert.alert('Error', 'Failed to delete task');
                        }
                    },
                },
            ]
        );
    };

    const getProgressText = () => {
        const progress = Math.round((task.currentGrowth / task.size) * 100);
        return `${progress}% Grown`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.plantContainer}>
                <Plant
                    task={task}
                    width={200}
                    isSelected={false}
                    isDeleteMode={false}
                    onPress={() => {}}
                />
            </View>
            
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{task.title}</Text>
                <Text style={styles.progress}>{getProgressText()}</Text>
                <Text style={styles.details}>
                    Plant Type: {task.plantType + 1}
                </Text>
                <Text style={styles.details}>
                    Variation: {task.variation + 1}
                </Text>
                <Text style={styles.details}>
                    Created: {new Date(task.createdAt).toLocaleDateString()}
                </Text>
            </View>

            <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDelete}
            >
                <Text style={styles.deleteButtonText}>Delete Plant</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    plantContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    detailsContainer: {
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        padding: 20,
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    progress: {
        fontSize: 18,
        color: '#8B3E3E',
        marginBottom: 15,
        fontWeight: '500',
    },
    details: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
    },
    deleteButton: {
        backgroundColor: '#ff4444',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
    },
}); 
import React, { useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task, StorageStructure } from '../types';

const MAX_TASKS = 24;

export default function AddTask() {
    const [title, setTitle] = useState('');
    const navigation = useNavigation();

    const generateRandomSize = () => {
        return Math.floor(Math.random() * 10) + 1; // 1-10
    };

    const generateRandomPlantType = () => {
        return Math.floor(Math.random() * 5); // 0-4 different plant types
    };

    const generateRandomVariation = () => {
        return Math.floor(Math.random() * 3); // 0-2 variations per type
    };

    const handleCreateTask = async () => {
        if (!title.trim()) {
            Alert.alert('Error', 'Please enter a task title');
            return;
        }

        try {
            const storedData = await AsyncStorage.getItem('gardenData');
            const data: StorageStructure = storedData ? JSON.parse(storedData) : { tasks: [] };

            if (data.tasks.length >= MAX_TASKS) {
                Alert.alert('Garden Full', 'You can only have 24 tasks at a time');
                return;
            }

            const newTask: Task = {
                id: Date.now().toString(),
                title: title.trim(),
                size: generateRandomSize(),
                currentGrowth: 0,
                plantType: generateRandomPlantType(),
                variation: generateRandomVariation(),
                createdAt: Date.now(),
            };

            const updatedTasks = [...data.tasks, newTask];
            await AsyncStorage.setItem('gardenData', JSON.stringify({ ...data, tasks: updatedTasks }));
            navigation.goBack();
        } catch (error) {
            console.error('Error creating task:', error);
            Alert.alert('Error', 'Failed to create task');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter task title"
                maxLength={50}
                autoFocus
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleCreateTask}
            >
                <Text style={styles.buttonText}>Plant Task</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 15,
        marginBottom: 20,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#8B3E3E',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
}); 
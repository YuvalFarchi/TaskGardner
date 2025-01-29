import React, { useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    withSpring,
    useSharedValue,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { Task } from '../types';

interface PlantProps {
    task: Task;
    width: number;
    isSelected: boolean;
    isDeleteMode: boolean;
    onPress: () => void;
}

export default function Plant({ task, width, isSelected, isDeleteMode, onPress }: PlantProps) {
    const scale = useSharedValue(1);
    const rotation = useSharedValue('0deg');

    useEffect(() => {
        if (isDeleteMode) {
            rotation.value = withSequence(
                withTiming('-5deg', { duration: 100 }),
                withTiming('5deg', { duration: 200 }),
                withTiming('0deg', { duration: 100 })
            );
        }
    }, [isDeleteMode]);

    useEffect(() => {
        if (isSelected) {
            scale.value = withSpring(1.1);
        } else {
            scale.value = withSpring(1);
        }
    }, [isSelected]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: scale.value },
                { rotate: rotation.value },
            ],
        };
    });

    const getPlantColor = () => {
        const baseColors = [
            '#4CAF50', // Green
            '#8BC34A', // Light Green
            '#CDDC39', // Lime
            '#7CB342', // Dark Green
            '#558B2F', // Forest Green
        ];
        return baseColors[task.plantType];
    };

    const getPlantHeight = () => {
        const baseHeight = width * 0.8;
        const growthPercent = task.currentGrowth / task.size;
        return baseHeight * (0.3 + (growthPercent * 0.7)); // Start at 30% min height
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.container,
                { width, height: width },
            ]}
            activeOpacity={0.7}
        >
            <Animated.View
                style={[
                    styles.plantContainer,
                    animatedStyle,
                ]}
            >
                <View
                    style={[
                        styles.plant,
                        {
                            backgroundColor: getPlantColor(),
                            height: getPlantHeight(),
                            width: width * 0.6,
                        },
                    ]}
                >
                    {task.variation > 0 && (
                        <View
                            style={[
                                styles.variation,
                                {
                                    backgroundColor: task.variation === 1 ? '#FFF3' : '#0003',
                                },
                            ]}
                        />
                    )}
                </View>
                <View
                    style={[
                        styles.pot,
                        { width: width * 0.7 },
                    ]}
                />
            </Animated.View>
            <Text
                style={styles.title}
                numberOfLines={2}
                ellipsizeMode="tail"
            >
                {task.title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        alignItems: 'center',
    },
    plantContainer: {
        alignItems: 'center',
        flex: 1,
    },
    plant: {
        borderRadius: 20,
        marginBottom: -10,
        zIndex: 1,
    },
    variation: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 20,
    },
    pot: {
        height: 20,
        backgroundColor: '#8B3E3E',
        borderRadius: 10,
        transform: [{ scaleX: 1.2 }],
    },
    title: {
        marginTop: 5,
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        maxWidth: '100%',
    },
}); 
import React, { useEffect } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
    cancelAnimation,
    withSpring,
} from 'react-native-reanimated';

interface WaterButtonProps {
    onPress: () => void;
}

export default function WaterButton({ onPress }: WaterButtonProps) {
    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);

    useEffect(() => {
        // Start pulsing animation
        scale.value = withRepeat(
            withSequence(
                withTiming(1.1, { duration: 1000 }),
                withTiming(1, { duration: 1000 })
            ),
            -1, // Infinite repeat
            true // Reverse
        );

        return () => {
            cancelAnimation(scale);
        };
    }, []);

    const handlePress = () => {
        // Trigger press animation
        opacity.value = withSequence(
            withTiming(0.5, { duration: 100 }),
            withTiming(1, { duration: 100 })
        );
        scale.value = withSequence(
            withSpring(0.9),
            withSpring(1)
        );
        onPress();
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
            opacity: opacity.value,
        };
    });

    return (
        <TouchableOpacity
            onPress={handlePress}
            style={styles.container}
            activeOpacity={0.7}
        >
            <Animated.View style={[styles.button, animatedStyle]}>
                <View style={styles.iconContainer}>
                    <Ionicons name="water" size={24} color="#fff" />
                </View>
            </Animated.View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    iconContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
}); 
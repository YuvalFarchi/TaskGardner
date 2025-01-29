import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';

interface DeleteButtonProps {
    isActive: boolean;
    onPress: () => void;
}

export default function DeleteButton({ isActive, onPress }: DeleteButtonProps) {
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: withSpring(isActive ? 1.1 : 1),
                },
            ],
            backgroundColor: withSpring(
                isActive ? '#ff4444' : '#666666',
            ),
        };
    });

    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.container}
            activeOpacity={0.7}
        >
            <Animated.View style={[styles.button, animatedStyle]}>
                <View style={styles.iconContainer}>
                    <Ionicons
                        name={isActive ? 'close-circle' : 'trash'}
                        size={24}
                        color="#fff"
                    />
                </View>
            </Animated.View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        left: 20,
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
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
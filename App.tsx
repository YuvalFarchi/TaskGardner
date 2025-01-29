import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Garden from './screens/Garden';
import AddTask from './screens/AddTask';
import TaskDetails from './screens/TaskDetails';
import { Task } from './types';

export type RootStackParamList = {
    Garden: undefined;
    AddTask: undefined;
    TaskDetails: { task: Task };
    Details: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar style="light" />
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#8B3E3E',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            >
                <Stack.Screen 
                    name="Garden" 
                    component={Garden}
                    options={({ navigation }) => ({
                        title: 'Task Gardner',
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('AddTask')}
                                style={{ marginRight: 10 }}
                            >
                                <Ionicons name="add" size={24} color="#fff" />
                            </TouchableOpacity>
                        ),
                    })}
                />
                <Stack.Screen 
                    name="AddTask" 
                    component={AddTask}
                    options={{
                        title: 'Plant New Task',
                        presentation: 'modal',
                    }}
                />
                <Stack.Screen 
                    name="TaskDetails" 
                    component={TaskDetails}
                    options={{
                        title: 'Task Details',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
} 
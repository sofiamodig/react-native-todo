import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Feather } from '@expo/vector-icons';
import Todo from '../components/Todo';

class Home extends Component {
  state = {
    newTodoText: '',
    todos: [],
  };

  componentDidMount = () => {
    this.loadTodos();
  };

  loadTodos = async () => {
    try {
      const response = await AsyncStorage.getItem('savedTodos');
      if (response !== null) {
        let savedTodos = JSON.parse(response);
        this.setState({ todos: savedTodos });
      }
    } catch (error) {
      console.log('could not load todos');
    }
  };

  addTodo = (newTask) => {
    if (newTask.length > 0) {
      const id = Date.now();

      const item = {
        text: newTask,
        id,
        done: false,
      };

      this.setState(
        (prevState) => {
          return {
            todos: [...prevState.todos, item],
          };
        },
        () => {
          AsyncStorage.setItem('savedTodos', JSON.stringify(this.state.todos));
        },
      );
    }
  };

  removeTodo = (id) => {
    const todos = this.state.todos.filter((todo) => {
      return todo.id !== id;
    });

    this.setState(
      {
        todos,
      },
      () => {
        AsyncStorage.setItem('savedTodos', JSON.stringify(this.state.todos));
      },
    );
  };

  completeTodo = (id) => {
    const todos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          done: !todo.done,
        };
      } else {
        return todo;
      }
    });

    this.setState(
      {
        todos,
      },
      () => {
        AsyncStorage.setItem('savedTodos', JSON.stringify(this.state.todos));
      },
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.state.todos.length > 0 ? (
          <View style={styles.todos}>
            <FlatList
              data={Object.values(this.state.todos)}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Todo
                  name={item.text}
                  id={item.id}
                  removeTodo={this.removeTodo}
                  completeTodo={this.completeTodo}
                  isComplete={item.done}
                />
              )}
            />
          </View>
        ) : (
          <View style={styles.noTasks}>
            <Text style={styles.noTasksText}>
              You are done with all your tasks, wohoo!
            </Text>
            <Feather name="sun" size={60} color="#f9ea3b" />
          </View>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            this.props.navigation.navigate('AddTodo', {
              addTodo: this.addTodo,
            })
          }
        >
          <Text style={styles.buttonText}>Add new todo</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  noTasks: {
    marginVertical: 15,
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTasksText: {
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 20,
  },
  todos: {
    marginVertical: 15,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: '#557da5',
    paddingHorizontal: 15,
    paddingVertical: 20,
    alignItems: 'center',
    marginTop: 'auto',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default Home;

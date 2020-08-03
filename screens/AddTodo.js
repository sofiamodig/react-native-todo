import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

class AddTodo extends Component {
  state = {
    todo: '',
  };

  handleTodoText = (val) => {
    this.setState({ todo: val });
  };

  onAddTask = () => {
    this.props.route.params.addTodo(this.state.todo);
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Write your todo..."
          autoFocus={true}
          value={this.state.todo}
          onChangeText={(val) => this.handleTodoText(val)}
          onSubmitEditing={this.onAddTask}
        />
        <TouchableOpacity style={styles.button} onPress={this.onAddTask}>
          <Text style={styles.buttonText}>Add todo</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    borderColor: '#ccc',
    backgroundColor: '#ededed',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#557da5',
    paddingHorizontal: 15,
    paddingVertical: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default AddTodo;

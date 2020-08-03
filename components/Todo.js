import React from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Todo = ({ name, id, isComplete, removeTodo, completeTodo }) => {
  return (
    <View style={styles.todo}>
      <TouchableWithoutFeedback onPress={() => completeTodo(id)}>
        <View style={styles.todoItem}>
          {isComplete ? (
            <Feather name="check-circle" size={22} color="black" />
          ) : (
            <Feather name="circle" size={22} />
          )}
          <Text style={styles.todoText}>{name}</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableOpacity style={styles.remove} onPress={() => removeTodo(id)}>
        <Feather name="x" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  todo: {
    backgroundColor: '#ededed',
    marginVertical: 5,
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  todoItem: {
    flexDirection: 'row',
    flex: 1,
  },
  todoText: {
    fontWeight: '500',
    letterSpacing: 1,
    fontSize: 18,
    alignSelf: 'center',
    marginLeft: 10,
  },
  remove: {
    marginLeft: 40,
    alignSelf: 'center',
    width: 20,
  },
});

export default Todo;

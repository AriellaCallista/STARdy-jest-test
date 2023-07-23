import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';

import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 

const { height, width } = Dimensions.get('window');

import PropTypes from 'prop-types';

class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      todoValue: props.textValue,
    };
  }
  // in our class before we define state
  static propTypes = {
    textValue: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    inCompleteTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
  };

  state = {
    todoValue: '',
    isEditing: false,
  };

  toggleItem = () => {
    const { isCompleted, inCompleteTodo, completeTodo, id } = this.props;
    if (isCompleted) {
      inCompleteTodo(id);
    } else {
      completeTodo(id);
    }
  };

  startEditing = () => {
    this.setState({
      isEditing: true,
    });
  };

  finishEditing = () => {
    this.setState({
      isEditing: false,
    });
  };
  controlInput = (textValue) => {
    this.setState({ todoValue: textValue });
  };
  finishEditing = () => {
    const { todoValue } = this.state;
    const { id, updateTodo } = this.props;
    updateTodo(id, todoValue);
    this.setState({
      isEditing: false,
    });
  };
  render() {
    const { isEditing, todoValue } = this.state;
    const { textValue, id, deleteTodo, isCompleted } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <TouchableOpacity onPress={this.toggleItem}>
            <View
              style={[
                styles.circle,
                isCompleted ? styles.completeCircle : styles.incompleteCircle,
              ]}></View>
          </TouchableOpacity>
          {isEditing ? (
            <TextInput
              value={todoValue}
              style={[
                styles.text,
                styles.input,
                isCompleted ? styles.strikeText : styles.unstrikeText,
              ]}
              multiline={true}
              returnKeyType={'done'}
              onBlur={this.finishEditing}
              onChangeText={this.controlInput}
            />
          ) : (
            <Text
              style={[
                styles.text,
                isCompleted ? styles.strikeText : styles.unstrikeText,
              ]}>
              {textValue}
            </Text>
          )}
        </View>
        {isEditing ? (
          <View style={styles.buttons}>
            <TouchableOpacity onPressOut={this.finishEditing}>
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>✅</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.buttons}>
            <TouchableOpacity onPressOut={this.startEditing}>
              <View style={styles.buttonContainer}>
                {/* <Text style={styles.buttonText}>✏</Text> */}
                <Feather name='edit' size={20} color={'#007788'} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPressOut={() => deleteTodo(id)}>
              <View style={styles.buttonContainer}>
                {/* <Text style={styles.buttonText}>❌</Text> */}
                <MaterialIcons name="delete" size={24} color="#007788" />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },

  input: {
    marginVertical: 15,
    width: width / 2,
    paddingBottom: 5,
  },
  text: {
    fontWeight: '500',
    fontSize: 16,
    marginVertical: 20,
  },
  // Styles
  circle: {
    width: 25,
    height: 25,
    borderRadius: 15,
    // remove borderColor property from here
    borderWidth: 3,
    marginRight: 20,
    marginLeft: 10,
  },
  completeCircle: {
    borderColor: '#bbb',
  },
  incompleteCircle: {
    borderColor: '#007788',
  },

  rowContainer: {
    flexDirection: 'row',
    width: width / 2,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttons: {
    flexDirection: 'row',
  },
  buttonContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },

  // Styles

  strikeText: {
    color: '#bbb',
    textDecorationLine: 'line-through',
  },
  unstrikeText: {
    color: '#29323c',
  },
});

export default TodoItem;
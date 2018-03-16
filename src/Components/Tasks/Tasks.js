import React, { Component } from 'react';
import './tasks.css';

class Tasks extends Component {
  constructor(props) {
    super(props);
  this.state = { tasks: [], newTask: '', clickedTask: '' };
  this.tasksRef = this.props.firebase.database().ref('tasks');
  this.handleChange = this.handleChange.bind(this);
  this.createTask = this.createTask.bind(this);
  }

  componentDidMount() {
    this.tasksRef.on('child_added', snapshot => {
      const task = snapshot.val();
      task.key = snapshot.key;
      this.setState({ tasks: this.state.tasks.concat( task ) });
    });
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ newTask: event.target.value });
  }

  createTask(newTask) {
    this.tasksRef.push({ task: this.state.newTask, timeAdded: this.props.firebase.database.ServerValue.TIMESTAMP });
    this.setState({ newTask: '' });
  }

  removeTask(task) {
    this.tasksRef.child(task.key).remove();
    this.setState({ clickedTask: task, tasks: this.state.tasks.filter( task => task.key !== this.state.clickedTask.key )});
  }

  render() {
    return(
      <div className="tasks">
        <h3>Tasks</h3>
        <form className="task-form" onSubmit={() => this.createTask(this.state.newTask)}>
          <input type="text" value={this.state.newTask} placeholder="enter new task" maxlength="50"onChange={this.handleChange}/>
          <button type="submit">Enter</button>
        </form>
        <h6>Double click a task below to delete.</h6>
        {this.state.tasks.sort((a, b) => b.timeAdded > a.timeAdded).map(task =>
          <ul className="task">
            <li key={task.key} onClick={() => this.removeTask(task)}>{task.task}</li>
          </ul>
        )}
      </div>
    );
  }
}

export default Tasks;

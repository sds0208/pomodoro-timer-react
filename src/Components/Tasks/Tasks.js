import React, { Component } from 'react';

class Tasks extends Component {
  constructor(props) {
    super(props);
  this.state = { tasks: [], newTask: '' };
  this.tasksRef = this.props.firebase.database().ref('tasks');
  this.handleChange = this.handleChange.bind(this);
  this.createTask = this.createTask.bind(this);
  }

  componentDidMount() {
    this.tasksRef.on('child_added', snapshot => {
      const task = snapshot.val();
      task.key = snapshot.key;
      this.setState({ tasks: this.state.tasks.concat( task ) });
      console.log(this.state.tasks);
    });
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ newTask: event.target.value });
  }

  createTask(event) {
    event.preventDefault();
    this.tasksRef.push({ task: this.state.newTask });
    this.setState({ newTask: '' });
  }

  render() {
    return(
      <div className="tasks">
        <form className="task-form" onSubmit={this.createTask}>
          <input type="text" value={this.state.newTask} placeholder="enter new task" onChange={this.handleChange}/>
          <button type="submit">Enter</button>
        </form>
        {this.state.tasks.map(task =>
          <div className="task">
            <h5 key={task.key}>{task.task}</h5>
          </div>
        )}
      </div>
    );
  }
}

export default Tasks;

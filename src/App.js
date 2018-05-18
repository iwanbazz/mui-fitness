import React, { Component } from 'react'
import { Typography, TextField, Paper, Button, ListItem, ListItemText } from '@material-ui/core'
import List from '@material-ui/core/List'

export default class App extends Component {
  state = {
    exercises: [
      { id: 1, title: 'Bench Press' },
      { id: 2, title: 'Deadlift' },
      { id: 3, title: 'Squats' }
    ],
    title: ''
  }
  handleChange = ({
      target: {
        name,
        value
      }
    }) =>
    this.setState({
      [name]: value
    })
  handleCreate = e => {
    e.preventDefault()
    
    if (this.state.title) {
      this.setState(({ exercises, title }) => ({
        exercises: [
          ...exercises,
          {
            title,
            id: Date.now()
          }
        ],
        title: ''
      }))
    }
  }

  render() {
    const { title, exercises } = this.state
    return (
      <Paper>
      <form onSubmit={this.handleCreate}>
        <Typography variant='display1' align='center' gutterBottom>
        Exercises
        </Typography>
        <TextField
          name = 'title'
          label = 'Exercise'
          value = {title}
          onChange = {this.handleChange}
          margin = 'normal'
        />
        <Button
          type='submit'
          color='primary'
          variant='raised'
        >
          Create
        </Button>
      </form>
      <List>
        {exercises.map(({ id, title }) =>
          <ListItem key={id}>
            <ListItemText primary={title} />
          </ListItem>
        )}
      </List>
      </Paper>
    )
  }
}
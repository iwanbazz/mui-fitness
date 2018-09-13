import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography, TextField, Paper, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { createMuiTheme } from '@material-ui/core/styles'
import { orange } from '@material-ui/core/colors'

const theme = createMuiTheme({ 
  palette: {
    primary: orange
  }
 }
)
const styles = theme => console.log(theme) || {
  root: {
    margin: 20,
    padding: 20,
    maxWidth: 400
  },
  form: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-evenly'
  }
}
export default withStyles(styles)(
  class App extends Component {
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
    handleDelete = id =>
      this.setState(({ exercises }) => ({
        exercises: exercises.filter(ex => ex.id !== id)
      })
    )

    render() {
      const { title, exercises } = this.state
      const { classes } =this.props
      return (
        <Paper className={classes.root}>
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
                <ListItemSecondaryAction>
                  <IconButton
                    color='primary'
                    onClick={() => this.handleDelete(id)}
                  >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )}
          </List>
        </Paper>
      )
    }
  }
)
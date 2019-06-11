//react imports
import React from "react";
import { withStyles } from "@material-ui/styles";
import { Button, Grid, IconButton, Paper, Typography as Text } from "@material-ui/core";
import RetroCard from "../../components/RetroCard";
import { Add, Edit, Delete } from "@material-ui/icons";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: "0 25px",
  },
  columnHeader: {
    color: "#FFF",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    padding: 8,
    display: "flex",
    alignItems: "center",
  },
  arrow: {
    flex: "0 1 auto",
  },
  cardContent: {
    padding: 8,
    flex: "1 1 auto",
  },
  editButton: {
    position: "absolute",
    top: 0,
    right: 10,
  },
  addButton: {
    margin: "10px 0",
  },
});

class RetroBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          id: 0,
          name: "What Went Well",
          headerColor: "#4CAF50",
          cards: [],
        },
        {
          id: 1,
          name: "What needed improvement",
          headerColor: "#F44336",
          cards: [],
        },
        {
          id: 2,
          name: "Ideas",
          headerColor: "#3F51B5",
          cards: [],
        },
        {
          id: 3,
          name: "Action Items",
          headerColor: "#673AB7",
          cards: [],
        },
      ],
    };
  }

  componentDidMount() {
    const columns = JSON.parse(localStorage.getItem("retroBoard"));
    if (columns) {
      this.setState({ columns });
    }
  }

  componentDidUpdate() {
    const { columns } = this.state;
    localStorage.setItem("retroBoard", JSON.stringify(columns));
  }

  handlers = {
    handleAddColumn: () => {
      const { columns } = this.state;
      const randomHex = "#" + Math.floor(Math.random() * 16777215).toString(16);
      const newColumnName = window.prompt("Column Name:", `Column ${columns.length + 1}`);
      const newColumnColor = window.prompt("Column Background Color (Hexadecimal):", randomHex);
      const newColumn = {
        id: columns.length,
        name: newColumnName,
        headerColor: newColumnColor,
        cards: [],
      };

      if (newColumnName && newColumnName.length > 0) {
        columns[columns.length] = newColumn;
        this.setState({ columns });
      }
    },

    handleEditColumn: index => {
      const { columns } = this.state;
      const newColumnName = window.prompt("Column Name:", columns[index].name);
      const newColumnColor = window.prompt("Column Background Color (Hexadecimal):", columns[index].headerColor);
      if (newColumnName && newColumnName.length > 0) {
        columns[index].name = newColumnName;
        columns[index].headerColor = newColumnColor;
        this.setState({ columns });
      }
    },

    handleRemoveColumn: columnIndex => {
      const { columns } = this.state;
      columns.splice(columnIndex, 1);
      this.setState({ columns });
    },

    handleAddCard: (column, index) => {
      const { columns } = this.state;
      let total = 0;
      const totalCards = () => {
        for (var i = 0; i < columns.length; i++) {
          total = total + columns[i].cards.length;
        }
        return total;
      };
      const newCardContent = window.prompt("Card Name:", `Card ${totalCards() + 1}`);
      const newCard = {
        id: column.cards.length,
        content: newCardContent,
      };

      if (newCardContent && newCardContent.length > 0) {
        columns[index].cards.push(newCard);
        this.setState({ columns });
      }
    },

    handleEditTask: (columnIndex, cardIndex) => {
      const { columns } = this.state;
      const cardContent = columns[columnIndex].cards[cardIndex].content;
      const newTask = window.prompt("Card Name:", cardContent);

      if (newTask && newTask.length > 0) {
        columns[columnIndex].cards[cardIndex].content = newTask;
        this.setState({ columns });
      }
    },

    handleMoveTask: (card, columnIndex, cardIndex, direction) => {
      const { columns } = this.state;
      if (direction === "left") {
        columns[columnIndex - 1].cards.push(card);
      } else if (direction === "right") {
        columns[columnIndex + 1].cards.push(card);
      }
      columns[columnIndex].cards.splice(cardIndex, 1);
      this.setState({ columns });
    },

    handleRemoveTask: (columnIndex, cardIndex) => {
      const { columns } = this.state;
      columns[columnIndex].cards.splice(cardIndex, 1);
      this.setState({ columns });
    },

    handleAddVote: (columnIndex, cardIndex) => {
      const { columns } = this.state;
      let card = columns[columnIndex].cards[cardIndex];
      if (!card.votes) {
        card.votes = 0;
        card.votes += 1;
        card.hasVote = true;
      } else {
        card.votes -= 1;
        card.hasVote = false;
      }
      this.setState({ columns });
    },
  };

  render() {
    const { classes } = this.props;
    const { columns } = this.state;
    const { handleAddColumn, handleEditColumn, handleRemoveColumn, handleAddCard } = this.handlers;

    return (
      <div className={classes.root}>
        <Button color="secondary" variant="contained" onClick={() => handleAddColumn()} className={classes.addButton}>
          <Add />
        </Button>
        <Grid container direction="row" spacing={3}>
          {columns.map((column, columnIndex) => {
            return (
              <Grid key={columnIndex} item xs={3} className={classes.column}>
                <Paper id="column">
                  <Paper className={classes.columnHeader} style={{ backgroundColor: column.headerColor }}>
                    <Text align="center" className={classes.columnHeaderText}>
                      {column.name}
                    </Text>
                    <div className={classes.editButton}>
                      <IconButton aria-label="Edit" color="inherit" onClick={() => handleEditColumn(columnIndex)} size="small">
                        <Edit fontSize="inherit" />
                      </IconButton>
                      <IconButton aria-label="Delete" color="inherit" onClick={() => handleRemoveColumn(columnIndex)} size="small">
                        <Delete fontSize="inherit" />
                      </IconButton>
                    </div>
                  </Paper>
                  <RetroCard column={{ index: columnIndex, all: columns, ...column }} handlers={this.handlers} />
                </Paper>
                <Button color="secondary" variant="contained" onClick={() => handleAddCard(column, columnIndex)} className={classes.addButton}>
                  <Add />
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(RetroBoard);

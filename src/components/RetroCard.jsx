//react imports
import React from "react";
import { makeStyles } from "@material-ui/styles";
import { IconButton, Paper, Typography as Text } from "@material-ui/core";
import { ChevronLeft, ChevronRight, Edit, Delete, ThumbUp, ThumbUpOutlined } from "@material-ui/icons";

const styles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: 25,
  },
  card: {
    padding: "8px 8px 24px 8px",
    position: "relative",
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
  leftIcons: {
    position: "absolute",
    bottom: 5,
    left: 5,
  },
  rightIcons: {
    position: "absolute",
    bottom: 5,
    right: 5,
  },
}));

function KanbanCard(props) {
  const classes = styles();
  const { column, handlers } = props;
  const { handleAddVote, handleRemoveTask, handleMoveTask, handleEditTask } = handlers;
  const columnIndex = column.index;
  return column.cards.map((card, cardIndex) => {
    return (
      <Paper key={cardIndex} className={classes.card}>
        {columnIndex > 0 && (
          <IconButton onClick={() => handleMoveTask(card, columnIndex, cardIndex, "left")}>
            <ChevronLeft className={classes.arrow} />
          </IconButton>
        )}
        <Text className={classes.cardContent}>{card.content}</Text>
        {columnIndex < column.all.length - 1 && (
          <IconButton onClick={() => handleMoveTask(card, columnIndex, cardIndex, "right")}>
            <ChevronRight className={classes.arrow} />
          </IconButton>
        )}
        <div className={classes.leftIcons}>
          <IconButton aria-label="Edit" color="inherit" onClick={() => handleAddVote(columnIndex, cardIndex)} size="small">
            {card.hasVote ? <ThumbUp fontSize="inherit" /> : <ThumbUpOutlined fontSize="inherit" />}
          </IconButton>
          <Text variant="overline">{card.votes || 0}</Text>
        </div>
        <div className={classes.rightIcons}>
          <IconButton aria-label="Edit" color="inherit" onClick={() => handleEditTask(columnIndex, cardIndex)} size="small">
            <Edit fontSize="inherit" />
          </IconButton>
          <IconButton aria-label="Delete" color="inherit" onClick={() => handleRemoveTask(columnIndex, cardIndex)} size="small">
            <Delete fontSize="inherit" />
          </IconButton>
        </div>
      </Paper>
    );
  });
}

export default KanbanCard;

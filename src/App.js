import "./App.css";
import React, { useState } from "react";

function Tile(props) {
  const [done, setDone] = useState(props.todo.isCompleted);

  const addButtons = () => {
    return (
      <>
        <button
          onClick={() => {
            setDone(true);
            props.todo.isCompleted = true;
          }}
        >
          done
        </button>
        <button
          onClick={() => {
            props.remove(props.index);
          }}
        >
          x
        </button>
      </>
    );
  };

  return (
    <>
      {done ? (
        <div className="tile done">
          <p>{props.todo.text}</p>
          {addButtons()}
        </div>
      ) : (
        <div className="tile">
          <p>{props.todo.text}</p>
          {addButtons()}
        </div>
      )}
    </>
  );
}

function Display(props) {
  console.log(props.tiles);
  return (
    <div>
      {props.tiles.map((element, index) => {
        return (
          <Tile
            key={index}
            todo={element}
            index={index}
            remove={props.remove}
          />
        );
      })}
    </div>
  );
}

function Input(props) {
  const [value, setValue] = useState("");

  return (
    <>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={props.type}
      />
      <input
        type="submit"
        value="Add"
        onClick={() => {
          if (value) props.addTodo({ text: value, isCompleted: false });
          setValue("");
        }}
      ></input>
    </>
  );
}

function App() {
  const [tiles, setTiles] = useState([{ text: "example", isCompleted: false }]);

  const removeTile = (index) => {
    const newTodos = [...tiles];
    newTodos.splice(index, 1);
    setTiles(newTodos);
  };

  return (
    <div className="App">
      <h1 className="title">Todo</h1>
      <div className="label-text">
        <label>New todo:</label>
        <Input
          type={"text"}
          addTodo={(newVal) => {
            setTiles([...tiles, newVal]);
          }}
        />
      </div>
      {/* <label className="label-text">New todo:</label>
      <Input
        type={"text"}
        addTodo={(newVal) => {
          setTiles([...tiles, newVal]);
        }}
      /> */}
      <Display tiles={tiles} remove={removeTile} />
    </div>
  );
}

export default App;

import React from "react";
import Button from "./components/Button/button";

function App() {
  return (
    <div className="App">
      <Button autoFocus={true}>试试</Button>
      <Button btnType="primary">试试</Button>
      <Button
        btnType="danger"
        onClick={(e) => {
          e.preventDefault();
          alert("danger");
        }}
      >
        试试
      </Button>
      <Button btnType="danger" disabled>
        试试
      </Button>
      <Button btnType="link" href="https://www.baidu.com">
        试试
      </Button>
    </div>
  );
}

export default App;

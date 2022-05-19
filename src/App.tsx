import React from "react";
import Button from "./components/Button/button";
import Alert from "./components/Alert/alert";

function App() {
  return (
    <div className="App">
      <Button autoFocus={true}>试试</Button>
      <Button btnType="primary">试试</Button>
      <Button
        btnType="danger"
        onClick={(e) => {
          e.preventDefault();
          // alert("danger");
          return <Alert type="danger" title="this is danger" />;
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
      <Alert title="this is an alert" />
      <Alert type="danger" title="this is danger" />
      <Alert type="warning" title="this is warning" />
      <Alert type="success" closable={false} title="this is success" />
      <Alert type="success" title="我是标题" description="this is success" />
    </div>
  );
}

export default App;

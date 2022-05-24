import React from "react";
import Button from "./components/Button/button";
import Alert from "./components/Alert/alert";
import { Menu } from "./components/Menu/menu";
import { MenuItem } from "./components/Menu/menuItem";
import { SubMenu } from "./components/Menu/subMenu";

function App() {
  return (
    <div className="App">
      <Menu
        mode="vertical"
        onSelect={(index) => {
          alert(`click ${index}`);
        }}
      >
        <MenuItem>首页</MenuItem>
        <MenuItem>组件</MenuItem>
        <MenuItem>文档</MenuItem>
        <MenuItem disabled={true}>关于作者</MenuItem>
        <SubMenu title="展开">
          <MenuItem>常见问题</MenuItem>
          <MenuItem>更多</MenuItem>
        </SubMenu>
      </Menu>
      <Button autoFocus={true}>试试</Button>
      <Button btnType="primary">试试</Button>
      <Button
        btnType="danger"
        onClick={(e) => {
          e.preventDefault();
          alert("danger");
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
      <Button btnType="link" href="https://www.baidu.com" disabled={true}>
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

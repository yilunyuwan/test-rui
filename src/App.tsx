import React from "react";
import Button from "./components/Button/button";
import Alert from "./components/Alert/alert";
import { Menu } from "./components/Menu/menu";
import { MenuItem } from "./components/Menu/menuItem";
import { SubMenu } from "./components/Menu/subMenu";
import { Tabs } from "./components/Tabs/tabs";
import { TabItem } from "./components/Tabs/tabItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

function App() {
  return (
    <div className="App">
      <Tabs type="card">
        <TabItem label="选项一">
          <div>
            hadfa<span>111</span>
          </div>
        </TabItem>
        <TabItem label="选项二">内容二</TabItem>
        <TabItem label="禁用" disabled>
          disabled
        </TabItem>
        <TabItem
          label={
            <span>
              <FontAwesomeIcon icon={solid("coffee")}></FontAwesomeIcon>
              自定义选项
            </span>
          }
        >
          是不是有图标呢
        </TabItem>
      </Tabs>
      <Menu
        mode="vertical"
        onSelect={(index) => {
          alert(`click ${index}`);
        }}
        openedIndexes={["4"]}
      >
        <MenuItem>首页</MenuItem>
        <MenuItem>组件</MenuItem>
        <MenuItem>文档</MenuItem>
        <MenuItem disabled>关于作者</MenuItem>
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

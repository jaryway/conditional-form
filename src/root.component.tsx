import React, { Suspense, lazy, FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UseAPIProvider } from "@ahooksjs/use-request";
import { ConfigProvider, Tree, Spin } from "antd";
import { ConfigProvider as FreConfigProvider } from "@fregata/ui";
// import { ConfigContext } from "@fregata/ui/lib/config-provider/context";
import {
  OidcProvider,
  BaseAppProvider,
  request4useRequest,
} from "@fregata/utils";
import zhCN from "antd/lib/locale/zh_CN";
// console.log("DirectoryTree.00", Tree.DirectoryTree);
// import 'assets/less/index.less';
const isMicro = process.env.REACT_APP_RUN_MODE === "micro";

if (process.env.NODE_ENV === "development") {
  (window as any).___mockUserData = {
    grant_type: "password",
    username: "z6179@csschps",
    password: "1qaz@WSX",
  };
}

// const AppFull = lazy(() => import('./App.full'));
const App = lazy(() => import("./App"));

const RootComponent: FC<any> = (props) => {
  return (
    <ConfigProvider locale={zhCN}>
      <FreConfigProvider value={{ requestMethod: request4useRequest }}>
        <UseAPIProvider value={{ requestMethod: request4useRequest }}>
          <Router basename={isMicro ? "/encode" : undefined}>
            <OidcProvider>
              <BaseAppProvider onGlobalStateChange={props?.onGlobalStateChange}>
                <Suspense fallback={<Spin spinning={true} />}>
                  <Switch>
                    <Route path="/" component={App} />
                  </Switch>
                </Suspense>
              </BaseAppProvider>
            </OidcProvider>
          </Router>
        </UseAPIProvider>
      </FreConfigProvider>
    </ConfigProvider>
  );
};

export default RootComponent;

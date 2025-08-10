import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./store";
import routerList from "./router";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {routerList.map((item, index) => (
            <Route key={index} path={item.path} element={item.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

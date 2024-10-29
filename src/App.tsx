import React, { FC } from "react";
import Navigation from "./routes";
import { BrowserRouter } from "react-router-dom";
import Provider from "./globalState";

const App: FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider>
          <Navigation />
        </Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;

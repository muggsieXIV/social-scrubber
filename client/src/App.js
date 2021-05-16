import React from "react";
import Application from "./Application"
import {UserProvider} from "./GlobalStates/UserState"
import 'semantic-ui-css/semantic.min.css'

import "./globalstyle.css"

function App() {

  return (
    <UserProvider>
      <Application/>
    </UserProvider>
  );
}


export default App;

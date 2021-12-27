import "./assets/css/app.css";
import "./assets/css/style.css";
import "./assets/font/font.css";
import "./assets/toastr/toastr.css";
import { useEffect } from "react";
import _Nav from "./layouts/_Nav";
import _MainLayouts from "./layouts/_MainLayouts";
import Forms from "./pages/Forms";
import Routing from "./routing/routing";
import "./App.less"
import "./assets/css/home.less"
// import 'toastr/build/toastr.min.css'

 



function App() {
  return (

    <Routing />
    
    // <Routing />
    // <_MainLayouts>
    //   {/* <Forms /> */}
    // </_MainLayouts>
  );
}

export default App;

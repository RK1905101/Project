import Navbar from './component/Navbar.js';	
import './App.css';
import Footer from './component/Footer.js';
import TableBody from './component/TableBody.js';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar/>
        <TableBody/>
        <Footer/>

      </header>
    </div>
  );
}

export default App;

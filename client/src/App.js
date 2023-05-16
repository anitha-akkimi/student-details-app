import Header from "./components/header"
import AllStudentDetails from "./components/allStudentDetails";
import ListOfStudents from "./components/studentlist";
import Footer from "./components/footer";
import './App.css';

function App() {
  return (
    <>
    <Header/>
    
    <div className="container">
      <AllStudentDetails/>
      <ListOfStudents/>
      <Footer/>
    </div>
    
    </>
  );
}

export default App;

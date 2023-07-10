import './App.css';
import Title from './title'
import Table from './tableModule/table';
function App() {
  return (
    <div className="App">
      <Title/>
      <Table className='task-table'/>
    </div>
  );
}

export default App;

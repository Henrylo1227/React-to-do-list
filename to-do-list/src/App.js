import './App.css';
import Title from './component/title'
import Table from './component/tableModule/table';
function App() {
  return (
    <div className="App">
      <Title/>
      <Table className='task-table'/>
    </div>
  );
}

export default App;

import Content from './components/Content';
import Header from './components/Header';
import Total from './components/Total';
import { courseName, courseParts } from './data/Course';

const App = () => {
  return (
    <div>
      <Header courseName={courseName} />
      <Content content={courseParts} />
      <Total content={courseParts} />
    </div>
  );
};

export default App;

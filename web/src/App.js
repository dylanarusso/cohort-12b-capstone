import logo from './logo.svg';
import {useEffect, useState} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Collapse, Modal } from 'antd';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

function App() {

  const [categories, setCategories] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedQuestion, setSelectedQuestion] = useState();

  const [answers, setAnswers] = useState([]);

  const fetchCategories = async () => {
    let res = await fetch('http://localhost:3000/api/v1/categories')
    let json = await res.json();
    setCategories(json);
  };

  useEffect(() => {
    fetchCategories()
  }, [])

  const onChange = async (id) => {
    setSelectedQuestion(id)
    fetchAnswers(id)
};

const fetchAnswers = async (id) => {
  let res = await fetch(`http://localhost:3000/api/v1/questions/${id || selectedQuestion}/answers`)
  let json = await res.json();
  console.log(json)
  setAnswers(json);
};

  return (

    <div>
      
        <div className={'grid grid-cols-12'}>

            <div className={'col-span-12 border h-20 p-5 text-center bg-gray-200'}>
                <h1 className={'text-2xl font-bold'}>App Title</h1>
            </div>

            <div className={'col-span-12 sm:col-span-3 md:col-span-2 border h-96 p-5 text-center bg-gray-300'}>
              
            <ul>
                    {categories && categories.map((category) => {
                        return <li key={category.id}
                                   onClick={() => {
                                       setSelectedCategory(category.id)
                                   }}
                                   className={selectedCategory==category.id ? 'bg-gray-400 cursor-pointer p-12 border-b font-bold text-xl text-center' : 'cursor-pointer p-12 border-b font-bold text-xl text-center'}>{category.name}</li>
                    })}
                </ul>


            </div>

            <div className={'col-span-12 sm:col-span-9 md:col-span-10border h-96 p-5 text-center bg-gray-400'}>
              Box 2

            {!selectedCategory && <h1 className={'text-center text-2xl'}>Select a category to view the questions</h1>}
            {!selectedCategory && <button className={'text-white pr-4 pl-4 pt-3 bg-blue-500 rounded cursor-pointer'}>New Question</button>}

            {selectedCategory && <Collapse defaultActiveKey={['1']} onChange={onChange}>
              <Panel header="This is panel header 1" key="1">
                <p>{text}</p>
              </Panel>
              <Panel header="This is panel header 2" key="2">
                <p>{text}</p>
              </Panel>
              <Panel header="This is panel header 3" key="3">
                <p>{text}</p>
              </Panel>
              </Collapse>}

            </div>

        </div>

    </div>
  );
}

export default App;

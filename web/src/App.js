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
  const [showNewQuestion, setShowNewQuestion] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState();
  const [questions, setQuestions] = useState();

  const [answers, setAnswers] = useState([]);
  const [answerTxt, setAnswerTxt] = useState('');

  const fetchCategories = async () => {
    let res = await fetch(`http://localhost:3000/api/v1/categories`)
    let json = await res.json();
    setCategories(json);
  };

  const fetchQuestions = async () => {
    let res = await fetch(`http://localhost:3000/api/v1/categories/${selectedCategory}/questions`)
    let json = await res.json();
    console.log(json)
    setQuestions(json);
};

useEffect(() => {
  fetchCategories()
}, [])

useEffect(() => {
  if(selectedCategory){
    fetchQuestions()
  }
}, [selectedCategory])


  const onChange = async (id) => {
    setSelectedQuestion(id)
    fetchAnswers(id)
};


  const onCreateQuestion = async () => {
    console.log('creating new question')
    console.log({questionTxt: newQuestionText})
  let res = await fetch(`http://localhost:3000/api/v1/categories/${selectedCategory}/questions`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({questionTxt: newQuestionText})
    })
  let json = await res.json();
  console.log(json)
  setShowNewQuestion(false)
  fetchQuestions();
  };

const fetchAnswers = async (id) => {
  let res = await fetch(`http://localhost:3000/api/v1/questions/${id || selectedQuestion}/answers`)
  let json = await res.json();
  console.log(json)
  setAnswers(json);
};

const createAnswer = async () => {
  let res = await fetch(`http://localhost:3000/api/v1/questions/${selectedQuestion}/answers`)
  let json = await res.json();
  console.log(json)
  setAnswerTxt(json);
};

  return (


    <>

    <Modal title="New Question" visible={showNewQuestion} onOk={onCreateQuestion} onCancel={() => {setShowNewQuestion(false)}}>
        <textarea value={newQuestionText} onChange={(event) => {
            setNewQuestionText(event.currentTarget.value)
        }} placeholder={'Enter your new question'} className={'w-full border p-2'}></textarea>
    </Modal>

    <div className={'grid grid-cols-12'}>
        <div className={'col-span-12 border p-8 bg-gray-200'}>
            <h1 className={'text-center text-2xl'}>App Title</h1>

        </div>

        <div className={'col-span-12 sm:col-span-4 md:col-span-3 border'}>


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

        <div className={'col-span-12 sm:col-span-8 md:col-span-9 p-10'}>
            {!selectedCategory && <h1 className={'text-center text-2xl'}>Select a category to view the questions</h1>}
            {selectedCategory && <button onClick={() => {setShowNewQuestion(true)}} className={'text-white pr-4 pl-4 pt-3 pb-3 bg-blue-500 rounded cursor-pointer'}>New Question</button>}

            <p>Once a user clicks on a new question button above, user should be able to see the new questions form here</p>
            <p>Once the user enters the information in the form and hits submit, you should fetch the questions for the category</p>

            {selectedCategory && <Collapse onChange={onChange}>
                {questions && questions.map((question) => {
                    return <Panel header={question.questionTxt} key={question.id}>
                        <input className={'border p-2 mb-2 w-1/3 block'} type="text" placeholder={'Start typing your answer for this question'} value={answerTxt} onChange={(event) => {
                            setAnswerTxt(event.currentTarget.value)
                        }}/>

                        <button className={'text-white pr-3 pl-3 pt-2 pb-2 bg-blue-500 rounded cursor-pointer'} onClick={createAnswer}>Submit</button>

                        <p>List out all the answers for a question</p>
                        <ul>
                            {answers && answers.map((answer) => {
                                return <li>{answer.answerTxt}</li>
                            })}
                        </ul>

                    </Panel>
                })}
            </Collapse>}



        </div>

    </div>


</>

  );

}


export default App;

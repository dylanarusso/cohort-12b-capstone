import logo from './logo.svg';
import {useEffect, useState} from 'react';
import './App.css';
import 'antd/dist/antd.css';

function App() {

  const [categories, setCategories] = useState();
  const [selectedCategory, setSelectedCategory] = useState();

  const fetchCategories = async () => {
    let res = await fetch('http://localhost:3000/api/v1/categories')
    let json = await res.json();
    setCategories(json);
  };

  useEffect(() => {
    fetchCategories()
  }, [])

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
            </div>

        </div>

    </div>
  );
}

export default App;

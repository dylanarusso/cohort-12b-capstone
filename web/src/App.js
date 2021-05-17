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
  return (
    <div>
      
        <div className={'grid grid-cols-12'}>

            <div className={'col-span-12 border h-20 p-5 text-center bg-gray-200'}>
                <h1 className={'text-2xl font-bold'}>App Title</h1>
            </div>

            <div className={'col-span-12 sm:col-span-3 md:col-span-2 border h-96 p-5 text-center bg-gray-300'}>
              Box 1
            </div>

            <div className={'col-span-12 sm:col-span-9 md:col-span-10border h-96 p-5 text-center bg-gray-400'}>
              Box 2
            </div>

        </div>

    </div>

  );
}

export default App;

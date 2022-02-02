//react
import React, { useState, useRef, useEffect } from 'react';

//components
import Message from '../components/Message';

//styles
import '../assets/css/sudoku.min.css';

export default function Sudoku()
{
  
  const [sudokuData, setSudokuData] = useState([]);
  const [message, setMessage] = useState([]);
  const sudokuRef = useRef([]);
  
  const LOCAL_STORAGE_KEY = 'cf_sudoku.grid';
  const LOCAL_STORAGE_SOLVED = 'cf_sudoku.solved';

  useEffect(() => {
    const storedSudoku = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(storedSudoku)
      setSudokuData(storedSudoku);
    else
      setSudokuEmptyArray();
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sudokuData));
  }, [sudokuData]);

  useEffect(() => {
  }, [message]);

  function handleReset(e)
  {
    setSudokuEmptyArray();
  }

  function handleSubmit(e)
  {
    
    let sudokuArray = convertToMultiArray();
    if(validatePreFill(sudokuArray))
    {
      
      let count = sudokuArray.length;
      let sudokuArraySolved = solveSudoku(sudokuArray, count);

      if(!sudokuArraySolved)
      {
        const newMessage = { 
          type: 'error',
          title: "No solution found!",
          message: "Unfortunately, using the following values it's impossible to solve this Sudoku!"
        };
        setMessage(newMessage);        

        //force reload sudoku compontent
        setSudokuEmptyArray();
        const storedSudoku = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if(storedSudoku)
          setSudokuData(storedSudoku);
      }
      else
      {
        const solvedSudoku = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SOLVED));
        if(solvedSudoku)
        {
          let solvedSudokuList = convertToArray(solvedSudoku);

          setSudokuEmptyArray();
          setSudokuData(solvedSudokuList);

          const newMessage = {
            type: 'success',
            title: "This Sudoku has a solution",
            message: "It seems to be that the numbers you entered can be used in a Sudoku."
          };
          setMessage(newMessage);
        }
          
      }
        
    }
    else
    {
      const newMessage = { 
        type: 'error', 
        title: "Invalid values!", 
        message: "Unfortunately, you already broke the rules of the Sudoku (there are duplicates in the numbers you entered)" 
      };
      setMessage(newMessage);
      

      //force reload sudoku compontent
      setSudokuEmptyArray();
      const storedSudoku = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      if(storedSudoku)
        setSudokuData(storedSudoku);
    }

  }

  function convertToMultiArray()
  {
    let sudokuList = sudokuData;
    let sudokuArray = [];
    while(sudokuList.length) {
      sudokuArray = [...sudokuArray, sudokuList.splice(0,9)];
    }

    return sudokuArray;
  }

  function convertToArray(sudokuSolved)
  {
    let sudokuArray = sudokuSolved;
    let sudokuList = [].concat.apply([], sudokuArray);
    
    return sudokuList;
  }

  function validatePreFill(sudokuArray)
  {
    for(let i = 0; i < sudokuArray.length; i++)
    {
      for(let j = 0; j < sudokuArray.length; j++)
      {
        if(sudokuArray[i][j]['value'] != '')
        {
          if(!validateNumber(sudokuArray, i, j, sudokuArray[i][j]['value']))
            return false;
        }
      }
    }
    return true;
  }

  function validateNumber(sudokuArray, row, column, value)
  {
    // row already has the number ( going through the columns )
    for(let j = 0; j < sudokuArray.length; j++)
    {
      if (sudokuArray[row][j]['value'] == value && j != column)
        return false;
    }

    // column already has the number ( going through the rows )
    for(let i = 0; i < sudokuArray.length; i++)
    {
      if (sudokuArray[i][column]['value'] == value && i != row)
        return false;
    }

    let sqrt = Math.floor(Math.sqrt(sudokuArray.length));
    let blockStartRow = row - row % sqrt;
    let blockStartColumn = column - column % sqrt;
  
    for(let i = blockStartRow; i < blockStartRow + sqrt; i++)
    {
      for(let j = blockStartColumn; j < blockStartColumn + sqrt; j++)
      {
        // 3x3 block already has the number ( going through the 3x3 block )
        if (sudokuArray[i][j]['value'] == value  && j != column && i != row)
          return false;
      }
    }
  
    // number can be placed 
    return true;

  }

  function solveSudoku(sudokuArray, count)
  {
    let row = -1;
    let column = -1;
    let isCompleted = true;

    for(let i = 0; i < count; i++)
    {
      for(let j = 0; j < count; j++)
      {
        if (sudokuArray[i][j]['value'] == '')
        {
          row = i;
          column = j;

          // there are still missing numbers
          isCompleted = false;
          break;
        }
      }

      if (!isCompleted)
        break;
    }

    // all fields are completed
    if (isCompleted)
    {
      localStorage.setItem(LOCAL_STORAGE_SOLVED, JSON.stringify(sudokuArray));
      return true;
    }

    // // run backtracking
    for(let num = 1; num <= count; num++)
    {
      if (validateNumber(sudokuArray, row, column, num))
      {
        sudokuArray[row][column]['value'] = num;
        if (solveSudoku(sudokuArray, count))
          return true;
        else
        sudokuArray[row][column]['value'] = '';
      }
    }
    return false;
  }

  function setSudokuEmptyArray()
  {
    let sudokuEmpty = [];
    [...Array(81).keys()].map((value, index) => {
      sudokuEmpty = [...sudokuEmpty, {id: index, value: '', filled: false }];
    });
    setSudokuData(sudokuEmpty);
  }

  function handleChange(index)
  {
    let id = sudokuRef.current[index].id;
    let value = sudokuRef.current[index].value;
    let preFilled = true;

    if(value === '')
      preFilled = false;

    let itemId = sudokuData.findIndex(item => item.id == id );

    let sudokuTmp = [...sudokuData];
    
    if(itemId < 0)
    {
      itemId = id;
      sudokuTmp = [...sudokuTmp, { id: itemId, value: value, filled: preFilled }];
    }
    else
    {
      sudokuTmp[itemId] = { ...sudokuTmp[itemId], value: value, filled: preFilled };
    }

    setSudokuData(sudokuTmp);
  }

  return (
    <>
      <Message message={message} />
      <h1 className="page-title">Sudoku solver</h1>
      <p className="page-subtitle">Validate the Sudoku you created</p>
      <div className="sudoku-container">
        <div className="sudoku-grid">
        {
          sudokuData.map((sudoku, index) => {
            return (
              <div key={index} className="sudoku-grid-sub">
                <input
                  key={sudoku.id}
                  id={sudoku.id}
                  ref={(el) => (sudokuRef.current[index] = el)}
                  type='text'
                  onChange={() => handleChange(index)}
                  value={sudoku.value !== ''?sudoku.value:''}
                  className={sudoku.filled?'sudoku-pre-filled':''}
                  maxLength='1'
                  placeholder=' '
                  pattern="[0-9]+" />
                </div>
            );
          })
        }
        </div>
        <div className="btn-container">
          <button className="btn btn-primary" onClick={handleSubmit}>Solve it!</button>
          <button className="btn btn-tertiary" onClick={handleReset}>
            <img src={require('../assets/img/icon/icon-reset.svg').default} />
            Reset
          </button>
        </div>
      </div>
    </>
  );
}

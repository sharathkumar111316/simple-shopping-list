import React, { useState } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCircle, faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [items, setItems] = useState(
        [{itemName: 'Item 1', quantity: 1, isSelected: false},
         {itemName: 'Item 2', quantity: 1, isSelected: false},
         {itemName: 'Item 3', quantity: 1, isSelected: false},]
            );
  const [totalItemCount, setTotalItemCount] = useState(3);

  const [inputValue, setInputValue] = useState('');

  const handleAddButtonClick = () => {
    if (inputValue === '') return;
    const newItem = {
      itemName: inputValue,
      quantity: 1,
      isSelected: false,
    };
    const newItems = [...items, newItem];
    setItems(newItems);
    setInputValue('');    
    calculateTotal(newItems);
  };

  const handleQuantityIncrease = (index) => {
    const newItems = [...items];

    newItems[index].quantity++;

    setItems(newItems);

    calculateTotal(newItems);

  };

  const handleQuantityDecrease = (index) => {

    const newItems = [...items];

    if(newItems[index].quantity === 0) return ;

    newItems[index].quantity--;

    setItems(newItems);

    calculateTotal(newItems);

  };

  const toggleComplete = (index) => {
    const newItems = [...items];
    newItems[index].isSelected = !newItems[index].isSelected;
    setItems(newItems);
  };  

  const calculateTotal = (newItems) => {
    const totalItemCount = newItems.reduce((total, item) => {
      return total = total + item.quantity;
      },0);
    setTotalItemCount(totalItemCount);

  };

  return (
    <div className='app-background'>
        <div className='main-container'>
            <div className='add-item-box'>
                <input value={inputValue} onChange={(event) => setInputValue(event.target.value)} className='add-item-input' placeholder='Add an item...' />
                <FontAwesomeIcon icon={faPlus} onClick={() => handleAddButtonClick()} />
            </div>
            <div className='items-list'>
                  {items.map((item, index) => (
                        <div className='item-container'>
                        <div className='item-name' onClick={() => toggleComplete(index)}>
                              {item.isSelected ? (
                                        <>
                                          <>
                                          <FontAwesomeIcon icon={faCheckCircle} />
                                          <span className='completed'>{item.itemName}</span>
                                        </>

                                        </>
                                       ) : (
                                        <>
                                          <FontAwesomeIcon icon={faCircle} />
                                          <span>{item.itemName}</span>
                                        </>
                                       ) 
                              }
                        </div>
                        <div className='quantity'>
                              <button>
                                      <FontAwesomeIcon icon={faChevronLeft} onClick={() => handleQuantityDecrease(index)} />
                              </button>
                              <span>{item.quantity}</span>
                              <button>
                                      <FontAwesomeIcon icon={faChevronRight} onClick={() => handleQuantityIncrease(index)} />
                              </button>
                        </div>
                  </div>


                    ))}
                  
            </div>
            <div className='total'>Total: {totalItemCount}
            </div>
        </div>
    </div>
  );
}

export default App;

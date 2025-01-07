import React, { useState, useEffect } from "react";

// function MyComponent() {
//   const [count, setCount] = useState(0);

//   const handleDecrement = () => {
//     setCount((count) => count - 1);
//     setCount((count) => count - 1);
//     setCount((count) => count - 1);
//   };
//   const handleReset = () => setCount(0);
//   const handleIncrement = () => setCount(count + 1);

//   return (
//     <>
//       <p>Count: {count}</p>
//       <button onClick={handleDecrement}>-1</button>
//       <button onClick={handleReset}>Reset</button>
//       <button onClick={handleIncrement}>+1</button>
//     </>
//   );
// }

// function MyComponent() {
//   const [foods, setFoods] = useState(["Apple", "Banana", "Cherry"]);
//   const [newFood, setNewFood] = useState("");

//   const handleAddFood = () => {
//     setFoods((foods) => [...foods, newFood]);
//     setNewFood(() => "");
//   };
//   const handleRemoveFood = (index) => {
//     setFoods((foods) => foods.filter((_, i) => i !== index));
//   };

//   return (
//     <div>
//       <h2>List of Foods</h2>
//       <ul>
//         {foods.map((food, index) => (
//           <li key={index}>
//             {food}
//             <button onClick={() => handleRemoveFood(index)}>Remove</button>
//           </li>
//         ))}
//         <input
//           type="text"
//           id="foodInput"
//           placeholder="Enter food name"
//           value={newFood}
//           onChange={(e) => {
//             setNewFood((newFood) => e.target.value);
//           }}
//         />
//         <button onClick={handleAddFood}>Add Food</button>
//       </ul>
//     </div>
//   );
// }

function MyComponent() {}

export default MyComponent;

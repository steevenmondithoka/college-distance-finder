// App.jsx
import { useState } from "react";
import CollegeSelect from './pages/CollegeSelect';

export default function App() {
  const [count, setCount] = useState(0);

  return (
  
<CollegeSelect />
  );
}

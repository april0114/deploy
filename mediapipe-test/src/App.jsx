import { useState } from 'react';
import Exercise from './components/Exercise';

const App = () => {
  const [goExercise, setGoExercise] = useState(false);
  return (
    <div className="w-full">
      {goExercise ? (
        <Exercise />
      ) : (
        <section className="flex flex-col items-center gap-10 mt-20 text-center text-red-300">
          <h1>자 이제 런지 운동 시작해볼게요 !</h1>
          <h2>준비 되셨으면 아래 버튼을 눌러주세요</h2>
          <button
            className="w-32 p-4 bg-blue-400 rounded-lg"
            onClick={() => setGoExercise(true)}
          >
            운동 시작
          </button>
        </section>
      )}
    </div>
  );
};

export default App;

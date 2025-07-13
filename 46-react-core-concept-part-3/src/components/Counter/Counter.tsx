import useCounter from '../../hooks/useCounter';

export default function Counter() {
  const { count, increment, decrement } = useCounter(0);

  return (
    <>
      <p>Count: {count}</p>

      <div className="flex gap-4 py-4">
        <button onClick={increment} className="btn btn-sm btn-neutral">
          Increment
        </button>
        <button onClick={decrement} className="btn btn-sm btn-neutral">
          Decrement
        </button>
      </div>
    </>
  );
}

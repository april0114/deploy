import { useMemo } from "react";
import { useSelector } from "react-redux";

export const SqutCount = () => {
  const squtCount = useSelector(state => state.squt.count);

  return useMemo(() => (
    <div
      id="pose-label"
      style={{
        padding: '10px',
        width: 'fit-content',
        position: 'sticky',
        background: 'cadetblue',
      }}
    >
      <p id="pose-label-text">Pose: {squtCount}</p>
    </div>
  ), [squtCount]);
};
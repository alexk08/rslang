import React from 'react';
import './resultPercent.scss'

interface ResultPercentProps {
  error: number;
  correct: number
}
const ResultPercent: React.FC<ResultPercentProps> = ({error, correct}) => {
  const result = (error : number, correct : number) => {
    return (correct + error) ? Math.round(correct *100 / (correct + error)) : 0
  }
  return (
    <div className="percent">
      <div className="morph-shape" id="morph-shape"  >
        <svg xmlns="http://www.w3.org/2000/svg" transform = {`translate(0, ${110 - 1.5 * result(error, correct)})`}  width="100%" height="120%" viewBox="0 0 100 100"  preserveAspectRatio="none">
          <path fill="#00BF97" d="M 0 0 C 0 0 20 20 33 20 C 45 20 55 0 67 0 C 78 0 100 20 100 20 C 100 20 100 100 100 100 L 0 100 Z">
            <animate
              attributeName="d"
              dur="7s"
              repeatCount="indefinite"
              values="
              M 0 0 C 0 0 20 20 33 20 C 45 20 55 0 67 0 C 78 0 100 20 100 20 C 100 20 100 100 100 100 L 0 100 Z;
              M 0 20 C 0 20 20 0 33 0 C 45 0 55 20 67 20 C 77 20 100 0 100 0 C 100 0 100 100 100 100 L 0 100 Z;
              M 0 0 C 0 0 20 20 33 20 C 45 20 55 0 67 0 C 78 0 100 20 100 20 C 100 20 100 100 100 100 L 0 100 Z" />
          </path>
        </svg>
        <div className = 'result'>{`${result(error, correct)}%`}</div>
      </div>
    </div>
  )
}

export {ResultPercent};
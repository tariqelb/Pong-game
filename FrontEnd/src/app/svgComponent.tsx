// svgComponent.jsx
import React from 'react';
import './svgComponent.css';

const SvgComponent = () => {
  return (
    <div className="svg-container">
      <svg
        viewBox="0 0 1512 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="responsive-svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1512 0H0V10C0 23.2548 10.7452 34 24 34H496C535.831 34 548.912 60.6915 568.252 100.156L568.8 101.275C593.644 171.412 646.222 180 658.356 180H853.644C865.778 180 918.356 171.412 943.2 101.275L943.748 100.156C963.088 60.6915 976.169 34 1016 34H1488C1501.25 34 1512 23.2548 1512 10V0Z"
          fill="url(#paint0_linear_2538_42358)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_2538_42358"
            x1="0"
            y1="0"
            x2="1512"
            y2="2.14577e-07"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.192708" stop-color="#09152B" />
            <stop offset="1" stop-color="#1F70B7" />
          </linearGradient>
        </defs>
      </svg>
      <div className="div1">some data</div>
    </div>
  );
};

export default SvgComponent;
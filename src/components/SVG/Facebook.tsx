export const Facebook = FuncComponent;

function FuncComponent() {
  return (
    <svg
      x="0px"
      y="0px"
      viewBox="0 0 40 40"
      xmlSpace="preserve"
    >
      <style>
        {`
        .icon:hover svg .Facebook__path-1 {
          fill: url(#SVGID_FACEBOOK_);
        }

        .icon:hover svg .Facebook__path-2 {
          fill: #ffffff;
        }
      `}
      </style>
      {/* These elements won't be directly rendered; instead, they can be referenced and used elsewhere in the SVG */}
      <defs>
        {/* to create a gradient fill that transitions smoothly between colors along a straight line */}
        <linearGradient
          id="SVGID_FACEBOOK_"
          gradientUnits="userSpaceOnUse"
          x1="-277.375"
          y1="406.6018"
          x2="-277.375"
          y2="407.5726"
          // which scales and translates the gradient to fit the desired dimensions and position within the SVG canvas
          gradientTransform="matrix(40 0 0 -39.7778 11115.001 16212.334)"
        >
          {/* define the colors at specific points along the gradient line */}
          <stop offset="0" style={{ stopColor: '#0062E0' }} />
          <stop offset="1" style={{ stopColor: '#19AFFF' }} />
        </linearGradient>
      </defs>
      <path
        d="M16.7,39.8C7.2,38.1,0,29.9,0,20C0,9,9,0,20,0s20,9,20,20c0,9.9-7.2,18.1-16.7,19.8l-1.1-0.9h-4.4L16.7,39.8z"
        className="Facebook__path-1 Facebook__fill fill-white"
      />
      <path
        d="M27.8,25.6l0.9-5.6h-5.3v-3.9c0-1.6,0.6-2.8,3-2.8h2.6V8.2c-1.4-0.2-3-0.4-4.4-0.4c-4.6,0-7.8,2.8-7.8,7.8V20h-5v5.6h5v14.1c1.1,0.2,2.2,0.3,3.3,0.3c1.1,0,2.2-0.1,3.3-0.3V25.6H27.8z"
        className="Facebook__path-2 Facebook__fill fill-black"
      />
    </svg>
  );
}

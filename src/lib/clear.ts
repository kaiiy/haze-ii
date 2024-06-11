const BLINK_STYLE = {
  animation: "blink 3s infinite",
};

const KEYFRAMES_STYLE = `
    @keyframes blink {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0;
        animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
      }
    }
  `;

export { BLINK_STYLE, KEYFRAMES_STYLE };

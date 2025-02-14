import { createTransform } from 'redux-persist';

const setTransform = createTransform(
  (inboundState, key) => {
    return {
      ...inboundState,
      list: Array.from(inboundState.list),
    };
  },
  (outboundState, key) => {
    return {
      ...outboundState,
      list: new Set(outboundState.list),
    };
  },
  { whitelist: ['expense'] }
);

export default setTransform;
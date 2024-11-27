const reconcile = (state: any, payload: any) => {
  const keyNames = Object.keys(state || {});
  let trueState = {};

  keyNames.forEach((key) => {
    switch (key) {
      case 'auth':
        const credentials = state[key];
        trueState = { ...trueState, auth: credentials };
        break;
      default:
        break;
    }
  });

  return trueState;
};

export default reconcile;

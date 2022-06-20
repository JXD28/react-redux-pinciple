// 请从课程简介里下载本代码
import React, { useState, useContext } from 'react';

const appContext = React.createContext(null);
export const App = () => {
  const [appState, setAppState] = useState({
    user: { name: 'frank', age: 18 },
  });
  const contextValue = { appState, setAppState };
  return (
    <appContext.Provider value={contextValue}>
      <大儿子 />
      <二儿子 />
      <幺儿子 />
    </appContext.Provider>
  );
};
const 大儿子 = () => (
  <section>
    大儿子
    <User />
  </section>
);
const 二儿子 = () => (
  <section>
    二儿子
    <UserModifier />
  </section>
);
const 幺儿子 = () => <section>幺儿子</section>;

const User = () => {
  const contextValue = useContext(appContext);

  return <div>User:{contextValue?.appState?.user?.name}</div>;
};

/**
 * 用来规范state的创建流程
 * @param {*} state
 * @param {*} param1
 * @returns
 */
const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'updateUser':
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
      };
    default:
      return state;
  }
};

const UserModifier = () => {
  const { appState, setAppState } = useContext(appContext);
  const onChange = (e) => {
    // const newState = reducer(appState, 'updateUser', { name: e.target.value });
    setAppState(
      reducer(appState, {
        type: 'updateUser',
        payload: { name: e.target.value },
      })
    );
  };

  return (
    <div>
      <input value={appState?.user?.name} onChange={onChange} />
    </div>
  );
};

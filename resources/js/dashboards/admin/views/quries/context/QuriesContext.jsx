

import React, { useReducer } from "react";
import { notification } from 'antd';

import { rootReducer } from "./reducerFunction";
import { loadQuries, updateQuery, deleteQuery, sendReply } from "./methods";

export const QuriesContext = React.createContext();

function QuriesContextProvider({ children }) {

  const [api, contextHolder] = notification.useNotification();

  const initState = {
    loading: true,
    category_modal: false,
    queries: [],
    contextHolder,
  };

  const [state, dispatch] = useReducer(rootReducer, initState);

  const openNotification = (pauseOnHover) => () => {
    api.open({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      showProgress: true,
      pauseOnHover,
    });
  };

  const methods = {
    loadQuries: loadQuries.bind({ state, dispatch }),
    updateQuery: updateQuery.bind({ state, dispatch }),
    deleteQuery: deleteQuery.bind({ state, dispatch }),
    sendReply: sendReply.bind({ state, dispatch }),
    openNotification
  };

  return (
    <QuriesContext.Provider value={{ state, methods, dispatch }}>
      {children}
    </QuriesContext.Provider>
  );
}

export default QuriesContextProvider;

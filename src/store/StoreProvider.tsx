"use client";
import React, { useRef } from "react";
import { AppStore, makeStore, persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
    // storeRef.current = makeConfigureStore();
  }
  return (
    <Provider store={storeRef.current}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
      {/* <PersistGate persistor={storeRef.current._persistor}>
        {children}
      </PersistGate> */}
    </Provider>
  );
};

export default StoreProvider;

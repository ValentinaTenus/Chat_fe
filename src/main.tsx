import "./assets/styles/index.scss";
import "react-toastify/dist/ReactToastify.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

import { AppRoute } from "./common/enums/app-routes.enum.ts";
import { Auth, MainPage } from "./pages/index.ts";
import { persistor, store } from "./redux/store.ts";
import { App } from "./App.tsx";

const routes = createBrowserRouter([
  {
    path: AppRoute.ROOT,
    element: <App/>,
    children: [
      {
        path: AppRoute.ROOT,
        element: <MainPage />
      },
      {
        path: AppRoute.AUTH,
        element: <Auth />
      },
      {
        path: AppRoute.SIGN_IN,
        element: <Auth />
      },
      {
        path: AppRoute.SIGN_UP,
        element: <Auth />
      }
    ]
  }
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <Provider store={store}>
        <PersistGate  persistor={persistor} >
          <RouterProvider router={routes}/>
          <ToastContainer/>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
    
  </StrictMode>,
)

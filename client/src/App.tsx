import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent";
import HomePage from "./pages/HomePage";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-screen h-screen bg-base-100">
      <HeaderComponent />
      <div className="flex grow ">{children}</div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;

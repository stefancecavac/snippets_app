import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent";
import HomePage from "./pages/HomePage";
import { UseAuthContext } from "./context/authContext";
import { SignupPage } from "./pages/SignupPage";
import { CreateSnippetpage } from "./pages/CreateSnippetPage";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full h-screen bg-base-100 ">
      <HeaderComponent />
      <div className="flex grow ">{children}</div>
    </div>
  );
};

function App() {
  const { user, userLoading } = UseAuthContext();

  if (userLoading) return null;

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

        <Route
          path="/create"
          element={
            !user ? (
              <Navigate to={"/"} />
            ) : (
              <Layout>
                <CreateSnippetpage />
              </Layout>
            )
          }
        ></Route>

        <Route
          path="/signup"
          element={
            user ? (
              <Navigate to={"/"} />
            ) : (
              <Layout>
                <SignupPage />
              </Layout>
            )
          }
        ></Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

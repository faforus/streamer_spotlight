import StreamerSubmissionForm from "./pages/StreamerSubmissionForm";
import StreamerList from "./pages/StreamerList";
import { BrowserRouter } from "react-router-dom";
import MyRoutes from "./routes/Routes";
import Navigation from "./layout/Navigation";

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen w-full flex flex-col">
        <Navigation />
        <div className="flex-grow">
          <div className="h-full flex flex-col items-center justify-center p-4">
            <MyRoutes />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

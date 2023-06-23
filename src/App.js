import StreamerSubmissionForm from "./pages/StreamerSubmissionForm";
import StreamerList from "./pages/StreamerList";

function App() {
  return (
    <div className="flex justify-center space-x-10 p-20">
      <StreamerSubmissionForm />
      <StreamerList />
    </div>
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import QRCodeGenerator from "./QRCodeGenerator";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';



function App() {

  const queryClient = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <QRCodeGenerator />
      </QueryClientProvider>
    </div>
  );
}

export default App;

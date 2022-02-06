import "./App.css";
import { useToHomePrompt } from "./hooks/useToHomePrompt";
import { Counter } from './components/Counter';

const isInWebApp =  window.navigator.standalone === true || window.matchMedia("(display-mode: standalone)").matches;

function App() {
  const { isReady, promptToInstall, hasFinishedInstallation } = useToHomePrompt(isInWebApp);
  return (
    <div className="App">
      <div className="App-counter-container">
        <h3>Counter App</h3>
        <Counter />
      </div>
      <div>
        <p>
          {isReady && !hasFinishedInstallation && (
            <button onClick={() => promptToInstall()}>Instalar</button>
          )}
        </p>
        <p>
          {hasFinishedInstallation
            ? "Estás usando la Web App"
            : "Aplicación todavía no instalada"}
        </p>
      </div>
    </div>
  );
}

export default App;

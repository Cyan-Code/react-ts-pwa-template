import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";

interface IBeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const isInWebApp =
  window.navigator.standalone === true ||
  window.matchMedia("(display-mode: standalone)").matches;

function useAddToHomeScreenPrompt() {
  const [prompt, setPrompt] = useState<IBeforeInstallPromptEvent | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [hasFinishedInstallation, setHasFinishedInstallation] =
    useState(isInWebApp);

  const finishInstallation = useCallback(function () {
    setHasFinishedInstallation(true);
  }, []);

  const promptToInstall = useCallback(
    function () {
      if (prompt) {
        prompt.prompt();
        prompt.userChoice.then(function (choiceResult) {
          if (choiceResult.outcome === "accepted") {
            finishInstallation();
          }
        });
        return;
      }

      return Promise.reject(
        new Error(
          'Tried installing before browser sent "beforeinstallprompt" event'
        )
      );
    },
    [finishInstallation, prompt]
  );

  useEffect(
    function () {
      if (prompt) {
        setIsReady(true);
      }
    },
    [prompt]
  );

  useEffect(function () {
    function ready(e: IBeforeInstallPromptEvent) {
      e.preventDefault();
      setPrompt(e);
    }

    window.addEventListener("beforeinstallprompt", ready as any);

    return function () {
      window.removeEventListener("beforeinstallprompt", ready as any);
    };
  }, []);

  return useMemo(
    () => ({
      isReady,
      promptToInstall,
      hasFinishedInstallation,
      finishInstallation,
    }),
    [isReady, promptToInstall, hasFinishedInstallation, finishInstallation]
  );
}

function App() {
  const { isReady, promptToInstall, hasFinishedInstallation } =
    useAddToHomeScreenPrompt();
  return (
    <div className="App">
      <h1>💛 Latte and Code</h1>
      <p>Instala esta aplicación en tu dispositivo</p>
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
  );
}

export default App;

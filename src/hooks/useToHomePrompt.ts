import { useCallback, useEffect, useState } from "react";
import { IBeforeInstallPromptEvent } from "../interfaces/Prompt";


export function useToHomePrompt(isInWebApp:Object) {
  const [prompt, setPrompt] = useState<IBeforeInstallPromptEvent | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [hasFinishedInstallation, setHasFinishedInstallation] = useState(isInWebApp);

  const finishInstallation = useCallback(() => {
    setHasFinishedInstallation(true);
  }, []);

  const promptToInstall = useCallback(() => {
    if (prompt) {
      prompt.prompt();
      prompt.userChoice.then((choiceResult) => {
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
    }, [finishInstallation, prompt]
  );

  useEffect(() => {
    if (prompt) {
      setIsReady(true);
    }
    }, [prompt]
  );

  useEffect(() => {
    function ready(e: IBeforeInstallPromptEvent) {
      e.preventDefault();
      setPrompt(e);
    }

    window.addEventListener("beforeinstallprompt", ready as any);

    return function () {
      window.removeEventListener("beforeinstallprompt", ready as any);
    };
  }, []);

  return {
    isReady,
    promptToInstall,
    hasFinishedInstallation
  }
}



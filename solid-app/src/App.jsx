import { createSignal } from "solid-js";
import styles from "./App.module.css";
import "./tokyo-night-dark.min.css";
import Chat from "./components/chat.jsx";
import Menubar from "./components/MenuBar";

function App() {
  const [systemMessage, setSystemMessage] = createSignal("");
  const [modelName, setModelName] = createSignal("gpt-3.5-turbo");

  const handleModelToggle = () => {
    setModelName(modelName() === "gpt-4" ? "gpt-3.5-turbo" : "gpt-4");
  };

  return (
    <>
      <Menubar />
      <Chat systemMessage={systemMessage} modelName={modelName} />
    </>
  );
}

export default App;

import { createSignal } from "solid-js";
import styles from './App.module.css'; 
import styles from './tokyo-night-dark.min.css';
import Chat from './chat.jsx';

function App() {
  const [systemMessage, setSystemMessage] = createSignal("");
  const [modelName, setModelName] = createSignal("gpt-3.5-turbo");

  const handleModelToggle = () => {
    setModelName(modelName() === "gpt-4" ? "gpt-3.5-turbo" : "gpt-4");
  };

  return (
    <div class={styles.menubar}> 
      <button class={styles.settingsToggle} id="settings-toggle">Settings</button>
      <div class={styles.settingsDropdown}>
        <input
          type="text"
          class={styles.input}
          id="system-message"
          placeholder="Enter system message"
          value={systemMessage()}
          onInput={(e) => setSystemMessage(e.target.value)}
        />
        <div class={styles.modelToggleContainer}>
          <label class={styles.switch}>
            <input
              type="checkbox"
              id="model-toggle"
              autocomplete="off"
              checked={modelName() === "gpt-4"}
              onChange={handleModelToggle}
            />
            <span class={styles.slider}>
              <span id="model-label">{modelName()}</span>
            </span>
          </label>
        </div>
      </div>
      <Chat systemMessage={systemMessage} modelName={modelName} />
    </div>
  );
}

export default App;

import { createSignal } from 'solid-js';
import './menuBar.module.css';

function Menubar() {
  const [systemMessage, setSystemMessage] = createSignal('');
  const [modelValue, setModelValue] = createSignal(false);

  const SystemMessageChange = (event) => {
    setSystemMessage(event.target.value);
  };

  const ModelToggleChange = (event) => {
    setModelValue(event.target.checked);
  };

  const modelName = () => modelValue() ? 'gpt-4' : 'gpt-3.5';

  return (
    <div class="menubar">
      <input
        type="text"
        class="input"
        id="system-message"
        placeholder="Enter system message"
        value={systemMessage()}
        onInput={SystemMessageChange}
      />

      <label class="slider-container">
        <input
          type="checkbox"
          autoComplete="off"
          checked={modelValue()}
          onChange={ModelToggleChange}
        />

        <span class="slider-track">
          <span class="model-label" id="model-label-left">{'GPT-3.5'}</span>
          <div class="slider"></div>
          <span class="model-label" id="model-label-right">{'GPT-4'}</span>
        </span>
      </label>
    </div>
  );
};

export default Menubar;

import { createSignal, onMount, onCleanup } from 'solid-js';
import { renderMarkdown, highlightCode } from './utils';
import styles from './App.module.css';

function Chat({ systemMessage, modelName }) {
  const [messages, setMessages] = createSignal([]);
  const [userInput, setUserInput] = createSignal("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    let userInputValue = userInput(); // Use the userInput state variable
    setMessages([...messages(), { role: "user", content: userInputValue }]);
    const response = await postRequest();
    handleResponse(response);
  };

  const postRequest = async () => {
    const response = await fetch("http://localhost:8000/gpt4", {
      method: "POST",
      body: JSON.stringify({
        messages: messages(),
        model_type: modelName(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  };

  const handleResponse = async (response) => {
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let assistantMessage = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        setMessages([...messages(), { role: "assistant", content: assistantMessage }]);
        break;
      }

      const text = decoder.decode(value);
      assistantMessage += text;
    }
  };

  return (
    <div class={styles['chat-container']}>
      <h1 class={styles.heading}>Canvas GPT</h1>
      <div class={styles['chat-wrapper']}>
        <div id="chat-messages" class={styles['chat-box']}>
          {messages().map((message, index) => (
            <div key={index} class={message.role === "user" ? styles['user-message'] : styles['assistant-message']}>
              <p ref={highlightCode} innerHTML={renderMarkdown(message.content)} />
            </div>
          ))}
        </div>
        <form id="chat-form" class={styles['input-form']} onSubmit={handleSubmit}>
          <textarea
            type="text"
            class={styles.input}
            id="user-input"
            name="user_input"
            placeholder="Type your message..."
            value={userInput()}
            onInput={(e) => setUserInput(e.target.value)}
          ></textarea>
          <button class={styles.button} type="submit" id="submitBtn">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;

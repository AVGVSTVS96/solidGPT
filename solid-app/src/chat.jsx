import { createSignal, onMount, onCleanup } from 'solid-js';
import { renderMarkdown, highlightCode } from './utils';

function Chat({ systemMessage, modelName }) {
  const [messages, setMessages] = createSignal([]);
  const [userInput, setUserInput] = createSignal("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    let userInput = event.target.userInput.value.trim();
    setMessages([...messages(), { role: "user", content: userInput }]);
    const response = await postRequest();
    handleResponse(response);
  };

  const postRequest = async () => {
    const response = await fetch("/gpt4", {
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
    <>
      <div>
        {messages().map((message, index) => (
          <div key={index} class={message.role === "user" ? "user-message" : "assistant-message"}>
            <p ref={highlightCode} innerHTML={renderMarkdown(message.content)} />
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
      <input type="text" name="userInput" placeholder="Type your message..."
        value={userInput()}
        onInput={(e) => setUserInput(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  </>
  );
}

export default Chat;
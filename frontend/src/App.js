import { useEffect, useState } from "react";
import Pusher from "pusher-js";

const App = () => {
  const [username, setUsername] = useState("username");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher("dc981e2fe3b975c6b9ab", {
      cluster: "sa1"
    });

    const channel = pusher.subscribe("chat");
    channel.bind("message", function (data) {
      console.log({ data });
      setMessages((messages) => messages.concat(data));
    });
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleNewMessage = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("saving");

    await fetch("http://localhost:3001/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        newMessage
      })
    });

    setNewMessage("");
  };

  return (
    <div className="container">
      <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
        <div className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
          <input
            value={username}
            className="fs-5 fw-semibold"
            onChange={handleUsernameChange}
          />
        </div>
        <div className="list-group list-group-flush border-bottom scrollarea">
          {messages.map((message) => {
            console.log(messages);
            return (
              <div
                key={`${message.username}-${Math.random() * 100000}`}
                href="#"
                className="list-group-item list-group-item-action py-3 lh-sm"
              >
                <div className="d-flex w-100 align-items-center justify-content-between">
                  <strong className="mb-1">{message.username}</strong>
                </div>
                <div className="col-10 mb-1 small">{message.newMessage}</div>
              </div>
            );
          })}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control"
          placeholder="Write your message"
          value={newMessage}
          onChange={handleNewMessage}
        />
      </form>
    </div>
  );
};

export default App;

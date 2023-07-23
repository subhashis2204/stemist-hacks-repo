import BotText from "./BotText"
import UserText from "./UserText"
import { useEffect, useState } from "react"
import InputBox from "./InputBox"
import axios from "axios"
import BotThinking from "./BotThinking"

function ChatPage() {
  const [userResponded, setUserResponded] = useState(false)
  const [thinking, setThinking] = useState(true)
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "Your name is Sophia. You are a nice person and you are an interview coach. Your job is to ask questions to the user and  help him prepare for his interview. The user will provide his topic of interest and you would ask him questions based on that. While responding make sure that you provide a feedback first to the last answer provided by the user and then ask a new question. Start with a greet message. When the user inputs STOP then provide him a score out of 10 and provide some constructive feedback. User converstional style not dialog style. Don't write 'Sophia:'",
    },
  ])

  useEffect(() => {
    const getResponse = async () => {
      const response = await axios.post(
        "https://stemist-hacks-repo-server.onrender.com/api/v1/messages",
        {
          messages,
        }
      )
      setMessages((prevMessages) => [...prevMessages, response.data])
      setThinking(false)
    }

    getResponse()
  }, [])

  const handleUserResponse = async () => {
    const response = await axios.post(
      "https://stemist-hacks-repo-server.onrender.com/api/v1/messages",
      {
        messages,
      }
    )

    setMessages((prevMessages) => [...prevMessages, response.data])
    setThinking(false)
  }

  useEffect(() => {
    if (userResponded) {
      setThinking(true)
      handleUserResponse()
    }

    return setUserResponded(false)
  }, [userResponded])

  const handleSendMessage = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: message },
    ])

    setUserResponded(true)
  }

  const renderedMessages = messages.map((message, index) => {
    return (
      (message.role === "assistant" && (
        <BotText key={index} content={message.content} />
      )) ||
      (message.role === "user" && (
        <UserText key={index} content={message.content} />
      ))
    )
  })
  console.log(messages)
  return (
    <>
      <div className="w-full min-h-[90vh] flex flex-col bg-chat-pattern bg-cover bg-no-repeat bg-center">
        <div className="w-3/4 md:w-1/2 mx-auto h-full md:bg-black mt-2 text-white rounded-md px-2 py-5 flex flex-col justify-start gap-4 grow">
          {renderedMessages}
          {thinking && <BotThinking />}
        </div>
        <InputBox handleSendMessage={handleSendMessage} />
      </div>
    </>
  )
}

export default ChatPage

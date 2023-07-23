import ChatBox from "./ChatBox"
import BotText from "./BotText"
import UserText from "./UserText"
import { useEffect, useState } from "react"
import InputBox from "./InputBox"
import backgroundImage from "../assets/background.svg"

function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "Your name is Lucy. You are a nice person and you are an interview coach. Your job is to ask questions to the user and  help him prepare for his interview. The user will provide his topic of interest and you would ask him questions based on that. While responding make sure that you provide a feedback first to the last answer provided by the user and then ask a new question. Start with a greet message. When the user inputs STOP then provide him a score out of 10 and provide some constructive feedback.",
    },
  ])

  useEffect(() => {})

  const handleSendMessage = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: message },
    ])
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
  return (
    <>
      <div className="w-full min-h-[90vh] flex flex-col bg-chat-pattern md:bg-chat-pattern-desktop bg-cover bg-no-repeat bg-center">
        <div className="w-3/4 md:w-1/2 mx-auto h-full md:bg-black mt-2 text-white rounded-md px-2 py-5 flex flex-col justify-start gap-4 grow">
          {renderedMessages}
        </div>
        <InputBox handleSendMessage={handleSendMessage} />
      </div>
    </>
  )
}

export default ChatPage

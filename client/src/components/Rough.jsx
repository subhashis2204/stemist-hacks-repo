import { useEffect, useState } from "react"
import axios from "axios"

const context = []
function Rough() {
  const [userResponded, setUserResponded] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "Your name is Lucy. You are a nice person and you are an interview coach. Your job is to ask questions to the user and  help him prepare for his interview. The user will provide his topic of interest and you would ask him questions based on that. While responding make sure that you provide a feedback first to the last answer provided by the user and then ask a new question. Start with a greet message. When the user inputs STOP then provide him a score out of 10 and provide some constructive feedback. User converstional style not dialog style. Don't write 'Lucy:'",
    },
  ])

  useEffect(() => {
    const getResponse = async () => {
      const response = await axios.post(
        "http://localhost:30000/api/v1/messages",
        {
          messages,
        }
      )
      setMessages((prevMessages) => [...prevMessages, response.data])
    }

    getResponse()
  }, [])

  const handleUserResponse = async () => {
    const response = await axios.post("http://localhost:3000/api/v1/messages", {
      messages,
    })

    setMessages((prevMessages) => [...prevMessages, response.data])
  }

  useEffect(() => {
    if (userResponded) {
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
}

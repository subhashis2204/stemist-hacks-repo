const express = require("express")
const app = express()
const cors = require("cors")
const { Configuration, OpenAIApi } = require("openai")

require("dotenv").config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get("/", (req, res) => {
  res.send("hello world")
})

app.get("/api/v1/messages", (req, res) => {
  res.send("messages endpoint")
})
app.post("/api/v1/messages", async (req, res) => {
  const { messages } = req.body

  console.log(messages)

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const openai = new OpenAIApi(configuration)

  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
    stop: ["User:"],
  })
  const response = chatCompletion.data.choices[0].message.content

  //   const response = "hello world"

  console.log(chatCompletion.data.choices)

  res.json({ role: "assistant", content: response })
})

app.get("*", (req, res) => {
  res.json({ message: "error" })
})

app.listen(3000, () => {
  console.log("Server Running on Port : 3000")
})

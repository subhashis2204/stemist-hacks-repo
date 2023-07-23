import styles from "./style"
import { Navbar, Hero } from "./components"
import HomePage from "./components/HomePage.jsx"
import { Route, Routes } from "react-router-dom"
import ChatPage from "./components/ChatPage"

const App = () => (
  <div className="bg-primary w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/chats" element={<ChatPage />} />
    </Routes>
  </div>
)

export default App

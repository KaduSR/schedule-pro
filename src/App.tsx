
import React, { useState } from "react"
import "./styles.css"

const HORARIOS = ["08:00","09:00","10:00","11:00","13:00","14:00","15:00","16:00","17:00","18:00"]
const PROFISSIONAIS = ["Ana Silva", "Carlos Souza", "Julia Lima"]
const next7Days = Array.from({length: 7}, (_, i) => { const d = new Date(); d.setDate(d.getDate() + i); return {date: d.toISOString().slice(0,10), label: d.toLocaleDateString("pt-BR", {weekday: "short", day: "2-digit", month: "2-digit"})} })

export default function App() {
  const [date, setDate] = useState(next7Days[0].date)
  const [prof, setProf] = useState(PROFISSIONAIS[0])
  const [bookings, setBookings] = useState<Record<string, string>>({})
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [hour, setHour] = useState("")
  const [step, setStep] = useState<"calendar"|"form"|"done">("calendar")

  if (step === "done") return (
    <div className="app">
      <header className="header"><div className="container header-inner"><h1>Schedule Pro</h1></div></header>
      <main className="container" style={{textAlign: "center", padding: "60px 0"}}>
        <div style={{fontSize: "4rem", marginBottom: "16px"}}>OK</div>
        <h2>Agendamento confirmado!</h2>
        <p style={{color: "#a1a1aa", margin: "12px 0"}}>{date} as {hour} com {prof}</p>
        <button className="btn" onClick={() => {setStep("calendar"); setName(""); setEmail(""); setHour("")}}>Novo</button>
      </main>
    </div>
  )

  return (
    <div className="app">
      <header className="header"><div className="container header-inner"><h1>Schedule Pro</h1></div></header>
      <main className="container">
        <div style={{display: "flex", gap: 8, padding: "16px 0"}}>
          {PROFISSIONAIS.map(p => (
            <button key={p} className={"tab-btn " + (prof === p ? "active" : "")} onClick={() => setProf(p)}>{p}</button>
          ))}
        </div>
        <div style={{display: "flex", gap: 8, flexWrap: "wrap", paddingBottom: "16px"}}>
          {next7Days.map(d => (
            <button key={d.date} className={"tab-btn " + (date === d.date ? "active" : "")} onClick={() => {setDate(d.date); setStep("calendar")}}>{d.label}</button>
          ))}
        </div>
        {step === "calendar" ? (
          <div className="grid">
            {HORARIOS.map(h => {
              const booked = bookings[date + "|" + h]
              return (
                <button key={h} className={"hour-btn " + (booked ? "booked" : "")} onClick={() => {if (!booked) {setHour(h); setStep("form")}}}>
                  {booked ? "[Ocupado] " + h : h}
                </button>
              )
            })}
          </div>
        ) : (
          <div className="form-box">
            <h3>Seus dados</h3>
            <input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <p style={{color: "#a1a1aa", fontSize: ".85rem", margin: "8px 0"}}>{date} as {hour} com {prof}</p>
            <button className="btn" onClick={() => {if (name && email) { setBookings(prev => ({...prev, [date + "|" + hour]: name})); setStep("done") }}}>Confirmar</button>
          </div>
        )}
      </main>
    </div>
  )
}

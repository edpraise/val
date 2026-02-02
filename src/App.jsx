import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function App() {
  const [name, setName] = useState("there");
  const [yesClicked, setYesClicked] = useState(false);
  const [noStyle, setNoStyle] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const value = params.get("name");

    if (value) {
      setName(formatName(value));
    }
  }, []);

  const moveNoButton = () => {
    const x = Math.random() * 260 - 130;
    const y = Math.random() * 140 - 70;

    setNoStyle({
      transform: `translate(${x}px, ${y}px)`
    });
  };

  const handleYes = () => {
    setYesClicked(true);

    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.6 }
    });
  };

  return (
    <main style={styles.page}>
      {/* Floating hearts */}
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="heart"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            fontSize: `${14 + Math.random() * 18}px`
          }}
        >
          ❤️
        </span>
      ))}

      {!yesClicked ? (
        <section style={styles.card}>
          <h1 style={styles.title}>Hi my pretty {name} ❤️</h1>

          <p style={styles.text}>
            I’ve been smiling every time I think of you, and I realized something…
Valentine’s Day wouldn’t feel right without asking you this.
So here it is, straight from my heart 
will you be my Valentine? 🌹
No pressure, just a whole lot of feelings 😊 and a little romance
          </p>

          <h2 style={styles.question}>
            Will you be my Valentine? 🌹
          </h2>

          <div style={styles.buttons}>
            <button onClick={handleYes} style={styles.yes}>
              Yes 💖
            </button>

            <button
              style={{ ...styles.no, ...noStyle }}
              onMouseEnter={moveNoButton}
            >
              No 🙃
            </button>
          </div>
        </section>
      ) : (
        <section style={styles.card}>
          <h1 style={styles.successTitle}>Yay!!! 💕</h1>
          <p style={styles.successText}>
            Thank you {name}.  
            You just made my day ✨
          </p>
        </section>
      )}
    </main>
  );
}

function formatName(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #ff4d6d 0%, #ff8fab 40%, #ffd6e0 75%, #fff0f5 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    padding: "20px",
    fontFamily: "Segoe UI, sans-serif"
  },

  card: {
    background: "rgba(255, 255, 255, 0.92)",
    borderRadius: "24px",
    padding: "36px 28px",
    textAlign: "center",
    maxWidth: "420px",
    width: "100%",
    boxShadow: "0 18px 40px rgba(0,0,0,0.2)",
    zIndex: 2
  },

  title: {
    fontSize: "2.4rem",
    marginBottom: "12px"
  },

  text: {
    fontSize: "1.1rem",
    marginBottom: "12px",
    color: "#444"
  },

  question: {
    fontSize: "1.7rem",
    marginBottom: "28px"
  },

  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    position: "relative"
  },

  yes: {
    padding: "14px 30px",
    fontSize: "1.2rem",
    backgroundColor: "#ff4d6d",
    color: "#fff",
    border: "none",
    borderRadius: "999px",
    cursor: "pointer"
  },

  no: {
    padding: "14px 30px",
    fontSize: "1.2rem",
    backgroundColor: "#adb5bd",
    color: "#fff",
    border: "none",
    borderRadius: "999px",
    cursor: "pointer",
    transition: "0.25s ease"
  },

  successTitle: {
    fontSize: "2.6rem",
    marginBottom: "12px"
  },

  successText: {
    fontSize: "1.2rem",
    color: "#444"
  }
};

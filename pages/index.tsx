import Head from 'next/head'
import { useState, useEffect } from 'react';
import { render, unmountComponentAtNode } from 'react-dom'
import MultiButton from '../components/multi-button'
import ToastElement from '../components/toast'
import styles from '../styles/Home.module.css'

const deEscapeHTML = (unsafe: string): string => {
  return unsafe.replace(/&amp;|&lt;|&quot;|"/g, function (m) {
    switch (m) {
      case '&amp;':
        return '&';
      case '&lt;':
        return '<';
      case '&quot;':
        return '"';
      default:
        return '';
    }
  });
};

const escapeHTML = (unsafe: string): string => {
  return unsafe.replace(/[&<"']/g, function (m) {
    switch (m) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '"':
        return '&quot;';
      default:
        return '&#039;';
    }
  });
};

export default function Home() {
  const [editableValue, setEditableValue] = useState("");
  const [resultValue, setResultValue] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (message) {
      const interval = setInterval(() => {
        unmountComponentAtNode(document.getElementById("toast"))
        setMessage("")
      }, 1250)
      render(<ToastElement message={message} />, document.getElementById("toast"))
      return () => {
        clearInterval(interval)
      }
    }
  }, [message])

  const convertValue = () => {
    try {
    const validJson = JSON.parse(editableValue);
    const reformattedJsonString: string = JSON.stringify(validJson);
    setResultValue(escapeHTML(reformattedJsonString));
    } catch (e) {
      console.error(e)
    }
  }

  const sconvertValue = () => {
    try {
    const notEscaped = deEscapeHTML(editableValue);
    const reformattedJson: string = JSON.parse(notEscaped);
    setResultValue(JSON.stringify(reformattedJson, null, 2));
    } catch (e) {
      console.error(e)
    }
  }

  const copyText = (): void => {
    if (resultValue) {
      navigator.clipboard.writeText(resultValue).then(
        () => {
          setMessage("Copied!!");
        },
        () => {
          setMessage("Copy fail!!");
        }
      )
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Json 2 Html</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Convert Json to HTML entities
        </h1>

        <p className={styles.description}>
          Example:
          <code className={styles.code}>{`{"foo": "bar"}`}</code>
          become
          <code className={styles.code}>{`{&quot;foo&quot;: &quot;bar&quot;}`}</code>
        </p>

        <div className={styles.grid}>

          <MultiButton>
            <button
              onClick={convertValue}
            >
              JSON to HTML
            </button>
            <button
              onClick={sconvertValue}
            >
              HTML to JSON
            </button>
          </MultiButton>

          

          <div className={styles.card}>
            <textarea
              onChange={(ev) => setEditableValue(ev.target.value)}
              value={editableValue}
              className={styles.input_text}
            />
          </div>
          <div className={styles.card}>
            <MultiButton>
              <button onClick={copyText}>Copy</button>
            </MultiButton>
            <textarea
              tabIndex={-1}
              disabled
              readOnly
              value={resultValue}
              className={styles.input_text}
            />
          </div>

        </div>
        <section id="toast" />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/Stinky-Sock-Software"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/sss.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

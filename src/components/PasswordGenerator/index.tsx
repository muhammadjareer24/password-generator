import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useCallback, useEffect, useRef, useState } from 'react'
// import { CopyToClipboard } from 'react-copy-to-clipboard'

import Checkbox from '../Checkbox'

import passwordGif from '../../assets/gif/password.gif'
import copyIcon from '../../assets/icons/copy.svg'
import refreshIcon from '../../assets/icons/refresh.svg'

import './index.css'

const PasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState<number>(10)
  const [uppercase, setUppercase] = useState<boolean>(true)
  const [lowercase, setLowercase] = useState<boolean>(false)

  const [numberAllowed, setNumberAllowed] = useState<boolean>(false)
  const [charAllowed, setCharAllowed] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')

  const passwordRef = useRef<HTMLInputElement | null>(null)

  const generatedPassword = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if (uppercase) str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (lowercase) str = 'abcdefghijklmnopqrstuvwxyz'
    if (numberAllowed) str += '0123456789'
    if (charAllowed) str += '!@#$%^&*()_+'

    for (let i = 1; i <= passwordLength; i++) {
      const charIndex = Math.floor(Math.random() * str.length)
      pass += str.charAt(charIndex)
    }

    setPassword(pass)
  }, [passwordLength, uppercase, lowercase, numberAllowed, charAllowed])

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  useEffect(() => {
    generatedPassword()
  }, [passwordLength, uppercase, lowercase, numberAllowed, charAllowed])

  return (
    <div className="password-wrapper">
      <div className="gif">
        <img
          src={passwordGif}
          alt="Password Gif"
        />
      </div>
      <div className="tac">
        <h2 className="title">PASSWORD GENERATOR</h2>
        <p className="subtitle">
          Ensure online account safety by creating strong and secure passwords
        </p>
      </div>
      <div className="password-input-wrapper">
        <div className="password-field">
          <input
            type="text"
            placeholder="your password"
            value={password}
            ref={passwordRef}
          />
          <img
            src={refreshIcon}
            alt="refresh the password"
            onClick={generatedPassword}
          />
        </div>
        <button
          className="copy-btn"
          onClick={copyPasswordToClipboard}
        >
          <img
            src={copyIcon}
            alt="copy password"
          />
          Copy
        </button>
      </div>
      <span
        className="fw-500 status"
        style={{
          color:
            password.match(/[0-9]/) && password.match(/[!@#$%^&()_+]/)
              ? 'var(--success-color)'
              : password.match(/[0-9]/) || password.match(/[!@#$%^&()+]/)
              ? 'var(--warning-color)'
              : 'var(--danger-color)',
        }}
      >
        {password.match(/[0-9]/) && password.match(/[!@#$%^&*()_+]/)
          ? 'Strong'
          : password.match(/[0-9]/) || password.match(/[!@#$%^&*()_+]/)
          ? 'Medium'
          : 'Weak'}
      </span>
      <div className="slider">
        <div>
          <label id="slider-label">Password Length: </label>
          <span>{passwordLength}</span>
        </div>
        <Slider
          max={30}
          min={5}
          value={passwordLength}
          onChange={(value: number | number[]) => setPasswordLength(value as number)}
          className="slider-style"
        />
      </div>
      <div className="elements">
        <Checkbox
          id="uppercase"
          label="Uppercase"
          name="upper"
          defaultChecked={uppercase}
          checked={uppercase}
          onChange={() => {
            setUppercase((prev) => !prev)
            setLowercase(false)
          }}
        />
        <Checkbox
          id="lowercase"
          label="Lowercase"
          name="lower"
          checked={lowercase}
          onChange={() => {
            setLowercase((prev) => !prev)
            setUppercase(false)
          }}
        />
        <Checkbox
          id="numbers"
          label="Numbers"
          name="numbers"
          checked={numberAllowed}
          defaultChecked={numberAllowed}
          onChange={() => {
            setNumberAllowed((prev) => !prev)
          }}
        />
        <Checkbox
          id="special chars"
          label="Special Characters"
          checked={charAllowed}
          defaultChecked={charAllowed}
          onChange={() => {
            setCharAllowed((prev) => !prev)
          }}
          name="specialChars"
        />
      </div>
    </div>
  )
}

export default PasswordGenerator

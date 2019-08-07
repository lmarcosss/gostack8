import React from 'react'

import { logo, like, dislike } from '../../assets'

export function Main({ match }) {
  return <div className="main-container">
    <img src={logo} alt="logo" />
    <ul>
      <li>
        <img src="https://avatars1.githubusercontent.com/u/32651857?s=460&v=4" alt="avatar" />
        <footer>
          <strong>Leonardo Marcos</strong>
          <p>I love react, javascript and learn other programming languages. I believe which if you learn the logic, after that you can learn any language.</p>
        </footer>
        <div className="actions">
          <button type="button">
            <img src={like} alt="like" />
          </button>
          <button type="button">
            <img src={dislike} alt="dislike" />
          </button>

        </div>
      </li>

      <li>
        <img src="https://avatars1.githubusercontent.com/u/32651857?s=460&v=4" alt="avatar" />
        <footer>
          <strong>Leonardo Marcos</strong>
          <p>I love react, javascript and learn other programming languages. I believe which if you learn the logic, after that you can learn any language.</p>
        </footer>
        <div className="actions">
          <button type="button">
            <img src={like} alt="like" />
          </button>
          <button type="button">
            <img src={dislike} alt="dislike" />
          </button>

        </div>
      </li>

      <li>
        <img src="https://avatars1.githubusercontent.com/u/32651857?s=460&v=4" alt="avatar" />
        <footer>
          <strong>Leonardo Marcos</strong>
          <p>I love react, javascript and learn other programming languages. I believe which if you learn the logic, after that you can learn any language.</p>
        </footer>
        <div className="actions">
          <button type="button">
            <img src={like} alt="like" />
          </button>
          <button type="button">
            <img src={dislike} alt="dislike" />
          </button>

        </div>
      </li>

      <li>
        <img src="https://avatars1.githubusercontent.com/u/32651857?s=460&v=4" alt="avatar" />
        <footer>
          <strong>Leonardo Marcos</strong>
          <p>I love react, javascript and learn other programming languages. I believe which if you learn the logic, after that you can learn any language.</p>
        </footer>
        <div className="actions">
          <button type="button">
            <img src={like} alt="like" />
          </button>
          <button type="button">
            <img src={dislike} alt="dislike" />
          </button>

        </div>
      </li>
    </ul>
  </div>
}

import styles from '../styles/global.scss?raw'

export class PomodoroWidget extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot!.innerHTML = `<style>${styles}</style>`
  }
}

customElements.define('pomodoro-widget', PomodoroWidget)

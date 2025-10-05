import { el } from '@zero-dependency/dom'
import { Interact } from '@zero-dependency/interact'
import { store } from '../libs/storage.js'
import { PomodoroWidget } from './pomodoro-widget.js'
export class DraggableOverlay {
  el: HTMLElement

  private interact: Interact

  mount(target: HTMLElement): void {
    this.el = el('div', { className: 'overlay' }, target)

    const pomodoroWidget = new PomodoroWidget()
    pomodoroWidget.shadowRoot!.appendChild(this.el)

    this.interact = new Interact(target, {
      constrain: true,
      relativeTo: this.el,
      handle: target,
      onMouseDown: () => {
        this.el.classList.add('grabbing')
      },
      onMouseUp: () => {
        this.el.classList.remove('grabbing')
      },
      onMouseMove: (el) => {
        const { x, y } = el.getBoundingClientRect()
        store.write((prevValue) => ({ ...prevValue, position: { x, y } }))
      }
    })

    this.updatePosition()
    document.body.appendChild(pomodoroWidget)
  }

  updatePosition(): void {
    const { x, y } = store.getByKey('position')
    this.interact.changePosition(x, y)
  }
}

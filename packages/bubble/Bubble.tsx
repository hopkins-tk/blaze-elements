import { h, Component, prop } from 'skatejs';
import styles from './Bubble.scss';
import { css } from '../../utils/css';

const BubbleTypes = {
  top: 'top',
  left: 'left',
  right: 'right',
  bottom: 'bottom',
};

type BubbleTypesType = typeof BubbleTypes;

// public
interface BubbleProps extends JSX.HTMLProps<HTMLElement | any> {
  type?: keyof BubbleTypesType,
  isDisplayed?: boolean,
  disableAutoShowHide?: boolean
}

export class Bubble extends Component<BubbleProps> {
  _props: BubbleProps;
  static get is() { return 'bl-bubble' }
  static get props() {
    return {
      type: prop.string({
        attribute: true
      }),
      isDisplayed: prop.boolean({
        attribute: true
      }),
      disableAutoShowHide: prop.boolean({
        attribute: true
      })
    }
  }

  type = 'right';
  isDisplayed = false;
  disableAutoShowHide = false;

  private handleMouseOver() {
    if ( !this.disableAutoShowHide ) {
      this.isDisplayed = true;
    }
  }

  private handleMouseLeave() {
    if ( !this.disableAutoShowHide ) {
      this.isDisplayed = false;
    }
  }

  connectedCallback(){
    super.connectedCallback();
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  renderCallback() {
    const { isDisplayed, type } = this;
    const className = css(
      'c-bubble',{
        'c-bubble--right': type === BubbleTypes.right,
        'c-bubble--left': type === BubbleTypes.left,
        'c-bubble--top': type === BubbleTypes.top,
        'c-bubble--bottom': type === BubbleTypes.bottom,
      }
    );

    return [
      <style>{styles}</style>,
      isDisplayed
        ? <div tabIndex={0} className={"bubble-wrapper"} onMouseleave={this.handleMouseLeave} onBlur={this.handleMouseLeave}>
            <slot></slot>
            <div
              className={className}
            >
              <slot name={"bubble"}></slot>
            </div>
          </div>
        : <div tabIndex={0} className={"bubble-wrapper"} onMouseover={this.handleMouseOver} onFocus={this.handleMouseOver}>
            <slot></slot>
          </div>
    ]
  }

}

customElements.define( Bubble.is, Bubble );

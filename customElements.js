const sheet = new CSSStyleSheet();
sheet.replaceSync(`
  :host {
    background: #8b8b8b;
    border: solid 4px;
    border-top-color: #3f3f3f;
    border-left-color: #3f3f3f;
    border-bottom-color: #f0f0f0;
    border-right-color: #f0f0f0;
    padding: 2px;
    user-select: none;
    contain: content;
  }
  :host(:hover) {
    background: #999;
  }
  :host(.active) {
    background: #bbb;
  }
  .icon {
    width: 50px;
    height: 50px;
    background-image: url(data/items_atlas.webp);
    background-size: calc(50/64*2574px);
  }
  .amount {
    text-align: right;
    font-size: 24px;
    color: #ddd;
    text-shadow: 2px 2px 1px black;
    display: block;
    position: relative;
    top: 26px;
    left: 1px;
  }
`);

class CustomItemContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [sheet];
    this.shadowRoot.innerHTML = `<div class="icon"><span class="amount">0</span></div>`;

    this._icon = this.shadowRoot.querySelector('.icon');
    this._amountEl = this.shadowRoot.querySelector('.amount');
    this._amount = 0;

    this.addEventListener('click', this._handleClick);
  }

  _handleClick = () => {
    this.dispatchEvent(new CustomEvent('item-selected', { bubbles: true, composed: true, detail: { element: this } }));
  }

  set image(coords) {
    const pos = `-${coords[0]*50/64}px -${coords[1]*50/64}px`;
    this.setAttribute('image', pos); 
    this._icon.style.backgroundPosition = pos;
  }
  set amount(n) {
    if (isFinite(n)) {
      this._amount = n;
      this._amountEl.textContent = n;
    } else {
      this._amount = Infinity;
      this._amountEl.textContent = "∞";
    }
  };
  
  get image() { return this.getAttribute("image") }
  get amount() { return this._amount }
}

customElements.define('item-container', CustomItemContainer);
export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._itemsArray = items;
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
    }

    addItem(element) {
        this._container.prepend(element);
    }

    renderNewCard(item) {
        this._renderer(item);
    }

    renderCard() {
        this._itemsArray.forEach((item) => {
            this._renderer(item);
        })
    }
}
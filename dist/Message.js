var PayloadTypes;
(function (PayloadTypes) {
    PayloadTypes[PayloadTypes["TEXT"] = 0] = "TEXT";
    PayloadTypes[PayloadTypes["IMAGE"] = 1] = "IMAGE";
})(PayloadTypes || (PayloadTypes = {}));
export class Message {
    constructor() {
        this.unsupportedCount = 0;
        this.text = "";
        this.images = [];
    }
    isCorrect() {
        return this.text != "" || this.hasAttachments();
    }
    setText(text) {
        if (text) {
            this.text = text;
        }
        return this;
    }
    getText() {
        return this.text;
    }
    addPhoto(url) {
        this.images.push(url);
        return this;
    }
    addPhotos(urls) {
        this.images.push(...urls);
        return this;
    }
    incrementUnsupportedCounter() {
        this.unsupportedCount++;
    }
    getImages() {
        return this.images;
    }
    hasAttachments() {
        return this.images.length != 0;
    }
}

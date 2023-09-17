enum PayloadTypes {
    TEXT, IMAGE
}

export class Message {
    private unsupportedCount : number = 0;
    private text : string = "";
    private images : string[] = [];

    constructor() {
    }

    public isCorrect() {
        return this.text != "" || this.hasAttachments();
    }

    public setText(text?: string) : Message {
        if (text) {
            this.text = text;
        }
        return this;
    }

    public getText() {
        return this.text;
    }

    public addPhoto(url : string) : Message {
        this.images.push(url);
        return this;
    }

    public addPhotos(urls : string[]) : Message {
        this.images.push(...urls);
        return this;
    }

    public incrementUnsupportedCounter() {
        this.unsupportedCount++;
    }

    public getImages() {
        return this.images;
    }

    public hasAttachments() {
        return this.images.length != 0;
    }
}
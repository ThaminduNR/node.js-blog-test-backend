class CustomResponse {


    private _status: number;
    private _message: string;
    private _data?: any;
    private _pageCount?: any


    constructor(status: number, message: string, data?: any, pageCount?: any) {
        this._status = status;
        this._message = message;
        this._data = data;
        this._pageCount= pageCount;
    }

    get status(): number {
        return this._status;
    }

    set status(value: number) {
        this._status = value;
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        this._message = value;
    }

    get data(): any {
        return this._data;
    }

    set data(value: any) {
        this._data = value;
    }

    get pageCount(): any {
        return this._pageCount;
    }

    set pageCount(value: any) {
        this._pageCount = value;
    }

    toJSON() {

        return {
            status: this._status,
            message: this._message,
            data: this._data,
            pageCount:this._pageCount

        }

    }

}

export default CustomResponse;

export class userService {
    public async getAllUser(isValid: boolean): Promise<number> {
        let num = await this.test();
        return num;
    }

    private async test(): Promise<number> {
        return new Promise<number>((res) => {
            let num = 1000;
            let i = 0;
            for (i = 0; i < num; i++) {
                i++;
                //this.test();
            }
            res(i);
        });
    }
}
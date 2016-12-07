var MongoClient = require('mongodb').MongoClient;

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

    public async addMongoTest(): Promise<void> {
        let db = await MongoClient.connect("mongodb://localhost:27017/myDb");

        let collection = await db.collection('Persons');
        collection.insert({ id: 1, firstName: 'Steve', lastName: 'Jobs' });
        collection.insert({ id: 2, firstName: 'Bill', lastName: 'Gates' });
        collection.insert({ id: 3, firstName: 'James', lastName: 'Bond' });

    }
}
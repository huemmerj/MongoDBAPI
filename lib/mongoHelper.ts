import * as mongo from 'mongodb';
 
export class MongoHelper {
  private static client: mongo.MongoClient;
    
  public static getClient():mongo.MongoClient {
    if (!MongoHelper.client){
        MongoHelper.connect('mongodb://localhost:27017/test')
    }
    return MongoHelper.client
  }
  constructor() {
  }
 
  private static connect(url: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      mongo.MongoClient.connect(url, {useNewUrlParser: true}, (err, client: mongo.MongoClient) => {
        if (err) {
          reject(err);
        } else {
          MongoHelper.client = client;
          resolve(client);
        }
      });
    });
  }
 
  public disconnect(): void {
    MongoHelper.client.close();
  }
}
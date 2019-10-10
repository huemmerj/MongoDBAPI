import * as mongo from 'mongodb';
 
export class ConnectionManager {
  private static client: mongo.MongoClient;
  private static url: any ='mongodb://localhost:27017/test' 

  public static async getClient():Promise<mongo.MongoClient> {
    if (!ConnectionManager.client){
        await ConnectionManager.connect(ConnectionManager.url)
    }
    return ConnectionManager.client
  }
  constructor() {
  }
  static async getCollection(collectionName: string){
    const client = await this.getClient()
    return client.db('test').collection(collectionName)
  }
  private static connect(url: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      mongo.MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client: mongo.MongoClient) => {
        if (err) {
          reject(err);
        } else {
          ConnectionManager.client = client;
          resolve(client);
        }
      });
    });
  }
 
  public disconnect(): void {
    ConnectionManager.client.close();
  }
}
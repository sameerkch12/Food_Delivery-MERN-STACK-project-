const mongoose = require('mongoose')

const url = `mongodb+srv://sameerkch:sameerkch12@cluster0.jxaj1n3.mongodb.net/gofoodmern?retryWrites=true&w=majority`;

const connectionParams = {
    useNewUrlParser: true,
}

const mongoDB = () => {
    mongoose.connect(url, connectionParams)
        .then(() => {
            //food_items  fatch from data base

            const fetched_data = mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray().then((data) => {
               
              global.food_items = data;
            }).catch((err) => {
                console.log(err);
            })

            //food collection fatch from data base
            const foodCollection = mongoose.connection.db.collection("foodCategory");
            foodCollection.find({}).toArray().then((data) => {
                global.foodCategory = data;
             
            }).catch((err) => {
                console.log(err);
            })
            console.log('Connected to the database ')
        })
        //if not connected then show error

        .catch((err) => {
            console.error(`Error connecting to the database. ${err}`);
        })

}

module.exports = mongoDB;

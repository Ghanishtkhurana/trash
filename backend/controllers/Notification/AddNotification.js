const cron = require("node-cron");
const ProductModel = require("../../models/Products/product.model");
const NotificationModel = require("../../models/notification/notification.model");

let cronTask = null;
let limit = 60;
const Notification = async () => {
  try {
    const filteredData = await ProductModel.find({ leftCount: { $lte: 0 } }).limit(limit);
    return { filteredData };
  } catch (error) {
    console.error("Error in Product Model:", error.message);
    throw error;
  }
};

async function AddNotifications(filteredData) {
  try {
    if (filteredData.length > 0) {
      for (let i = 0; i < filteredData.length && filteredData; i++) {
        const add = await NotificationModel.create({
          text: `${filteredData[i].name} is Out of stock`,
        });

        setTimeout(async () => {
          const remainingData = await ProductModel.find({ leftCount: { $lte: 0 } })
            .limit(60)
            .skip(0);
            AddNotifications(remainingData);
        }, 1000);
      }
    }
  } catch (error) {
    console.error("Error in AddNotifications:", error.message);
  }
}

const runLoop = async () => {
  try {
    const { filteredData } = await Notification();
    console.log("filteredDataLength", filteredData.length);

    if (filteredData.length > 0) {
      AddNotifications(filteredData);
    } else {
      console.log("All the data has already Notified");
    }
  } catch (error) {
    console.error("Error in runLoop:", error.message);
  }
};

const stopCronJob = () => {
  if (cronTask !== null) {
    cronTask.stop();
    console.log("Cron job stopped at", new Date());
  }
};

const startCronJob = () => {
  
  console.log("Cron Task");
  stopCronJob();

  cronTask = cron.schedule("0 */30 * * * *", () => {
    console.log("Cron job started at", new Date());
    stopCronJob();

    runLoop();
  });

  cronTask.start();
};

startCronJob();

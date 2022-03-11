const { isMainThread, Worker, workerData } = require("worker_threads");

if (isMainThread) {
  console.log(`main thread! process ID: ${process.pid}`);
  new Worker(__filename, {
    workerData: [7, 6, 2, 3],
  });
  new Worker(__filename, {
    workerData: [1, 4, 3, 4],
    // workerData: [1, 3, 4, 3],
  });
} else {
  console.log(`worker! process ID: ${process.pid}`);
  // [7, 6, 2, 3].sort()
  console.log(`${workerData} sorted is ${workerData.sort()}`);
}

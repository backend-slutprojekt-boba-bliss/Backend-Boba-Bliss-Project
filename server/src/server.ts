import { app } from "./app";

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on: http://127.0.0.1:${port}`);
});

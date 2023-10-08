import app from "./app";

async function main() {
  app.listen(process.env.PORT, () => {
    console.log(`Server running port: ${process.env.PORT}`);
  });
}

main();

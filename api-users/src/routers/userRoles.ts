import router, { Router } from "express";
import connection from "../bd/bd-config.js";


const rolesRouter: Router = router();


rolesRouter.get("/roles", async (_, res) => {
  console.log("Fetching all roles");
  const [result ] = await connection.query("SELECT * FROM roles");
  res.json({ roles: result });
});


export default rolesRouter;
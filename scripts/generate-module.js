#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const moduleName = process.argv[2];

if (!moduleName) {
  console.error("❌ Usage: npm run make:module <moduleName>");
  process.exit(1);
}

const MODULES_DIR = path.join(process.cwd(), "src", "modules");
const MODULE_PATH = path.join(MODULES_DIR, moduleName);

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

if (fs.existsSync(MODULE_PATH)) {
  console.error(`❌ Module '${moduleName}' already exists`);
  process.exit(1);
}

fs.mkdirSync(MODULE_PATH, { recursive: true });

const capitalizeModuleName = capitalize(moduleName);

/* ---------- Templates ---------- */
const routeTemplate = `
import { Router } from "express";
import * as controller from "./${moduleName}Controller";

const router = Router();

router.get("/", controller.get${capitalizeModuleName});
router.post("/", controller.create${capitalizeModuleName});
router.put("/:id", controller.update${capitalizeModuleName});
router.delete("/:id", controller.delete${capitalizeModuleName});

export default router;
`.trim();

const controllerTemplate = `
import { Request, Response } from "express";
import { resSend } from "@/middleware/responseHandler";
import { StatusCode } from "@/types/common";
import * as ${moduleName}Service from "./${moduleName}Service";

export const get${capitalizeModuleName} = async (req: Request, res: Response) => {
  const { userSession, query } = req
  const response = await ${moduleName}Service.get${capitalizeModuleName}Service(userSession, query);
  resSend(res, StatusCode.OK, "get ${moduleName}",response);
};

export const create${capitalizeModuleName} = async (req: Request, res: Response) => {
  const { userSession, body } = req
  const response = await ${moduleName}Service.create${capitalizeModuleName}Service(userSession, body);
  resSend(res, StatusCode.OK, "create ${moduleName}",response);
};

export const update${capitalizeModuleName} = async (req: Request, res: Response) => {
  const { userSession, params, body } = req
  const response = await ${moduleName}Service.update${capitalizeModuleName}Service(userSession, params, body);
  resSend(res, StatusCode.OK, "update ${moduleName}",response);
};

export const delete${capitalizeModuleName} = async (req: Request, res: Response) => {
  const { userSession, params } = req
  const response = await ${moduleName}Service.delete${capitalizeModuleName}Service(userSession, params);
  resSend(res, StatusCode.OK, "delete ${moduleName}",response);
};
`.trim();

const serviceTemplate = `
import { UserSessionData } from "@/types/express";
import {
    Get${capitalizeModuleName}Query,
    Create${capitalizeModuleName}Body,
    Update${capitalizeModuleName}Body,
    Delete${capitalizeModuleName}Params,
    Update${capitalizeModuleName}Params
} from "./${moduleName}Type";
import { ServiceResponse } from "@/types/common";

export const get${capitalizeModuleName}Service = async (
    userSession: UserSessionData,
    query: Get${capitalizeModuleName}Query = {}
): ServiceResponse => { };

export const create${capitalizeModuleName}Service = async (
    userSession: UserSessionData,
    body: Create${capitalizeModuleName}Body
): ServiceResponse => { };

export const update${capitalizeModuleName}Service = async (
    userSession: UserSessionData,
    params: Update${capitalizeModuleName}Params,
    body: Update${capitalizeModuleName}Body
): ServiceResponse => { };

export const delete${capitalizeModuleName}Service = async (
    userSession: UserSessionData,
    params: Delete${capitalizeModuleName}Params
): ServiceResponse => { };
`.trim();

const validationTemplate = `
import Joi from "joi";

const { string, number, any } = Joi.types()

export const get${capitalizeModuleName}Validation = Joi.object({});

export const create${capitalizeModuleName}Validation = Joi.object({});

export const update${capitalizeModuleName}Validation = Joi.object({});

export const delete${capitalizeModuleName}Validation = Joi.object({});
`.trim();

const typeTemplate = `
export interface Get${capitalizeModuleName}Params {}

export interface Get${capitalizeModuleName}Query {}

export interface Create${capitalizeModuleName}Body {}

export interface Update${capitalizeModuleName}Params {}

export interface Update${capitalizeModuleName}Body {}

export interface Delete${capitalizeModuleName}Params {}
`.trim();

/* ---------- Write Files ---------- */

fs.writeFileSync(path.join(MODULE_PATH, `${moduleName}Route.ts`), routeTemplate);
fs.writeFileSync(path.join(MODULE_PATH, `${moduleName}Controller.ts`), controllerTemplate);
fs.writeFileSync(path.join(MODULE_PATH, `${moduleName}Service.ts`), serviceTemplate);
fs.writeFileSync(path.join(MODULE_PATH, `${moduleName}Validation.ts`), validationTemplate);
fs.writeFileSync(path.join(MODULE_PATH, `${moduleName}Type.ts`), typeTemplate);

console.log(`✅ Module '${moduleName}' created successfully`);

process.exit(0);
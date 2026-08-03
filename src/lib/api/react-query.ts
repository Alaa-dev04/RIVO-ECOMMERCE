import { createQueryClient } from "openapi-react-query";
import { client } from "./client";

export const $api = createQueryClient(client);
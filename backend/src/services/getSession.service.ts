import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth";
import { Request } from "express";


export async function getServerSession(req:Request){
    return await auth.api.getSession({
        headers:fromNodeHeaders(req.headers)
    })
}
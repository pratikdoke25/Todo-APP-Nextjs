import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/db";

import Todo from "@/models/todo";
import { v4 as uuidv4 } from "uuid";

connect();

function getIdFromPathname(s:String){
    let parts=s.split("/")
    return parts[parts.length-1];

}
export async function GET(request: NextRequest) {
  try { 
    // const todos = await Todo.find({});
    const path=request.nextUrl.pathname;
    const id=getIdFromPathname(path)
   const todo=await Todo.findOne({id})
   console.log(todo);
   
    return NextResponse.json({ msg: "Found all todos", success: true,todo});
  } catch (error) {
    return NextResponse.json({ msg: "Issue happened!", success: false }, { status: 500 });
  }
}
export async function DELETE(request: NextRequest) {
    try { 
        // const todos = await Todo.find({});
        const path=request.nextUrl.pathname;
        const id=getIdFromPathname(path)
       await Todo.deleteOne({id})
       
       
        return NextResponse.json({ msg: "Todos Deleted ", success: true});
      } catch (error) {
        return NextResponse.json({ msg: "Issue happened!", success: false }, { status: 500 });
      }
}

export async function PUT(request: NextRequest) {
    try { 
        // const todos = await Todo.find({});
        const path=request.nextUrl.pathname;
        const id=getIdFromPathname(path);
        const reqBody=await request.json()
            const {desc,completed}=reqBody;
        
       await Todo.updateOne({id},{$set:{desc,completed}})
       
       
        return NextResponse.json({ msg: "Todos Updated ", success: true});
      } catch (error) {
        return NextResponse.json({ msg: "Issue happened!", success: false }, { status: 500 });
      }
}
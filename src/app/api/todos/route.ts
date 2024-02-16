import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/db";

import Todo from "@/models/todo";
import { v4 as uuidv4 } from "uuid";

connect();

export async function GET(request: NextRequest) {
  try {
    const todos = await Todo.find({});
    return NextResponse.json({ msg: "Found all todos", success: true, todos });
  } catch (error) {
    return NextResponse.json({ msg: "Issue happened!", success: false }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { desc } = reqBody;
    console.log(desc);

    const newTodo = new Todo({
      id: uuidv4(),
      desc,
      completed: false,
    });

    const savedTodo = await newTodo.save();
    return NextResponse.json({ msg: "Todo added", success: true, savedTodo });
  } catch (error) {
    return NextResponse.json({ msg: "Issue happened!", success: false }, { status: 500 });
  }
}


export async function DELETE(request: NextRequest) {
  try {
   await Todo.deleteMany({})
   return NextResponse.json({ msg: "Todo Deleted", success: true});
  } catch (error) {
    return NextResponse.json({ msg: "Issue happened!", success: false }, { status: 500 });
  }
}
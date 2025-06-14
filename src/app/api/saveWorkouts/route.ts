import { NextRequest, NextResponse } from "next/server";
import { saveWorkoutData } from "../../(app)/actions/workouts";

export async function POST(req: NextRequest) {
    const body = await req.json();
    await saveWorkoutData(body.date, body.exercises);
    return NextResponse.json({ status: 'ok'});
}  
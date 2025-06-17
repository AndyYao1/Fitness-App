'use server'

import { createClient } from "../../../utils/supabase/server";

export async function saveWorkoutData(date, workouts) {
    const supabase = await createClient();
    const user_id = (await supabase.auth.getUser()).data.user.id;
    const { error } = await supabase
        .from('workouts')
        .upsert(workouts
            .map(workout => 
                ({...workout, user_id: user_id, date:date})
        ))
        .select();
}

export async function loadWorkoutData() {
    const supabase = await createClient();
    const user_id = (await supabase.auth.getUser()).data.user.id;
    const { data, error } = await supabase
        .from('workouts')
        .select()
        .eq('user_id', user_id);
    if (error) {

    } else {
        return data;
    }
}

export async function deleteWorkout(date, workout){
    const supabase = await createClient();
    const user_id = (await supabase.auth.getUser()).data.user.id;
    const response = await supabase
        .from('workouts')
        .delete()
        .eq('date', date)
        .eq('workout_id', workout.workout_id)
        .eq('user_id', user_id);
}
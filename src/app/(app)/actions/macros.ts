'use server'

import { createClient } from "../../../utils/supabase/server";

export async function saveMacrosData(date, macros) {
    const supabase = await createClient();
    const user_id = (await supabase.auth.getUser()).data.user.id;
    macros.user_id = user_id;
    macros.date = date;
    const { error } = await supabase
        .from('macros')
        .upsert(macros)
        .select();
}

export async function loadMacroData(date) {
    const supabase = await createClient();
    const user_id = (await supabase.auth.getUser()).data.user.id;
    const { data, error } = await supabase
        .from('macros')
        .select()
        .eq('user_id', user_id)
        .eq('date', date);
    if (error) {

    } else {
        return data;
    }
}

export async function loadAllMacroData() {
    const supabase = await createClient();
    const user_id = (await supabase.auth.getUser()).data.user.id;
    const { data, error } = await supabase
        .from('macros')
        .select()
        .eq('user_id', user_id);
    if (error) {

    } else {
        return data;
    }
}

export async function deleteMacro(date, macro_id){
    const supabase = await createClient();
    const user_id = (await supabase.auth.getUser()).data.user.id;
    const response = await supabase
        .from('macros')
        .delete()
        .eq('date', date)
        .eq('macro_id', macro_id)
        .eq('user_id', user_id);
}
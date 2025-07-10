import { createClient } from "@supabase/supabase-js"

const url = "https://jbxzknwsbnltloomkvzd.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpieHprbndzYm5sdGxvb21rdnpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxMjgxNTcsImV4cCI6MjA2NzcwNDE1N30.YBdpMU7mH26MaNaNmw12OU-vemWzujR4SId1bq7E9_4"

const supabase = createClient(url,key)

export default function mediaUpload(file){

    const mediaUploadPromise = new Promise(
        (resolve, reject)=>{

            if(file == null){
                reject("No file selected")
                return
            }

            const timestamp = new Date().getTime()
            const newName = timestamp+file.name

            supabase.storage.from("cos-pics").upload(newName, file, {
                upsert:false,
                cacheControl:"3600"
            }).then(()=>{
                const publicUrl = supabase.storage.from("cos-pics").getPublicUrl(newName).data.publicUrl
                resolve(publicUrl)
            }).catch(
                ()=>{
                    reject("Error occured in supabase connection")
                }
            )
        }
    )

    return mediaUploadPromise

}



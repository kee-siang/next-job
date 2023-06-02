<script>
    import { getUserId, getTokenFromLocalStorage } from '../../../../utils/auth.js'
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    let formErrors={}
    export let data;

    async function updateJob(evt){
        
        try{
        evt.preventDefault();
        
        const JobsData = {
            user:  getUserId(),
            title: evt.target['jobTitle'].value,
            minAnnualCompensation: evt.target['minAnnualCompensation'].value,
            maxAnnualCompensation: evt.target['maxAnnualCompensation'].value,
            description: evt.target['description'].value,
            requirements: evt.target['requirements'].value,
            applicationInstructions: evt.target['applicationInstructions'].value,
            employer: evt.target['companyName'].value,
            location: evt.target['jobLocation'].value
            }; 
        
            const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/jobs/records/' + `${data.job.id}`, {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getTokenFromLocalStorage()
                
            },
            body: JSON.stringify(JobsData) 
        })
        if (resp.status == 200){
            goto('/jobs' + `/${data.job.id}`);
        }else{
            const res = await resp.json();
            formErrors = res.data;
        }
    }

        catch(error){
            console.log(error)
        }


    }
</script>

<form on:submit={updateJob} class="w-full form-control" >
    <div>
        <div class="m-1">
        <label for="Job Title">Job Title</label>
        </div>
        <input
            type="text"
            name="jobTitle"
            placeholder="Software Engineer"
            class="input input-bordered w-full"
            value={data.job.title}
        />

        <div class="m-1">
        <label for="Min Annual Compensation">Min Annual Compensation</label>
        </div>
        <input
            type="text"
            name="minAnnualCompensation"
            placeholder="40000"
            value={data.job.minAnnualCompensation}
            class="input input-bordered w-full"
        />
        
            <div class="flex justify-between mt-2 mb-4">
                <p class="text-xs">USD</p>
                <p class="text-xs">per annum</p>
            </div>
        
        <div class="m-1">
        <label for="Max Annual Compensation">Max Annual Compensation</label>
        </div>
        <input
            type="number"
            name="maxAnnualCompensation"
            placeholder="250000"
            value={data.job.maxAnnualCompensation}
            class="input input-bordered w-full"
        />

            <div class="flex justify-between mt-2 mb-4">
                <p class="text-xs">USD</p>
                <p class="text-xs">per annum</p>
            </div>
        
        <div class="m-1">
        <label for="Company Name">Company Name</label>
        </div>
        <input
            type="text"
            name="companyName"
            placeholder="e.g. Facebook"
            value={data.job.employer}
            class="input input-bordered w-full"
        />

        <div class="m-1">
        <label for="Job Location">Job Location</label>
        </div>
        <input
            type="text"
            name="jobLocation"
            value={data.job.location}
            placeholder="e.g. Singapore"

            class="input input-bordered w-full"/>

        <div class="m-1">
        <label for="Desription">Description</label>
        </div>
        <textarea class="w-full input input-bordered rounded h-60 pt-2" 
        name="description">{data.job.description}</textarea>

        <div class="m-1">
        <label for="Requirements">Requirements</label>
        </div>
        <textarea class="w-full input input-bordered rounded h-60 pt-2" name="requirements">{data.job.requirements}</textarea>
        
        <div class="m-1">
        <label for="Application Instructions">applicationInstructions</label>
        </div>
        <textarea class="w-full input input-bordered rounded h-28 pt-2" name="applicationInstructions">{data.job.applicationInstructions}</textarea>
    </div>
    <div>
        <button class="bg-emerald-400 w-full flex justify-center rounded-lg my-8 py-4">UPDATE JOB</button>
    </div>
</form>
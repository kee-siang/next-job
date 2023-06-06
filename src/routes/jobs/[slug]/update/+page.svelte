<!-- Update Job Details Page -->

<script>
    import { getUserId, getTokenFromLocalStorage } from '../../../../utils/auth.js'
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    import { goto } from '$app/navigation';
	import { writable } from 'svelte/store';
    let formErrors={}
    let isLoading = writable(false);
    export let data;

    async function updateJob(evt){
        evt.preventDefault();
        
        isLoading.set(true);

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
        
            const resp = await fetch(PUBLIC_BACKEND_BASE_URL + 'api/collections/jobs/records/' + `${data.job.id}`, {
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
        isLoading.set(false);
    }
</script>

<svelte:head>
  <title>Update Job Details | Next Jobs</title>
</svelte:head>

<form on:submit={updateJob} class="w-full form-control mt-4" >
        <h1 class="text-3xl font-bold underline decoration-sky-500 py-5 mb-4">Update Job Details Page</h1>
        <div class="m-1">
    <!-- Job Title section -->
        <label for="Job Title">Job Title</label>
        </div>
        <input
            type="text"
            name="jobTitle"
            placeholder="Software Engineer"
            class="input input-bordered w-full"
            value={data.job.title}
            required
        />
        {#if 'title' in formErrors}
            <label class="label" for="jobTitleError">
                <span class="label-text-alt text-red-500">{formErrors['title'].message}</span>
            </label>
        {/if}

    <!-- Min Annual Compensation section -->
        <div class="m-1 pt-5">
        <label for="Min Annual Compensation">Min Annual Compensation</label>
        </div>
        <input
            type="text"
            name="minAnnualCompensation"
            placeholder="40000"
            value={data.job.minAnnualCompensation}
            class="input input-bordered w-full"
            required
        />
        {#if 'minAnnualCompensation' in formErrors}
            <label class="label" for="minAnnualError">
                <span class="label-text-alt text-red-500">{formErrors['minAnnualCompensation'].message}</span>
            </label>
        {/if}

            <div class="flex justify-between mt-2 mb-4">
                <p class="text-xs">USD</p>
                <p class="text-xs">per annum</p>
            </div>
    
    <!-- Max Annual Compensation section -->
        <div class="m-1 pt-5">
        <label for="Max Annual Compensation">Max Annual Compensation</label>
        </div>
        <input
            type="number"
            name="maxAnnualCompensation"
            placeholder="250000"
            value={data.job.maxAnnualCompensation}
            class="input input-bordered w-full"
            required
        />
        {#if 'maxAnnualCompensation' in formErrors}
            <label class="label" for="maxAnnualError">
                <span class="label-text-alt text-red-500">{formErrors['maxAnnualCompensation'].message}</span>
            </label>
        {/if}

            <div class="flex justify-between mt-2 mb-4">
                <p class="text-xs">USD</p>
                <p class="text-xs">per annum</p>
            </div>
    
    <!-- Company Name section -->
        <div class="m-1 pt-5">
        <label for="Company Name">Company Name</label>
        </div>
        <input
            type="text"
            name="companyName"
            placeholder="e.g. Facebook"
            value={data.job.employer}
            class="input input-bordered w-full"
            required
        />
 
    <!-- Job Location section -->
        <div class="m-1 pt-5">
        <label for="Job Location">Job Location</label>
        </div>
        <input
            type="text"
            name="jobLocation"
            value={data.job.location}
            placeholder="e.g. Singapore"
            required
            class="input input-bordered w-full"/>

    <!-- Description section -->
        <div class="m-1 pt-5">
        <label for="Desription">Description</label>
        </div>
        <textarea class="w-full input input-bordered rounded h-60 pt-2" 
        name="description" required>{data.job.description}</textarea>

    <!-- Requirements section -->
        <div class="m-1 pt-5">
        <label for="Requirements">Requirements</label>
        </div>
        <textarea class="w-full input input-bordered rounded h-60 pt-2" name="requirements" required>{data.job.requirements}</textarea>
    
    <!-- Application Instructions section -->
        <div class="m-1 pt-5">
        <label for="Application Instructions">Application Instructions</label>
        </div>
        <textarea class="w-full input input-bordered rounded h-28 pt-2" name="applicationInstructions" required>{data.job.applicationInstructions}</textarea>
        {#if 'applicationInstructions' in formErrors}
            <label class="label" for="applicationInstructionsError">
                <span class="label-text-alt text-red-500">{formErrors['applicationInstructions'].message}</span>
            </label>
        {/if}
    
    <!-- Update Job button -->
    <div class="flex justify-center">
        <button class="bg-white hover:bg-black hover:text-white w-48 flex justify-center rounded-lg my-8 py-4 border flex justify-center">
            <div class="flex justify-around">
                <div>UPDATE JOB</div>
                <!-- if isLoading is true, show spinner -->
                {#if $isLoading}
                <div class="pl-3">
                <span class="loading loading-spinner loading-md"></span>
                </div>
                {/if}
            </div>
        </button>
    </div>
</form>




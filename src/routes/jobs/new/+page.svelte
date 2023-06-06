<!-- Create new job page -->

<script>
    import { getUserId } from './../../../utils/auth.js'
    import { goto } from '$app/navigation';
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { writable } from 'svelte/store';
    export let formErrors={}
    let isLoading = writable(false);

    async function createJob(evt){
        //prevent page go to the top when the button is clicked//
        evt.preventDefault()

        isLoading.set(true);

        const userID = await getUserId();

        const JobsData = {
            user: userID,
            title: evt.target['jobTitle'].value,
            minAnnualCompensation: evt.target['minAnnualCompensation'].value,
            maxAnnualCompensation: evt.target['maxAnnualCompensation'].value,
            description: evt.target['description'].value,
            requirements: evt.target['requirements'].value,
            applicationInstructions: evt.target['applicationInstructions'].value,
            employer: evt.target['companyName'].value,
            location: evt.target['jobLocation'].value
            };  

            const resp = await fetch(PUBLIC_BACKEND_BASE_URL + 'api/collections/jobs/records', {
            method: 'POST',
            mode: 'cors',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(JobsData) 
        });

        const jobData = await resp.json()

        if (resp.status == 200) {
            goto(`/jobs/${jobData.id}`);
        }else{
            formErrors = jobData.data;
        }

      isLoading.set(false);
    }
</script>

<svelte:head>
  <title>Create Job | Next Jobs</title>
</svelte:head>

<h1 class="text-3xl font-bold underline decoration-sky-500 py-5 mb-4">Create New Job Page</h1>
    <form on:submit={createJob} class="w-full form-control" >
        <!-- Job Title Section -->
            <div class="m-1">
                <label for="Job Title">Job Title</label>
            </div>
            <input
                type="text"
                name="jobTitle"
                placeholder="Software Engineer"
                class="input input-bordered w-full"
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
                placeholder="e.g. Singapore"
                class="input input-bordered w-full"
                required/>

        <!-- Decription section -->
            <div class="m-1 pt-5">
                <label for="Desription">Description</label>
            </div>
            <textarea class="w-full input input-bordered rounded h-60 pt-2" name="description" required></textarea>

        <!-- Requirements section -->
            <div class="m-1 pt-5">
                <label for="Requirements">Requirements</label>
            </div>
            <textarea class="w-full input input-bordered rounded h-60 pt-2" name="requirements" required></textarea>
            
        <!-- Application Instructions section -->
            <div class="m-1 pt-5">
                <label for="Application Instructions">Application Instructions</label>
            </div>
            <textarea class="w-full input input-bordered rounded h-28 pt-2" name="applicationInstructions" required></textarea>

            {#if 'applicationInstructions' in formErrors}
            <label class="label" for="applicationInstructionsError">
                <span class="label-text-alt text-red-500">{formErrors['applicationInstructions'].message}</span>
            </label>
            {/if}
            
        <!-- Post Job button -->
            <div class="flex justify-center">
                <button class="bg-white hover:bg-black hover:text-white w-60 flex justify-center rounded-lg my-8 py-4 border flex justify-center">
                    <div class="flex justify-around">
                        <div>POST JOB</div>
                        {#if $isLoading}
                        <div class="pl-3">
                            <span class="loading loading-spinner loading-md"></span>
                        </div>
                        {/if}
                    </div>
                </button>
            </div>
    </form>
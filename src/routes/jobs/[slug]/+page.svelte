<!-- Job Details Page -->

<script>
 import SvelteMarkdown from 'svelte-markdown';
 import humanize from "humanize-plus";
 export let data;
 import { getUserId, isAuthenticated } from './../../../utils/auth.js'
</script>

<svelte:head>
  <title>Job Details | Next Jobs</title>
</svelte:head>

<div class="mt-5 p-4">
    <div class="flex-1">
            <div class="flex justify-between mb-1">
            <h1 class="text-3xl font-extrabold">{data.job.title}</h1>
            <!-- Show edit button for user that has log in -->
            {#if $isAuthenticated == true && data.job.user == getUserId()}
                <button class="text-center hover:bg-black hover:text-white btn btn-primary bg-white text-black border-none w-32"><a href="{data.job.id}/update">EDIT</a></button>
            {/if}
            </div>
            <p class="text-xl">{data.job.employer}</p>
    </div>

    <div class="flex flex-row w-full mt-8">
        <div class="basis-2/3 prose max-w-none w-full">
            <h2 class="text-xl font-semibold">Description</h2>
            <SvelteMarkdown source={data.job.description} />
            <div class="mt-6" />
            <h2 class="text-xl font-semibold">Requirements</h2>
            <SvelteMarkdown source={data.job.requirements} />
            <div class="mt-6" />
            <h2 class="text-xl font-semibold">How to Apply?</h2>
            <p>{data.job.applicationInstructions}</p>
        </div>
        <div class="basis-1/3 ml-4">
            <h2 class="text-xl font-semibold">Location</h2>
            <p>{data.job.location}</p>
            <div class="mt-6" />
            <h2 class="text-xl font-semibold">Salary Range</h2>
            <p>
                USD {humanize.formatNumber(data.job.minAnnualCompensation)} - USD {humanize.formatNumber(
                    data.job.maxAnnualCompensation
                )}
            </p>
        </div>
    </div>
</div>